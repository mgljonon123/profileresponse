import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

interface JWTPayload {
  userId: string;
  email: string;
  subscriptionTier: string;
  iat: number;
  exp: number;
}

export async function POST(request: Request) {
  try {
    console.log("Starting test results save process...");

    // Get token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    console.log("Token from cookies:", !!token);

    if (!token) {
      console.log("No token found in cookies");
      return NextResponse.json(
        {
          error: "Unauthorized",
          details: "No token found in cookies",
        },
        { status: 401 }
      );
    }

    try {
      // Verify the token
      const { payload } = (await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      )) as { payload: JWTPayload };

      console.log("Token payload:", payload);

      if (!payload.userId) {
        console.log("No user ID in token");
        return NextResponse.json(
          {
            error: "Unauthorized",
            details: "No user ID found in token",
          },
          { status: 401 }
        );
      }

      const userId = payload.userId;
      console.log("User ID from token:", userId);

      const body = await request.json();
      console.log("Received body:", body);

      const { bigFive, mbti, holland, eq, aiRecommendations } = body;

      if (!bigFive || !mbti || !holland || !eq || !aiRecommendations) {
        console.log("Missing required data:", {
          bigFive,
          mbti,
          holland,
          eq,
          aiRecommendations,
        });
        return NextResponse.json(
          {
            error: "Missing required test data",
            details: "One or more required test results are missing",
          },
          { status: 400 }
        );
      }

      // Create test result first
      console.log("Creating test result...");
      const testResult = await prisma.testResult.create({
        data: {
          userId: userId,
          testType: "personality",
          resultData: {
            bigFive,
            mbti,
            holland,
            eq,
          },
          xValue: 0, // You might want to calculate these based on your needs
          yValue: 0,
        },
      });
      console.log("Test result created:", testResult);

      // Create personality test result
      console.log("Creating personality test result...");
      const personalityTestResult = await prisma.personalityTestResult.create({
        data: {
          userId: userId,
          mbtiType: `${mbti.E_I.E > mbti.E_I.I ? "E" : "I"}${
            mbti.S_N.S > mbti.S_N.N ? "S" : "N"
          }${mbti.T_F.T > mbti.T_F.F ? "T" : "F"}${
            mbti.J_P.J > mbti.J_P.P ? "J" : "P"
          }`,
          extroversionScore: Math.round(
            (mbti.E_I.E / (mbti.E_I.E + mbti.E_I.I)) * 10
          ),
          sensingScore: Math.round(
            (mbti.S_N.S / (mbti.S_N.S + mbti.S_N.N)) * 10
          ),
          thinkingScore: Math.round(
            (mbti.T_F.T / (mbti.T_F.T + mbti.T_F.F)) * 10
          ),
          judgingScore: Math.round(
            (mbti.J_P.J / (mbti.J_P.J + mbti.J_P.P)) * 10
          ),
          hollandCode: Object.entries(holland)
            .sort(([, a], [, b]) => (b as number) - (a as number))
            .slice(0, 3)
            .map(([code]) => code)
            .join(""),
          practicalScore: holland.R,
          investigativeScore: holland.I,
          artisticScore: holland.A,
          socialScore: holland.S,
          businessScore: holland.E,
          conventionalScore: holland.C,
          emotionalStability: bigFive.Neuroticism,
          extraversion: bigFive.Extraversion,
          openness: bigFive.Openness,
          agreeableness: bigFive.Agreeableness,
          conscientiousness: bigFive.Conscientiousness,
          selfAwareness: eq
            .slice(0, 8)
            .reduce((a: number, b: number) => a + b, 0),
          selfRegulation: eq
            .slice(8, 16)
            .reduce((a: number, b: number) => a + b, 0),
          motivation: eq
            .slice(16, 24)
            .reduce((a: number, b: number) => a + b, 0),
          empathy: eq.slice(24, 32).reduce((a: number, b: number) => a + b, 0),
          socialSkills: eq
            .slice(32, 40)
            .reduce((a: number, b: number) => a + b, 0),
          totalEQScore: eq.reduce((a: number, b: number) => a + b, 0),
        },
      });
      console.log("Personality test result created:", personalityTestResult);

      // Extract career recommendations from AI response
      console.log("Processing AI recommendations...");
      const lines = aiRecommendations.split("\n");

      // Pattern to match numbered career entries
      const careerEntryPattern = /(\d+)\.\s+\*\*([^*]+)\*\*/;
      const descriptionPattern = /\*\*Тайлбар:\*\*\s*([^\n]+)/;

      const careers: Array<{
        title: string;
        description: string;
      }> = [];

      let currentCareer: any = null;

      lines.forEach((line: string) => {
        const careerMatch = line.match(careerEntryPattern);
        if (careerMatch) {
          if (currentCareer) {
            careers.push(currentCareer);
          }
          currentCareer = {
            title: careerMatch[2].trim(),
            description: "",
          };
        } else if (currentCareer) {
          const descMatch = line.match(descriptionPattern);
          if (descMatch) {
            currentCareer.description = descMatch[1].trim();
          }
        }
      });

      // Add the last career if exists
      if (currentCareer) {
        careers.push(currentCareer);
      }

      console.log("Extracted careers:", careers);

      // Create career recommendations
      console.log("Creating career recommendations...");
      for (const career of careers) {
        // Find or create career
        let careerRecord = await prisma.career.findFirst({
          where: { title: career.title },
        });

        if (!careerRecord) {
          console.log("Creating new career:", career.title);
          careerRecord = await prisma.career.create({
            data: {
              title: career.title,
              description: career.description,
              isTop10: false,
            },
          });
        } else {
          // Update existing career with new information
          careerRecord = await prisma.career.update({
            where: { id: careerRecord.id },
            data: {
              description: career.description,
            },
          });
        }

        // Create recommendation with test result ID
        console.log("Creating recommendation for career:", careerRecord.id);
        await prisma.careerRecommendation.create({
          data: {
            userId: userId,
            recommendedCareerId: careerRecord.id,
            testResultId: testResult.id, // Link to the test result
            confidenceScore: 0.8,
          },
        });
      }

      console.log("All data saved successfully");
      return NextResponse.json({
        message: "Test results saved successfully",
        personalityTestResultId: personalityTestResult.id,
      });
    } catch (error) {
      console.error("Token verification failed:", error);
      return NextResponse.json(
        {
          error: "Invalid token",
          details:
            error instanceof Error
              ? error.message
              : "Unknown error during token verification",
        },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error saving test results:", error);
    return NextResponse.json(
      {
        error: "Failed to save test results",
        details: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

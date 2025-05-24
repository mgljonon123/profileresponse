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

export async function GET() {
  try {
    // Get token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized", details: "No token found" },
        { status: 401 }
      );
    }

    try {
      // Verify the token
      const { payload } = (await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      )) as { payload: JWTPayload };

      if (!payload.userId) {
        return NextResponse.json(
          { error: "Unauthorized", details: "No user ID found in token" },
          { status: 401 }
        );
      }

      // Get user's personality test results
      const personalityResults = await prisma.personalityTestResult.findMany({
        where: { userId: payload.userId },
        orderBy: { takenAt: "desc" },
        take: 5, // Get last 5 results
      });

      // Get user's career recommendations
      const careerRecommendations = await prisma.careerRecommendation.findMany({
        where: { userId: payload.userId },
        include: {
          career: true,
        },
        orderBy: { recommendedAt: "desc" },
        take: 5, // Get last 5 recommendations
      });

      // Format the data
      const formattedResults = personalityResults.map((result, index) => {
        const recommendation = careerRecommendations[index];
        return {
          id: result.id,
          career: recommendation?.career.title || "Career not found",
          match: Math.round((result.totalEQScore / 200) * 100), // Convert EQ score to percentage
          tests: {
            mbti: result.mbtiType,
            holland: result.hollandCode,
            bigFive: {
              openness: result.openness,
              conscientiousness: result.conscientiousness,
              extraversion: result.extraversion,
              agreeableness: result.agreeableness,
              neuroticism: result.emotionalStability,
            },
            eq: result.totalEQScore,
          },
          takenAt: result.takenAt,
        };
      });

      return NextResponse.json({
        success: true,
        data: formattedResults,
      });
    } catch (error) {
      console.error("Token verification failed:", error);
      return NextResponse.json(
        {
          error: "Invalid token",
          details: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch profile data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
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

      // Get the specific test result
      const testResult = await prisma.personalityTestResult.findUnique({
        where: {
          id: params.id,
          userId: payload.userId,
        },
      });

      if (!testResult) {
        return NextResponse.json(
          { error: "Not found", details: "Test result not found" },
          { status: 404 }
        );
      }

      // Get the career recommendation with AI response
      const careerRecommendation = await prisma.careerRecommendation.findFirst({
        where: {
          userId: payload.userId,
          testResultId: testResult.id,
        },
        include: {
          career: true,
        },
      });

      // Format the data
      const formattedResult = {
        career: careerRecommendation?.career?.title || "Test Result",
        match: Math.round((testResult.totalEQScore / 200) * 100),
        tests: {
          mbti: testResult.mbtiType,
          holland: testResult.hollandCode,
          bigFive: {
            openness: testResult.openness,
            conscientiousness: testResult.conscientiousness,
            extraversion: testResult.extraversion,
            agreeableness: testResult.agreeableness,
            neuroticism: testResult.emotionalStability,
          },
          eq: testResult.totalEQScore,
        },
        takenAt: testResult.takenAt,
        aiResponse: careerRecommendation?.aiResponse || null,
      };

      return NextResponse.json({
        success: true,
        data: formattedResult,
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
    console.error("Error fetching test result:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch test result",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
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

      // Delete the specific test result
      const deleted = await prisma.personalityTestResult.deleteMany({
        where: {
          id: params.id,
          userId: payload.userId,
        },
      });

      if (deleted.count === 0) {
        return NextResponse.json(
          {
            error: "Not found",
            details: "Test result not found or not owned by user",
          },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true });
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
    console.error("Error deleting test result:", error);
    return NextResponse.json(
      {
        error: "Failed to delete test result",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

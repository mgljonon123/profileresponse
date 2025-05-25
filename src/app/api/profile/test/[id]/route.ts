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

interface CareerRecommendationWithCareer {
  id: string;
  userId: string;
  recommendedCareerId: string;
  testResultId: string | null;
  confidenceScore: number;
  recommendedAt: Date;
  aiResponse: string | null;
  career: {
    id: string;
    title: string;
    description: string;
    isTop10: boolean;
    createdAt: Date;
  };
}

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
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

      // Await params before using it
      const { id } = await context.params;

      // Get the specific test result
      const testResult = await prisma.personalityTestResult.findUnique({
        where: {
          id: id,
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
      let careerRecommendation = (await prisma.careerRecommendation.findFirst({
        where: {
          userId: payload.userId,
          testResultId: testResult.id,
        },
        include: {
          career: true,
        },
      })) as CareerRecommendationWithCareer | null;

      // Fallback: get the latest recommendation for the user if not found
      if (!careerRecommendation) {
        careerRecommendation = (await prisma.careerRecommendation.findFirst({
          where: { userId: payload.userId },
          orderBy: { recommendedAt: "desc" },
          include: { career: true },
        })) as CareerRecommendationWithCareer | null;
      }

      // Debug output
      console.log({
        userId: payload.userId,
        testResultId: testResult.id,
        foundCareerRecommendation: careerRecommendation,
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
        recommendation: careerRecommendation
          ? {
              id: careerRecommendation.id,
              confidenceScore: careerRecommendation.confidenceScore,
              recommendedAt: careerRecommendation.recommendedAt,
              career: careerRecommendation.career,
            }
          : null,
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
  context: { params: Promise<{ id: string }> }
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

      // Await params before using it
      const { id } = await context.params;

      // Debug log for delete parameters
      console.log("Attempting to delete data for test result:", {
        testResultId: id,
        userId: payload.userId,
      });

      // --- Debugging: Fetch and log related records before deletion ---
      const allUserRecommendations = await prisma.careerRecommendation.findMany(
        {
          where: { userId: payload.userId },
          select: { id: true, testResultId: true },
        }
      );
      console.log(
        "All CareerRecommendations for user BEFORE delete:",
        allUserRecommendations
      );

      const allUserChatHistory = await prisma.chatHistory.findMany({
        where: { userId: payload.userId },
        select: { id: true, testResultId: true },
      });
      console.log(
        "All ChatHistory for user BEFORE delete:",
        allUserChatHistory
      );
      // --- End Debugging ---

      // Delete associated career recommendations
      const deletedRecommendations =
        await prisma.careerRecommendation.deleteMany({
          where: {
            userId: payload.userId,
            OR: [
              { testResultId: id }, // Delete recommendations linked to this test ID
              { testResultId: null }, // Also delete recommendations with a null testResultId for this user
            ],
          },
        });

      console.log(
        "Deleted recommendations count:",
        deletedRecommendations.count
      );

      // Delete associated chat history entries
      const deletedChatHistory = await prisma.chatHistory.deleteMany({
        where: {
          testResultId: id,
          userId: payload.userId,
        },
      });

      console.log("Deleted chat history count:", deletedChatHistory.count);

      // Delete the specific test result
      const deleted = await prisma.personalityTestResult.deleteMany({
        where: {
          id: id,
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

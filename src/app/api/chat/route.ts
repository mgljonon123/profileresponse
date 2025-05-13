import { NextResponse } from "next/server";
import { getOpenRouterResponse } from "@/lib/openrouter";

interface TestResults {
  bigFive?: {
    Neuroticism: number;
    Extraversion: number;
    Openness: number;
    Agreeableness: number;
    Conscientiousness: number;
  };
  holland?: {
    R: number;
    I: number;
    A: number;
    S: number;
    E: number;
    C: number;
  };
  mbti?: {
    E_I: { E: number; I: number };
    S_N: { S: number; N: number };
    T_F: { T: number; F: number };
    J_P: { J: number; P: number };
  };
}

export async function POST(req: Request) {
  try {
    const { messages, testResults } = await req.json();

    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages must be an array" },
        { status: 400 }
      );
    }

    const response = await getOpenRouterResponse(messages, testResults);

    return NextResponse.json({ message: response });
  } catch (error) {
    console.error("Error in chat API:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json(
      { error: errorMessage },
      { status: errorMessage.includes("OpenRouter API") ? 502 : 500 }
    );
  }
}

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
    const body = await req.json();

    // Загварын нэрийг шалгах
    const model = body.model || "openai/gpt-4.1"; // Default загвар GPT-4.1
    console.log("Requested model:", model); // Дебаг хийх лог

    // OpenRouter-ийн API руу хүсэлт илгээх
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Career Guidance Chat",
        },
        body: JSON.stringify({
          model,
          messages: body.messages,
          temperature: body.temperature || 0.7,
          max_tokens: body.max_tokens || 1000,
          stream: body.stream || false,
        }),
      }
    );

    // Хариуны статусыг шалгах
    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouter API error:", errorData); // Дебаг хийх лог
      return NextResponse.json(
        { error: errorData.error?.message || `HTTP алдаа: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("OpenRouter API response:", data); // Дебаг хийх лог
    return NextResponse.json(data);
  } catch (error) {
    console.error("API алдаа:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Серверт алдаа гарлаа",
      },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";

interface HollandScores {
  R: number;
  I: number;
  A: number;
  S: number;
  E: number;
  C: number;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { bigFive, mbti, holland, eq } = body;

    if (!bigFive || !mbti || !holland || !eq) {
      return NextResponse.json(
        { error: "Missing required test results" },
        { status: 400 }
      );
    }

    const prompt = `Based on the following test results, provide 5 specific career recommendations that would be a good fit for the **Mongolian job market**. For each recommendation, include:
1. The career title
2. A brief explanation of why it's a good fit based on the test results
3. Required skills and qualifications
4. Potential salary range **in Mongolian Tugrik (MNT)**
5. Growth opportunities **within Mongolia**
6. **An accuracy score (as a percentage, e.g., 70%) indicating how good of a fit this career is based on the provided test results.**

Test Results:
- MBTI Type: ${mbti.E_I.E > mbti.E_I.I ? "E" : "I"}${
      mbti.S_N.S > mbti.S_N.N ? "S" : "N"
    }${mbti.T_F.T > mbti.T_F.F ? "T" : "F"}${
      mbti.J_P.J > mbti.J_P.P ? "J" : "P"
    }
- Big Five: ${Object.entries(bigFive)
      .map(([trait, score]) => `${trait}: ${score}%`)
      .join(", ")}
- Holland Code: ${Object.entries(holland as HollandScores)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 3)
      .map(([code]) => code)
      .join("")}
- EQ Scores: ${eq.join(", ")}

Please provide the recommendations in Mongolian language.`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": process.env.YOUR_SITE_URL || "http://localhost:3000",
          "X-Title": "Career Guidance Chat",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct:free",
          messages: [
            {
              role: "system",
              content:
                "You are a career guidance expert who provides detailed and personalized career recommendations based on personality test results. You MUST respond in Mongolian language only.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 2000,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return NextResponse.json(
          { error: "Too many requests. Please try again in a few moments." },
          { status: 429 }
        );
      }
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json({
      choices: [
        {
          message: {
            content: data.choices[0].message.content,
          },
        },
      ],
    });
  } catch (error) {
    console.error("Error getting career recommendations:", error);
    return NextResponse.json(
      { error: "Failed to get career recommendations" },
      { status: 500 }
    );
  }
}

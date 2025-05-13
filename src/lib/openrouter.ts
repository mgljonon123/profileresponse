import axios from "axios";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = process.env.OPENROUTER_API_KEY;
const SITE_URL = process.env.YOUR_SITE_URL || "http://localhost:3000";
const SITE_NAME = process.env.YOUR_SITE_NAME || "My Chatbot";

if (!API_KEY) {
  throw new Error("OPENROUTER_API_KEY is not defined in .env file");
}

interface MessageContent {
  type: "text" | "image_url";
  text?: string;
  image_url?: { url: string };
}

interface Message {
  role: string;
  content: MessageContent[] | string;
}

interface OpenRouterResponse {
  id: string;
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
    finish_reason: string;
  }>;
}

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

export async function getOpenRouterResponse(
  messages: any[],
  testResults?: TestResults
): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OpenRouter API key is not defined");
  }

  // Format test results into a system message
  let systemMessage = "You are a helpful career guidance assistant. ";
  if (testResults) {
    if (testResults.bigFive) {
      systemMessage += `\n\nBig Five Personality Test Results:\n${Object.entries(
        testResults.bigFive
      )
        .map(([trait, score]) => `${trait}: ${score}`)
        .join("\n")}`;
    }

    if (testResults.holland) {
      systemMessage += `\n\nHolland Code Test Results:\n${Object.entries(
        testResults.holland
      )
        .map(([type, score]) => `${type}: ${score}`)
        .join("\n")}`;
    }

    if (testResults.mbti) {
      const mbtiType = [
        testResults.mbti.E_I.E > testResults.mbti.E_I.I ? "E" : "I",
        testResults.mbti.S_N.S > testResults.mbti.S_N.N ? "S" : "N",
        testResults.mbti.T_F.T > testResults.mbti.T_F.F ? "T" : "F",
        testResults.mbti.J_P.J > testResults.mbti.J_P.P ? "J" : "P",
      ].join("");

      systemMessage += `\n\nMBTI Test Results:\nType: ${mbtiType}\n${Object.entries(
        {
          "Extraversion (E) vs Introversion (I)": `${testResults.mbti.E_I.E}-${testResults.mbti.E_I.I}`,
          "Sensing (S) vs Intuition (N)": `${testResults.mbti.S_N.S}-${testResults.mbti.S_N.N}`,
          "Thinking (T) vs Feeling (F)": `${testResults.mbti.T_F.T}-${testResults.mbti.T_F.F}`,
          "Judging (J) vs Perceiving (P)": `${testResults.mbti.J_P.J}-${testResults.mbti.J_P.P}`,
        }
      )
        .map(([type, score]) => `${type}: ${score}`)
        .join("\n")}`;
    }

    systemMessage +=
      "\n\nBased on these test results, provide career guidance and suggest suitable professions. Consider both the personality traits and interests indicated by the tests.";
  }

  const formattedMessages = [
    { role: "system", content: systemMessage },
    ...messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
  ];

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages: formattedMessages,
        max_tokens: 1000,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data?.choices?.[0]?.message?.content) {
      console.error("Invalid response structure:", response.data);
      throw new Error("Invalid response from OpenRouter API");
    }

    return response.data.choices[0].message.content;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "OpenRouter API error:",
        error.response?.data || error.message
      );
      throw new Error(
        `OpenRouter API error: ${
          error.response?.data?.error?.message || error.message
        }`
      );
    }
    throw error;
  }
}

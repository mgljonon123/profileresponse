"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import { FaUser, FaRobot } from "react-icons/fa";

interface MessageContent {
  type: "text" | "image_url";
  text?: string;
  image_url?: { url: string };
}

interface Message {
  role: "user" | "assistant";
  content: MessageContent[] | string;
  timestamp: string;
}

interface BigFiveScores {
  Neuroticism: number;
  Extraversion: number;
  Openness: number;
  Agreeableness: number;
  Conscientiousness: number;
}

interface ChatbotProps {
  onQuizSubmit?: { [key: number]: number };
}

const Chatbot = ({ onQuizSubmit }: ChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [textInput, setTextInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bigFiveScores, setBigFiveScores] = useState<BigFiveScores | null>(
    null
  );
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Quiz-ээс ирсэн хариултыг боловсруулах
  useEffect(() => {
    if (onQuizSubmit) {
      processQuizResults(onQuizSubmit);
    }
  }, [onQuizSubmit]);

  // bigFiveScores шинэчлэгдсэн бол API руу хүсэлт илгээх
  useEffect(() => {
    if (bigFiveScores) {
      console.log("Sending Big Five Scores to API:", bigFiveScores);
      handleSubmit(new Event("submit") as unknown as FormEvent);
    }
  }, [bigFiveScores]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!textInput.trim() && !imageUrl.trim() && !bigFiveScores) return;

    const content: MessageContent[] = [];
    if (textInput.trim()) {
      content.push({ type: "text", text: textInput });
    }
    if (imageUrl.trim()) {
      content.push({ type: "image_url", image_url: { url: imageUrl } });
    }

    if (bigFiveScores) {
      // Big Five оноог Монголоор хөрвүүлэх
      const translatedScores = {
        "Сэтгэл хөдлөлийн тогтвортой байдал (Neuroticism)":
          bigFiveScores.Neuroticism,
        "Гадагшаа чиглэсэн зан (Extraversion)": bigFiveScores.Extraversion,
        "Шинэ санаанд нээлттэй байдал (Openness)": bigFiveScores.Openness,
        "Хамтран ажиллах чадвар (Agreeableness)": bigFiveScores.Agreeableness,
        "Төлөвлөлттэй, зохион байгуулалттай байдал (Conscientiousness)":
          bigFiveScores.Conscientiousness,
      };

      // Монгол хэл дээрх оноог мессеж болгон бэлдэх
      const scoresText = Object.entries(translatedScores)
        .map(([trait, score]) => `${trait}: ${score}`)
        .join(", ");

      content.push({
        type: "text",
        text: `Миний Big Five оноо: ${scoresText}`,
      });

      content.push({
        type: "text",
        text: " Эхлээд миний оноог хараад сэтгэл зүйн зөвлөгөө өгөөд дараа нь миний оноонд тохирох бүх мэргэжилийг санал болго",
      });
    }

    const userMessage: Message = {
      role: "user",
      content,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setTextInput("");
    setImageUrl("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      console.log("Fetch Response Status:", response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("API Response Data:", data);
      if (data.error) throw new Error(data.error);

      const assistantMessage: Message = {
        role: "assistant",
        content: data.message,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong.",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const processQuizResults = (answers: { [key: number]: number }) => {
    const scores: BigFiveScores = {
      Neuroticism: 0,
      Extraversion: 0,
      Openness: 0,
      Agreeableness: 0,
      Conscientiousness: 0,
    };

    const questionsData = [
      { id: 1, category: "Neuroticism", reverse: false },
      { id: 2, category: "Neuroticism", reverse: false },
      { id: 3, category: "Neuroticism", reverse: false },
      { id: 4, category: "Neuroticism", reverse: false },
      { id: 5, category: "Neuroticism", reverse: false },
      { id: 6, category: "Extraversion", reverse: false },
      { id: 7, category: "Extraversion", reverse: false },
      { id: 8, category: "Extraversion", reverse: false },
      { id: 9, category: "Extraversion", reverse: false },
      { id: 10, category: "Extraversion", reverse: false },
      { id: 11, category: "Openness", reverse: false },
      { id: 12, category: "Openness", reverse: false },
      { id: 13, category: "Openness", reverse: false },
      { id: 14, category: "Openness", reverse: false },
      { id: 15, category: "Openness", reverse: false },
      { id: 16, category: "Agreeableness", reverse: true },
      { id: 17, category: "Agreeableness", reverse: true },
      { id: 18, category: "Agreeableness", reverse: true },
      { id: 19, category: "Agreeableness", reverse: false },
      { id: 20, category: "Agreeableness", reverse: true },
      { id: 21, category: "Conscientiousness", reverse: false },
      { id: 22, category: "Conscientiousness", reverse: false },
      { id: 23, category: "Conscientiousness", reverse: true },
      { id: 24, category: "Conscientiousness", reverse: true },
      { id: 25, category: "Conscientiousness", reverse: true },
    ];

    questionsData.forEach((q) => {
      const score = answers[q.id] || 3;
      const adjustedScore = q.reverse ? 6 - score : score;
      scores[q.category as keyof BigFiveScores] += adjustedScore;
    });

    setBigFiveScores(scores);
  };

  return (
    <div className="w-full bg-gradient-to-br from-purple-100 to-purple-300 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col">
        <div className="p-6 bg-purple-700 text-white rounded-t-3xl flex items-center gap-3">
          <FaRobot className="text-3xl" />
          <h1 className="text-2xl font-bold">AI Chatbot</h1>
        </div>
        <div
          ref={chatContainerRef}
          className="flex-1 p-6 overflow-y-auto bg-gray-50 space-y-4"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "assistant" && (
                <FaRobot className="text-purple-600 text-2xl mt-2" />
              )}
              <div
                className={`max-w-[70%] p-4 rounded-2xl shadow-md ${
                  msg.role === "user"
                    ? "bg-purple-600 text-white"
                    : "bg-white text-gray-800 border border-gray-200"
                }`}
              >
                {typeof msg.content === "string" ? (
                  <p className="text-base">{msg.content}</p>
                ) : (
                  msg.content.map((item, idx) =>
                    item.type === "text" ? (
                      <p key={idx} className="text-base mb-2">
                        {item.text}
                      </p>
                    ) : (
                      <img
                        key={idx}
                        src={item.image_url?.url}
                        alt="Uploaded"
                        className="max-w-xs h-auto rounded-lg mt-2"
                      />
                    )
                  )
                )}
                <p className="text-xs text-gray-400 mt-1">{msg.timestamp}</p>
              </div>
              {msg.role === "user" && (
                <FaUser className="text-purple-600 text-2xl mt-2" />
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-center">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce delay-200" />
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce delay-400" />
              </div>
            </div>
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className="p-6 border-t border-gray-200 bg-white rounded-b-3xl"
        >
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="w-full p-4 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-4 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Paste image URL (optional)"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-3 text-base rounded-xl hover:bg-purple-700 transition-colors disabled:bg-purple-300"
              disabled={isLoading}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;

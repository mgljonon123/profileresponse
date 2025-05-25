"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Message {
  role: "user" | "assistant";
  content: string;
}

const faqTopics = [
  {
    title: "Ажлын Хаалт",
    desc: "Ажлын замнал, ажил хайлт, мэргэжлийн хөгжлийн талаар зөвлөгөө аваарай.",
  },
  {
    title: "Тестийн Үр Дүн",
    desc: "Хувь хүний тестийн үр дүнгээ ойлгож, ажлын замналдаа хэрхэн ашиглахыг мэдээрэй.",
  },
  {
    title: "Ур Чадварын Хөгжил",
    desc: "Зорилтот ажлын байрандаа шаардлагатай ур чадваруудыг хэрхэн хөгжүүлэх талаар сур.",
  },
  {
    title: "Ерөнхий Дэмжлэг",
    desc: "Өөр асуудал байна уу? Асуугаарай, бид танд чиглүүлнэ.",
  },
];

export default function MessagesPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // SWR for user info
  const { data: userData } = useSWR("/api/profile/settings", fetcher);
  const nickName = userData?.data?.nickname || "Neo";
  const profilePic = userData?.data?.profilePicture || "/profile.jpg";

  const scrollToBottom = () => {
    if (messagesEndRef.current && messages) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      scrollToBottom();
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-4-maverick:free",
          messages: [
            {
              role: "system",
              content:
                "Та бол ажлын чиглүүлэгч туслах юм. Ажлын хөгжил, хувь хүний тест, мэргэжлийн өсөлтийн талаар тодорхой, товч, мэргэжлийн хариулт өгнө үү.",
            },
            ...messages,
            { role: "user", content: userMessage },
          ],
          temperature: 0.7,
          max_tokens: 1000,
          stream: false,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP алдаа: ${response.status}`);
      }

      const assistantMessage = data.choices?.[0]?.message?.content;

      if (!assistantMessage) {
        throw new Error("AI-ийн хариуны агуулга алга");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantMessage },
      ]);
    } catch (error) {
      console.error("Алдаа:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            error instanceof Error
              ? `Алдаа: ${error.message}`
              : "Холболтын асуудал гарлаа. Дараа дахин оролдоно уу.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-4 sm:mt-6 md:mt-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#232360]">
            Ажлын Туслах <span className="text-[#F59E0B]">{nickName}</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            2025 оны 5-р сарын 25, Даваа
          </p>
        </div>
        <div className="flex items-center gap-4 ml-auto">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-gray-200 shadow-sm aspect-square">
            <Image
              src={profilePic}
              alt="профайл"
              width={48}
              height={48}
              className="object-cover w-full h-full aspect-square"
            />
          </div>
          <button
            onClick={() => router.push("/")}
            className="bg-white p-2 sm:p-3 rounded-full shadow hover:bg-gray-50 transition-all duration-300 flex items-center justify-center group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 group-hover:text-[#E94A1F] transition-colors duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="w-full h-16 sm:h-20 md:h-24 rounded-xl mb-6 sm:mb-8 md:mb-10 bg-gradient-to-r from-[#C7E0FF] to-[#FFF2D1] flex items-end px-4 sm:px-6 md:px-8 shadow-sm" />

      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
          Бид өнөөдөр танд <span className="text-[#F59E0B]">яаж</span> туслах
          вэ?
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto text-base sm:text-lg">
          Ажлын замнал, тестийн үр дүн, мэргэжлийн хөгжлийн талаар мэргэжлийн
          зөвлөгөө аваарай. Сэдвээ сонго, эсвэл асуултаа шууд асуу.
        </p>
      </div>

      <div className="flex flex-col h-[500px] sm:h-[550px] md:h-[600px] bg-white rounded-xl sm:rounded-2xl shadow-lg border border-[#f0f0f5]">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="mb-6 sm:mb-8">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M24 8L12 20H36L24 32"
                    stroke="#232360"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 justify-center w-full">
                {faqTopics.map((topic, i) => (
                  <div
                    key={i}
                    className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-6 sm:p-8 w-full sm:w-72 text-left shadow hover:shadow-xl transition flex flex-col gap-2 sm:gap-3 cursor-pointer group"
                    onClick={() => setInput(topic.title + ": ")}
                  >
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <span className="font-semibold text-lg sm:text-xl text-gray-800 group-hover:text-[#F59E0B] transition">
                        {topic.title}
                      </span>
                      <span className="inline-block ml-2">
                        <svg
                          width="20"
                          height="20"
                          fill="none"
                          stroke="#888"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                    <div className="text-gray-500 text-sm sm:text-base">
                      {topic.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-xl sm:rounded-2xl p-3 sm:p-4 ${
                    message.role === "user"
                      ? "bg-[#F59E0B] text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-gray-800">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSubmit}
          className="p-3 sm:p-4 border-t border-gray-200"
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Асуултаа энд бичнэ үү..."
              className="flex-1 bg-gray-50 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#F59E0B] text-white rounded-lg sm:rounded-xl px-4 sm:px-6 py-2 sm:py-3 hover:bg-[#F59E0B] transition disabled:opacity-50 text-sm sm:text-base"
            >
              Илгээх
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
  const [nickName, setNickName] = useState("Neo");
  const [profilePic, setProfilePic] = useState("/profile.jpg");

  // localStorage-ээс хоч нэр, зургийг ачаалах
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedNickName = localStorage.getItem("nickName") || "Neo";
      const storedProfilePic =
        localStorage.getItem("profilePic") || "/profile.jpg";
      setNickName(storedNickName);
      setProfilePic(storedProfilePic);
    }
  }, []);

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
          model: "deepseek/deepseek-chat:free",
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
    <div className="max-w-5xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#232360]">
            Ажлын Туслах <span className="text-[#4f46e5]">{nickName}</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            2025 оны 5-р сарын 25, Даваа
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 shadow-sm">
            <Image
              src={profilePic}
              alt="профайл"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <button
            onClick={() => router.push("/")}
            className="bg-white p-3 rounded-full shadow hover:bg-gray-50 transition-all duration-300 flex items-center justify-center group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-gray-600 group-hover:text-[#E94A1F] transition-colors duration-300"
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

      <div className="w-full h-24 rounded-xl mb-10 bg-gradient-to-r from-[#C7E0FF] to-[#FFF2D1] flex items-end px-8 shadow-sm" />

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">
          Бид өнөөдөр танд <span className="text-purple-500">яаж</span> туслах
          вэ?
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto text-lg">
          Ажлын замнал, тестийн үр дүн, мэргэжлийн хөгжлийн талаар мэргэжлийн
          зөвлөгөө аваарай. Сэдвээ сонго, эсвэл асуултаа шууд асуу.
        </p>
      </div>

      <div className="flex flex-col h-[600px] bg-white rounded-2xl shadow-lg border border-[#f0f0f5]">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="mb-8">
                <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M24 8L12 20H36L24 32"
                    stroke="#232360"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex flex-wrap gap-8 justify-center w-full">
                {faqTopics.map((topic, i) => (
                  <div
                    key={i}
                    className="bg-white border border-gray-200 rounded-2xl p-8 w-72 text-left shadow hover:shadow-xl transition flex flex-col gap-3 cursor-pointer group"
                    onClick={() => setInput(topic.title + ": ")}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-xl text-gray-800 group-hover:text-purple-600 transition">
                        {topic.title}
                      </span>
                      <span className="inline-block ml-2">
                        <svg
                          width="22"
                          height="22"
                          fill="none"
                          stroke="#888"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                    <div className="text-gray-500 text-base">{topic.desc}</div>
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
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    message.role === "user"
                      ? "bg-purple-500 text-white"
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
              <div className="bg-gray-100 rounded-2xl p-4 text-gray-800">
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
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Асуултаа энд бичнэ үү..."
              className="flex-1 bg-gray-50 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-purple-500 text-white rounded-xl px-6 py-3 hover:bg-purple-600 transition disabled:opacity-50"
            >
              Илгээх
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

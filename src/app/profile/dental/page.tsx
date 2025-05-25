"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const professions = [
  "Программист",
  "Веб хөгжүүлэгч",
  "Мобайл хөгжүүлэгч",
  "AI/ML инженер",
  "Системийн админ",
  "UX/UI дизайнер",
  "DevOps инженер",
  "Дата шинжэгч",
  "Кибер аюулгүй байдлын мэргэжилтэн",
  "Блокчейн хөгжүүлэгч",
  "Game Developer",
  "Full Stack хөгжүүлэгч",
  "Frontend хөгжүүлэгч",
  "Backend хөгжүүлэгч",
  "QA инженер",
  "Архитектор",
  "Багш",
  "Барилгачин",
  "Дизайнер",
  "Инженер",
  "Маркетингийн мэргэжилтэн",
  "Нягтлан бодогч",
  "Орчуулагч",
  "Сэтгүүлч",
  "Хуульч",
];

export default function RoadmapPage() {
  const router = useRouter();
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProfession, setSelectedProfession] = useState("");

  const getAIRecommendation = async () => {
    if (!selectedProfession) {
      alert("Мэргэжил сонгоно уу");
      return;
    }

    setIsLoading(true);
    setAiResponse("");
    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization:
            "Bearer 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",
          "HTTP-Referer": "<YOUR_SITE_URL>", // өөрийн сайт URL-ээ оруулна уу
          "X-Title": "<YOUR_SITE_NAME>", // сайт нэрээ оруулна уу
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat-v3-0324:free",
          messages: [
            {
              role: "user",
              content: `Миний сонгосон мэргэжил: ${selectedProfession}. 
Энэ мэргэжлийг эзэмшихэд шаардлагатай ур чадваруудыг жагсааж өгөөч. 
Мөн хаанаас, хэрхэн эхлэх, дундаж хугацаа хэр их шаардлагатай байдаг талаар дэлгэрэнгүй зөвлөгөө өгнө үү.`,
            },
          ],
        }),
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error("AI-гаас зөвлөгөө авахад алдаа гарлаа: " + error);
      }

      const data = await res.json();
      setAiResponse(
        data.choices?.[0]?.message?.content || "AI-гаас хариу ирсэнгүй."
      );
    } catch (err) {
      console.error("Error getting AI recommendation:", err);
      setAiResponse("AI-гаас зөвлөгөө авахад алдаа гарлаа.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-4 sm:mt-6 md:mt-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#1a1a2e]">Карьерын Зам</h1>
          <p className="text-[#4a4a6a] text-sm mt-1">Mon, 25 May 2025</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#e0e0e7] shadow-md bg-white">
            <Image
              src="/images/default-avatar.png"
              alt="profile"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <button
            onClick={() => router.push("/")}
            className="bg-white p-2 sm:p-3 rounded-full shadow-md hover:bg-[#f8f9ff] transition-all duration-300 flex items-center justify-center group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 sm:w-6 sm:h-6 text-[#4a4a6a] group-hover:text-[#2563eb] transition-colors duration-300"
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

      {/* Gradient Banner */}
      <div className="w-full h-16 sm:h-20 md:h-24 rounded-xl mb-6 sm:mb-8 md:mb-10 bg-gradient-to-r from-[#F59E0B] to-[#F59E0B] flex items-end px-4 sm:px-6 md:px-8 shadow-md">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Мэргэжлийн Зам</h2>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 border border-[#f0f0f5] flex flex-col items-center justify-center min-h-[300px]">
        <div className="text-xl sm:text-2xl font-semibold text-[#1a1a2e] mb-3 sm:mb-4">
          Мэргэжлийн Замын Зөвлөгөө
        </div>
        <div className="text-[#4a4a6a] text-base sm:text-lg mb-4 sm:mb-6 text-center">
          Өөрийн мэргэжлийн замыг тодорхойлж, шаардлагатай ур чадваруудыг
          хөгжүүлэхэд туслахаар бэлэн байна.
        </div>

        {/* Profession Selection */}
        <div className="w-full max-w-md mb-4 sm:mb-6">
          <select
            value={selectedProfession}
            onChange={(e) => setSelectedProfession(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent text-sm sm:text-base"
          >
            <option value="">Мэргэжил сонгох</option>
            {professions.map((prof) => (
              <option key={prof} value={prof}>
                {prof}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={() => router.push("/profile")}
            className="bg-[#F59E0B] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg shadow-md hover:bg-[#F59E0B] transition font-semibold text-sm sm:text-base"
          >
            Профайл руу буцах
          </button>
          <button
            onClick={getAIRecommendation}
            className="flex items-center gap-2 px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-[#F59E0B] to-[#F59E0B] text-white rounded-lg shadow-md hover:from-[#F59E0B] hover:to-[#F59E0B] transition-all duration-300 font-semibold text-sm sm:text-base"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 sm:w-5 sm:h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
              />
            </svg>
            AI Зөвлөгөө авах
          </button>
        </div>

        {isLoading && <div className="mt-4 sm:mt-6 text-[#4a4a6a] text-sm sm:text-base">Уншиж байна...</div>}

        {aiResponse && (
          <div className="mt-4 sm:mt-6 bg-gray-50 p-4 sm:p-6 rounded-lg w-full">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-[#1a1a2e]">
              AI Зөвлөгөө
            </h2>
            <p className="text-gray-700 whitespace-pre-wrap text-sm sm:text-base">{aiResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
}

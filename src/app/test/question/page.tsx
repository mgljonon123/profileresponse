"use client";

import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useRouter } from "next/navigation";

const steps = [
  "Эхлэх",
  "MBTI",
  "Holland Code",
  "Big Five",
  "EQ test",
  "Төгсгөл",
];

const questions = [
  {
    text: "Таны зан чанарын хэв маягийг тодорхойлох",
    options: ["Hate it", "Dislike it", "Neutral", "Like it"],
  },
  {
    text: "Та багийн ажилд хэр идэвхтэй вэ?",
    options: ["Идэвхгүй", "Дунд", "Идэвхтэй", "Маш идэвхтэй"],
  },
  {
    text: "Та шинэ зүйлд хэр хурдан дасдаг вэ?",
    options: ["Огт дасдаггүй", "Удаан", "Дунд", "Түргэн"],
  },
];

const QuestionPage = () => {
  const [current, setCurrent] = useState(0);
  const router = useRouter();
  const currentQuestion = questions[current];

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      router.push("/test/result");
    }
  };

  return (
    <div className="min-h-screen bg-[#232221] flex flex-col md:flex-row">
      {/* Centered Question and Options */}
      <div className="flex-1 flex flex-col items-center justify-center py-12">
        <div className="w-full max-w-md mx-auto flex flex-col items-center">
          <div className="flex items-center justify-center mb-8">
            <span className="text-white text-xl md:text-2xl font-semibold mr-2 text-center">
              {currentQuestion.text}
            </span>
          </div>
          <div className="w-full flex flex-col gap-4 mb-6">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={option}
                className="flex items-center w-full border border-gray-400 rounded-lg px-4 py-3 text-white text-lg font-medium hover:bg-gray-800 transition focus:outline-none"
                onClick={handleNext}
              >
                <span className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded mr-4 text-base font-bold">
                  {idx + 1}
                </span>
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Right: Timeline */}
      <div className="w-full md:w-1/3 bg-[#181818] flex flex-col items-center justify-center py-12 relative">
        <div className="flex flex-col items-center w-full max-w-xs">
          <div className="relative w-full">
            <div className="absolute left-5 top-0 bottom-0 w-2 bg-gradient-to-b from-gray-700 via-gray-500 to-gray-700 rounded-full z-0"></div>
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="relative z-10 flex items-center mb-16 last:mb-0"
              >
                <div
                  className={`w-12 h-12 rounded-full flex-shrink-0 mr-4 flex items-center justify-center shadow-xl transition-all duration-300
                  ${
                    idx === 0
                      ? "bg-gradient-to-br from-[#7fdaf4] via-pink-400 to-green-300 border-[5px] border-black cartoon-bubble"
                      : "bg-white border-4 border-gray-700"
                  }
                `}
                >
                  {idx === 0 && (
                    <span className="absolute w-4 h-2 bg-white bg-opacity-70 rounded-full left-3 top-2 rotate-[-20deg] pointer-events-none"></span>
                  )}
                </div>
                <div
                  className={`text-xl drop-shadow-[0_2px_0_rgba(0,0,0,0.8)] transition-all duration-300
                  ${
                    idx === 0
                      ? "text-[#7fdaf4] cartoon-text"
                      : "text-white text-lg"
                  }
                `}
                >
                  {step}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;

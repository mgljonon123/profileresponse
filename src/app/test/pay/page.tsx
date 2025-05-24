"use client";

import React from "react";
import { useRouter } from "next/navigation";

const plans = [
  {
    title: "Үнэгүй",
    price: "$0",
    period: "/cap",
    features: [
      "Хязгаартай тест",
      "MBTI, BigFive, Holland Code тест",
      "Карьeр зөвлөмж",
    ],
    button: {
      text: "GET STARTED",
      color: "bg-gray-400 text-black hover:bg-gray-500",
    },
  },
  {
    title: "Дундаж",
    price: "$5",
    period: "/cap",
    features: [
      "Карьeрын зорилго, Авьяас чадвар, Priorities",
      "10 тест",
      "Бүтээмжийн зөвлөмж",
    ],
    button: {
      text: "GET STARTED",
      color: "bg-red-700 text-white hover:bg-red-800",
    },
  },
  {
    title: "Янзын",
    price: "$10",
    period: "/mo",
    features: ["Хязгааргүй тест", "Roadmap зам", "Voice messages anywhere"],
    button: {
      text: "GET STARTED",
      color: "bg-[#7fdaf4] text-black hover:bg-[#7fdaf4]",
    },
  },
];

const steps = [
  "Эхлэх",
  "Таны зан чанарын хэв маягийг тодорхойлох",
  "Танд тохирох ажил мэргэжлийн санал",
  "Хобби",
];

const PayPage = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#232221] flex flex-col md:flex-row relative">
      {/* Top Right: Test Start Button */}
      <div className="absolute top-6 right-8 z-20">
        <button
          className="bg-white text-black px-4 py-1 rounded-full text-sm font-semibold shadow"
          onClick={() => router.push("/test/question")}
        >
          Тест эхлэх
        </button>
      </div>
      {/* Left: Pricing Cards */}
      <div className="flex-1 flex flex-col items-center justify-center py-12">
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-center">
          {plans.map((plan, idx) => (
            <div
              key={plan.title}
              className="bg-black rounded-2xl shadow-lg flex flex-col items-center px-8 py-10 w-full md:w-80 min-h-[350px]"
            >
              <div className="text-white text-2xl font-semibold mb-2">
                {plan.title}
              </div>
              <div className="text-white text-4xl font-bold mb-1">
                {plan.price}
              </div>
              <div className="text-gray-400 text-lg mb-6">{plan.period}</div>
              <ul className="text-white text-base mb-8 space-y-2 w-full">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span
                      className="inline-block w-4 h-4 rounded-full bg-white mr-2"
                      style={{ minWidth: "16px" }}
                    ></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`mt-auto w-full py-3 rounded-lg font-semibold text-lg transition ${plan.button.color}`}
                onClick={() => router.push("/test/question")}
              >
                {plan.button.text}
              </button>
            </div>
          ))}
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

export default PayPage;

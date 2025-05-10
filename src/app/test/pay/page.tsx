'use client'


import React from "react";


export default function PayPage() {
  return (
    <div className="min-h-screen bg-[#232323] flex flex-col">
      {/* Header */}
      <header className="w-full flex items-center justify-start px-8 pt-2">
        <span className="text-white text-4xl font-extrabold tracking-tight" style={{letterSpacing: '-2px'}}>START UP</span>
      </header>
      {/* Main Content */}
      <main className="flex-1 flex flex-row justify-center items-start gap-8 px-8 py-8">
        {/* Pricing Cards */}
        <div className="flex flex-row gap-8 flex-1 max-w-5xl justify-center">
          {/* Card 1 */}
          <div className="bg-black rounded-3xl p-8 flex flex-col w-80 min-h-[420px] shadow-lg">
            <span className="text-white text-2xl font-bold mb-2">Үнэгүй</span>
            <div className="flex items-end mb-2">
              <span className="text-white text-4xl font-extrabold">$0</span>
              <span className="text-white text-xl font-normal mb-1">/cap</span>
            </div>
            <ul className="text-white text-base font-light space-y-3 mb-8 mt-4">
              <li className="flex items-center gap-2"><span className="text-green-400">✔</span> Хязгаартай тест</li>
              <li className="flex items-center gap-2"><span className="text-green-400">✔</span> MBTI , BigFive , Holland Code тест</li>
              <li className="flex items-center gap-2"><span className="text-green-400">✔</span> Карьер зөвлөмж</li>
            </ul>
            <button className="mt-auto bg-[#A39A89] text-white font-bold py-2 rounded-full">GET STARTED</button>
          </div>
          {/* Card 2 */}
          <div className="bg-black rounded-3xl p-8 flex flex-col w-80 min-h-[420px] shadow-lg">
            <span className="text-white text-2xl font-bold mb-2">Дундаж</span>
            <div className="flex items-end mb-2">
              <span className="text-white text-4xl font-extrabold">$5</span>
              <span className="text-white text-xl font-normal mb-1">/cap</span>
            </div>
            <ul className="text-white text-base font-light space-y-3 mb-8 mt-4">
              <li className="flex items-center gap-2"><span className="text-green-400">✔</span> Карьерын зорилго ,<br/>Авьяас чадвар ,<br/>Priorities</li>
              <li className="flex items-center gap-2"><span className="text-green-400">✔</span> 10  тест</li>
              <li className="flex items-center gap-2"><span className="text-green-400">✔</span> Бүтээмжийн зөвлөмж</li>
            </ul>
            <button className="mt-auto bg-[#B94B34] text-white font-bold py-2 rounded-full">GET STARTED</button>
          </div>
          {/* Card 3 */}
          <div className="bg-black rounded-3xl p-8 flex flex-col w-80 min-h-[420px] shadow-lg">
            <span className="text-white text-2xl font-bold mb-2">Янзын</span>
            <div className="flex items-end mb-2">
              <span className="text-white text-4xl font-extrabold">$10</span>
              <span className="text-white text-xl font-normal mb-1">/mo</span>
            </div>
            <ul className="text-white text-base font-light space-y-3 mb-8 mt-4">
              <li className="flex items-center gap-2"><span className="text-green-400">✔</span> Хязгааргүй тест</li>
              <li className="flex items-center gap-2"><span className="text-green-400">✔</span> Roadmap зам</li>
              <li className="flex items-center gap-2"><span className="text-green-400">✔</span> Voice messages anywhere</li>
            </ul>
            <button className="mt-auto bg-[#E9DAB2] text-black font-bold py-2 rounded-full">GET STARTED</button>
          </div>
        </div>
        {/* Vertical Stepper */}
        <div className="hidden lg:flex flex-col items-center min-w-[340px] h-full ml-auto">
          <div className="bg-black rounded-3xl p-8 flex flex-col w-full h-full justify-center">
            <div className="flex flex-col items-start relative h-full">
              {/* Stepper line */}
              <div className="absolute left-4 top-6 bottom-6 w-1 bg-white/10 z-0" style={{marginLeft: '6px'}}></div>
              {/* Steps */}
              <div className="relative z-10 flex flex-col gap-16">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-white rounded-full border-4 border-black"></div>
                  <span className="text-white text-xl font-bold">Эхлэх</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-white rounded-full border-4 border-black"></div>
                  <span className="text-white text-xl font-bold">Таны зан чанарын хэв маягийг тодорхойлох</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-white rounded-full border-4 border-black"></div>
                  <span className="text-white text-xl font-bold">Танд тохирох ажил мэргэжлийн санал</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-white rounded-full border-4 border-black"></div>
                  <span className="text-white text-xl font-bold">Хобби</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

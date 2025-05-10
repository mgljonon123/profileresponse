import React from "react";

export default function QuestionPage() {
  return (
    <div className="min-h-screen bg-[#232323] flex flex-col">
      <div className="flex flex-row w-full">
        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Question Title */}
          <div className="mt-24 mb-12 flex flex-col items-center">
            <span className="text-white text-2xl font-bold mb-2">Таны зан чанарын хэв маягийг тодорхойлох</span>
            <span className="text-white text-2xl ml-2">✔</span>
          </div>
          {/* Answer Options */}
          <div className="flex flex-col gap-4 w-full max-w-xl">
            <button className="flex items-center w-full border border-white rounded-xl px-6 py-4 text-white text-xl font-medium hover:bg-white/10 transition">
              <span className="w-10 h-10 flex items-center justify-center border border-white rounded-lg mr-6 text-lg font-bold">1</span>
              Hate it
            </button>
            <button className="flex items-center w-full border border-white rounded-xl px-6 py-4 text-white text-xl font-medium hover:bg-white/10 transition">
              <span className="w-10 h-10 flex items-center justify-center border border-white rounded-lg mr-6 text-lg font-bold">2</span>
              Dislike it
            </button>
            <button className="flex items-center w-full border border-white rounded-xl px-6 py-4 text-white text-xl font-medium hover:bg-white/10 transition">
              <span className="w-10 h-10 flex items-center justify-center border border-white rounded-lg mr-6 text-lg font-bold">3</span>
              Neutral
            </button>
            <button className="flex items-center w-full border border-white rounded-xl px-6 py-4 text-white text-xl font-medium hover:bg-white/10 transition">
              <span className="w-10 h-10 flex items-center justify-center border border-white rounded-lg mr-6 text-lg font-bold">4</span>
              Like it
            </button>
          </div>
          {/* Skip Question */}
          <div className="mt-10">
            <button className="text-white text-lg font-bold underline underline-offset-4">skip question</button>
          </div>
        </div>
        {/* Right Stepper */}
        <div className="relative flex flex-col items-end min-w-[570px] h-screen">
          {/* Black background full height */}
          <div className="absolute inset-0 bg-black z-0 rounded-none" />
          {/* Top right buttons */}
          <div className="flex flex-row  justify-end items-center w-full pt-[40px] pr-8 gap-4 z-10">
            <button className="bg-[#dddddd] text-black font-semibold px-6 py-2 rounded-xl">Тест эхлэх</button>
            <div className="w-10 h-10 bg-[#dddddd] rounded-full"></div>
          </div>
          {/* Stepper */}
          <div className="flex flex-col w-[300px] items-end relative flex-1 w-full justify-center z-10">
            {/* Stepper line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-white/10 z-0" style={{marginLeft: '6px'}}></div>
            {/* Steps */}
            <div className="relative  z-10 flex h-[800px] flex-col gap-24 pt-16 pb-16 items-end">
              <div className="flex items-center gap-4 w-60 justify-end">
                <div className="w-8 h-8 bg-white rounded-full border-4 border-black"></div>
                <span className="text-white text-xl font-bold text-right w-48">Эхлэх</span>
              </div>
              <div className="flex items-center gap-4 w-60 justify-end">
                <div className="w-8 h-8 bg-white rounded-full border-4 border-black flex items-center justify-center">
                  <span className="text-black text-2xl font-bold">✔</span>
                </div>
                <span className="text-white text-xl font-bold text-right w-48">Таны зан чанарын хэв маягийг тодорхойлох</span>
              </div>
              <div className="flex items-center gap-4 w-60 justify-end">
                <div className="w-8 h-8 bg-white rounded-full border-4 border-black"></div>
                <span className="text-white text-xl font-bold text-right w-48">Танд тохирох ажил мэргэжлийн санал</span>
              </div>
              <div className="flex items-center gap-4 w-60 justify-end">
                <div className="w-8 h-8 bg-white rounded-full border-4 border-black"></div>
                <span className="text-white text-xl font-bold text-right w-48">Хобби</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

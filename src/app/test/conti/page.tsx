import React from "react";

export default function ContiPage() {
  return (
    <div className="min-h-screen bg-[#232323] flex flex-col">
      <div className="flex flex-row w-full">
        {/* START UP logo at top left */}
        <div className="flex items-start w-full max-w-[300px] px-14 pt-0 pb-0">
          <span className="text-white text-4xl font-extrabold tracking-tight mt-4" style={{letterSpacing: '-2px'}}>START UP</span>
        </div>
        {/* Right Black background with buttons at top */}
        <div className="relative flex flex-col items-end min-w-[370px] h-screen">
          {/* Black background full height */}
          <div className="absolute inset-0 bg-black z-0 rounded-none" />
          
          
          
          
          {/* Top right buttons */}
          <div className="flex flex-row justify-end items-center w-full pt-0 pr-8 gap-4 z-10">
            <button className="bg-[#dddddd] text-black font-semibold px-6 py-2 rounded-xl">Тест эхлэх</button>
            <div className="w-10 h-10 bg-[#dddddd] rounded-full"></div>
          </div>
          {/* Stepper */}
          <div className="flex flex-col items-start relative flex-1 w-full justify-center z-10">
            {/* Stepper line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-white/10 z-0" style={{marginLeft: '6px'}}></div>
            {/* Steps */}
            <div className="relative z-10 flex h-[800px] flex-col gap-24 pl-20 pt-16 pb-16">
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



      
      {/* Centered Button */}
      <div className="flex-1 flex items-center justify-center absolute left-0 right-0 top-0 bottom-0 pointer-events-none">
        <button className="bg-[#dddddd] text-black text-xl font-bold px-16 py-6 rounded-xl shadow-lg pointer-events-auto">Continue assessment</button>
      </div>
    </div>
  );
}

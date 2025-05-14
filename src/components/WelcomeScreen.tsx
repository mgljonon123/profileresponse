import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row items-center justify-center py-16 px-4">
      {/* Pricing Cards */}
      <div className="flex flex-col md:flex-row gap-10 w-full md:w-auto md:mr-20">
        {/* Free Plan */}
        <div className="bg-gray-50 rounded-3xl p-10 w-80 flex flex-col items-center shadow-xl border border-gray-100 transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
          <h3 className="text-gray-900 text-2xl font-bold mb-3">Үнэгүй</h3>
          <div className="text-gray-900 text-4xl font-extrabold mb-2">$0<span className="text-lg font-normal text-gray-400">/cap</span></div>
          <ul className="text-gray-700 text-base mb-10 mt-6 space-y-3 w-full">
            <li className="flex items-center gap-2"><span className="text-green-500 text-lg">✔</span> Хязгаартай тест</li>
            <li className="flex items-center gap-2"><span className="text-green-500 text-lg">✔</span> MBTI , BigFive , Holland Code тест</li>
            <li className="flex items-center gap-2"><span className="text-green-500 text-lg">✔</span> Карьер зөвлөмж</li>
          </ul>
          <button
            onClick={onStart}
            className="w-full bg-[#A29B87] text-white font-bold rounded-full py-4 text-lg transition-transform duration-200 hover:bg-[#bdb6a3] hover:scale-105"
          >
            GET STARTED
          </button>
        </div>
        {/* Standard Plan */}
        <div className="bg-gray-50 rounded-3xl p-10 w-80 flex flex-col items-center shadow-xl border border-gray-100 transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
          <h3 className="text-gray-900 text-2xl font-bold mb-3">Дундаж</h3>
          <div className="text-gray-900 text-4xl font-extrabold mb-2">$5<span className="text-lg font-normal text-gray-400">/cap</span></div>
          <ul className="text-gray-700 text-base mb-10 mt-6 space-y-3 w-full">
            <li className="flex items-center gap-2"><span className="text-green-500 text-lg">✔</span> Карьерын зорилго , Авьяас чадвар , Priorities</li>
            <li className="flex items-center gap-2"><span className="text-green-500 text-lg">✔</span> 10 тест</li>
            <li className="flex items-center gap-2"><span className="text-green-500 text-lg">✔</span> Бүтээмжийн зөвлөмж</li>
          </ul>
          <button
            onClick={onStart}
            className="w-full bg-[#B04B2F] text-white font-bold rounded-full py-4 text-lg transition-transform duration-200 hover:bg-[#c96a4e] hover:scale-105"
          >
            GET STARTED
          </button>
        </div>
        {/* Premium Plan */}
        <div className="bg-gray-50 rounded-3xl p-10 w-80 flex flex-col items-center shadow-xl border border-gray-100 transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
          <h3 className="text-gray-900 text-2xl font-bold mb-3">Янзын</h3>
          <div className="text-gray-900 text-4xl font-extrabold mb-2">$10<span className="text-lg font-normal text-gray-400">/mo</span></div>
          <ul className="text-gray-700 text-base mb-10 mt-6 space-y-3 w-full">
            <li className="flex items-center gap-2"><span className="text-green-500 text-lg">✔</span> Хязгааргүй тест</li>
            <li className="flex items-center gap-2"><span className="text-green-500 text-lg">✔</span> Roadmap зам</li>
            <li className="flex items-center gap-2"><span className="text-green-500 text-lg">✔</span> Voice messages anywhere</li>
          </ul>
          <button
            onClick={onStart}
            className="w-full bg-[#E8D7B9] text-[#232323] font-bold rounded-full py-4 text-lg transition-transform duration-200 hover:bg-[#f3e7c9] hover:scale-105"
          >
            GET STARTED
          </button>
        </div>
      </div>
      {/* Timeline */}
      <div className="hidden md:flex flex-col items-center h-full ml-16">
        <div className="bg-gray-50 rounded-3xl p-10 flex flex-col items-center w-80 min-h-[520px] relative shadow-xl border border-gray-100">
          <div className="absolute left-10 top-10 w-1 h-[calc(100%-80px)] bg-gray-200 rounded-full z-0"></div>
          <div className="flex flex-col gap-16 z-10 mt-2">
            <div className="flex items-center gap-6">
              <div className="w-10 h-10 bg-white rounded-full border-4 border-gray-200 flex items-center justify-center font-bold text-base"></div>
              <span className="text-gray-900 text-lg font-bold">Эхлэх</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-10 h-10 bg-white rounded-full border-4 border-gray-200 flex items-center justify-center font-bold text-base"></div>
              <span className="text-gray-900 text-lg font-bold">Таны зан чанарын хэв маягийг тодорхойлох</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-10 h-10 bg-white rounded-full border-4 border-gray-200 flex items-center justify-center font-bold text-base"></div>
              <span className="text-gray-900 text-lg font-bold">Танд тохирох ажил мэргэжлийн санал</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-10 h-10 bg-white rounded-full border-4 border-gray-200 flex items-center justify-center font-bold text-base"></div>
              <span className="text-gray-900 text-lg font-bold">Хобби</span>
            </div>
          </div>
          <button
            onClick={onStart}
            className="absolute top-6 right-6 bg-[#B04B2F] text-white px-6 py-2 rounded-full text-base font-bold shadow hover:bg-[#c96a4e] hover:scale-105 transition-transform"
          >
            Тест эхлэх
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen; 
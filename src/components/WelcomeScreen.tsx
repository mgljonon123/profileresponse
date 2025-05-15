import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row items-center justify-center p-0 md:p-8">
      {/* Pricing Cards */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full md:w-auto md:mr-16 mt-8 md:mt-0">
        {/* Free Plan */}
        <div className="bg-gray-50 rounded-3xl p-8 w-72 flex flex-col items-center shadow-md border border-gray-100">
          <h3 className="text-gray-900 text-xl font-semibold mb-2">Үнэгүй</h3>
          <div className="text-gray-900 text-3xl font-bold mb-1">$0<span className="text-base font-normal text-gray-400">/cap</span></div>
          <ul className="text-gray-700 text-sm mb-8 mt-4 space-y-2 w-full">
            <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Хязгаартай тест</li>
            <li className="flex items-center gap-2"><span className="text-green-500">✔</span> MBTI , BigFive , Holland Code тест</li>
            <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Карьер зөвлөмж</li>
          </ul>
          <button
            onClick={onStart}
            className="w-full bg-[#A29B87] text-white font-semibold rounded-full py-3 mt-auto transition-colors duration-200 hover:bg-[#bdb6a3]"
          >
            GET STARTED
          </button>
        </div>
        {/* Standard Plan */}
        <div className="bg-gray-50 rounded-3xl p-8 w-72 flex flex-col items-center shadow-md border border-gray-100">
          <h3 className="text-gray-900 text-xl font-semibold mb-2">Дундаж</h3>
          <div className="text-gray-900 text-3xl font-bold mb-1">$5<span className="text-base font-normal text-gray-400">/cap</span></div>
          <ul className="text-gray-700 text-sm mb-8 mt-4 space-y-2 w-full">
            <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Карьерын зорилго , Авьяас чадвар , Priorities</li>
            <li className="flex items-center gap-2"><span className="text-green-500">✔</span> 10 тест</li>
            <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Бүтээмжийн зөвлөмж</li>
          </ul>
          <button
            onClick={onStart}
            className="w-full bg-[#B04B2F] text-white font-semibold rounded-full py-3 mt-auto transition-colors duration-200 hover:bg-[#c96a4e]"
          >
            GET STARTED
          </button>
        </div>
        {/* Premium Plan */}
        <div className="bg-gray-50 rounded-3xl p-8 w-72 flex flex-col items-center shadow-md border border-gray-100">
          <h3 className="text-gray-900 text-xl font-semibold mb-2">Янзын</h3>
          <div className="text-gray-900 text-3xl font-bold mb-1">$10<span className="text-base font-normal text-gray-400">/mo</span></div>
          <ul className="text-gray-700 text-sm mb-8 mt-4 space-y-2 w-full">
            <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Хязгааргүй тест</li>
            <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Roadmap зам</li>
            <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Voice messages anywhere</li>
          </ul>
          <button
            onClick={onStart}
            className="w-full bg-[#E8D7B9] text-[#232323] font-semibold rounded-full py-3 mt-auto transition-colors duration-200 hover:bg-[#f3e7c9]"
          >
            GET STARTED
          </button>
        </div>
      </div>
      {/* Timeline */}
      <div className="hidden md:flex flex-col items-center h-full ml-12">
        <div className="bg-gray-50 rounded-3xl p-8 flex flex-col items-center w-72 min-h-[480px] relative shadow-md border border-gray-100">
          <div className="absolute left-8 top-8 w-1 h-[calc(100%-64px)] bg-gray-200 rounded-full z-0"></div>
          <div className="flex flex-col gap-12 z-10 mt-2">
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 bg-white rounded-full border-4 border-gray-200 flex items-center justify-center font-bold text-xs"> </div>
              <span className="text-gray-900 font-semibold">Эхлэх</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 bg-white rounded-full border-4 border-gray-200 flex items-center justify-center font-bold text-xs"> </div>
              <span className="text-gray-900 font-semibold">Таны зан чанарын хэв маягийг тодорхойлох</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 bg-white rounded-full border-4 border-gray-200 flex items-center justify-center font-bold text-xs"> </div>
              <span className="text-gray-900 font-semibold">Танд тохирох ажил мэргэжлийн санал</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 bg-white rounded-full border-4 border-gray-200 flex items-center justify-center font-bold text-xs"> </div>
              <span className="text-gray-900 font-semibold">Хобби</span>
            </div>
          </div>
          <button
            onClick={onStart}
            className="absolute top-4 right-4 bg-[#B04B2F] text-white px-4 py-1 rounded-full text-xs font-semibold shadow hover:bg-[#c96a4e] transition-colors"
          >
            Тест эхлэх
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen; 
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
        <div className="bg-gray-50 rounded-3xl p-12 w-96 min-h-[450px] flex flex-col items-center shadow-md border border-gray-100">
          <h3 className="text-gray-900 text-2xl font-semibold mb-4">Үнэгүй</h3>
          <div className="text-gray-900 text-4xl font-bold mb-2">$0<span className="text-lg font-normal text-gray-400">/cap</span></div>
          <ul className="text-gray-700 text-base mb-10 mt-6 space-y-3 w-full">
            <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Хязгаартай тест</li>
            <li className="flex items-center gap-2"><span className="text-green-500">✔</span> MBTI , BigFive , Holland Code тест</li>
            <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Карьер зөвлөмж</li>
          </ul>
          <button
            onClick={onStart}
            className="w-full bg-[#A29B87] text-white font-semibold rounded-full py-5 mt-auto text-lg transition-colors duration-200 hover:bg-[#bdb6a3]"
          >
            GET STARTED
          </button>
        </div>
        {/* Standard Plan */}
        <div className="bg-gray-50 rounded-3xl p-12 w-96 min-h-[450px] flex flex-col items-center shadow-md border border-gray-100">
          <h3 className="text-gray-900 text-2xl font-semibold mb-4">Дундаж</h3>
          <div className="text-gray-900 text-4xl font-bold mb-2">$5<span className="text-lg font-normal text-gray-400">/cap</span></div>
          <ul className="text-gray-700 text-base mb-10 mt-6 space-y-3 w-full">
            <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Карьерын зорилго , Авьяас чадвар , Priorities</li>
            <li className="flex items-center gap-2"><span className="text-green-500">✔</span> 10 тест</li>
            <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Бүтээмжийн зөвлөмж</li>
          </ul>
          <button
            onClick={onStart}
            className="w-full bg-[#B04B2F] text-white font-semibold rounded-full py-5 mt-auto text-lg transition-colors duration-200 hover:bg-[#c96a4e]"
          >
            GET STARTED
          </button>
        </div>
        {/* Premium Plan */}
        <div className="bg-gray-50 rounded-3xl p-12 w-96 min-h-[450px] flex flex-col items-center shadow-md border border-gray-100">
          <h3 className="text-gray-900 text-2xl font-semibold mb-4">Янзын</h3>
          <div className="text-gray-900 text-4xl font-bold mb-2">$10<span className="text-lg font-normal text-gray-400">/mo</span></div>
          <ul className="text-gray-700 text-base mb-10 mt-6 space-y-3 w-full">
            <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Хязгааргүй тест</li>
            <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Roadmap зам</li>
            <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Voice messages anywhere</li>
          </ul>
          <button
            onClick={onStart}
            className="w-full bg-[#E8D7B9] text-[#232323] font-semibold rounded-full py-5 mt-auto text-lg transition-colors duration-200 hover:bg-[#f3e7c9]"
          >
            GET STARTED
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen; 
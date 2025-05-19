import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <section id="section4" className="h-screen bg-white flex flex-col items-center justify-center px-6 md:px-32 relative">
    <div className="absolute top-10 left-10 w-10 h-10 border-2 border-black rounded-full flex items-center justify-center text-2xl font-semibold text-black cursor-pointer hover:bg-black hover:text-white transition" onClick={scrollToTop}>
      Λ
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
      <div className="bg-[#1A1A1A] text-white p-10 rounded-3xl shadow-lg flex flex-col items-center w-full max-w-sm cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-[#2A2A2A]">
        <h3 className="text-2xl font-bold tracking-wide">Free</h3>
        <p className="text-4xl font-semibold mt-4">$0/mo</p>
        <ul className="text-base mt-8 space-y-4 text-gray-300">
          <li className="flex items-center"><span className="w-6 h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center">✓</span>Хязгаарлагдмал тест</li>
          <li className="flex items-center"><span className="w-6 h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center">✓</span>MBTI, BigFive, Holland Code тест</li>
          <li className="flex items-center"><span className="w-6 h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center">✓</span>Карьерын зөвлөмж</li>
        </ul>
        <button 
          onClick={onStart}
          className="mt-[160px] w-full py-4 px-8 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          GET STARTED
        </button>
      </div>
      <div className="bg-[#1A1A1A] text-white p-10 rounded-3xl shadow-lg flex flex-col items-center w-full max-w-sm cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-[#2A2A2A]">
        <h3 className="text-2xl font-bold tracking-wide">Pro</h3>
        <p className="text-4xl font-semibold mt-4">$5/mo</p>
        <ul className="text-base mt-8 space-y-4 text-gray-300">
          <li className="flex items-center"><span className="w-6 h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center">✓</span>Карьерын зөвлөгөө</li>
          <li className="flex items-center"><span className="w-6 h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center">✓</span>Авьяас даалбар, Priorities</li>
          <li className="flex items-center"><span className="w-6 h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center">✓</span>10 тест</li>
          <li className="flex items-center"><span className="w-6 h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center">✓</span>Бүтээмжин зөвлөмж</li>
        </ul>
        <button 
          onClick={onStart}
          className="mt-[120px] w-full py-4 px-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          GET STARTED
        </button>
      </div>
      <div className="bg-[#1A1A1A] text-white p-10 rounded-3xl shadow-lg flex flex-col items-center w-full max-w-sm cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-[#2A2A2A]">
        <h3 className="text-2xl font-bold tracking-wide">Plas</h3>
        <p className="text-4xl font-semibold mt-4">$10/mo</p>
        <ul className="text-base mt-8 space-y-4 text-gray-300">
          <li className="flex items-center"><span className="w-6 h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center">✓</span>Хязгааргүй тест</li>
          <li className="flex items-center"><span className="w-6 h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center">✓</span>Roadmap зам</li>
          <li className="flex items-center"><span className="w-6 h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center">✓</span>Voice messages anywhere</li>
        </ul>
        <button 
          onClick={onStart}
          className="mt-[160px] w-full py-4 px-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          GET STARTED
        </button>
      </div>
    </div>
    <div className="absolute bottom-10 right-10 flex flex-col items-center text-gray-600">
      <div className="w-px h-10 bg-gray-600"></div>
      <span className="mt-2 text-xs tracking-widest transform rotate-90">SCROLL</span>
    </div>
  </section>
  );
};

export default WelcomeScreen; 
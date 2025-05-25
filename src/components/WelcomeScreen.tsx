import React from "react";

interface WelcomeScreenProps {
  onStart: () => void;
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <section
      id="section4"
      className="h-screen bg-white flex flex-col items-center justify-center px-6 md:px-32 relative"
    >
      <div
        className="absolute top-10 left-10 w-10 h-10 border-2 border-black rounded-full flex items-center justify-center text-2xl font-semibold text-black cursor-pointer hover:bg-black hover:text-white transition"
        onClick={scrollToTop}
      >
        Λ
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 w-full max-w-xs sm:max-w-2xl md:max-w-6xl">
        {/* Free */}
        <div className="bg-[#1A1A1A] text-white flex flex-col items-center w-full max-w-xs sm:max-w-sm md:max-w-xs p-3 sm:p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-[#2A2A2A]">
          <h3 className="text-base sm:text-xl md:text-2xl font-bold tracking-wide">
            Free
          </h3>
          <p className="text-xl sm:text-3xl md:text-4xl font-semibold mt-2 sm:mt-4">
            $0/mo
          </p>
          <ul className="text-xs sm:text-base mt-3 sm:mt-8 space-y-2 sm:space-y-4 text-gray-300">
            <li className="flex items-center">
              <span className="w-4 h-4 sm:w-6 sm:h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center text-xs sm:text-base">
                ✓
              </span>
              Хязгаарлагдмал тест
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 sm:w-6 sm:h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center text-xs sm:text-base">
                ✓
              </span>
              MBTI, BigFive, Holland Code тест
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 sm:w-6 sm:h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center text-xs sm:text-base">
                ✓
              </span>
              Карьерын зөвлөмж
            </li>
          </ul>
          <div className="flex-1" />
          <button
            onClick={onStart}
            className="w-full py-2 sm:py-4 px-4 sm:px-8 mt-6 sm:mt-12 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg text-xs sm:text-base"
          >
            GET STARTED
          </button>
        </div>
        {/* Pro */}
        <div className="bg-[#1A1A1A] text-white flex flex-col items-center w-full max-w-xs sm:max-w-sm md:max-w-xs p-3 sm:p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-[#2A2A2A]">
          <h3 className="text-base sm:text-xl md:text-2xl font-bold tracking-wide">
            Pro
          </h3>
          <p className="text-xl sm:text-3xl md:text-4xl font-semibold mt-2 sm:mt-4">
            $5/mo
          </p>
          <ul className="text-xs sm:text-base mt-3 sm:mt-8 space-y-2 sm:space-y-4 text-gray-300">
            <li className="flex items-center">
              <span className="w-4 h-4 sm:w-6 sm:h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center text-xs sm:text-base">
                ✓
              </span>
              Карьерын зөвлөгөө
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 sm:w-6 sm:h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center text-xs sm:text-base">
                ✓
              </span>
              Авьяас даалбар, Priorities
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 sm:w-6 sm:h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center text-xs sm:text-base">
                ✓
              </span>
              10 тест
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 sm:w-6 sm:h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center text-xs sm:text-base">
                ✓
              </span>
              Бүтээмжин зөвлөмж
            </li>
          </ul>
          <div className="flex-1" />
          <button
            onClick={onStart}
            className="w-full py-2 sm:py-4 px-4 sm:px-8 mt-6 sm:mt-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-xs sm:text-base"
          >
            GET STARTED
          </button>
        </div>
        {/* Plas */}
        <div className="bg-[#1A1A1A] text-white flex flex-col items-center w-full max-w-xs sm:max-w-sm md:max-w-xs p-3 sm:p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-[#2A2A2A]">
          <h3 className="text-base sm:text-xl md:text-2xl font-bold tracking-wide">
            Plas
          </h3>
          <p className="text-xl sm:text-3xl md:text-4xl font-semibold mt-2 sm:mt-4">
            $10/mo
          </p>
          <ul className="text-xs sm:text-base mt-3 sm:mt-8 space-y-2 sm:space-y-4 text-gray-300">
            <li className="flex items-center">
              <span className="w-4 h-4 sm:w-6 sm:h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center text-xs sm:text-base">
                ✓
              </span>
              Хязгааргүй тест
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 sm:w-6 sm:h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center text-xs sm:text-base">
                ✓
              </span>
              Roadmap зам
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 sm:w-6 sm:h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center text-xs sm:text-base">
                ✓
              </span>
              Voice messages anywhere
            </li>
          </ul>
          <div className="flex-1" />
          <button
            onClick={onStart}
            className="w-full py-2 sm:py-4 px-4 sm:px-8 mt-6 sm:mt-12 bg-gradient-to-r from-[#7fdaf4] to-orange-500 text-white font-bold rounded-xl hover:from-[#7fdaf4] hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg text-xs sm:text-base"
          >
            GET STARTED
          </button>
        </div>
      </div>
    </section>
  );
};

export default WelcomeScreen;

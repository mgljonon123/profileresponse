"use client";

import React, { useEffect, useState } from "react";
import Menu from "./components/Menu";
import { FaBars } from "react-icons/fa";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./styles/buttons.css";
import RiveRobot from "./components/RiverRobot";

export default function Home() {
  const [showScroll, setShowScroll] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const [textIndex, setTextIndex] = useState(0);
  const texts = [
    "ЯМАР МЭРГЭЖИЛ",
    "Та ямар мэргэжил, карьерын зам сонгох ёстойгоо шийдэхэд бэрхшээлтэй байна уу?",
  ];

  const navigateToProfile = () => {
    router.push("/profile");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const onScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Header - Desktop хуучин дизайн хадгалсан, mobile сайжруулсан */}
      <header
        className="py-3 sm:py-4 lg:py-6 bg-[#f1f1f1] w-full z-10 transition-all duration-300"
        id="header"
      >
        <nav className="flex items-center justify-between container mx-auto px-4 sm:px-6 md:px-8 lg:px-20 py-2 sm:py-3 lg:py-4">
          <a
            href="#"
            className="text-black text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold uppercase"
          >
            Start Up
          </a>

          {/* Mobile menu button - сайжруулсан */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-gray-200 transition-colors"
            >
              <FaBars size={20} />
            </button>
          </div>

          {/* Desktop navigation - хуучин дизайн */}
          <div className="hidden lg:flex items-center space-x-2 sm:space-x-4 lg:space-x-8">
            <button
              onClick={() => router.push("/auth/login")}
              className="font-bold text-black py-1.5 px-3 sm:py-2 sm:px-4 lg:py-2 lg:px-5 rounded-full relative after:content-[''] after:absolute after:bottom-0 after:left-[12px] sm:after:left-[15px] lg:after:left-[18px] after:right-[10px] sm:after:right-[12px] lg:after:right-[15px] after:h-[1px] after:bg-black text-xs sm:text-sm"
            >
              LET'S TALK
            </button>
            <a
              onClick={navigateToProfile}
              href="#"
              className="font-bold bg-black text-white py-1.5 px-3 sm:py-2 sm:px-4 rounded-full text-xs sm:text-sm"
            >
              Profile
            </a>
          </div>
        </nav>

        {/* Mobile menu - сайжруулсан */}
        {isMenuOpen && (
          <div className="lg:hidden px-4 py-3 space-y-2 bg-white shadow-md border-t">
            <button
              onClick={() => {
                router.push("/auth/login");
                setIsMenuOpen(false);
              }}
              className="block w-full text-left text-black font-bold py-2 px-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              LET'S TALK
            </button>
            <button
              onClick={() => {
                navigateToProfile();
                setIsMenuOpen(false);
              }}
              className="block w-full text-left bg-black text-white font-bold px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              Profile
            </button>
          </div>
        )}
      </header>

      <main className="relative overflow-x-hidden w-full">
        {/* Section 1 - Hero Section - Desktop дизайн хадгалсан */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-24 xl:py-32 bg-[#f1f1f1] text-black relative min-h-[90vh] sm:min-h-screen flex items-center">
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
            <div className="text-center lg:text-left w-full order-2 lg:order-1">
              <div className="flex flex-col items-center lg:items-start w-full">
                <h1 className="text-center lg:text-left font-bold leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-2 sm:mb-3 lg:mb-4">
                  Ирээдүйд хүрэх таны
                </h1>
                <h1 className="text-center lg:text-left font-bold leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6 lg:mb-8">
                  зам эндээс эхлэнэ
                </h1>
                <p className="text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed text-center lg:text-left max-w-2xl px-2 lg:px-0">
                  Карьерийн зөвлөгөө өгч, өөрийгөө илүү сайн таньж, ирээдүйгээ
                  төлөвлө гэх нь таны амжилттай ирээдүйг бүтээх, өөрийн
                  мэргэжлийн замыг тодорхойлж, хүсэл мөрөөдлөө биелүүлэхэд
                  туслан.
                </p>
              </div>
              <button
                className="learn-more mt-6 sm:mt-8 lg:mt-10"
                onClick={() => router.push("/auth/login")}
              >
                <span className="circle" aria-hidden="true">
                  <span className="icon arrow"></span>
                </span>
                <span className="button-text text-sm sm:text-base">
                  Хариултаа олох
                </span>
              </button>
            </div>

            <div className="flex justify-center items-center w-full order-1 lg:order-2">
              <div className="relative w-full max-w-[250px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[500px] aspect-square">
                <RiveRobot src="/robot_bouncing.riv" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 - Desktop дизайн хадгалсан */}
        <section
          id="section2"
          className="relative min-h-screen bg-white flex items-center justify-center px-4 md:px-32"
        >
          <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center py-20">
            {/* Left: Poster Image */}
            <div className="flex justify-center items-center">
              <img
                src="/pexels-thirdman-5582867.jpg"
                alt="Best in Business Poster"
                className="w-[280px] sm:w-[350px] md:w-[420px] rounded-2xl shadow-xl object-cover"
              />
            </div>
            {/* Right: Title, Description, Button */}
            <div className="flex flex-col justify-center items-start text-center md:text-left md:pl-16">
              <h1 className="text-black font-bold text-3xl sm:text-4xl md:text-6xl leading-tight mb-6">
                Ирээдүйгээ зөв
                <br />
                төлөвлө
                <br />
                Мэргэжлээ ухаалгаар сонгоорой
              </h1>
              <p className="text-gray-700 text-base md:text-lg mb-8 max-w-md px-4 md:px-0">
                "Чиний авьяас, сонирхол, чадвар, мөн ирээдүйн зорилгод нийцсэн
                мэргэжлийг тодорхойлоход бид тусална. Бидний систем чиний хувийн
                онцлог, давуу тал, хүсэл тэмүүлэлд тулгуурлан хамгийн
                тохиромжтой чиглэлийг санал болгоно."
              </p>
            </div>
          </div>
          {/* Scroll to top button */}
          <div
            className="absolute top-10 left-10 w-10 h-10 border-2 border-black rounded-full flex items-center justify-center text-2xl font-semibold text-black cursor-pointer hover:bg-black hover:text-white transition"
            onClick={scrollToTop}
          >
            Λ
          </div>
        </section>

        {/* Marquee Animation - desktop дизайн хадгалсан */}
        <div className="relative w-full bg-[#f0f9ff] overflow-hidden py-4 sm:py-7 border-y border-blue-200">
          <div className="absolute top-1/2 left-0 w-full transform -translate-y-1/2">
            <div className="animate-marquee whitespace-nowrap flex">
              {[...Array(2)].map((_, i) => (
                <div className="flex" key={i}>
                  <span className="font-semibold text-blue-800 px-3 sm:px-4 text-sm sm:text-base">
                    Бүх тест үнэгүй
                  </span>
                  <span className="text-lg sm:text-xl px-1">🚀</span>
                  <span className="text-gray-700 px-3 sm:px-4 text-sm sm:text-base">
                    Өөрийн карьерын замыг олцгооё
                  </span>
                  <span className="font-semibold text-blue-800 px-3 sm:px-4 text-sm sm:text-base">
                    Сонголтоо баталгаажуул
                  </span>
                  <span className="text-lg sm:text-xl px-1">🎯</span>
                  <span className="text-gray-700 px-3 sm:px-4 text-sm sm:text-base">
                    AI туслахтай мэргэжлээ ол!
                  </span>
                  <span className="font-semibold text-blue-800 px-3 sm:px-4 text-sm sm:text-base">
                    Өөрийгөө нээх аяллаа эхлүүл
                  </span>
                  <span className="text-lg sm:text-xl px-1">✨</span>
                  <span className="text-gray-700 px-3 sm:px-4 text-sm sm:text-base">
                    Манай платформд үнэгүй нэгдээрэй
                  </span>
                </div>
              ))}
            </div>
          </div>

          <style jsx>{`
            .animate-marquee {
              animation: marquee 25s linear infinite;
            }
            @keyframes marquee {
              0% {
                transform: translateX(0%);
              }
              100% {
                transform: translateX(-50%);
              }
            }
          `}</style>
        </div>

        {/* Section 3 - FAQ - mobile responsive сайжруулсан */}
        <section
          id="section3"
          className="min-h-screen bg-white flex items-center justify-center px-2 sm:px-4 md:px-6 lg:px-8 text-center relative py-8 md:py-0"
        >
          <div
            className="absolute top-4 sm:top-6 md:top-10 left-4 sm:left-6 md:left-10 w-8 h-8 sm:w-10 sm:h-10 border-2 border-black rounded-full flex items-center justify-center text-xl sm:text-2xl font-semibold text-black cursor-pointer hover:bg-black hover:text-white transition"
            onClick={scrollToTop}
          >
            Λ
          </div>
          <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-20 border border-gray-200">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-black mb-6 sm:mb-8 md:mb-12 lg:mb-14 text-center">
              Түгээмэл асуулт, хариулт
            </h2>
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              {/* FAQ Items - mobile responsive сайжруулсан */}
              <details className="group bg-transparent rounded-xl border border-gray-200 transition">
                <summary className="flex items-center min-h-[40px] sm:min-h-[48px] md:min-h-[56px] gap-2 sm:gap-3 md:gap-4 cursor-pointer py-2 sm:py-3 md:py-0 px-3 sm:px-4 md:px-6 text-sm sm:text-base md:text-lg font-medium text-black group-open:text-[#222] justify-between">
                  <span className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 text-left">
                    <span className="inline-block w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 text-base sm:text-lg md:text-2xl flex-shrink-0">
                      📈
                    </span>
                    <span className="break-words">
                      MBTI (Myers-Briggs Type Indicator)
                    </span>
                  </span>
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-400 transition-transform duration-300 group-open:rotate-180 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="px-3 sm:px-4 md:px-14 pb-2 sm:pb-3 md:pb-4 text-left text-gray-600 text-xs sm:text-sm md:text-base">
                  Хувь хүний сэтгэлзүйн төрөл, мэдээлэл боловсруулах, шийдвэр
                  гаргах хэв маягийг тодорхойлдог. 16 төрлийн зан чанарын
                  ангилалтай. <br /> Жишээ: ENFP – урам зоригтай, бүтээлч
                  сэтгэлгээтэй хүн.
                </div>
              </details>

              <details className="group bg-transparent rounded-xl border border-gray-200 transition">
                <summary className="flex items-center min-h-[40px] sm:min-h-[48px] md:min-h-[56px] gap-2 sm:gap-3 md:gap-4 cursor-pointer py-2 sm:py-3 md:py-0 px-3 sm:px-4 md:px-6 text-sm sm:text-base md:text-lg font-medium text-black group-open:text-[#222] justify-between">
                  <span className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 text-left">
                    <span className="inline-block w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 text-base sm:text-lg md:text-2xl flex-shrink-0">
                      🖥️
                    </span>
                    <span className="break-words">Holland Code (RIASEC)</span>
                  </span>
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-400 transition-transform duration-300 group-open:rotate-180 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="px-3 sm:px-4 md:px-14 pb-2 sm:pb-3 md:pb-4 text-left text-gray-600 text-xs sm:text-sm md:text-base">
                  Мэргэжлийн сонирхол, ажлын орчинтой хэр нийцэж байгааг
                  хэмждэг. 6 үндсэн төрөлтэй: Realistic, Investigative,
                  Artistic, Social, Enterprising, Conventional. <br /> Жишээ:
                  Artistic – бүтээлч, уран сайхны мэргэжилд тохиромжтой.
                </div>
              </details>

              <details className="group bg-transparent rounded-xl border border-gray-200 transition">
                <summary className="flex items-center min-h-[40px] sm:min-h-[48px] md:min-h-[56px] gap-2 sm:gap-3 md:gap-4 cursor-pointer py-2 sm:py-3 md:py-0 px-3 sm:px-4 md:px-6 text-sm sm:text-base md:text-lg font-medium text-black group-open:text-[#222] justify-between">
                  <span className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 text-left">
                    <span className="inline-block w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 text-base sm:text-lg md:text-2xl flex-shrink-0">
                      📜
                    </span>
                    <span className="break-words">
                      Big Five Personality Test
                    </span>
                  </span>
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-400 transition-transform duration-300 group-open:rotate-180 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="px-3 sm:px-4 md:px-14 pb-2 sm:pb-3 md:pb-4 text-left text-gray-600 text-xs sm:text-sm md:text-base">
                  Хүний зан төлөвийг 5 гол хэмжүүрээр үнэлдэг: нээлттэй байдал,
                  хариуцлагатай байдал, гадагш чиглэсэн байдал, эв найртай
                  байдал, мэдрэмжийн тогтвортой байдал. <br />
                  Илүү гүн гүнзгий зан чанарын дүн шинжилгээ.
                </div>
              </details>

              <details className="group bg-transparent rounded-xl border border-gray-200 transition">
                <summary className="flex items-center min-h-[40px] sm:min-h-[48px] md:min-h-[56px] gap-2 sm:gap-3 md:gap-4 cursor-pointer py-2 sm:py-3 md:py-0 px-3 sm:px-4 md:px-6 text-sm sm:text-base md:text-lg font-medium text-black group-open:text-[#222] justify-between">
                  <span className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 text-left">
                    <span className="inline-block w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 text-base sm:text-lg md:text-2xl flex-shrink-0">
                      👨‍🏫
                    </span>
                    <span className="break-words">
                      EQ Test (Emotional Intelligence)
                    </span>
                  </span>
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-400 transition-transform duration-300 group-open:rotate-180 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="px-3 sm:px-4 md:px-14 pb-2 sm:pb-3 md:pb-4 text-left text-gray-600 text-xs sm:text-sm md:text-base">
                  Өөрийн болон бусдын сэтгэл хөдлөлийг ойлгож, удирдах чадварыг
                  үнэлдэг. <br />
                  Харилцаа, багийн ажил, стрессийн менежментэд чухал үүрэгтэй.
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* Section 4 - Pricing - mobile responsive сайжруулсан */}
        <section
          id="section4"
          className="min-h-screen bg-white flex flex-col items-center justify-center px-4 sm:px-6 md:px-32 relative py-8 md:py-0"
        >
          <div
            className="absolute top-10 left-10 w-10 h-10 border-2 border-black rounded-full flex items-center justify-center text-2xl font-semibold text-black cursor-pointer hover:bg-black hover:text-white transition"
            onClick={scrollToTop}
          >
            Λ
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-8 sm:mb-12 md:mb-18 text-center">
            Багцын Үнийн Санал
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl w-full">
            <div className="bg-[#1A1A1A] text-white p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-lg flex flex-col items-center w-full cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-[#2A2A2A]">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide">
                Free
              </h3>
              <p className="text-2xl sm:text-3xl md:text-4xl font-semibold mt-2 sm:mt-3 md:mt-4">
                $0/mo
              </p>
              <ul className="text-xs sm:text-sm md:text-base mt-4 sm:mt-6 md:mt-8 space-y-2 sm:space-y-3 md:space-y-4 text-gray-300">
                <li className="flex items-center">
                  <span className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center text-xs sm:text-sm">
                    ✓
                  </span>
                  Хязгаарлагдмал тест
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center text-xs sm:text-sm">
                    ✓
                  </span>
                  MBTI, BigFive, Holland Code тест
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center text-xs sm:text-sm">
                    ✓
                  </span>
                  Карьерын зөвлөмж
                </li>
              </ul>
              <button className="button-free mt-auto pt-6 sm:pt-8 md:pt-12 lg:pt-[160px]">
                GET STARTED
              </button>
            </div>

            <div className="bg-[#1A1A1A] text-white p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-lg flex flex-col items-center w-full cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-[#2A2A2A] md:col-span-2 lg:col-span-1">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide">
                Pro
              </h3>
              <p className="text-2xl sm:text-3xl md:text-4xl font-semibold mt-2 sm:mt-3 md:mt-4">
                $5/mo
              </p>
              <ul className="text-xs sm:text-sm md:text-base mt-4 sm:mt-6 md:mt-8 space-y-2 sm:space-y-3 md:space-y-4 text-gray-300">
                <li className="flex items-center">
                  <span className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center text-xs sm:text-sm">
                    ✓
                  </span>
                  Карьерын зөвлөгөө
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center text-xs sm:text-sm">
                    ✓
                  </span>
                  Авьяас даалбар, Priorities
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center text-xs sm:text-sm">
                    ✓
                  </span>
                  10 тест
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center text-xs sm:text-sm">
                    ✓
                  </span>
                  Бүтээмжин зөвлөмж
                </li>
              </ul>
              <button className="button-pro mt-auto pt-6 sm:pt-8 md:pt-10 lg:pt-[120px]">
                GET STARTED
              </button>
            </div>

            <div className="bg-[#1A1A1A] text-white p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-lg flex flex-col items-center w-full cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-[#2A2A2A] md:col-start-1 md:col-end-3 lg:col-start-auto lg:col-end-auto">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide">
                Plas
              </h3>
              <p className="text-2xl sm:text-3xl md:text-4xl font-semibold mt-2 sm:mt-3 md:mt-4">
                $10/mo
              </p>
              <ul className="text-xs sm:text-sm md:text-base mt-4 sm:mt-6 md:mt-8 space-y-2 sm:space-y-3 md:space-y-4 text-gray-300">
                <li className="flex items-center">
                  <span className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center text-xs sm:text-sm">
                    ✓
                  </span>
                  Хязгааргүй тест
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center text-xs sm:text-sm">
                    ✓
                  </span>
                  Roadmap зам
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center text-xs sm:text-sm">
                    ✓
                  </span>
                  Voice messages anywhere
                </li>
              </ul>
              <button className="button-plas mt-auto pt-6 sm:pt-8 md:pt-12 lg:pt-[160px]">
                GET STARTED
              </button>
            </div>
          </div>

          <div className="absolute bottom-10 right-10 flex flex-col items-center text-gray-600">
            <div className="w-px h-10 bg-gray-600"></div>
            <span className="mt-2 text-xs tracking-widest transform rotate-90">
              SCROLL
            </span>
          </div>
        </section>

        {/* Mobile-only floating scroll button */}
        {showScroll && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 w-12 h-12 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 z-50 flex items-center justify-center md:hidden"
            aria-label="Scroll to top"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        )}
      </main>

      <Menu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <Footer />
    </>
  );
}

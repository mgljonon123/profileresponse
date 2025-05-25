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
            {/* Profile picture button for mobile */}
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-gray-200 shadow-sm flex items-center justify-center cursor-pointer hover:shadow-lg transition flex-shrink-0"
              onClick={() => router.push("/profile/settings")}
            >
              {/* Placeholder for profile image or icon */}
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-700 text-sm sm:text-base">Profile</div>
              {/* Replace with actual Image component if profile picture is available */}
              {/* <Image
                src={profilePicture} // profilePicture needs to be defined/fetched
                alt="profile"
                width={48}
                height={48}
                className="object-cover w-full h-full"
              /> */}
            </div>
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

      <main className="relative overflow-x-hidden w-full mb-[10%] md:mb-0">
        {/* Section 1 - Hero Section - Desktop дизайн хадгалсан */}
        <section className="py-2 sm:py-4 md:py-8 lg:py-12 xl:py-16 bg-[#f1f1f1] text-black relative min-h-[90vh] sm:min-h-screen flex items-center">
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
            {/* Text Container */}
            <div className="text-center lg:text-left w-full order-1 lg:order-1">
              <div className="flex flex-col items-center lg:items-start w-full">
                <h1 className="text-center lg:text-left font-bold leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-2 sm:mb-3 lg:mb-4">
                  Ирээдүйд хүрэх таны
                </h1>
                <h1 className="text-center lg:text-left font-bold leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6 lg:mb-8">
                  зам эндээс эхлэнэ
                </h1>
                <p className="text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed text-center lg:text-left max-w-2xl px-2 lg:px-0 hidden lg:block">
                  Карьерийн зөвлөгөө өгч, өөрийгөө илүү сайн таньж, ирээдүйгээ төлөвлө гэх нь таны амжилттай ирээдүйг бүтээх, өөрийн мэргэжлийн замыг тодорхойлж, хүсэл мөрөөдлөө биелүүлэхэд туслан.
                </p>
              </div>
            </div>
  
            {/* Robot Container */}
            <div className="flex justify-center items-center w-full order-2 lg:order-2">
              <div className="relative w-full aspect-square ">
                <RiveRobot src='/robot_bouncing.riv' />
              </div>
            </div>

            {/* Button - Visible only on mobile, aligned center */}
            <button className="learn-more mt-6 sm:mt-8 lg:mt-10 block lg:hidden mx-auto order-3" onClick={() => router.push("/auth/login")}> 
              <span className="circle" aria-hidden="true">
                <span className="icon arrow"></span>
              </span>
              <span className="button-text text-sm sm:text-base">Хариултаа олох</span>
            </button>

          </div>
        </section>
      
        {/* Section 2 */}
        <section id="section2" className="relative min-h-screen bg-white flex items-center justify-center px-4 md:px-32">
          <div className="container grid grid-cols-1 md:grid-cols-2 gap-16 items-center py-0 md:py-20">
            {/* Left: Poster Image */}
            <div className="flex justify-center items-center">
              <img
                src="/pexels-thirdman-5582867.jpg"
                alt="Best in Business Poster"
                className="w-[350px] md:w-[420px] rounded-2xl shadow-xl object-cover"
              />
            </div>
            {/* Right: Title, Description, Button */}
            <div className="flex flex-col justify-center items-start md:pl-16">
              <h1 className="text-black font-bold text-4xl md:text-6xl leading-tight mb-6">
                Ирээдүйгээ зөв төлөвлө Мэргэжлээ ухаалгаар сонгоорой
              </h1>
              <p className="text-gray-700 text-base md:text-lg mb-8 md:px-0 text-left">
                "Чиний авьяас, сонирхол, чадвар, мөн ирээдүйн зорилгод нийцсэн мэргэжлийг тодорхойлоход бид тусална. Бидний систем чиний хувийн онцлог, давуу тал, хүсэл тэмүүлэлд тулгуурлан хамгийн тохиромжтой чиглэлийг санал болгоно."
              </p>
            </div>
          </div>
          {/* Scroll to top button */}
         
        </section>

        {/* Marquee Animation Between Section2 and Section3 */}
        <div className="relative w-full bg-[#f0f9ff] overflow-hidden py-7 border-y border-blue-200">
          <div className="absolute top-1/2 left-0 w-full transform -translate-y-1/2">
            <div className="animate-marquee whitespace-nowrap flex">
              {[...Array(2)].map((_, i) => (
                <div className="flex" key={i}>
                  <span className="font-semibold text-blue-800 px-3 sm:px-4 lg:px-4 text-sm sm:text-base lg:text-base">Бүх тест үнэгүй</span>
                  <span className="text-lg sm:text-xl px-1">🚀</span>
                  <span className="text-gray-700 px-3 sm:px-4 lg:px-4 text-sm sm:text-base lg:text-base">Өөрийн карьерын замыг олцгооё</span>
                  <span className="font-semibold text-blue-800 px-3 sm:px-4 lg:px-4 text-sm sm:text-base lg:text-base">Сонголтоо баталгаажуул</span>
                  <span className="text-lg sm:text-xl px-1">🎯</span>
                  <span className="text-gray-700 px-3 sm:px-4 lg:px-4 text-sm sm:text-base lg:text-base">AI туслахтай мэргэжлээ ол!</span>
                  <span className="font-semibold text-blue-800 px-3 sm:px-4 lg:px-4 text-sm sm:text-base lg:text-base">Өөрийгөө нээх аяллаа эхлүүл</span>
                  <span className="text-lg sm:text-xl px-1">✨</span>
                  <span className="text-gray-700 px-3 sm:px-4 lg:px-4 text-sm sm:text-base lg:text-base">Манай платформд үнэгүй нэгдээрэй</span>
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
        <section id="section3" className="bg-white flex items-start md:items-center justify-center px-4 sm:px-6 md:px-0 text-center relative pt-12 pb-[400px] sm:py-12 md:py-0 md:min-h-screen">
          
          <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl sm:rounded-3xl md:rounded-3xl p-4 sm:p-6 md:p-20 border border-gray-200 md:mt-0">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-black mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-center">
              Түгээмэл асуулт, хариулт
            </h2>
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              {/* FAQ Items - mobile responsive сайжруулсан */}
              <details className="group bg-transparent rounded-xl border border-gray-200 transition">
                <summary className="flex items-center min-h-[40px] sm:min-h-[48px] md:min-h-[56px] gap-2 sm:gap-3 md:gap-4 md:gap-4 cursor-pointer py-2 sm:py-3 md:py-0 px-3 sm:px-4 md:px-6 md:px-6 text-sm sm:text-base md:text-lg lg:text-lg font-medium text-black group-open:text-[#222] justify-between">
                  <span className="flex items-center gap-2 sm:gap-3 md:gap-4 md:gap-4 flex-1 text-left">
                    <span className="inline-block w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-8 lg:h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 text-base sm:text-lg md:text-2xl lg:text-2xl flex-shrink-0">📈</span>
                    <span className="break-words">MBTI (Myers-Briggs Type Indicator)</span>
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
                <div className="px-2 sm:px-4 md:px-14 lg:px-14 pb-2 sm:pb-3 md:pb-4 lg:pb-4 text-left text-gray-600 text-xs sm:text-sm md:text-base">Хувь хүний сэтгэлзүйн төрөл, мэдээлэл боловсруулах, шийдвэр гаргах хэв маягийг тодорхойлдог. 16 төрлийн зан чанарын ангилалтай.  <br /> Жишээ: ENFP – урам зоригтой, бүтээлч сэтгэлгээтэй хүн.</div>
              </details>
              {/* FAQ Item 2 */}
              <details className="group bg-transparent rounded-xl border border-gray-200 transition">
                <summary className="flex items-center min-h-[40px] sm:min-h-[48px] md:min-h-[56px] gap-2 sm:gap-3 md:gap-4 md:gap-4 cursor-pointer py-2 sm:py-3 md:py-0 px-3 sm:px-4 md:px-6 md:px-6 text-sm sm:text-base md:text-lg lg:text-lg font-medium text-black group-open:text-[#222] justify-between">
                  <span className="flex items-center gap-2 sm:gap-3 md:gap-4 md:gap-4 flex-1 text-left">
                    <span className="inline-block w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-8 lg:h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 text-base sm:text-lg md:text-2xl lg:text-2xl flex-shrink-0">🖥️</span>
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
                <div className="px-2 sm:px-4 md:px-14 lg:px-14 pb-2 sm:pb-3 md:pb-4 lg:pb-4 text-left text-gray-600 text-xs sm:text-sm md:text-base">Мэргэжлийн сонирхол, ажлын орчинтой хэр нийцэж байгааг хэмждэг. 6 үндсэн төрөлтэй: Realistic, Investigative, Artistic, Social, Enterprising, Conventional. <br /> Жишээ: Artistic – бүтээлч, уран сайхны мэргэжилд тохиромжтой.</div>
              </details>
              {/* FAQ Item 3 */}
              <details className="group bg-transparent rounded-xl border border-gray-200 transition">
                <summary className="flex items-center min-h-[40px] sm:min-h-[48px] md:min-h-[56px] gap-2 sm:gap-3 md:gap-4 md:gap-4 cursor-pointer py-2 sm:py-3 md:py-0 px-3 sm:px-4 md:px-6 md:px-6 text-sm sm:text-base md:text-lg lg:text-lg font-medium text-black group-open:text-[#222] justify-between">
                  <span className="flex items-center gap-2 sm:gap-3 md:gap-4 md:gap-4 flex-1 text-left">
                    <span className="inline-block w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-8 lg:h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 text-base sm:text-lg md:text-2xl lg:text-2xl flex-shrink-0">📜</span>
                    <span className="break-words">Big Five Personality Test</span>
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
                <div className="px-2 sm:px-4 md:px-14 lg:px-14 pb-2 sm:pb-3 md:pb-4 lg:pb-4 text-left text-gray-600 text-xs sm:text-sm md:text-base">Хүний зан төлөвийг 5 гол хэмжүүрээр үнэлдэг: нээлттэй байдал, хариуцлагатай байдал, гадагш чиглэсэн байдал, эв найртай байдал, мэдрэмжийн тогтвортой байдал.  <br />
                 Илүү гүн гүнзгий зан чанарын дүн шинжилгээ.</div>
              </details>
              {/* FAQ Item 5 */}
              <details className="group bg-transparent rounded-xl border border-gray-200 transition">
                <summary className="flex items-center min-h-[40px] sm:min-h-[48px] md:min-h-[56px] gap-2 sm:gap-3 md:gap-4 md:gap-4 cursor-pointer py-2 sm:py-3 md:py-0 px-3 sm:px-4 md:px-6 md:px-6 text-sm sm:text-base md:text-lg lg:text-lg font-medium text-black group-open:text-[#222] justify-between">
                  <span className="flex items-center gap-2 sm:gap-3 md:gap-4 md:gap-4 flex-1 text-left">
                    <span className="inline-block w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-8 lg:h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 text-base sm:text-lg md:text-2xl lg:text-2xl flex-shrink-0">👨‍🏫</span>
                    <span className="break-words">EQ Test (Emotional Intelligence)</span>
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
                <div className="px-2 sm:px-4 md:px-14 lg:px-14 pb-2 sm:pb-3 md:pb-4 lg:pb-4 text-left text-gray-600 text-xs sm:text-sm md:text-base">Өөрийн болон бусдын сэтгэл хөдлөлийг ойлгож, удирдах чадварыг үнэлдэг. <br/>
                       Харилцаа, багийн ажил, стрессийн менежментэд чухал үүрэгтэй.</div>
              </details>
            </div>
          </div>
        </section>

        {/* Section 4 - Pricing - mobile responsive сайжруулсан */}
        <section id="section4" className="h-screen bg-white flex flex-col items-center justify-center px-6 md:px-32 relative">
        <h2 className="text-3xl text-black md:text-5xl font-extrabold mb-18">Багцын Үнийн Санал</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
            <div className="bg-[#1A1A1A] text-white p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-lg flex flex-col items-center w-full cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-[#2A2A2A] min-h-[320px] sm:min-h-[350px]">
              <h3 className="text-2xl font-bold tracking-wide">Free</h3>
              <p className="text-4xl font-semibold mt-4">$0/mo</p>
              <ul className="text-base mt-8 space-y-4 text-gray-300">
                <li className="flex items-center"><span className="w-6 h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center">✓</span>Хязгаарлагдмал тест</li>
                <li className="flex items-center"><span className="w-6 h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center">✓</span>MBTI, BigFive, Holland Code тест</li>
                <li className="flex items-center"><span className="w-6 h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center">✓</span>Карьерын зөвлөмж</li>
              </ul>
              <button className="button-free mt-[160px]">GET STARTED</button>
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
              <button className="button-pro mt-[120px]">GET STARTED</button>
            </div>
            
            <div className="bg-[#1A1A1A] text-white p-10 rounded-3xl shadow-lg flex flex-col items-center w-full max-w-sm cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-[#2A2A2A]">
              <h3 className="text-2xl font-bold tracking-wide">Plas</h3>
              <p className="text-4xl font-semibold mt-4">$10/mo</p>
              <ul className="text-base mt-8 space-y-4 text-gray-300">
                <li className="flex items-center"><span className="w-6 h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center">✓</span>Хязгааргүй тест</li>
                <li className="flex items-center"><span className="w-6 h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center">✓</span>Roadmap зам</li>
                <li className="flex items-center"><span className="w-6 h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center">✓</span>Voice messages anywhere</li>
              </ul>
              <button className="button-plas mt-[160px]">GET STARTED</button>
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

"use client";

import React, { useEffect, useState } from "react";
import Menu from "./components/Menu";
import { FaBars } from "react-icons/fa";
import Footer from "./components/footer";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showScroll, setShowScroll] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <main className="relative overflow-x-hidden">
        <section
          id="section1"
          className="h-screen bg-[#191919] text-white flex flex-col justify-center items-start px-10 md:px-32 relative"
        >
          <button
            className="absolute top-10 right-10 w-10 h-10 flex items-center justify-center text-white hover:text-[#E94A1F] transition-colors duration-300"
            onClick={toggleMenu}
          >
            <FaBars size={24} />
          </button>

          <h3 className="text-[#E94A1F] text-sm md:text-base tracking-widest font-semibold">
            БАЙРШЛЫН ТОДОРХОЙЛОЛТ
          </h3>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight pt-4">
            Ирээдүйд хүрэх таны <br /> зам эндээс эхлэнэ.
          </h1>
          <p className="pt-6 text-lg text-gray-300 max-w-md">
            Карьерийн зөвлөгөө өгч, өөрийгөө илүү сайн таньж, ирээдүйгээ
            төлөвлө.
          </p>
          <div className="absolute bottom-10 left-10 md:left-32 flex space-x-2">
            <div className="w-3 h-3 bg-[#E94A1F] rounded-full"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          </div>
          <div className="absolute bottom-10 right-10 flex flex-col items-center text-gray-300">
            <div className="w-px h-10 bg-gray-300"></div>
            <span className="mt-2 text-xs tracking-widest transform rotate-90">
              SCROLL
            </span>
          </div>
        </section>

        <section
          id="section2"
          className="h-screen bg-white flex flex-col justify-center items-center px-4 md:px-32 text-black text-center relative"
        >
          <div
            className="absolute top-10 left-10 w-10 h-10 border-2 border-black rounded-full flex items-center justify-center text-2xl font-semibold text-black cursor-pointer hover:bg-black hover:text-white transition"
            onClick={scrollToTop}
          >
            Λ
          </div>

          <h4 className="text-sm tracking-widest font-medium text-gray-500">
            ЯМАР МЭРГЭЖИЛ
          </h4>
          <h2 className="text-7xl md:text-9xl font-extrabold text-gray-200 absolute -z-10 opacity-20 select-none">
            МЭРГЭЖИЛ
          </h2>
          <img
            src="/career-card.png"
            alt="career card"
            className="w-72 md:w-[400px] rounded-xl my-10 shadow-lg transform rotate-3"
          />
          <p className="max-w-lg text-sm text-gray-600 leading-relaxed">
            Та ямар мэргэжил, карьерын зам сонгох ёстойгоо шийдэхэд бэрхшээлтэй
            байна уу?
          </p>
          <button
            onClick={() => router.push("/auth/login")}
            className="mt-6 px-6 py-2 border border-black rounded-full font-medium text-sm uppercase tracking-wider hover:bg-black hover:text-white transition flex items-center"
          >
            Хариултаа олох
            <span className="ml-2">+</span>
          </button>
          <div className="absolute bottom-10 right-10 flex flex-col items-center text-gray-600">
            <div className="w-px h-10 bg-gray-600"></div>
            <span className="mt-2 text-xs tracking-widest transform rotate-90">
              SCROLL
            </span>
          </div>
        </section>
        <section
          id="section3"
          className="h-screen bg-[#4A403A] text-white flex items-center justify-center px-10 md:px-32 text-center relative"
        >
          <div
            className="absolute top-10 left-10 w-10 h-10 border-2 border-white rounded-full flex items-center justify-center text-2xl font-semibold text-white cursor-pointer hover:bg-white hover:text-[#4A403A] transition"
            onClick={scrollToTop}
          >
            Λ
          </div>

          <div className="max-w-2xl">
            <h3 className="flex flex-start text-[25px] tracking-widest font-semibold">
              АМЖИЛТЫН ТҮЛХҮҮР
            </h3>
            <p className="mt-6 text-xl md:text-2xl leading-relaxed font-light">
              Мэргэжил гэдэг бол хүний хүсэл мөрөөдөл, авьяас чадвар, үнэт
              зүйлсийн уулзвар цэг. Бид танд сонголт нь зөвхөн ашигтай бус,
              зорилготой, үнэ цэнтэй амьдралтай байхад тусална.
            </p>
          </div>
          <div className="absolute bottom-10 right-10 flex flex-col items-center text-gray-300">
            <div className="w-px h-10 bg-gray-300"></div>
            <span className="mt-2 text-xs tracking-widest transform rotate-90">
              SCROLL
            </span>
          </div>
        </section>
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

          <h2 className="text-3xl md:text-5xl font-extrabold mb-12">
            Багцын Үнийн Санал
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
            <div className="bg-[#1A1A1A] text-white p-10 rounded-3xl shadow-lg flex flex-col items-center w-full max-w-sm">
              <h3 className="text-2xl font-bold tracking-wide">Үнэгүй</h3>
              <p className="text-4xl font-semibold mt-4">$0/mo</p>
              <ul className="text-base mt-8 space-y-4 text-gray-300">
                <li className="flex items-center">
                  <span className="w-6 h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center">
                    ✓
                  </span>
                  Хязгаарлагдмал тест
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center">
                    ✓
                  </span>
                  MBTI, BigFive, Holland Code тест
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center">
                    ✓
                  </span>
                  Карьерын зөвлөмж
                </li>
              </ul>
              <button className="mt-[160px] bg-[#4A403A] text-white px-6 py-1 rounded-full font-medium uppercase tracking-wider hover:bg-[#3a322d] transition">
                GET STARTED
              </button>
            </div>

            <div className="bg-[#1A1A1A] text-white p-10 rounded-3xl shadow-lg flex flex-col items-center w-full max-w-sm">
              <h3 className="text-2xl font-bold tracking-wide">Дунддаг</h3>
              <p className="text-4xl font-semibold mt-4">$5/mo</p>
              <ul className="text-base mt-8 space-y-4 text-gray-300">
                <li className="flex items-center">
                  <span className="w-6 h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center">
                    ✓
                  </span>
                  Карьерын зөвлөгөө
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center">
                    ✓
                  </span>
                  Авьяас даалбар, Priorities
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center">
                    ✓
                  </span>
                  10 тест
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center">
                    ✓
                  </span>
                  Бүтээмжин зөвлөмж
                </li>
              </ul>
              <button className="mt-[120px] bg-[#FFD700] text-black px-6 py-1 rounded-full font-medium uppercase tracking-wider hover:bg-[#e6c200] transition">
                GET STARTED
              </button>
            </div>

            <div className="bg-[#1A1A1A] text-white p-10 rounded-3xl shadow-lg flex flex-col items-center w-full max-w-sm">
              <h3 className="text-2xl font-bold tracking-wide">Гүнзгий</h3>
              <p className="text-4xl font-semibold mt-4">$10/mo</p>
              <ul className="text-base mt-8 space-y-4 text-gray-300">
                <li className="flex items-center">
                  <span className="w-6 h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center">
                    ✓
                  </span>
                  Хязгааргүй тест
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center">
                    ✓
                  </span>
                  Roadmap зам
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center">
                    ✓
                  </span>
                  Voice messages anywhere
                </li>
              </ul>
              <button className="mt-[160px] bg-[#FFD700] text-black px-6 py-1 rounded-full font-medium uppercase tracking-wider hover:bg-[#e6c200] transition">
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
      </main>
      <Menu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <Footer />
    </>
  );
}

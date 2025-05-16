"use client";

import React, { useEffect, useState } from "react";
import Menu from "./components/Menu";
import { FaBars } from "react-icons/fa";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Spline from '@splinetool/react-spline';


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
    router.push('/profile');
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
      <header className="top-8 py-10 bg-[#f1f1f1] left-12 w-full z-10 transition-all duration-300" id="header">
        <nav className="flex items-center justify-between container px-20 py-4">
          <a href="#" className="text-black text-4xl font-semibold uppercase">Start Up</a>
         
          <button onClick={() => router.push("/auth/login")} className="ml-auto mr-[-1350px] font-bold w-30 text-black py-2 px-5 rounded-full relative after:content-[''] after:absolute after:bottom-0 after:left-[18px] after:right-[15px] after:h-[1px] after:bg-black text-sm">LET'S TALK</button>
          
          <a  onClick={navigateToProfile} href="#" className="ml-auto font-bolds mr-[-365px] w-20 bg-black  text-white py-2 px-4.5 rounded-full">Profile</a>
        </nav>
      </header>
      

 
      
      <main className="relative overflow-x-hidden w-full">
        <section className="py-55 bg-[#f1f1f1] text-white relative">
          <div className="container    grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-center  lg:pr-32 w-full">
              <div className="flex  flex-col items-end w-full    ">
                <h1 className="text-right font-bold text-black leading-tight pt-2 max-w-3xl text-3xl md:text-6xl ml-auto md:mr-[-238px]">
                Ирээдүйд хүрэх таны
                </h1>
                <h1 className="text-right font-bold text-black leading-tight pt-2 max-w-3xl text-3xl md:text-6xl ml-auto md:mr-[-150px]">
                 зам эндээс эхлэнэ.
                </h1>

                <p className="text-lg pt-10 text-black max-w-3xl ml-auto md:mr-[-38px] mt-0 text-justify">
                   Карьерийн зөвлөгөө өгч, өөрийгөө илүү сайн <br /> таньж, ирээдүйгээ төлөвлө" гэх нь таны амжилттай<br /> ирээдүйг бүтээх, өөрийн мэргэжлийн замыг <br /> тодорхойлж, хүсэл мөрөөдлөө биелүүлэхэд туслан.
                </p>
              </div>

              <button className="learn-more ml-auto mr-[-38px] mt-10" onClick={() => router.push("/auth/login")}>
                <span className="circle" aria-hidden="true">
                  <span className="icon arrow"></span>
                </span>
                <span className="button-text">Хариултаа олох</span>
              </button>
            </div>

            
            <div className="absolute top-40 left-310 w-130 h-120  ">
              <Spline
                scene="https://prod.spline.design/9kUyxvQoK5udN49V/scene.splinecode"
                style={{ width: '100%', height: '100%' }}
                onLoad={(splineApp) => {
                  if (splineApp) {
                    console.log('Spline scene loaded successfully');
                  }
                }}
                onError={(error) => {
                  console.error('Error loading Spline scene:', error);
                }}
                onMouseDown={(e) => {
                  if (e.target) {
                    console.log('Mouse down on:', e.target);
                  }
                }}
              />
            </div>
          </div>
        </section>


        <section id="section2" className="relative h-screen bg-[#ffffff] flex items-center justify-center px-4 md:px-32">
         <div className="absolute top-10 left-10 w-10 h-10 border-2 border-black rounded-full flex items-center justify-center text-2xl font-semibold text-black cursor-pointer hover:bg-black hover:text-white transition" onClick={scrollToTop}>
            Λ
          </div>
          <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[60px] md:text-[220px] font-bold text-gray-300 opacity-20 select-none animate-letter-spacing z-0 pointer-events-none whitespace-nowrap">
            МЭРГЭЖИЛ
          </h2>
          <div className="absolute top-70 left-10 md:left-75 z-10">
            <h4 className="text-base md:text-lg font-medium md:text-[20px] text-black">ЯМАР МЭРГЭЖИЛ</h4>
          </div>
          <div className="flex flex-row items-center w-full z-10">



            <div className="flex-1 flex justify-center">
              <img
                src="/top-view-career-written-note-with-stickers-notepad-white-background-job-office-copybook-salary-college-business-color.jpg"
                alt="career card"
                className="w-72 md:w-[400px] md:h-[550px] rounded-xl shadow-xl rotate-[20deg] mx-auto"
              />
            </div>


            
            <div className="absolute top-120 left-310 flex-1 flex flex-col items-center ml-0 md:ml-10">
              <p className="text-[20px] max-w-lg text-gray-600 leading-relaxed mb-10 text-justify mt-32">
                Та ямар мэргэжил, карьерын<br /> замыг сонгохыг хүсэж байна вэ?
              </p>


              <button onClick={() => router.push("/auth/login")}
                className="px-8 py-3  md:mr-[130px]  border border-gray-400 rounded-full font-medium text-sm uppercase tracking-wider hover:bg-black hover:text-white transition flex items-center ml-4 text-black">
                Route Map
                <span className="ml-2">+</span>
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



        <section id="section3" className="h-screen bg-[#f1f1f1] text-white flex items-center justify-center px-10 md:px-32 text-center relative">
          <div className="absolute top-10 left-10 w-10 h-10 border-2 border-black rounded-full flex items-center justify-center text-2xl font-semibold text-black cursor-pointer hover:bg-black hover:text-white transition" onClick={scrollToTop}>
            Λ
          </div>
          <div className="max-w-5xl mx-auto px-4 relative">
            <h3 className="absolute top-[-10px] left-[-30px] text-[20px] text-black tracking-[0.2em] font-bold">АМЖИЛТЫН ТҮЛХҮҮР</h3>
            <p className="mt-20 text-[36px] tracking-[0.0em] text-black leading-relaxed font-bold text-justify">
              Мэргэжил гэдэг бол хүний хүсэл мөрөөдөл авьяас чадвар үнэт зүйлсийн уулзвар цэг.  
              Бид танд сонголт нь зөвхөн ашигтай бус зорилготой үнэ цэнтэй амьдралтай байхад тусална.
            </p>
          </div>
          <div className="absolute bottom-10 right-10 flex flex-col items-center text-gray-300">
            <div className="w-px h-10 bg-gray-300"></div>
            <span className="mt-2 text-xs tracking-widest transform rotate-90">SCROLL</span>
          </div>
        </section>


        <section id="section4" className="h-screen bg-white flex flex-col items-center justify-center px-6 md:px-32 relative">
          <div className="absolute top-10 left-10 w-10 h-10 border-2 border-black rounded-full flex items-center justify-center text-2xl font-semibold text-black cursor-pointer hover:bg-black hover:text-white transition" onClick={scrollToTop}>
            Λ
          </div>
          <h2 className="text-3xl text-black md:text-5xl font-extrabold mb-18">Багцын Үнийн Санал</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
            <div className="bg-[#1A1A1A] text-white p-10 rounded-3xl shadow-lg flex flex-col items-center w-full max-w-sm cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-[#2A2A2A]">
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
            <span className="mt-2 text-xs tracking-widest transform rotate-90">SCROLL</span>
          </div>
        </section>
      </main>
      <Menu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <Footer />

      <style jsx>{`
        button.learn-more {
          width: 12rem;
          height: auto;
          position: relative;
          display: inline-block;
          cursor: pointer;
          outline: none;
          border: 0;
          vertical-align: middle;
          text-decoration: none;
          background: transparent;
          padding: 0;
          font-size: inherit;
          font-family: inherit;
        }

        button.learn-more .circle {
          transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
          position: relative;
          display: block;
          margin: 0;
          width: 3rem;
          height: 3rem;
          background: #282936;
          border-radius: 1.625rem;
        }

        button.learn-more:hover .circle {
          width: 240px;
          border-radius: 1.625rem;
          background: #000;
        }

        button.learn-more .circle .icon {
          transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
          position: absolute;
          top: 0;
          bottom: 0;
          margin: auto;
          background: #fff;
        }

        button.learn-more .circle .icon.arrow {
          transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
          left: 0.625rem;
          width: 1.125rem;
          height: 0.125rem;
          background: none;
        }

        button.learn-more .circle .icon.arrow::before {
          position: absolute;
          content: "";
          top: -0.29rem;
          right: 0.0625rem;
          width: 0.625rem;
          height: 0.625rem;
          border-top: 0.125rem solid #fff;
          border-right: 0.125rem solid #fff;
          transform: rotate(45deg);
        }

        button.learn-more .button-text {
          transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
          position: absolute;
          top: 0;
          left: 30;
          right: 0;
          bottom: 0;
          padding: 0.75rem 0;
          margin: 0 0 0 1.85rem;
          color: #282936;
          font-weight: 700;
          line-height: 1.6;
          text-align: left;
          text-transform: uppercase;
          white-space: nowrap;
        }

        button:hover .circle {
          width: 100%;
        }

        button:hover .circle .icon.arrow {
          background: #fff;
          transform: translate(1rem, 0);
        }

        button:hover .button-text {
          color: #fff;
        }

        .button-free {
          width: 170px;
          display: inline-block;
          padding: 8px 20px;
          border: 2px solid #4f4f4f;
          border-radius: 6px;
          transition: all 0.2s ease-in;
          position: relative;
          overflow: hidden;
          font-size: 17px;
          cursor: pointer;
          color: white;
          z-index: 1;
        }

        .button-free:before {
          content: "";
          position: absolute;
          left: 50%;
          transform: translateX(-50%) scaleY(1) scaleX(1.25);
          top: 100%;
          width: 140%;
          height: 180%;
          background-color: rgba(0, 0, 0, 0.05);
          border-radius: 50%;
          display: block;
          transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
          z-index: -1;
        }

        .button-free:after {
          content: "";
          position: absolute;
          left: 55%;
          transform: translateX(-50%) scaleY(1) scaleX(1.45);
          top: 180%;
          width: 160%;
          height: 190%;
          background-color: #E94A1F;
          border-radius: 50%;
          display: block;
          transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
          z-index: -1;
        }

        .button-free:hover {
          color: #ffffff;
          border: 1px solid #E94A1F;
        }

        .button-free:hover:before {
          top: -35%;
          background-color: #E94A1F;
          transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
        }

        .button-free:hover:after {
          top: -45%;
          background-color: #E94A1F;
          transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
        }

        .button-pro {
          width: 170px;
          display: inline-block;
          padding: 8px 20px;  
          border: 2px solid #4f4f4f;
          border-radius: 6px;
          transition: all 0.2s ease-in;
          position: relative;
          overflow: hidden;
          font-size: 17px;
          cursor: pointer;
          color: white;
          z-index: 1;
        }

        .button-pro:before {
          content: "";
          position: absolute;
          left: 50%;
          transform: translateX(-50%) scaleY(1) scaleX(1.25);
          top: 100%;
          width: 140%;
          height: 180%;
          background-color: rgba(0, 0, 0, 0.05);
          border-radius: 50%;
          display: block;
          transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
          z-index: -1;
        }

        .button-pro:after {
          content: "";
          position: absolute;
          left: 55%;
          transform: translateX(-50%) scaleY(1) scaleX(1.45);
          top: 180%;
          width: 160%;
          height: 190%;
          background-color: #E94A1F;
          border-radius: 50%;
          display: block;
          transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
          z-index: -1;
        }

        .button-pro:hover {
          color: #ffffff;
          border: 1px solid #E94A1F;
        }

        .button-pro:hover:before {
          top: -35%;
          background-color: #E94A1F;
          transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
        }

        .button-pro:hover:after {
          top: -45%;
          background-color: #E94A1F;
          transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
        }

        .button-plas {
          width: 170px;
          display: inline-block;
          padding: 8px 20px;
          border: 2px solid #4f4f4f;
          border-radius: 6px;
          transition: all 0.2s ease-in;
          position: relative;
          overflow: hidden;
          font-size: 17px;
          cursor: pointer;
          color: white;
          z-index: 1;
        }

        .button-plas:before {
          content: "";
          position: absolute;
          left: 50%;
          transform: translateX(-50%) scaleY(1) scaleX(1.25);
          top: 100%;
          width: 140%;
          height: 180%;
          background-color: rgba(0, 0, 0, 0.05);
          border-radius: 50%;
          display: block;
          transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
          z-index: -1;
        }

        .button-plas:after {
          content: "";
          position: absolute;
          left: 55%;
          transform: translateX(-50%) scaleY(1) scaleX(1.45);
          top: 180%;
          width: 160%;
          height: 190%;
          background-color: #E94A1F;
          border-radius: 50%;
          display: block;
          transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
          z-index: -1;
        }

        .button-plas:hover {
          color: #ffffff;
          border: 1px solid #E94A1F;
        }

        .button-plas:hover:before {
          top: -35%;
          background-color: #E94A1F;
          transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
        }

        .button-plas:hover:after {
          top: -45%;
            background-color: #E94A1F;
          transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
        }
      `}</style>
    </>
  );
}

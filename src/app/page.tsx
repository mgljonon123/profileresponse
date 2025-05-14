"use client";

import React, { useEffect, useState } from "react";
import Menu from "./components/Menu";
import { FaBars } from "react-icons/fa";
import Footer from "./components/footer";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
      <header className="fixed  top-5 left-12 w-full z-10 transition-all duration-300" id="header">
        <nav className="flex items-center justify-between container px-4 py-4">
          <a href="#" className="text-white text-4xl font-semibold uppercase">Start Up</a>
          <div className="block lg:hidden cursor-pointer" id="burger">
            <span className="block w-6 h-1 bg-white mb-1"></span>
            <span className="block w-6 h-1 bg-white mb-1"></span>
            <span className="block w-6 h-1 bg-white mb-1"></span>
          </div>
          <a className="ml-auto mr-[-1350px] font-bold w-30 text-white py-2 px-2 rounded-full relative after:content-[''] after:absolute after:bottom-0 after:left-[5px] after:right-[15px] after:h-[1px] after:bg-white">LET'S TALK</a>
          
          <a  onClick={navigateToProfile} href="#" className="ml-auto font-bolds mr-[-255px] w-20 bg-black  text-white py-2 px-4.5 rounded-full">Profile</a>
        </nav>
      </header>
      


      
      <main>
        <section className="py-60 bg-[#191919] text-white relative">
          <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-center  lg:pr-32 w-full">
              <div className="flex flex-col items-end w-full">
                <h1 className="text-right font-bold leading-tight pt-2 max-w-3xl text-3xl md:text-6xl ml-auto md:mr-[-250px]">
                Ирээдүйд хүрэх таны
                </h1>
                <h1 className="text-right font-bold leading-tight pt-2 max-w-3xl text-3xl md:text-6xl ml-auto md:mr-[-175px]">
                 зам эндээс эхлэнэ.
                </h1>

                <p className="text-right text-lg pt-10 text-gray-300 max-w-3xl ml-auto md:mr-[-33px] mt-0">
                Карьерийн зөвлөгөө өгч, өөрийгөө илүү сайн таньж,
                </p>
                <p className="text-right text-lg pt-[2px] text-gray-300 max-w-3xl ml-auto md:mr-[-45px] mt-0">
                       ирээдүйгээ төлөвлө" гэх нь таны амжилттай ирээдүйг
                </p>
                <p className="text-right text-lg pt-[2px] text-gray-300 max-w-3xl ml-auto md:mr-[-42px] mt-0">
                   бүтээх, өөрийн мэргэжлийн замыг тодорхойлж, хүсэл
                </p>
                <p className="text-right text-lg pt-[2px] text-gray-300 max-w-3xl ml-auto md:mr-[135px] mt-0">
                                мөрөөдлөө биелүүлэхэд туслан.
                </p>

            


              </div>

              

              <button onClick={() => router.push("/auth/login")}
               className=" bg-black text-white py-3 px-10 rounded-full flex items-center space-x-2 ml-55 mt-10">
                <span>Хариултаа олох</span>
                {/* <i className="bx bx-right-arrow-alt"></i> */}
              </button>

              
            </div>
            <img className="max-w-xs mx-auto lg:max-w-lg lg:mx-80" src="https://i.ibb.co/vB5LTFG/Headphone.png" alt="banner" />
            
          </div>
        </section>
      </main>


      <main className="relative overflow-x-hidden">
        <section id="section1" className="h-screen bg-[#3e3e3e] text-white flex flex-col justify-center items-start px-10 md:px-32 relative">
          <div className="absolute top-5 left-10 md:left-22">
            <Link
              href="/"
              className="text-[40px] font-extrabold focus:outline-none text-white"
            >
              START UP
            </Link>
          </div>
          <button className="absolute top-10 right-10 w-10 h-10 flex items-center justify-center text-white hover:text-[#E94A1F] transition-colors duration-300" onClick={toggleMenu}>
            <FaBars size={24} />
          </button>
          <h3 className="ml-auto mr-10 md:mr-302 text-[#E94A1F] text-sm md:text-base tracking-widest font-semibold">
            БИД БОЛ УРАМ ЗОРИГИЙН ГАЛ
          </h3>
          <h1 className="ml-auto mr-10 md:mr-172 text-4xl md:text-6xl font-extrabold leading-tight pt-10 max-w-1xl">
            Ирээдүйд хүрэх таны<br /> зам эндээс эхлэнэ.
          </h1>
          <p className="ml-auto mr-10 md:mr-240 pt-10 text-lg text-gray-300 max-w-md">
            Карьерийн зөвлөгөө өгч, өөрийгөө илүү сайн таньж, ирээдүйгээ төлөвлө.
          </p>
          <div className="absolute bottom-10 left-10 md:left-32 flex space-x-2">
            <div className="w-3 h-3 bg-[#E94A1F] rounded-full"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          </div>
          <div className="absolute bottom-10 right-10 flex flex-col items-center text-gray-300">
            <div className="w-px h-10 bg-gray-300"></div>
            <span className="mt-2 text-xs tracking-widest transform rotate-90">SCROLL</span>
          </div>
        </section>


        <section id="section2" className="relative h-screen bg-gray-200 flex items-center justify-center px-4 md:px-32">
          <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[60px] md:text-[150px] font-extrabold text-gray-350 opity-20 select-none animate-letter-spacing z-0 pointer-events-none whitespace-nowrap">
            МЭРГЭЖИЛ
          </h2>
          <div className="absolute top-70 left-10 md:left-75 z-10">
            <h4 className="text-base md:text-lg font-medium md:text-[30px] text-gray-600">ЯМАР МЭРГЭЖИЛ</h4>
          </div>
          <div className="flex flex-row items-center w-full z-10">
            <div className="flex-1 flex justify-center">
              <img src="/top-view-career-written-note-with-stickers-notepad-white-background-job-office-copybook-salary-college-business-color.jpg" alt="career card" className="w-72 md:w-[400px] rounded-xl shadow-lg transform rotate-3" />
            </div>
<<<<<<< HEAD

            <div className=" absolute   top-115 left-310 flex-1 flex flex-col items-center  ml-0 md:ml-10">
              <p className=" md:text-[20px] max-w-lg text-sm text-gray-900 leading-relaxed mb-8 text-center mt-32">
                Та ямар мэргэжил, карьерын
                <br />
                замыг сонгохыг хүсэж байна вэ?
              </p>

              <button
                onClick={() => router.push("/auth/login")}
                className="px-8 py-3 border border-black rounded-full font-medium text-sm uppercase tracking-wider hover:bg-black hover:text-white transition flex items-center ml-4"
              >
=======
            <div className="absolute top-115 left-310 flex-1 flex flex-col items-center ml-0 md:ml-10">
              <p className="text-[20px] max-w-lg text-gray-900 leading-relaxed mb-8 text-center mt-32">
                Та ямар мэргэжил, карьерын<br /> замыг сонгохыг хүсэж байна вэ?
              </p>
              <button onClick={() => router.push("/auth/login")}
                className="px-8 py-3 border border-gray-400 rounded-full font-medium text-sm uppercase tracking-wider hover:bg-black hover:text-white transition flex items-center ml-4 text-black">
>>>>>>> 63ffda8cb16c4ce0dbcc1f0f54419489749ed1c9
                Хариултаа олох
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
        <section id="section3" className="h-screen bg-[#5C574C] text-white flex items-center justify-center px-10 md:px-32 text-center relative">
          <div className="absolute top-10 left-10 w-10 h-10 border-2 border-white rounded-full flex items-center justify-center text-2xl font-semibold text-white cursor-pointer hover:bg-white hover:text-[#4A403A] transition" onClick={scrollToTop}>
            Λ
          </div>
          <div className="max-w-2xl">
            <h3 className="flex flex-start text-[45px] tracking-[0.2em] font-semibold">АМЖИЛТЫН ТҮЛХҮҮР</h3>
            <p className="mt-10 text-[25px] tracking-[0.1em] leading-relaxed font-light">
              Мэргэжил гэдэг бол хүний хүсэл мөрөөдөл, авьяас чадвар, үнэт зүйлсийн уулзвар цэг. Бид танд сонголт нь зөвхөн ашигтай бус, зорилготой, үнэ цэнтэй амьдралтай байхад тусална.
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
          <h2 className="text-3xl text-black md:text-5xl font-extrabold mb-12">Багцын Үнийн Санал</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
            <div className="bg-[#1A1A1A] text-white p-10 rounded-3xl shadow-lg flex flex-col items-center w-full max-w-sm">
              <h3 className="text-2xl font-bold tracking-wide">Free</h3>
              <p className="text-4xl font-semibold mt-4">$0/mo</p>
              <ul className="text-base mt-8 space-y-4 text-gray-300">
                <li className="flex items-center"><span className="w-6 h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center">✓</span>Хязгаарлагдмал тест</li>
                <li className="flex items-center"><span className="w-6 h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center">✓</span>MBTI, BigFive, Holland Code тест</li>
                <li className="flex items-center"><span className="w-6 h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center">✓</span>Карьерын зөвлөмж</li>
              </ul>
              <button className="mt-[160px] bg-[#E94A1F] text-white px-6 py-1 rounded-full font-medium uppercase tracking-wider hover:bg-[#3a322d] transition">GET STARTED</button>
            </div>
            <div className="bg-[#1A1A1A] text-white p-10 rounded-3xl shadow-lg flex flex-col items-center w-full max-w-sm">
              <h3 className="text-2xl font-bold tracking-wide">Pro</h3>
              <p className="text-4xl font-semibold mt-4">$5/mo</p>
              <ul className="text-base mt-8 space-y-4 text-gray-300">
                <li className="flex items-center"><span className="w-6 h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center">✓</span>Карьерын зөвлөгөө</li>
                <li className="flex items-center"><span className="w-6 h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center">✓</span>Авьяас даалбар, Priorities</li>
                <li className="flex items-center"><span className="w-6 h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center">✓</span>10 тест</li>
                <li className="flex items-center"><span className="w-6 h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center">✓</span>Бүтээмжин зөвлөмж</li>
              </ul>
              <button className="mt-[120px] bg-[#E94A1F] text-black px-6 py-1 rounded-full font-medium uppercase tracking-wider hover:bg-[#e6c200] transition">GET STARTED</button>
            </div>
            <div className="bg-[#1A1A1A] text-white p-10 rounded-3xl shadow-lg flex flex-col items-center w-full max-w-sm">
              <h3 className="text-2xl font-bold tracking-wide">Plas</h3>
              <p className="text-4xl font-semibold mt-4">$10/mo</p>
              <ul className="text-base mt-8 space-y-4 text-gray-300">
                <li className="flex items-center"><span className="w-6 h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center">✓</span>Хязгааргүй тест</li>
                <li className="flex items-center"><span className="w-6 h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center">✓</span>Roadmap зам</li>
                <li className="flex items-center"><span className="w-6 h-6 mr-2 border-2 border-white rounded-full flex items-center justify-center">✓</span>Voice messages anywhere</li>
              </ul>
              <button className="mt-[160px] bg-[#E94A1F] text-black px-6 py-1 rounded-full font-medium uppercase tracking-wider hover:bg-[#e6c200] transition">GET STARTED</button>
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
    </>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Footer from "../components/footer";
import Menu from "../components/Menu";
import AnimatedCard from "../components/AnimatedCard";

import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaDiscord,
} from "react-icons/fa";

const WorkPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const professions = [
    {
      profession: "Программист",
      image:
        "https://i.pinimg.com/736x/60/7e/a3/607ea3a0be551f4be2c82e35af3ff007.jpg",
    },
    {
      profession: "Худалдааны менежер",
      image:
        "https://i.pinimg.com/736x/1d/07/92/1d07928ddc507f60bea8d097ab80def0.jpg",
    },
    {
      profession: "Маркетингийн мэргэжилтэн",
      image:
        "https://i.pinimg.com/736x/2b/4e/d6/2b4ed637f66cc7d8df2ff6bba2bcf6a2.jpg",
    },
    {
      profession: "Санхүүгийн шинжээч",
      image:
        "https://i.pinimg.com/736x/3e/28/97/3e2897cd9215be43f51c912e8cf902a8.jpg",
    },
    {
      profession: "Хүний нөөцийн менежер",
      image:
        "https://i.pinimg.com/736x/88/da/ac/88daacb206581851324822d688f75de7.jpg",
    },
    {
      profession: "Бизнес аналитик",
      image:
        "https://i.pinimg.com/736x/96/c1/c9/96c1c9434113dd5a5ab7c004de9fff8f.jpg",
    },
    {
      profession: "Дижитал маркетолог",
      image:
        "https://i.pinimg.com/736x/c6/e0/c6/c6e0c62998bf53d547fb099f6bc831e2.jpg",
    },
    {
      profession: "UX/UI дизайнер",
      image:
        "https://i.pinimg.com/736x/5b/01/3e/5b013e173b8490f4d11881b4fa9fb2a6.jpg",
    },
    {
      profession: "Харилцаа холбооны мэргэжилтэн",
      image:
        "https://i.pinimg.com/736x/e9/0c/5e/e90c5eb1955ad9316f10098a5d920499.jpg",
    },
    {
      profession: "Борлуулалтын менежер",
      image:
        "https://i.pinimg.com/736x/7d/3e/6d/7d3e6d397dbc6cc6ecb71f8839acea41.jpg",
    },
  ];

  return (
    <div className="font-sans scroll-smooth relative">
      <Menu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      {/* Section 1 - Intro */}
      <section className="h-screen flex flex-col justify-between px-14 py-10 bg-white text-black relative">
        <header className="flex justify-between items-center relative z-20">
          <Link
            href="/"
            className="text-[40px] font-extrabold focus:outline-none"
          >
            START UP
          </Link>
          <div className="flex items-center space-x-2">
            <span className="text-[16px] font-medium">хөөрөлдье</span>

            <button
              onClick={toggleMenu}
              className="w-7 h-7 bg-gray-200 text-black rounded-full flex items-center justify-center text-xs focus:outline-none hover:bg-gray-300 transition-colors duration-300 z-50"
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </header>

        <div className="flex-grow flex flex-col justify-center items-start">
          <p className="text-red-500 text-[24px] font-semibold mb-4">
            ЖИШЭЭ СУДАЛГАА
          </p>
          <h2 className="text-[48px] font-extrabold leading-tight tracking-tight ml-[30px]">
            Мэргэжлээ олж чадсан залуусын <br />
            амжилтын түүхээс
          </h2>
        </div>
      </section>

      <section className="min-h-screen flex flex-col items-center justify-center relative bg-white px-14 py-10">
        <div className="grid grid-cols-2 gap-20 mb-10">
          {professions.map((item, index) => (
            <AnimatedCard
              key={index}
              image={item.image}
              title={item.profession}
            />
          ))}
        </div>
        <div className="absolute right-10 top-1/2 transform -translate-y-1/2 rotate-180 text-sm text-black tracking-widest">
          SCROLL
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default WorkPage;

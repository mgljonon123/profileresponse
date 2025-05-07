'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaDiscord,
} from 'react-icons/fa';

const WorkPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="font-sans scroll-smooth">
      {/* Section 1 - Intro */}
      <section className="h-screen flex flex-col justify-between px-14 py-10 bg-white text-black relative">
        <header className="flex justify-between items-center relative z-20">
          <h1 className="text-[40px] font-extrabold">NEOHUB</h1>
          <div className="flex items-center space-x-2">
            <span className="text-[16px] font-medium">хөөрөлдье</span>
            <button
              onClick={toggleMenu}
              className="w-7 h-7 bg-gray-200 text-black rounded-full flex items-center justify-center text-xs focus:outline-none"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </header>
        {/* Menu */}
        <div
          className={`fixed bottom-0 left-0 w-full h-screen transition-all duration-300 ease-in-out z-10 flex flex-col justify-between ${
            isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'
          }`}
        >
          {/* Upper part (2/3) with white background */}
          <div className="h-[66.66vh] bg-white flex flex-col items-center justify-start pt-10">
            {/* Top Menu Links */}
            <div className="flex items-center space-x-4 text-[32px] font-bold mb-6">
              <span className="w-2 h-2 bg-black rounded-full"></span>
              <Link href="#" className="hover:underline">
                WORK
              </Link>
              <span className="text-red-500">•</span>
              <Link href="#" className="hover:underline">
                MAP
              </Link>
              <span className="text-red-500">•</span>
              <Link href="#" className="hover:underline">
                SEARCH
              </Link>
              <span className="text-red-500">•</span>
              <Link href="#" className="hover:underline">
                PROFILE
              </Link>
              <span className="w-4 h-4"></span>
            </div>
            <div className="flex space-x-6 text-[16px] mt-[300px]">
              <Link href="#" className="hover:underline">
                LINKEDIN
              </Link>
              <Link href="#" className="hover:underline">
                INSTAGRAM
              </Link>
              <Link href="#" className="hover:underline">
                TWITTER
              </Link>
              <Link href="#" className="hover:underline">
                FACEBOOK
              </Link>
            </div>
          </div>
          {/* Lower part (1/3) with gray-900 background */}
          <div className="h-[33.33vh] bg-gray-900"></div>
        </div>
        <div className="flex-grow flex flex-col justify-center items-start">
          <p className="text-red-500 text-[24px] font-semibold mb-4">ЖИШЭЭ СУДАЛГАА</p>
          <h2 className="text-[48px] font-extrabold leading-tight tracking-tight ml-[30px]">
            Мэргэжлээ олж чадсан залуусын <br />
            амжилтын түүхээс
          </h2>
        </div>
      </section>
      <section className="h-screen flex flex-col items-center justify-center relative bg-white px-14 py-10">
        <div className="flex space-x-20 mb-10">
          <div className="flex flex-col items-center">
            <img
              src="/ehniih.png"
              alt="Book 1"
              className="w-[300px] h-[420px] object-cover rounded-lg shadow-lg"
            />
            <p className="text-sm mt-3 font-medium text-black">Темүүлен ЗОХИОСОН НОМ</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="/daraanai.png"
              alt="Book 2"
              className="w-[300px] h-[420px] object-cover rounded-lg shadow-lg"
            />
            <p className="text-sm mt-3 font-medium text-black">Темүүлен ЗОХИОСОН НОМ</p>
          </div>
        </div>
        <div className="absolute right-10 top-1/2 transform -translate-y-1/2 rotate-180 text-sm text-black tracking-widest">
          SCROLL
        </div>
      </section>
      <section className="h-[70vh] flex flex-col justify-between px-10 py-10 bg-gray-900 text-white">
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 border-2 border-red-400 rounded-full flex items-center justify-center text-2xl font-semibold ml-[190px] mt-[90px] text-red-400">Λ</div>
          <div className="text-right mr-[350px] mt-[80px]">
            <h2 className="text-[30px] font-bold mb-1 mr-[49px]">Холбоо барих</h2>
            <p className="text-[24px] mb-">neohub009@gmail.com</p>
            <p className="text-[24px] mb-2 mr-[70px]">(976) 9999-9999</p>
          </div>
        </div>
        <div className="flex-grow flex items-end">
          <h3 className="text-[30px] font-bold leading-snug ml-[200px] mb-[50px]">
            Making great things<br />in Silicon Valley.
          </h3>
        </div>
        <div className="flex justify-between items-end ml-[200px]">
               <div className="flex gap-6 pt-4">
                 <FaInstagram size={24} />
                 <FaFacebookF size={24} />
                 <FaLinkedinIn size={24} />
                 <FaDiscord size={24} />
               </div>
          <div className="text-right">
            <h2 className="text-[30px] font-bold mb-2 mr-[500px]">Explore</h2>
            <div className="flex space-x-6 text-[16px] mb-2">
              <Link href="#" className="hover:underline">Work</Link>
              <Link href="#" className="hover:underline">Map</Link>
              <Link href="#" className="hover:underline">Search</Link>
              <Link href="#" className="hover:underline">Profile</Link>
              <Link href="#" className="hover:underline">Contact</Link>
            </div>
            <p className="text-xs text-gray-400 mr-[220px]">
              Интернетийн будаг, 4-р хороо, Баянзүрхийн төлбөрийн зүйл хоолд.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkPage;
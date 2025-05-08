'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Footer from '../components/footer';
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
          <Footer/>
    </div>
  );
};

export default WorkPage;
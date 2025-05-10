'use client';

import React, { useState } from 'react';
import Menu from '../components/Menu';
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
    <div className="font-sans scroll-smooth relative">
      {/* Section 1 - Intro */}
      <section className="h-screen flex flex-col justify-between px-14 py-10 bg-white text-black relative">
        <header className="flex justify-between items-center relative z-20">
          <Link href="/" className="text-[40px] font-extrabold focus:outline-none">
            NEOHUB
          </Link>
          <div className="flex items-center space-x-2">
            <span className="text-[16px] font-medium">хөөрөлдье</span>

            <button
              onClick={toggleMenu}
              className="w-7 h-7 bg-gray-200 text-black rounded-full flex items-center justify-center text-xs focus:outline-none hover:bg-gray-300 transition-colors duration-300 z-50"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </header>
    
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
import React from 'react';
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaDiscord } from 'react-icons/fa';

export default function Footer() {
  return (
<<<<<<< HEAD
    <footer className="bg-[#1E1E20] text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
        <div className="flex flex-col items-center md:items-start w-full md:w-1/2 space-y-2">
          <div className="flex flex-col space-y-2">
            <div className="text-3xl font-bold">
              <div className="w-8 h-8 border-2 border-orange-500 rounded-full flex items-center justify-center text-xl font-semibold text-orange-500">
                Λ
              </div>
            </div>
            <p className="text-base font-medium text-center md:text-left text-gray-200 mt-[20px]">
              Силиконын Хөндийд гайхалтай<br/> зүйлс бүтээж байна.
            </p>
            <div className="flex gap-3 justify-center md:justify-start mt-[20px]">
              <a href="#" className="hover:text-orange-500 transition-colors" aria-label="Instagram">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors" aria-label="Facebook">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors" aria-label="LinkedIn">
                <FaLinkedinIn size={20} />
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors" aria-label="Discord">
                <FaDiscord size={20} />
              </a>
            </div>
=======
    <footer className="bg-[#1E1E20] text-white py-16 px-6 md:px-24">
      <div className="flex flex-col md:flex-row justify-between gap-12">
        <div className="flex flex-col items-center md:items-start space-y-6">
          <div className="text-4xl font-bold">
            <div className="w-10 h-10 border-2 border-red-400 rounded-full flex items-center justify-center text-2xl font-semibold ml-[190px] mt-[40px] text-red-400">
              Λ
            </div>
          </div>
          <p className="text-xl font-semibold leading-relaxed text-center md:text-left ml-[190px]">
            Making great things in <br /> Silicon Valley.
          </p>
          <div className="flex gap-6 pt-4 ml-[190px]">
            <FaInstagram size={24} />
            <FaFacebookF size={24} />
            <FaLinkedinIn size={24} />
            <FaDiscord size={24} />
>>>>>>> 98cbf59fa9792905d4a683089b063f75fa4f5d02
          </div>
         
        </div>

<<<<<<< HEAD
        <div className="flex flex-col items-center md:items-start w-full md:w-1/2 space-y-6">
          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-bold text-center md:text-left">Холбоо барих</h3>
            <div className="text-orange-500 text-sm font-medium underline text-center md:text-left">
              <p>neophub009@gmail.com</p>
              <p className="pt-1">(976) 9999-9999</p>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-bold text-center md:text-left">Судлах</h3>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm font-medium text-center md:text-left text-gray-200">
              <a href="#" className="hover:text-orange-500 transition-colors">Ажил</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Газрын зураг</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Хайлт</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Профайл</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Холбоо барих</a>
            </div>
            <div className="text-gray-400 text-xs font-medium text-center md:text-left pt-6">
=======
        
        <div className="flex flex-col items-center md:items-start w-full md:w-2/5 ml-[180px]">
          <div className="space-y-6 mb-10">
            <h3 className="text-2xl font-bold">Холбоо барих</h3>
            <div className="text-[#FF4B2B] text-lg font-semibold underline text-center md:text-left">
              <p>neophub009@gmial.com</p>
              <p className="pt-4">(976) 9999-9999</p>
            </div>
          </div>

          <div className="space-y-6 mb-10">
            <h3 className="text-2xl font-bold text-center md:text-left">
              EXPLORE
            </h3>
            <div className="flex space-x-6 text-lg font-medium text-center md:text-left">
              <p>Work</p>
              <p>Map</p>
              <p>Search</p>
              <p>Profile</p>
              <p>Contact</p>
            </div>
          </div>

          <div className="text-gray-400 text-sm font-medium text-center md:text-left">
>>>>>>> 98cbf59fa9792905d4a683089b063f75fa4f5d02
            Чингэлтэй дүүрэг, 4-р хороо, Барилгачдын талбайн зүүн хойд.
          </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
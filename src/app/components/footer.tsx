import React from 'react';
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaDiscord } from 'react-icons/fa';

export default function Footer() {
  return (
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
          </div>
         
        </div>

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
            Чингэлтэй дүүрэг, 4-р хороо, Барилгачдын талбайн зүүн хойд.
          </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
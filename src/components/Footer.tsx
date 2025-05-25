import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaDiscord,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1E1E20] text-white py-8 md:py-12 px-4 sm:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Left Section - Moved Down */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/2 space-y-4 md:mt-12">
          <div className="flex flex-col space-y-4">
            <div className="text-4xl font-bold">
            </div>
            <p className="text-lg font-medium text-center md:text-left text-gray-200 leading-relaxed">
              Монголд  гайхалтай
              <br /> зүйлс бүтээж байна.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <a
                href="#"
                className="hover:text-[#7fdaf4] hover:scale-110 transition-all duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="#"
                className="hover:text-[#7fdaf4] hover:scale-110 transition-all duration-300"
                aria-label="Facebook"
              >
                <FaFacebookF size={24} />
              </a>
              <a
                href="#"
                className="hover:text-[#7fdaf4] hover:scale-110 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={24} />
              </a>
              <a
                href="#"
                className="hover:text-[#7fdaf4] hover:scale-110 transition-all duration-300"
                aria-label="Discord"
              >
                <FaDiscord size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/2 space-y-8 mt-8 md:ml-[30px] md:mt-0">
          <div className="flex flex-col space-y-3">
            <h3 className="text-xl font-bold text-center md:text-left">
              Холбоо барих
            </h3>
            <div className="text-white text-base font-medium text-center md:text-left flex flex-col space-y-2">
              <p className="flex items-center gap-2 inline-flex hover:text-[#7fdaf4] hover:font-bold transition-all duration-300 ">
                <FaEnvelope size={18} className="mr-[10px]" />
                algodym@gmail.com
              </p>
              <p className="flex items-center gap-2  inline-flex hover:text-[#7fdaf4] hover:font-bold transition-all duration-300">
                <FaPhone size={18} className="mr-[10px]" />
                (976) 9999-9999
              </p>
            </div>
          </div>
          <div className="flex flex-col space-y-1 mt-[20px]">
            <h3 className="text-xl font-bold text-center md:text-left hidden md:block">
              Судлах
            </h3>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-base font-medium text-center md:text-left text-gray-200 hidden md:block">
              <a href="#" className="hover:text-[#7fdaf4] transition-colors">
                Газрын зураг
              </a>
              <a href="#" className="hover:text-[#7fdaf4] transition-colors">
                Профайл
              </a>
              <a href="#" className="hover:text-[#7fdaf4] transition-colors">
                Холбоо барих
              </a>
            </div>
            <div className="text-gray-400 text-sm font-medium text-center md:text-left pt-8">
              Чингэлтэй дүүрэг, 4-р хороо,<br></br> Барилгачдын талбайн зүүн хойд.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
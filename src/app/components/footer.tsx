import React from 'react';
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaDiscord,
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#1E1E20] text-white py-16 px-10 md:px-32">
      <div className="flex flex-col md:flex-row justify-between gap-12">

        <div className="flex flex-col items-center md:items-start space-y-6">
          <div className="text-4xl font-bold">
          <div className="w-10 h-10 border-2 border-red-400 rounded-full flex items-center justify-center text-2xl font-semibold ml-[190px] mt-[40px] text-red-400">Λ</div>
          </div>
          <p className="text-xl font-semibold leading-relaxed text-center md:text-left ml-[190px]">
            Making great things in <br /> Silicon Valley.
          </p>
          <div className="flex gap-6 pt-4 ml-[190px]">
            <FaInstagram size={24} />
            <FaFacebookF size={24} />
            <FaLinkedinIn size={24} />
            <FaDiscord size={24} />
          </div>
        </div>
        <div className="flex flex-col items-center md:items-start w-full md:w-2/3">
          <div className="space-y-6 mb-10">
            <h3 className="text-2xl font-bold ml-[180px]">Холбоо барих</h3>
            <div className="text-[#FF4B2B] text-lg font-semibold underline text-center md:text-left ml-[180px]">
              <p>neophub009@gmial.com</p>
              <p className="pt-4">(976) 9999-9999</p>
            </div>
          </div>

          <div className="space-y-6 mb-10">
            <h3 className="text-2xl font-bold text-center md:text-left ml-[180px]">EXPLORE</h3>
            <div className="flex space-x-6 text-lg font-medium text-center md:text-left ml-[180px]">
              <p>Work</p>
              <p>Map</p>
              <p>Search</p>
              <p>Profile</p>
              <p>Contact</p>
            </div>
          </div>

          <div className="text-gray-400 text-sm font-medium text-center md:text-left ml-[180px]">
            Чингэлтэй дүүрэг, 4-р хороо, Барилгачдын талбайн зүүн хойд.
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import React from "react";

const ForgotPassMail: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Mail Sent Info */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-0 min-h-screen">
        <div className="flex flex-col items-center w-full max-w-xs sm:max-w-sm md:max-w-md px-4 py-8 md:py-0">
          <div className="bg-gray-200 rounded-xl w-12 h-12 flex items-center justify-center mb-8 text-2xl font-bold text-gray-700">
            N
          </div>
          <h2 className="text-3xl font-bold mb-2 text-left w-full">
            Имэйл илгээгдлээ!
          </h2>
          <p className="text-gray-500 mb-6 text-left w-full">
            Таны имэйл хаяг руу сэргээх холбоос илгээгдсэн. <br />
            Имэйлээ шалгаад, зааврын дагуу нууц үгээ шинэчлээрэй.
          </p>
          <div className="flex items-center justify-center w-full mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <a href="/auth/login" className="w-full">
            <button className="w-full py-3 bg-black text-white rounded-lg font-semibold text-lg shadow-md hover:bg-gray-900 transition mb-2">
              Нэвтрэх хуудас руу очих
            </button>
          </a>
        </div>
      </div>
      {/* Right Side - Image & Quote */}
      <div className="hidden md:flex w-1/2 bg-black items-center justify-center relative">
        <img
          src="/4e659b59aabaf3fae230a92f49aede08 2.svg"
          alt="Start Up Visual"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white p-10 flex flex-col justify-end h-full">
          <div className="mb-2 text-xs tracking-widest opacity-80">
            neoisneo07@gmail.com
          </div>
          <div className="text-2xl font-semibold leading-snug">
            Нууц үг мартах бол зүгээр ээ, харин түүхээ мартаж болохгүй!
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassMail;

"use client"

import Link from "next/link";
import React, { useState } from "react";

const ForgotPass: React.FC = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Forgot Password Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-0">
        <div className="flex flex-col items-center w-full max-w-md">
          <div className="bg-gray-200 rounded-xl w-12 h-12 flex items-center justify-center mb-8 text-2xl font-bold text-gray-700">
            N
          </div>
          <h2 className="text-3xl font-bold mb-2 text-left w-full">Нууц үгээ мартсан уу?</h2>
          <p className="text-gray-500 mb-6 text-left w-full">
            Өмнө бүртгүүлсэн имэйл хаягаа оруулна уу. Бид танд сэргээх имэйл илгээх болно.
          </p>
          <form className="w-full">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full mb-6 px-4 py-2 border rounded-lg bg-gray-100"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="neoisneo07@gmail.com"
            />
            <button className="w-full py-3 bg-black text-white rounded-lg font-semibold text-lg shadow-md hover:bg-gray-900 transition mb-2">
<Link
              href="/auth/forgotpassmail"
              
            >
              Илгээх!!
            </Link>
            </button>
            
          </form>
          <div className="text-left text-xs text-gray-500 mt-4 w-full">
            Өө, нууц үгээ санасанчсан уу? <Link href="/auth/login" className="text-black font-semibold">Тэгвэл шууд нэвтрэ!</Link>
          </div>
        </div>
      </div>
      {/* Right Side - Image & Quote */}
      <div className="hidden md:flex w-1/2 bg-black items-center justify-center relative">
        <img
          src="/4e659b59aabaf3fae230a92f49aede08 2.svg"
          alt="NeoHub Visual"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white p-10 flex flex-col justify-end h-full">
          <div className="mb-2 text-xs tracking-widest opacity-80">neoisneo07@gmail.com</div>
          <div className="text-2xl font-semibold leading-snug">
            Нууц үг мартах бол зүгээр ээ, харин түүхээ мартаж болохгүй!
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
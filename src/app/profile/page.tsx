"use client";
import Image from "next/image";
import { useState } from "react";

// Sidebar icon SVG-үүд
const icons = [
  // 1. User/profile (active)
  <svg key="user" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-2.5 3.5-4 8-4s8 1.5 8 4" />
  </svg>,
  // 2. Chart/analytics
  <svg key="chart" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
    <path d="M3 17v-6a2 2 0 012-2h2a2 2 0 012 2v6M13 17v-2a2 2 0 012-2h2a2 2 0 012 2v2M17 17V7a2 2 0 00-2-2h-2a2 2 0 00-2 2v10" />
  </svg>,
  // 3. Chat/message
  <svg key="chat" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>,
  // 4. Settings/gear
  <svg key="settings" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33h.09A1.65 1.65 0 0011 3.09V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51h.09a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v.09a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>,
  // 5. Tooth/dental
  <svg key="tooth" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
    <path d="M12 2C7.03 2 2.73 6.11 2.73 11.07c0 2.5 1.13 4.77 3.13 6.36.5.39.8 1 .8 1.64v.01c0 1.1.9 2 2 2 .55 0 1-.45 1-1v-2.5c0-.28.22-.5.5-.5s.5.22.5.5V21c0 .55.45 1 1 1s1-.45 1-1v-2.42c0-.28.22-.5.5-.5s.5.22.5.5V21c0 .55.45 1 1 1s1-.9 1-2v-.01c0-.64.3-1.25.8-1.64 2-1.59 3.13-3.86 3.13-6.36C21.27 6.11 16.97 2 12 2z" />
  </svg>,
];

export default function Profile() {
  const [emails, setEmails] = useState([
    { email: "neoisneo07@gmail.com", added: "1 сарын өмнө" },
  ]);
  const [form, setForm] = useState({
    fullName: "",
    nickName: "",
    gender: "",
    country: "",
    language: "",
    timeZone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addEmail = () => {
    setEmails([...emails, { email: "", added: "шинэ" }]);
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#232360]">Сайн Байна уу? <span className="text-blue-600">Neo</span></h1>
          <p className="text-gray-400 text-sm mt-1">Mon, 25 May 2025</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 shadow-sm">
            <Image src="/profile.jpg" alt="profile" width={48} height={48} />
          </div>
          <button className="bg-white p-2 rounded-full shadow hover:bg-blue-50 transition">
            <span role="img" aria-label="notif">🔔</span>
          </button>
        </div>
      </div>

      {/* Gradient Banner */}
      <div className="w-full h-24 rounded-xl mb-10 bg-gradient-to-r from-[#C7E0FF] to-[#FFF2D1] flex items-end px-8 shadow-sm" />

      <div className="flex gap-12 items-start">
        {/* Main Section: Test results */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2 text-[#232360]">Сайн Байна уу? <span className="text-black">Neo</span></h2>
          <p className="mb-8 text-lg text-[#232360]">Таний <b>test</b> хариунд тохирох <b>3 мэргэжил</b></p>
          <div className="flex flex-col gap-6">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center bg-white rounded-2xl shadow p-6 border border-[#E6E6F2] gap-6 hover:shadow-lg transition">
                <div className="flex flex-col items-center">
                  <Image src="/cert.png" alt="cert" width={140} height={100} className="rounded-lg" />
                </div>
                <div className="ml-4 flex-1 flex flex-col justify-center">
                  <div className="font-semibold text-lg text-[#232360] mb-1">Мэргэжил</div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-8 relative flex items-center">
                      <div className="bg-blue-500 h-8 rounded-full" style={{ width: '70%' }}></div>
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base text-black font-bold">70%</span>
                    </div>
                    <button className="ml-2 p-2 rounded hover:bg-gray-100 border border-gray-200">
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536M9 13l6.071-6.071a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.94l-3.535 1.178 1.178-3.535a4 4 0 01.94-1.414z"/></svg>
                    </button>
                  </div>
                </div>
                <div className="ml-4 text-gray-500 font-medium text-right min-w-[80px]">
                  <div className="text-base">1 mois</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Info: Right side */}
        <aside className="w-[370px] flex flex-col items-center">
          <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-gray-200 mb-6 shadow">
            <Image src="/profile.jpg" alt="profile" width={176} height={176} />
          </div>
          <div className="w-full bg-white rounded-2xl border border-[#E6E6F2] p-8 shadow flex flex-col gap-2">
            <h2 className="font-bold mb-2 text-lg text-[#232360]">Information summary</h2>
            <div className="mb-1 text-base flex justify-between"><span>Phone</span> <b className="text-[#232360]">+97699839573</b></div>
            <div className="mb-1 text-base flex justify-between"><span>Email</span> <b className="text-[#232360]">neoisneo07@gmail.com</b></div>
            <div className="mb-1 text-base flex justify-between"><span>Adress</span> <b className="text-[#232360]">Ulaanbaatar</b></div>
            <button className="mt-4 w-full bg-black text-white py-3 rounded-lg flex items-center justify-center gap-2 text-base font-semibold hover:bg-[#232360] transition">
              Etiter les informations
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536M9 13l6.071-6.071a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.94l-3.535 1.178 1.178-3.535a4 4 0 01.94-1.414z"/></svg>
            </button>
          </div>
        </aside>
      </div>
    </>
  );
} 
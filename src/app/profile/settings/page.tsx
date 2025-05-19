"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
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
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addEmail = () => {
    setEmails([...emails, { email: "", added: "шинэ" }]);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-10 mt-8 border border-[#f0f0f5]">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#232360]">
            Сайн Байна уу? <span className="text-blue-600">Zolo</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">Mon, 25 May 2025</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 shadow-sm">
            <Image src="/193484-2.jpg" alt="profile" width={48} height={48} />
          </div>
          <button
            onClick={() => router.push("/")}
            className="bg-white p-3 rounded-full shadow hover:bg-gray-50 transition-all duration-300 flex items-center justify-center group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-gray-600 group-hover:text-[#E94A1F] transition-colors duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Gradient Banner */}
      <div className="w-full h-24 rounded-xl mb-10 bg-gradient-to-r from-[#C7E0FF] to-[#FFF2D1] flex items-end px-8 shadow-sm" />

      <div className="flex gap-10 items-start">
        {/* Profile Picture & Name */}
        <div className="flex flex-col items-center w-64 bg-[#f7f7fa] rounded-2xl p-6 shadow-sm border border-[#f0f0f5]">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100 mb-4 shadow">
            <Image src="/profile.jpg" alt="profile" width={128} height={128} />
          </div>
          <div className="text-center">
            <div className="font-bold text-xl text-[#232360]">Neo</div>
            <div className="text-gray-400 text-sm mb-3">
              neoisneo07@gmail.com
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition font-semibold">
              Засах
            </button>
          </div>
        </div>

        {/* Form Section */}
        <form className="flex-1 grid grid-cols-2 gap-8 bg-white rounded-2xl p-8 shadow-lg border border-[#f0f0f5]">
          <div>
            <label className="block mb-2 font-semibold text-[#1a1a2e]">
              Full Name
            </label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full border border-[#e0e0e7] rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-[#4f46e5] transition"
              placeholder="Your First Name"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-[#1a1a2e]">
              Nick Name
            </label>
            <input
              name="nickName"
              value={form.nickName}
              onChange={handleChange}
              className="w-full border border-[#e0e0e7] rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-[#4f46e5] transition"
              placeholder="Your First Name"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-[#1a1a2e]">
              Gender
            </label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full border border-[#e0e0e7] rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-[#4f46e5] transition"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-semibold text-[#1a1a2e]">
              Country
            </label>
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              className="w-full border border-[#e0e0e7] rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-[#4f46e5] transition"
            >
              <option value="">Select Country</option>
              <option value="mn">Mongolia</option>
              <option value="fr">France</option>
              <option value="us">USA</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-semibold text-[#1a1a2e]">
              Language
            </label>
            <select
              name="language"
              value={form.language}
              onChange={handleChange}
              className="w-full border border-[#e0e0e7] rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-[#4f46e5] transition"
            >
              <option value="">Select Language</option>
              <option value="mn">Mongolian</option>
              <option value="en">English</option>
              <option value="fr">French</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-semibold text-[#1a1a2e]">
              Time Zone
            </label>
            <select
              name="timeZone"
              value={form.timeZone}
              onChange={handleChange}
              className="w-full border border-[#e0e0e7] rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-[#4f46e5] transition"
            >
              <option value="">Select Time Zone</option>
              <option value="UTC+8">UTC+8 (Ulaanbaatar)</option>
              <option value="UTC+7">UTC+7</option>
              <option value="UTC+9">UTC+9</option>
            </select>
          </div>
        </form>
      </div>

      {/* Email Section */}
      <div className="mt-10 bg-[#f7f7fa] rounded-2xl p-8 border border-[#f0f0f5] shadow-sm">
        <div className="font-semibold mb-4 text-[#232360] text-lg">
          My email Address
        </div>
        <div className="flex flex-col gap-4">
          {emails.map((e, i) => (
            <div
              key={i}
              className="flex items-center gap-4 bg-white rounded-lg px-4 py-3 shadow-sm border border-[#e0e0e7]"
            >
              <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                @
              </div>
              <div className="font-medium text-[#232360]">{e.email}</div>
              <div className="text-gray-400 text-sm">{e.added}</div>
            </div>
          ))}
          <button
            onClick={addEmail}
            className="mt-2 text-blue-600 bg-blue-50 px-5 py-2 rounded-lg font-semibold shadow hover:bg-blue-100 transition w-fit"
          >
            + Add Email Address
          </button>
        </div>
      </div>
    </div>
  );
}

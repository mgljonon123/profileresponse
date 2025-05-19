"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function DentalPage() {
  const router = useRouter();
  const [nickName, setNickName] = useState("Neo");
  const [profilePic, setProfilePic] = useState("/profile.jpg");

  // localStorage-ээс хоч нэр, профайлын зургийг ачаалах
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedNickName = localStorage.getItem("nickName") || "Neo";
      const storedProfilePic = localStorage.getItem("profilePic") || "/profile.jpg";
      setNickName(storedNickName);
      setProfilePic(storedProfilePic);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#232360]">
            Dental Dashboard <span className="text-[#4f46e5]">{nickName}</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">Mon, 25 May 2025</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
            <Image
              src={profilePic}
              alt="profile"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <button
            onClick={() => router.push("/")}
            className="bg-white p-3 rounded-full shadow-md hover:bg-gray-50 transition-all duration-300 flex items-center justify-center group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-[#232360] group-hover:text-[#E94A1F] transition-colors duration-300"
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
      <div className="w-full h-24 rounded-xl mb-10 bg-gradient-to-r from-[#C7E0FF] to-[#FFF2D1] flex items-end px-8 shadow-md" />

      {/* Dummy Content */}
      <div className="bg-white rounded-2xl shadow-lg p-10 border border-[#f0f0f5] flex flex-col items-center justify-center min-h-[300px]">
        <div className="text-2xl font-semibold text-[#232360] mb-4">
          Dental Section
        </div>
        <div className="text-gray-500 text-lg mb-6">
          This is a placeholder for dental-related content. Add your dental
          dashboard, charts, or information here.
        </div>
        <button className="bg-[#4f46e5] text-white px-8 py-3 rounded-lg shadow-md hover:bg-[#7c3aed] transition font-semibold">
          Add Dental Record
        </button>
      </div>
    </div>
  );
}
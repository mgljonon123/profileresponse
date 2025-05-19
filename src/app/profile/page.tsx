"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Sidebar icon SVG-үүд
const icons = [
  // 1. User/profile (active)
  <svg
    key="user"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-7 h-7"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-2.5 3.5-4 8-4s8 1.5 8 4" />
  </svg>,
  // 2. Chart/analytics
  <svg
    key="chart"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-7 h-7"
  >
    <path d="M3 17v-6a2 2 0 012-2h2a2 2 0 012 2v6M13 17v-2a2 2 0 012-2h2a2 2 0 012 2v2M17 17V7a2 2 0 00-2-2h-2a2 2 0 00-2 2v10" />
  </svg>,
  // 3. Chat/message
  <svg
    key="chat"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-7 h-7"
  >
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>,
  // 4. Settings/gear
  <svg
    key="settings"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-7 h-7"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33h.09A1.65 1.65 0 0011 3.09V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51h.09a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v.09a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>,
  // 5. Tooth/dental
  <svg
    key="tooth"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-7 h-7"
  >
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
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addEmail = () => {
    setEmails([...emails, { email: "", added: "шинэ" }]);
  };

  const testScores = [
    {
      career: "Software Developer",
      match: 85,
      tests: {
        mbti: "INTJ",
        holland: "IRE",
        bigFive: {
          openness: 85,
          conscientiousness: 90,
          extraversion: 45,
          agreeableness: 70,
          neuroticism: 30,
        },
        eq: 78,
      },
    },
    {
      career: "Data Scientist",
      match: 75,
      tests: {
        mbti: "INTP",
        holland: "IRE",
        bigFive: {
          openness: 90,
          conscientiousness: 85,
          extraversion: 40,
          agreeableness: 65,
          neuroticism: 35,
        },
        eq: 72,
      },
    },
    {
      career: "UX Designer",
      match: 70,
      tests: {
        mbti: "ENFP",
        holland: "AIS",
        bigFive: {
          openness: 95,
          conscientiousness: 75,
          extraversion: 80,
          agreeableness: 85,
          neuroticism: 40,
        },
        eq: 85,
      },
    },
  ];

  return (
    <div className="w-full max-w-none mx-auto px-0 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#232360]">
            Сайн Байна уу? <span className="text-yellow-500">Zolo</span>
          </h1>
          <p className="text-gray-400 text-base mt-2">Mon, 25 May 2025</p>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
            <Image
              src="/193484-2.jpg"
              alt="profile"
              width={56}
              height={56}
              className="object-cover"
            />
          </div>
          <button
            onClick={() => router.push("/")}
            className="bg-white p-3 sm:p-3.5 rounded-full shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 group-hover:text-[#E94A1F] transition-colors duration-300"
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

      <div className="w-full h-24 sm:h-32 rounded-2xl mb-8 sm:mb-12 bg-gradient-to-r from-[#C7E0FF] to-[#FFF2D1] flex items-end px-6 sm:px-10 shadow-md" />

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch w-full">
        <div className="w-full lg:flex-1 flex-grow basis-0">
          <p className="mb-5 text-lg sm:text-xl text-[#232360]">
            Таний <b>test</b> хариунд тохирох <b>3 мэргэжил</b>
          </p>
          <div className="flex flex-col gap-6 sm:gap-8">
            {testScores.map((career, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row items-start bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 sm:p-8 border border-[#E6E6F2] gap-4 sm:gap-8 w-full"
              >
                <div className="flex flex-col items-center w-full sm:w-auto">
                  <Image
                    src="/193484-2.jpg"
                    alt="cert"
                    width={160}
                    height={120}
                    className="rounded-xl shadow-sm w-full sm:w-auto"
                  />
                </div>
                <div className="w-full">
                  <div className="font-semibold text-xl sm:text-2xl text-[#232360] mb-4">
                    {career.career}
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-32 sm:w-40 bg-gray-200 rounded-full h-8 sm:h-10 relative flex items-center">
                      <div
                        className="bg-yellow-500 h-8 sm:h-10 rounded-full"
                        style={{ width: `${career.match}%` }}
                      ></div>
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm sm:text-base text-black font-bold">
                        {career.match}%
                      </span>
                    </div>
                    <button className="p-2 sm:p-2.5 rounded-lg hover:bg-gray-100 border border-gray-200 transition-colors duration-300">
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M15.232 5.232l3.536 3.536M9 13l6.071-6.071a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.94l-3.535 1.178 1.178-3.535a4 4 0 01.94-1.414z" />
                      </svg>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-xl">
                      <h3 className="font-semibold text-gray-700 mb-2">MBTI</h3>
                      <p className="text-xl sm:text-2xl font-bold text-yellow-500">
                        {career.tests.mbti}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-xl">
                      <h3 className="font-semibold text-gray-700 mb-2">
                        Holland Code
                      </h3>
                      <p className="text-xl sm:text-2xl font-bold text-yellow-500">
                        {career.tests.holland}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-xl">
                      <h3 className="font-semibold text-gray-700 mb-2">
                        EQ Score
                      </h3>
                      <p className="text-xl sm:text-2xl font-bold text-yellow-500">
                        {career.tests.eq}/100
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-xl">
                      <h3 className="font-semibold text-gray-700 mb-2">
                        Огноо
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Тест өгсөн
                          </span>
                          <span className="font-medium text-base">
                            <span className="text-[#232360] font-bold">2025</span>.
                            <span className="text-yellow-500 font-bold">05</span>.
                            <span className="text-gray-600">12</span>
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Дараагийн тест
                          </span>
                          <span className="font-medium text-base">
                            <span className="text-[#232360] font-bold">2025</span>.
                            <span className="text-yellow-500 font-bold">11</span>.
                            <span className="text-gray-600">12</span>
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Хугацаа дуусах
                          </span>
                          <span className="font-medium text-base">
                            <span className="text-[#232360] font-bold">2026</span>.
                            <span className="text-yellow-500 font-bold">05</span>.
                            <span className="text-gray-600">12</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

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

  // Sample test scores data
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-[#232360]">
            Сайн Байна уу? <span className="text-blue-600">Neo</span>
          </h1>
          <p className="text-gray-400 text-base mt-2">Mon, 25 May 2025</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
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
            className="bg-white p-3.5 rounded-full shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center group"
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
      <div className="w-full h-32 rounded-2xl mb-12 bg-gradient-to-r from-[#C7E0FF] to-[#FFF2D1] flex items-end px-10 shadow-md" />

      <div className="flex gap-12 items-start">
        {/* Main Section: Test results */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-3 text-[#232360]">
            Сайн Байна уу? <span className="text-black">Neo</span>
          </h2>
          <p className="mb-10 text-xl text-[#232360]">
            Таний <b>test</b> хариунд тохирох <b>3 мэргэжил</b>
          </p>
          <div className="flex flex-col gap-8">
            {testScores.map((career, i) => (
              <div
                key={i}
                className="flex items-start bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 border border-[#E6E6F2] gap-8"
              >
                <div className="flex flex-col items-center">
                  <Image
                    src="/193484-2.jpg"
                    alt="cert"
                    width={160}
                    height={120}
                    className="rounded-xl shadow-sm"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-2xl text-[#232360] mb-4">
                    {career.career}
                  </div>

                  {/* Match Score */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-40 bg-gray-200 rounded-full h-10 relative flex items-center">
                      <div
                        className="bg-blue-500 h-10 rounded-full"
                        style={{ width: `${career.match}%` }}
                      ></div>
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base text-black font-bold">
                        {career.match}%
                      </span>
                    </div>
                    <button className="p-2.5 rounded-lg hover:bg-gray-100 border border-gray-200 transition-colors duration-300">
                      <svg
                        width="22"
                        height="22"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M15.232 5.232l3.536 3.536M9 13l6.071-6.071a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.94l-3.535 1.178 1.178-3.535a4 4 0 01.94-1.414z" />
                      </svg>
                    </button>
                  </div>

                  {/* Test Scores Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <h3 className="font-semibold text-gray-700 mb-2">MBTI</h3>
                      <p className="text-2xl font-bold text-blue-600">
                        {career.tests.mbti}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <h3 className="font-semibold text-gray-700 mb-2">
                        Holland Code
                      </h3>
                      <p className="text-2xl font-bold text-blue-600">
                        {career.tests.holland}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <h3 className="font-semibold text-gray-700 mb-2">
                        EQ Score
                      </h3>
                      <p className="text-2xl font-bold text-blue-600">
                        {career.tests.eq}/100
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <h3 className="font-semibold text-gray-700 mb-2">
                        Big Five
                      </h3>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            Openness
                          </span>
                          <span className="font-medium">
                            {career.tests.bigFive.openness}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            Conscientiousness
                          </span>
                          <span className="font-medium">
                            {career.tests.bigFive.conscientiousness}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            Extraversion
                          </span>
                          <span className="font-medium">
                            {career.tests.bigFive.extraversion}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            Agreeableness
                          </span>
                          <span className="font-medium">
                            {career.tests.bigFive.agreeableness}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            Neuroticism
                          </span>
                          <span className="font-medium">
                            {career.tests.bigFive.neuroticism}%
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

        {/* Profile Info: Right side */}
        <aside className="w-[400px] flex flex-col items-center">
          <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gray-200 mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <Image
              src="/193484-2.jpg"
              alt="profile"
              width={192}
              height={192}
              className="object-cover"
            />
          </div>
          <div className="w-full bg-white rounded-2xl border border-[#E6E6F2] p-10 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col gap-4">
            <h2 className="font-bold mb-4 text-xl text-[#232360]">
              Information summary
            </h2>
            <div className="mb-2 text-lg flex justify-between">
              <span className="text-gray-600">Phone</span>{" "}
              <b className="text-[#232360]">+97699839573</b>
            </div>
            <div className="mb-2 text-lg flex justify-between">
              <span className="text-gray-600">Email</span>{" "}
              <b className="text-[#232360]">neoisneo07@gmail.com</b>
            </div>
            <div className="mb-2 text-lg flex justify-between">
              <span className="text-gray-600">Adress</span>{" "}
              <b className="text-[#232360]">Ulaanbaatar</b>
            </div>
            <button className="mt-6 w-full bg-black text-white py-4 rounded-xl flex items-center justify-center gap-3 text-lg font-semibold hover:bg-[#232360] transition-all duration-300 shadow-md hover:shadow-lg">
              Засах
              <svg
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M15.232 5.232l3.536 3.536M9 13l6.071-6.071a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.94l-3.535 1.178 1.178-3.535a4 4 0 01.94-1.414z" />
              </svg>
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

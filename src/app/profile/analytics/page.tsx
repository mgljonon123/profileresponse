"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const testScores = {
  mbti: {
    E: 65,
    I: 35,
    S: 40,
    N: 60,
    T: 55,
    F: 45,
    J: 70,
    P: 30,
  },
  holland: {
    R: 75,
    I: 85,
    A: 45,
    S: 60,
    E: 40,
    C: 65,
  },
  eq: {
    selfAwareness: 82,
    selfRegulation: 78,
    motivation: 85,
    empathy: 80,
    socialSkills: 75,
  },
  bigFive: {
    openness: 90,
    conscientiousness: 85,
    extraversion: 75,
    agreeableness: 88,
    neuroticism: 65,
  },
};

const getChartData = (testType: string) => {
  switch (testType) {
    case "MBTI":
      return [
        { name: "E/I", score: testScores.mbti.E },
        { name: "S/N", score: testScores.mbti.N },
        { name: "T/F", score: testScores.mbti.T },
        { name: "J/P", score: testScores.mbti.J },
      ];
    case "Holland":
      return [
        { name: "Realistic", score: testScores.holland.R },
        { name: "Investigative", score: testScores.holland.I },
        { name: "Artistic", score: testScores.holland.A },
        { name: "Social", score: testScores.holland.S },
        { name: "Enterprising", score: testScores.holland.E },
        { name: "Conventional", score: testScores.holland.C },
      ];
    case "EQ":
      return [
        { name: "Self Awareness", score: testScores.eq.selfAwareness },
        { name: "Self Regulation", score: testScores.eq.selfRegulation },
        { name: "Motivation", score: testScores.eq.motivation },
        { name: "Empathy", score: testScores.eq.empathy },
        { name: "Social Skills", score: testScores.eq.socialSkills },
      ];
    case "Big Five":
      return [
        { name: "Openness", score: testScores.bigFive.openness },
        {
          name: "Conscientiousness",
          score: testScores.bigFive.conscientiousness,
        },
        { name: "Extraversion", score: testScores.bigFive.extraversion },
        { name: " Agreeableness", score: testScores.bigFive.agreeableness },
        { name: "Neuroticism", score: testScores.bigFive.neuroticism },
      ];
    default:
      return [];
  }
};

const projects = [
  {
    name: "Software Developer",
    date: "2024-03-15",
    percent: 85,
    status: "маш сайн",
  },
  {
    name: "Data Scientist",
    date: "2024-03-14",
    percent: 82,
    status: "маш сайн",
  },
  { name: "UX Designer", date: "2024-03-13", percent: 78, status: "сайн" },
  { name: "Project Manager", date: "2024-03-12", percent: 75, status: "сайн" },
  { name: "Research Analyst", date: "2024-03-11", percent: 72, status: "сайн" },
  { name: "Business Analyst", date: "2024-03-10", percent: 68, status: "дунд" },
  {
    name: "Marketing Specialist",
    date: "2024-03-09",
    percent: 65,
    status: "дунд",
  },
  { name: "Content Writer", date: "2024-03-08", percent: 62, status: "дунд" },
  {
    name: "Sales Representative",
    date: "2024-03-07",
    percent: 58,
    status: "дунд",
  },
  { name: "Customer Service", date: "2024-03-06", percent: 55, status: "дунд" },
];

const statusColor: { [key: string]: string } = {
  "маш сайн": "bg-[#ffffff] text-[#F59E0B]",
  сайн: "bg-[#ffffff] text-[#F59E0B]",
  дунд: "bg-[#ffffff] text-[#F59E0B]",
  муу: "bg-[#ffffff] text-[#F59E0B]",
};

export default function AnalyticsPage() {
  const [selectedTest, setSelectedTest] = useState("MBTI");
  const [nickName, setNickName] = useState("Neo");
  const [profilePic, setProfilePic] = useState("/profile.jpg");
  const router = useRouter();

  // localStorage-ээс хоч нэр, зургийг ачаалах
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedNickName = localStorage.getItem("nickName") || "Neo";
      const storedProfilePic =
        localStorage.getItem("profilePic") || "/profile.jpg";
      setNickName(storedNickName);
      setProfilePic(storedProfilePic);
    }
  }, []);

  const chartData = getChartData(selectedTest);

  return (
    <div className="max-w-6xl mx-auto mt-4 sm:mt-6 md:mt-8">
      {/* Header */}
      <div className="flex justify-between items-center gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#232360]">
            Сайн Байна уу? <span className="text-[#F59E0B]">{nickName}</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">Mon, 25 May 2025</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-gray-200 shadow-sm">
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
            className="bg-white p-2 sm:p-3 rounded-full shadow hover:bg-gray-50 transition-all duration-300 flex items-center justify-center group"
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

      {/* Gradient Banner */}
      <div className="w-full h-16 sm:h-20 md:h-24 rounded-xl mb-6 sm:mb-8 md:mb-10 bg-gradient-to-r from-[#F59E0B] to-[#F59E0B] flex items-end px-4 sm:px-6 md:px-8 shadow-sm" />

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 sm:gap-8 mb-6 sm:mb-8 md:mb-10">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-[#f0f0f5]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-10">
            <h2 className="text-lg sm:text-xl font-semibold text-[#232360]">
              Test Scores Analysis
            </h2>
            <ul className="menu">
              <li className="item">
                <a href="#" className="link">
                  {selectedTest === "All"
                    ? "All Tests"
                    : selectedTest === "MBTI"
                    ? "MBTI Test"
                    : selectedTest === "Holland"
                    ? "Holland Test"
                    : selectedTest === "EQ"
                    ? "EQ Test"
                    : "Big Five Test"}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M7 10l5 5 5-5z" />
                  </svg>
                </a>
                <ul className="submenu">
                  <li className="submenu-item">
                    <a
                      href="#"
                      className="submenu-link"
                      onClick={() => setSelectedTest("MBTI")}
                    >
                      Mbti Test
                    </a>
                  </li>
                  <li className="submenu-item">
                    <a
                      href="#"
                      className="submenu-link"
                      onClick={() => setSelectedTest("Holland")}
                    >
                      Holland Code
                    </a>
                  </li>
                  <li className="submenu-item">
                    <a
                      href="#"
                      className="submenu-link"
                      onClick={() => setSelectedTest("EQ")}
                    >
                      EQ Test
                    </a>
                  </li>
                  <li className="submenu-item">
                    <a
                      href="#"
                      className="submenu-link"
                      onClick={() => setSelectedTest("Big Five")}
                    >
                      Big Five Test
                    </a>
                  </li>
                </ul>
              </li>
            </ul>

            <style jsx>{`
              .menu {
                font-size: 14px;
                line-height: 1.4;
                color: #000000;
                width: fit-content;
                display: flex;
                list-style: none;
              }

              .menu a {
                text-decoration: none;
                color: inherit;
                font-family: inherit;
                font-size: inherit;
                line-height: inherit;
              }

              .menu .link {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                padding: 8px 24px;
                border-radius: 12px;
                overflow: hidden;
                transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
                background-color: #f7f7fa;
                border: 1px solid #e5e5e5;
              }

              .menu .link::after {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: #f59e0b;
                z-index: -1;
                transform: scaleX(0);
                transform-origin: left;
                transition: transform 0.48s cubic-bezier(0.23, 1, 0.32, 1);
              }

              .menu .link svg {
                width: 12px;
                height: 12px;
                fill: #000000;
                transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
              }

              .menu .item {
                position: relative;
              }

              .menu .item .submenu {
                display: flex;
                flex-direction: column;
                align-items: center;
                position: absolute;
                top: 100%;
                border-radius: 0 0 12px 12px;
                left: 0;
                width: 100%;
                overflow: hidden;
                border: 1px solid #cccccc;
                opacity: 0;
                visibility: hidden;
                transform: translateY(-8px);
                transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
                z-index: 1;
                pointer-events: none;
                list-style: none;
                background-color: white;
              }

              .menu .item:hover .submenu {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
                pointer-events: auto;
                border-top: transparent;
                border-color: #f59e0b;
              }

              .menu .item:hover .link {
                color: #000000;
                border-radius: 12px 12px 0 0;
                background-color: white;
              }

              .menu .item:hover .link::after {
                transform: scaleX(0);
              }

              .menu .item:hover .link svg {
                fill: #000000;
                transform: rotate(-180deg);
              }

              .submenu .submenu-item {
                width: 100%;
                transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
              }

              .submenu .submenu-link {
                display: block;
                padding: 8px 16px;
                width: 100%;
                position: relative;
                text-align: center;
                transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
                color: #000000;
              }

              .submenu .submenu-item:last-child .submenu-link {
                border-bottom: none;
              }

              .submenu .submenu-link::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                transform: scaleX(0);
                width: 100%;
                height: 100%;
                background-color: #f59e0b;
                z-index: -1;
                transform-origin: left;
                transition: transform 0.48s cubic-bezier(0.23, 1, 0.32, 1);
              }

              .submenu .submenu-link:hover:before {
                transform: scaleX(1);
                transform-origin: right;
              }

              .submenu .submenu-link:hover {
                color: #ffffff;
              }
            `}</style>
          </div>
          <div className="h-[300px] sm:h-[350px] md:h-[430px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={70}
                  tick={{ fill: "#666" }}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: "#666" }}
                  label={{
                    value: "Score (%)",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#666",
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #f0f0f0",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0,0 estando,0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  dot={{
                    fill: "#fff",
                    stroke: "#F59E0B",
                    strokeWidth: 2,
                    r: 6,
                  }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-[#f0f0f5]">
        <div className="text-[#F59E0B] font-semibold mb-4 sm:mb-6 text-lg sm:text-xl">
          Projects
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left rounded-xl">
            <thead>
              <tr className="bg-[#f7f7fa] text-gray-500 text-sm sm:text-base">
                <th className="py-3 sm:py-4 px-4 sm:px-6 font-semibold">Мэргэжил</th>
                <th className="py-3 sm:py-4 px-4 sm:px-6 font-semibold">Огноо</th>
                <th className="py-3 sm:py-4 px-4 sm:px-6 font-semibold">хувь.%</th>
                <th className="py-3 sm:py-4 px-4 sm:px-6 font-semibold">тайлбар</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p, i) => (
                <tr
                  key={i}
                  className="border-b last:border-b-0 hover:bg-[#f7f7fa] transition text-sm sm:text-base"
                >
                  <td className="py-3 sm:py-4 px-4 sm:px-6 flex items-center gap-2 font-semibold">
                    <span className="inline-block w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#e6f7fa] flex items-center justify-center text-[#F59E0B] font-bold">
                      ✦
                    </span>{" "}
                    {p.name}
                  </td>
                  <td className="py-3 sm:py-4 px-4 sm:px-6">{p.date}</td>
                  <td className="py-3 sm:py-4 px-4 sm:px-6 font-bold">{p.percent}%</td>
                  <td className="py-3 sm:py-4 px-4 sm:px-6">
                    <span
                      className={`px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-sm sm:text-base font-semibold ${
                        statusColor[p.status]
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

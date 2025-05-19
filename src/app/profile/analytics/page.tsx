"use client";
import { useState } from "react";
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

// Test scores data
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

// Chart data for different test types
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
        { name: "Agreeableness", score: testScores.bigFive.agreeableness },
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
  "маш сайн": "bg-blue-200 text-blue-700",
  сайн: "bg-green-100 text-green-700",
  дунд: "bg-yellow-100 text-yellow-700",
  муу: "bg-red-100 text-red-700",
};

export default function AnalyticsPage() {
  const [selectedTest, setSelectedTest] = useState("MBTI");
  const router = useRouter();

  const chartData = getChartData(selectedTest);

  return (
    <div className="max-w-6xl mx-auto mt-8">
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-8 mb-10">
        {/* Line Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#f0f0f5]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-[#232360]">
              Test Scores Analysis
            </h2>
            <select
              value={selectedTest}
              onChange={(e) => setSelectedTest(e.target.value)}
              className="border rounded-lg px-4 py-2 bg-[#f7f7fa] text-gray-700 font-semibold"
            >
              <option value="MBTI">MBTI Test</option>
              <option value="Holland">Holland Code</option>
              <option value="EQ">EQ Test</option>
              <option value="Big Five">Big Five Test</option>
            </select>
          </div>
          <div className="h-[400px]">
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
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#a78bfa"
                  strokeWidth={2}
                  dot={{
                    fill: "#fff",
                    stroke: "#232360",
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
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#f0f0f5]">
        <div className="text-[#7de2e6] font-semibold mb-6 text-xl">
          Projects
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left rounded-xl">
            <thead>
              <tr className="bg-[#f7f7fa] text-gray-500 text-base">
                <th className="py-4 px-6 font-semibold">Мэргэжил</th>
                <th className="py-4 px-6 font-semibold">Огноо</th>
                <th className="py-4 px-6 font-semibold">хувь.%</th>
                <th className="py-4 px-6 font-semibold">тайлбар</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p, i) => (
                <tr
                  key={i}
                  className="border-b last:border-b-0 hover:bg-[#f7f7fa] transition text-base"
                >
                  <td className="py-4 px-6 flex items-center gap-2 font-semibold">
                    <span className="inline-block w-7 h-7 rounded-full bg-[#e6f7fa] flex items-center justify-center text-[#7de2e6] font-bold">
                      ✦
                    </span>{" "}
                    {p.name}
                  </td>
                  <td className="py-4 px-6">{p.date}</td>
                  <td className="py-4 px-6 font-bold">{p.percent}%</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-4 py-2 rounded-lg text-base font-semibold ${
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

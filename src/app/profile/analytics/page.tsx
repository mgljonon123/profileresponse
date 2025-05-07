"use client";
import { useState } from "react";

const chartData = [40, 30, 35, 50, 70, 55, 60];
const chartLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

const projects = [
  { name: "IT", type: "mbti", percent: 80, status: "маш сайн" },
  { name: "It", type: "....", percent: 75, status: "сайн" },
  { name: "it", type: "....", percent: 60, status: "дунд" },
  { name: "it", type: "....", percent: 50, status: "дунд" },
  { name: "it", type: ".....", percent: 40, status: "муу" },
];

const statusColor: { [key: string]: string } = {
  "маш сайн": "bg-blue-200 text-blue-700",
  "сайн": "bg-green-100 text-green-700",
  "дунд": "bg-yellow-100 text-yellow-700",
  "муу": "bg-red-100 text-red-700",
};

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("Week");

  return (
    <div className="max-w-6xl mx-auto mt-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#232360]">Сайн Байна уу? <span className="text-blue-600">Neo</span></h1>
          <p className="text-gray-400 text-sm mt-1">Mon, 25 May 2025</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 shadow-sm">
            <img src="/profile.jpg" alt="profile" width={48} height={48} />
          </div>
          <button className="bg-white p-2 rounded-full shadow hover:bg-blue-50 transition">
            <span role="img" aria-label="notif">🔔</span>
          </button>
        </div>
      </div>

      {/* Gradient Banner */}
      <div className="w-full h-24 rounded-xl mb-10 bg-gradient-to-r from-[#C7E0FF] to-[#FFF2D1] flex items-end px-8 shadow-sm" />

      {/* Chart Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-[#f0f0f5]">
        <div className="flex justify-end items-center mb-4">
          <select value={period} onChange={e => setPeriod(e.target.value)} className="border rounded-lg px-4 py-2 bg-[#f7f7fa] text-gray-700 font-semibold">
            <option>Week</option>
            <option>Month</option>
            <option>Year</option>
          </select>
        </div>
        {/* Simple SVG Line Chart */}
        <div className="w-full h-56 flex items-center justify-center">
          <svg viewBox="0 0 500 180" className="w-full h-full">
            <polyline
              fill="none"
              stroke="#a78bfa"
              strokeWidth="3"
              points="0,120 100,150 200,140 300,90 400,40 500,80"
              opacity="0.3"
            />
            {/* Dynamic line */}
            <polyline
              fill="none"
              stroke="#a78bfa"
              strokeWidth="2.5"
              points="0,120 100,150 200,140 300,90 400,40 500,80"
            />
            {/* Dots */}
            {[120, 150, 140, 90, 40, 80].map((y, i) => (
              <circle key={i} cx={i * 100} cy={y} r="7" fill="#fff" stroke="#232360" strokeWidth="3" />
            ))}
            {/* X labels */}
            {chartLabels.map((label, i) => (
              <text key={label} x={i * 100} y={170} textAnchor="middle" fontSize="18" fill="#888">{label}</text>
            ))}
          </svg>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#f0f0f5]">
        <div className="text-[#7de2e6] font-semibold mb-6 text-xl">Projects</div>
        <div className="overflow-x-auto">
          <table className="w-full text-left rounded-xl">
            <thead>
              <tr className="bg-[#f7f7fa] text-gray-500 text-base">
                <th className="py-4 px-6 font-semibold">Мэргэжил</th>
                <th className="py-4 px-6 font-semibold">test төрөл</th>
                <th className="py-4 px-6 font-semibold">хувь.%</th>
                <th className="py-4 px-6 font-semibold">тайлбар</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p, i) => (
                <tr key={i} className="border-b last:border-b-0 hover:bg-[#f7f7fa] transition text-base">
                  <td className="py-4 px-6 flex items-center gap-2 font-semibold">
                    <span className="inline-block w-7 h-7 rounded-full bg-[#e6f7fa] flex items-center justify-center text-[#7de2e6] font-bold">✦</span> {p.name}
                  </td>
                  <td className="py-4 px-6">{p.type}</td>
                  <td className="py-4 px-6 font-bold">{p.percent}%</td>
                  <td className="py-4 px-6">
                    <span className={`px-4 py-2 rounded-lg text-base font-semibold ${statusColor[p.status]}`}>{p.status}</span>
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
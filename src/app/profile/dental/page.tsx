"use client";
import Image from "next/image";

export default function DentalPage() {
  return (
    <div className="max-w-4xl mx-auto mt-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#232360]">Dental Dashboard</h1>
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

      {/* Dummy Content */}
      <div className="bg-white rounded-2xl shadow-lg p-10 border border-[#f0f0f5] flex flex-col items-center justify-center min-h-[300px]">
        <div className="text-2xl font-semibold text-[#232360] mb-4">Dental Section</div>
        <div className="text-gray-500 text-lg mb-6">This is a placeholder for dental-related content. Add your dental dashboard, charts, or information here.</div>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-700 transition font-semibold">Add Dental Record</button>
      </div>
    </div>
  );
} 
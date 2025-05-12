"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DentalPage() {
  const router = useRouter();
  
  return (
    <div className="max-w-4xl mx-auto mt-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a2e]">Dental Dashboard</h1>
          <p className="text-[#4a4a6a] text-sm mt-1">Mon, 25 May 2025</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#e0e0e7] shadow-md bg-white">
            <Image 
              src="/images/default-avatar.png" 
              alt="profile" 
              width={48} 
              height={48}
              className="object-cover"
            />
          </div>
          <button 
            onClick={() => router.push('/')} 
            className="bg-white p-3 rounded-full shadow-md hover:bg-[#f8f9ff] transition-all duration-300 flex items-center justify-center group"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor" 
              className="w-6 h-6 text-[#4a4a6a] group-hover:text-[#2563eb] transition-colors duration-300"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Gradient Banner */}
      <div className="w-full h-24 rounded-xl mb-10 bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] flex items-end px-8 shadow-md" />

      {/* Dummy Content */}
      <div className="bg-white rounded-2xl shadow-lg p-10 border border-[#f0f0f5] flex flex-col items-center justify-center min-h-[300px]">
        <div className="text-2xl font-semibold text-[#1a1a2e] mb-4">Dental Section</div>
        <div className="text-[#4a4a6a] text-lg mb-6">This is a placeholder for dental-related content. Add your dental dashboard, charts, or information here.</div>
        <button className="bg-[#4f46e5] text-white px-8 py-3 rounded-lg shadow-md hover:bg-[#4338ca] transition font-semibold">Add Dental Record</button>
      </div>
    </div>
  );
} 
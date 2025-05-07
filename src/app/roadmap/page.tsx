import React from 'react';

export default function RoadmapPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#181818] text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-gray-700">
        <div className="text-2xl font-bold">NEOHUB</div>
        <div className="flex items-center gap-4">
          <button className="text-2xl bg-white text-black rounded-full w-8 h-8 flex items-center justify-center">☰</button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-1/4 bg-white text-black border-r border-gray-300 p-6">
          <h2 className="text-lg font-semibold mb-4 text-black">МЭРГЭЖИЛ</h2>
          <ul className="text-sm space-y-2">
            <li className="text-gray-600">Тухайн мэргэжил</li>
            <li className="hover:text-black cursor-pointer">Roadmap</li>
            <li className="hover:text-black cursor-pointer">asd</li>
            <li className="hover:text-black cursor-pointer">Технологийн анхан шатны ажлууд</li>
          </ul>
        </aside>

        {/* Main Area (empty) */}
        <main className="flex-1 bg-white"></main>
      </div>

      {/* Footer */}
      <footer className="bg-[#181818] border-t border-gray-700 p-8 flex flex-col md:flex-row justify-between text-gray-300 text-sm">
        <div className="mb-4 md:mb-0">
          <div className="mb-2">Making great things in Silicon Valley.</div>
          <div className="flex gap-4 mt-2">
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="LinkedIn">💼</a>
            <a href="#" aria-label="GitHub">🐱</a>
          </div>
        </div>
        <div>
          <div className="font-semibold mb-2">Холбоо барих</div>
          <div className="flex items-center gap-2"><span>✉️</span> neohub009@gmail.com</div>
          <div className="flex items-center gap-2"><span>📞</span> (976) 9999-9999</div>
        </div>
        <div>
          <div className="font-semibold mb-2">EXPLORE</div>
          <div className="flex flex-col gap-1">
            <a href="#" className="hover:underline">Work</a>
            <a href="#" className="hover:underline">Map</a>
            <a href="#" className="hover:underline">Search</a>
            <a href="#" className="hover:underline">Profile</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
} 
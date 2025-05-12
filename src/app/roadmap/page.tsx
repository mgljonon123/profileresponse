'use client';

import React, { useState } from 'react';
import Menu from '../components/Menu';
import Footer from '../components/footer';
import Link from 'next/link';

export default function RoadmapPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#181818] text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-gray-700">
        <Link href="/" className="text-2xl font-bold focus:outline-none">
        START UP
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleMenu}
            className="w-7 h-7 bg-gray-200 text-black rounded-full flex items-center justify-center text-xs focus:outline-none hover:bg-gray-300 transition-colors duration-300 z-50"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
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
      <Footer />
      <Menu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </div>
  );
} 
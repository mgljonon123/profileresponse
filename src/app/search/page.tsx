'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Menu from '../components/Menu';
import Footer from '../components/footer';

const professions = [
  {
    icon: '📷',
    title: 'Cinematographer',
    rating: 5,
  },
  {
    icon: '🎨',
    title: 'Graphic design',
    rating: 5,
  },
];

export default function SearchPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleProfessionClick = (title: string) => {
    router.push(`/careerdetail?title=${encodeURIComponent(title)}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#181818] text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-gray-700">
        <Link href="/" className="text-2xl font-bold focus:outline-none">
          NEOHUB
        </Link>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 rounded border border-gray-400 text-black"
            style={{ width: 200 }}
          />
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
        <aside className="w-1/4 bg-[#181818] border-r border-gray-700 p-6">
          <h2 className="text-lg font-semibold mb-4">МЭРГЭЖИЛ</h2>
          <ul className="text-sm space-y-2">
            <li className="text-gray-400">Тухайн мэргэжил</li>
            <li className="hover:text-white cursor-pointer">Нэмэлт ажил</li>
            <li className="hover:text-white cursor-pointer">Жилд 30,000$ аас дээш цалинтай ажлууд</li>
            <li className="hover:text-white cursor-pointer">Технологийн анхан шатны ажлууд</li>
          </ul>
        </aside>

        {/* Search Results */}
        <main className="flex-1 p-8 bg-white text-black">
          <div className="mb-4 text-sm text-gray-600">2 илэрц</div>
          <h3 className="text-lg font-semibold mb-6">Таны тохирлууд</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {professions.map((prof, idx) => (
              <div
                key={idx}
                className="flex items-center bg-white rounded-lg p-6 shadow-lg border border-gray-200"
              >
                <button
                  onClick={() => handleProfessionClick(prof.title)}
                  className="flex-1 flex items-center transition-opacity active:transform-none active:scale-100"
                >
                  <span className="text-4xl mr-6">{prof.icon}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-lg text-gray-800 mb-2">{prof.title}</div>
                    <div className="flex items-center">
                      {Array.from({ length: prof.rating }).map((_, i) => (
                        <span key={i} className="text-[#E94A1F] text-lg">★</span>
                      ))}
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => handleProfessionClick(prof.title)}
                  className="ml-4 p-2 text-[#E94A1F] hover:bg-[#E94A1F] hover:text-white rounded-full transition-colors duration-300 active:transform-none active:scale-100"
                >
                  <span className="text-2xl">→</span>
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
      <Menu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </div>
  );
} 
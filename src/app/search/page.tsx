import React from 'react';

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
  return (
    <div className="min-h-screen flex flex-col bg-[#181818] text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-gray-700">
        <div className="text-2xl font-bold">NEOHUB</div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 rounded border border-gray-400 text-black"
            style={{ width: 200 }}
          />
          <button className="text-2xl">☰</button>
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
          <div className="space-y-4">
            {professions.map((prof, idx) => (
              <div
                key={idx}
                className="flex items-center bg-gray-100 rounded p-4 shadow border border-gray-200"
              >
                <span className="text-3xl mr-4">{prof.icon}</span>
                <div>
                  <div className="font-medium text-sm text-gray-700">{prof.title}</div>
                  <div className="flex items-center mt-1">
                    {Array.from({ length: prof.rating }).map((_, i) => (
                      <span key={i} className="text-red-500 text-xs">★</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
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
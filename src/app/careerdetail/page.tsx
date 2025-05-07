import React from 'react';

export default function CareerDetailPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#6b655a] text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-[#181818] border-b border-gray-700">
        <div className="text-2xl font-bold">NEOHUB</div>
        <div className="flex items-center gap-4">
          <button className="text-2xl bg-white text-black rounded-full w-8 h-8 flex items-center justify-center">☰</button>
        </div>
      </header>

      {/* Title */}
      <div className="text-center mt-8 text-xl font-medium">Cinematographe Director of Photography / DOP</div>

      {/* Floating Card */}
      <div className="absolute right-24 top-24">
        <div className="bg-white text-black rounded-lg shadow-lg p-4 w-56">
          <div className="flex items-center mb-2">
            <span className="text-3xl mr-2">📷</span>
            <span className="font-medium">Cinematographer</span>
          </div>
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-red-500 text-xs">★</span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="flex justify-center mt-8">
        <div className="bg-white text-black rounded-xl shadow-lg w-full max-w-xl">
          {/* Black Top Section */}
          <div className="bg-black text-white rounded-t-xl p-6 text-center">
            <div className="flex justify-center mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-yellow-400 text-lg">★</span>
              ))}
            </div>
            <div className="font-semibold mb-1">You are a 5.0 star moviem!</div>
            <div className="text-xs text-gray-300">
              Кино зураглаачийн дүрд өөрийгөө бэлдэж буй бол, энэ чиглэлийн ажлын байр, шаардлагатай ур чадвар, анхаарах зүйлсийг эндээс олж мэдээрэй.
            </div>
          </div>
          {/* Card Content */}
          <div className="p-6 space-y-6">
            {/* Үндсэн үүрэг */}
            <div>
              <div className="font-semibold mb-2">Үндсэн үүрэг:</div>
              <ul className="list-decimal list-inside text-sm space-y-1">
                <li>Кино зураг авалт, зураглаачийн үүрэг гүйцэтгэх</li>
                <li>Гэрэлтүүлэг, камерын тохиргоо хийх</li>
                <li>Зураг авалтын багтай хамтран ажиллах</li>
                <li>Зураг авалтын төлөвлөгөө боловсруулах</li>
                <li>Зураг авалтын явцад хяналт тавих</li>
              </ul>
              <div className="flex justify-end mt-2">
                <img src="https://cdn-icons-png.flaticon.com/512/2922/2922017.png" alt="camera" className="w-12 h-12" />
              </div>
            </div>
            {/* Анхаарах зүйлс */}
            <div>
              <div className="font-semibold mb-2">Анхаарах зүйлс</div>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Камер - техникийн мэдлэг</li>
                <li>Гэрэлтүүлэг - оновчтой сонголт</li>
                <li>Багаж хэрэгслийн зохистой хэрэглээ</li>
                <li>Багаар ажиллах чадвар</li>
              </ul>
              <div className="border-b border-gray-300 mt-2" />
            </div>
            {/* Шаардлагатай чадварууд */}
            <div>
              <div className="font-semibold mb-2">Шаардлагатай чадварууд</div>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Уран бүтээлийн мэдрэмж</li>
                <li>Техникийн ур чадвар</li>
                <li>Харилцааны чадвар</li>
                <li>Хариуцлагатай байдал</li>
                <li>Шинийг эрэлхийлэх сэтгэлгээ</li>
              </ul>
              <div className="border-b border-gray-300 mt-2" />
            </div>
            {/* Суралцах зүйлс */}
            <div>
              <div className="font-semibold mb-2">Суралцах зүйлс:</div>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Зураг авалтын орчин, техникүүд</li>
                <li>Кино зураглаачийн түүх</li>
                <li>Ажлын байрны дүрэм журам</li>
              </ul>
              <div className="border-b border-gray-300 mt-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#181818] border-t border-gray-700 p-8 flex flex-col md:flex-row justify-between text-gray-300 text-sm mt-8">
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
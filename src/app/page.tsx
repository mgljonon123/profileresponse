import React from 'react';

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      {/* Section 1: Hero */}
      <section className="w-full min-h-screen bg-[#181818] flex flex-col justify-start px-16 py-10 relative overflow-hidden">
        <div className="text-3xl font-bold text-white mb-16">NEOHUB</div>
        <div className="mt-8">
          <div className="text-[#FF5C39] text-sm mb-4">БИД БОЛ УРАМ ЗОРИГИЙН ГАЛ</div>
          <div className="text-white text-4xl font-semibold mb-6 leading-snug">Ирээдүйд хүрэх таны<br />зам эндээс эхэлнэ.</div>
          <div className="text-gray-300 text-lg">Карьерынхаа хаалгыг өнөөдөр нээгээрэй – таны боломж хязгааргүй.</div>
        </div>
        <button className="absolute top-8 right-8 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center text-2xl">☰</button>
        {/* Decorative background text or shapes can be added here if needed */}
      </section>

      {/* Section 2: Career Choice */}
      <section className="w-full min-h-screen bg-white flex flex-row items-center justify-between px-16 py-10 relative">
        <div className="absolute top-8 left-8 text-2xl text-black border border-black rounded-full w-10 h-10 flex items-center justify-center">∧</div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-black text-lg mb-2">ЯМАР МЭРГЭЖИЛ</div>
          <div className="text-[120px] text-[#ededed] font-bold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none" style={{zIndex:0}}>МЭРГЭЖИЛ</div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center z-10">
          <div className="w-[340px] h-[340px] bg-[#e6e9ee] rotate-12 flex items-center justify-center shadow-lg overflow-hidden">
            <img src="https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&w=400" alt="Career" className="w-full h-full object-cover -rotate-12" />
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center items-end z-10">
          <div className="text-black text-base mb-4">Та ямар мэргэжил, карьерын замыг сонгохыг хүсэж байна вэ?</div>
          <button className="bg-white border border-gray-300 rounded-full px-6 py-2 flex items-center gap-2 shadow">Хариултаа олох <span className="text-xl">+</span></button>
        </div>
        <div className="absolute right-8 bottom-1/2 text-black text-xs tracking-widest rotate-90 origin-bottom-right" style={{letterSpacing:'0.2em'}}>SCROLL</div>
        <button className="absolute top-8 right-8 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl">☰</button>
      </section>

      {/* Section 3: Success Key */}
      <section className="w-full min-h-screen bg-[#6b655a] flex flex-col justify-center px-16 py-10 relative">
        <div className="absolute top-8 left-8 text-2xl text-white border border-white rounded-full w-10 h-10 flex items-center justify-center">∧</div>
        <div className="max-w-2xl ml-24 mt-24">
          <div className="text-white text-lg mb-4">Амжилтын түлхүүр</div>
          <div className="text-white text-2xl font-bold leading-relaxed">
            Мэргэжил гэдэг бол хүний хүсэл мөрөөдөл, авьяас чадвар, үнэт зүйлийн уулзвар цэг бөгөөд зөв сонголт нь таныг зөвхөн ажилтай бус, зорилготой, үнэ цэнтэй амьдралтай болгоно .
          </div>
        </div>
        <button className="absolute top-8 right-8 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center text-2xl">☰</button>
        <div className="absolute right-8 bottom-1/2 text-white text-xs tracking-widest rotate-90 origin-bottom-right" style={{letterSpacing:'0.2em'}}>SCROLL</div>
      </section>

      {/* Section 4: Pricing */}
      <section className="w-full min-h-screen bg-white flex flex-col justify-center items-center px-16 py-10 relative">
        <div className="absolute top-8 left-8 text-2xl text-black border border-black rounded-full w-10 h-10 flex items-center justify-center">∧</div>
        <div className="flex flex-row gap-12 mt-24">
          {/* Free */}
          <div className="bg-black text-white rounded-2xl p-8 w-64 flex flex-col items-center shadow-lg">
            <div className="text-lg font-semibold mb-2">Үнэгүй</div>
            <div className="text-3xl font-bold mb-1">$0</div>
            <div className="text-sm mb-4">/cap</div>
            <ul className="text-sm mb-6 space-y-2">
              <li>✔ Хязгаартай тест</li>
              <li>✔ MBTI , BigFive , Holland Code тест</li>
              <li>✔ Карьер зөвлөмж</li>
            </ul>
            <button className="bg-[#6b655a] text-white rounded-full px-8 py-2 font-semibold">GET STARTED</button>
          </div>
          {/* Medium */}
          <div className="bg-black text-white rounded-2xl p-8 w-64 flex flex-col items-center shadow-lg">
            <div className="text-lg font-semibold mb-2">Дундаж</div>
            <div className="text-3xl font-bold mb-1">$5</div>
            <div className="text-sm mb-4">/cap</div>
            <ul className="text-sm mb-6 space-y-2">
              <li>✔ Карьерын зорилго , Авьяас чадвар , Priorities</li>
              <li>✔ 10 тест</li>
              <li>✔ Бүтээмжийн зөвлөмж</li>
            </ul>
            <button className="bg-[#b49a6a] text-white rounded-full px-8 py-2 font-semibold">GET STARTED</button>
          </div>
          {/* Premium */}
          <div className="bg-black text-white rounded-2xl p-8 w-64 flex flex-col items-center shadow-lg">
            <div className="text-lg font-semibold mb-2">Янзын</div>
            <div className="text-3xl font-bold mb-1">$10</div>
            <div className="text-sm mb-4">/mo</div>
            <ul className="text-sm mb-6 space-y-2">
              <li>✔ Хязгааргүй тест</li>
              <li>✔ Roadmap зам</li>
              <li>✔ Voice messages anywhere</li>
            </ul>
            <button className="bg-[#b49a6a] text-white rounded-full px-8 py-2 font-semibold">GET STARTED</button>
          </div>
        </div>
        <button className="absolute top-8 right-8 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl">☰</button>
        <div className="absolute right-8 bottom-1/2 text-black text-xs tracking-widest rotate-90 origin-bottom-right" style={{letterSpacing:'0.2em'}}>SCROLL</div>
      </section>

      {/* Section 5: Footer */}
      <footer className="w-full bg-[#232121] text-white flex flex-row justify-between items-start px-24 py-16 mt-0">
        <div>
          <div className="mb-6 flex items-center gap-4">
            <span className="border border-white rounded-full w-10 h-10 flex items-center justify-center text-2xl">∧</span>
          </div>
          <div className="mb-4 font-semibold text-lg">Making great things in<br />Silicon Valley.</div>
          <div className="flex gap-6 mt-4 text-2xl">
            <a href="#" aria-label="Instagram"> <span className="text-white">&#x1F4F7;</span> </a>
            <a href="#" aria-label="Facebook"> <span className="text-white">&#x1F4F1;</span> </a>
            <a href="#" aria-label="LinkedIn"> <span className="text-white">&#x1F4BB;</span> </a>
            <a href="#" aria-label="Discord"> <span className="text-white">&#x1F47E;</span> </a>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <div className="font-bold mb-2">Холбоо барих</div>
            <div className="flex items-center gap-2 mb-1"><span className="text-[#FF5C39]">&#9993;</span> <span className="underline">neohub009@gmail.com</span></div>
            <div className="flex items-center gap-2"><span className="text-[#FF5C39]">&#128222;</span> <span className="underline">(976) 9999-9999</span></div>
          </div>
          <div>
            <div className="font-bold mb-2">EXPLORE</div>
            <div className="flex gap-6">
              <a href="#" className="hover:underline">Work</a>
              <a href="#" className="hover:underline">Map</a>
              <a href="#" className="hover:underline">Search</a>
              <a href="#" className="hover:underline">Profile</a>
              <a href="#" className="hover:underline">Contact</a>
            </div>
          </div>
          <div className="text-xs text-gray-400 mt-4">Чингэлтэй дүүрэг . 4-р хороо. Барилгачдын талбай зүүн хойд.</div>
        </div>
      </footer>
    </div>
  );
}

import React from "react";

const professions = [
  "🧑‍💻 Шинжлэх ухаан ба технологи",
  "💼 Бизнес, менежмент",
  "🩺 Эрүүл мэнд",
  "🎨 Урлаг, дизайн",
  "⚖️ Хууль, нийгэм",
];

const directions = [
  "🌍 Байгаль орчин, газар зүй",
  "📚 Боловсрол, хэл шинжлэл",
  "⚖️ Хууль, нийгэм",
  "🚚 Тээвэр, логистик",
  "🏛️ Хууль, улс төр",
  "🏗️ Барилга, техникийн ажил",
];

const ResultPage: React.FC = () => {
  return (
    <div className="min-h-screen w-screen bg-white text-black flex flex-col">
      <header className="bg-black h-32 flex items-center justify-center relative text-white">
        <span className="absolute left-0 right-0 top-0 bottom-0 opacity-10 flex items-center justify-center text-[120px] font-black select-none pointer-events-none">
          A
        </span>
      </header>

      <main className="flex-1 bg-gray-100 flex flex-col py-8 px-4">
        <div className="max-w-4xl w-full mx-auto">
          <h2 className="text-center text-2xl font-bold mb-2 mt-4">
            Баяр хүргэе!
          </h2>
          <h3 className="text-center text-lg font-semibold mb-8">
            Доорх үр дүнг харна уу.
          </h3>

          <div className="mb-8">
            <div className="text-base font-bold mb-4">
              Таны хамгийн тохиромжтой мэргэжлүүд
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {professions.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-md px-4 py-2 min-h-[40px] font-medium flex items-center shadow"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="text-base font-bold mb-4">
              Таны хамгийн тохирох мэргэжлийн чиглэлүүд
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {directions.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-md px-4 py-2 min-h-[40px] font-medium flex items-center shadow"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-md px-4 py-6 min-h-[40px] shadow"
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#232323] p-8 flex flex-col md:flex-row justify-between items-center text-gray-200 text-xs mt-auto">
        <div className="mb-2 md:mb-0 flex items-center gap-2">
          <span className="text-lg">ⓘ</span>
          <span>Making great things in Silicon Valley.</span>
        </div>
        <div className="flex flex-col items-end">
          <div className="font-bold mb-1">Холбоо</div>
          <div className="mb-1">
            Сайт:{" "}
            <span className="text-orange-400">examplemongolian@site.mn</span>
          </div>
          <div className="mb-1">Утас: 9999-9999</div>
          <div className="mb-1">БЗД, Улаанбаатар</div>
          <div className="flex gap-2 mt-1">
            <span>FB</span>
            <span>IG</span>
            <span>Tw</span>
            <span>Pro</span>
            <span>Cont</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResultPage;

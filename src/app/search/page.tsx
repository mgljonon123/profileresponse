"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Menu from "../components/Menu";
import Footer from "../components/footer";

interface SalaryRange {
  доод: number;
  дээд: number;
}

interface Profession {
  "№": number;
  мэргэжил: string;
  цалингийн_хязгаар: SalaryRange;
  нэгж: string;
  боловсролын_түвшин?: string;
  it_технологи?: boolean;
  зураг?: string;
}

export default function SearchPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [filteredProfessions, setFilteredProfessions] = useState<Profession[]>(
    []
  );
  const [displayedProfessions, setDisplayedProfessions] = useState<
    Profession[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [minSalaryRange, setMinSalaryRange] = useState<number | null>(null);
  const [additionalJobs, setAdditionalJobs] = useState(false);
  const [educationLevel, setEducationLevel] = useState<string | null>(null);
  const [itTechJobs, setItTechJobs] = useState(false);
  const [businessJobs, setBusinessJobs] = useState(false);
  const router = useRouter();

  const educationLevels = ["Бакалавр", "Мастер", "Доктор", "Дунд мэргэжил"];

  useEffect(() => {
    fetch("/professions.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch professions.json");
        }
        return res.json();
      })
      .then((data) => {
        const professionsData = Array.isArray(data.мэргэжлүүд)
          ? data.мэргэжлүүд
          : [];
        setProfessions(professionsData);
        setFilteredProfessions(professionsData);
        setDisplayedProfessions(professionsData.slice(0, 30));
      })
      .catch((err) => {
        console.error("Failed to load professions:", err);
        setProfessions([]);
        setFilteredProfessions([]);
        setDisplayedProfessions([]);
      });
  }, []);

  const getDisplayEducationLevel = (level?: string) => {
    if (!level) return "Тодорхойгүй";
    if (["Коллеж", "Техникч", "Профессийн сургалт"].includes(level)) {
      return "Дунд мэргэжил";
    }
    return level;
  };

  useEffect(() => {
    if (!Array.isArray(professions)) {
      setFilteredProfessions([]);
      setDisplayedProfessions([]);
      return;
    }

    let filtered = [...professions];

    if (searchQuery) {
      filtered = filtered.filter((prof) =>
        prof.мэргэжил.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (minSalaryRange !== null) {
      filtered = filtered.filter((prof) => {
        const minSalary = prof.цалингийн_хязгаар.доод;
        if (minSalaryRange === 1000000)
          return minSalary >= 1000000 && minSalary < 2000000;
        if (minSalaryRange === 2000000)
          return minSalary >= 2000000 && minSalary < 3000000;
        if (minSalaryRange === 3000000)
          return minSalary >= 3000000 && minSalary < 4000000;
        if (minSalaryRange === 4000000)
          return minSalary >= 4000000 && minSalary < 5000000;
        if (minSalaryRange === 5000000) return minSalary >= 5000000;
        return true;
      });
    }

    if (additionalJobs) {
      filtered = filtered.filter((prof) =>
        prof.мэргэжил.toLowerCase().includes("нэмэлт")
      );
    }

    if (educationLevel) {
      filtered = filtered.filter((prof) => {
        const profEducationLevel = prof.боловсролын_түвшин
          ?.trim()
          .toLowerCase();
        if (!profEducationLevel) return false;

        const filterLevel = educationLevel.toLowerCase();

        if (filterLevel === "дунд мэргэжил") {
          return ["коллеж", "техникч", "профессийн сургалт"].includes(
            profEducationLevel
          );
        }
        return profEducationLevel === filterLevel;
      });
    }

    if (itTechJobs) {
      filtered = filtered.filter(
        (prof) =>
          prof.мэргэжил.toLowerCase().includes("it") ||
          prof.мэргэжил.toLowerCase().includes("технологи") ||
          prof.it_технологи === true
      );
    }

    if (businessJobs) {
      filtered = filtered.filter(
        (prof) =>
          prof.мэргэжил.toLowerCase().includes("бизнес") ||
          prof.мэргэжил.toLowerCase().includes("менежер")
      );
    }

    const displayLimit = 30;
    setFilteredProfessions(filtered);
    setDisplayedProfessions(
      filtered.length > 0 ? filtered.slice(0, displayLimit) : []
    );
  }, [
    searchQuery,
    minSalaryRange,
    additionalJobs,
    educationLevel,
    itTechJobs,
    businessJobs,
    professions,
  ]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleProfessionClick = (title: string) => {
    router.push(`/careerdetail?title=${encodeURIComponent(title)}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] text-[#222]">
      <header className="flex items-center justify-between px-8 py-4 border-b border-gray-200 bg-white/80 backdrop-blur-md shadow-sm">
        <Link
          href="/"
          className="text-2xl font-bold focus:outline-none text-[#E94A1F]"
        >
          START UP
        </Link>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Хайх..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 text-[#222] text-lg focus:outline-none focus:ring-2 focus:ring-[#E94A1F] bg-white shadow-sm"
            style={{ width: 250 }}
          />
          <button
            onClick={toggleMenu}
            className="w-9 h-9 bg-[#E94A1F] text-white rounded-full flex items-center justify-center text-lg focus:outline-none hover:bg-[#c43a13] transition-colors duration-300 z-50 shadow"
            aria-label={isMenuOpen ? "Менюг хаах" : "Менюг нээх"}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="sticky top-0 h-screen w-[220px] min-w-[200px] max-w-[260px] bg-white/90 border-r border-gray-200 p-6 shadow-sm">
          <h2 className="text-base font-bold mb-4 text-[#E94A1F]">МЭРГЭЖИЛ</h2>
          <div className="text-sm space-y-4">
            <div>
              <label className="block text-gray-400 font-medium mb-2 text-xs">
                Хамгийн бага цалин (₮)
              </label>
              <select
                value={minSalaryRange ?? 0}
                onChange={(e) =>
                  setMinSalaryRange(Number(e.target.value) || null)
                }
                className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-black text-sm focus:outline-none focus:ring-2 focus:ring-[#E94A1F]"
              >
                <option value={0}>Бүгд</option>
                <option value={1000000}>1,000,000₮ - 1,999,999₮</option>
                <option value={2000000}>2,000,000₮ - 2,999,999₮</option>
                <option value={3000000}>3,000,000₮ - 3,999,999₮</option>
                <option value={4000000}>4,000,000₮ - 4,999,999₮</option>
                <option value={5000000}>5,000,000₮+</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 font-medium mb-2 text-xs">
                Боловсролын түвшин
              </label>
              <select
                value={educationLevel ?? ""}
                onChange={(e) => setEducationLevel(e.target.value || null)}
                className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-black text-sm focus:outline-none focus:ring-2 focus:ring-[#E94A1F]"
              >
                <option value="">Бүгд</option>
                {educationLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="additional-jobs"
                checked={additionalJobs}
                onChange={(e) => setAdditionalJobs(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 focus:ring-[#E94A1F]"
              />
              <label
                htmlFor="additional-jobs"
                className="text-gray-400 text-xs"
              >
                Нэмэлт ажлуудыг харуулах
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="it-tech-jobs"
                checked={itTechJobs}
                onChange={(e) => setItTechJobs(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 focus:ring-[#E94A1F]"
              />
              <label htmlFor="it-tech-jobs" className="text-gray-400 text-xs">
                IT/Технологийн ажлуудыг харуулах
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="business-jobs"
                checked={businessJobs}
                onChange={(e) => setBusinessJobs(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 focus:ring-[#E94A1F]"
              />
              <label htmlFor="business-jobs" className="text-gray-400 text-xs">
                Бизнесийн ажлуудыг харуулах
              </label>
            </div>
          </div>
        </aside>
        <main className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-8 text-black">
            Мэргэжлийн Жагсаалт
          </h1>
          {displayedProfessions.length === 0 ? (
            <p className="text-gray-400">Мэргэжил олдсонгүй.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {displayedProfessions.map((prof) => (
                <div
                  key={prof["№"]}
                  onClick={() => handleProfessionClick(prof.мэргэжил)}
                  className="flex items-center bg-white rounded-2xl shadow-lg p-6 mb-4 cursor-pointer hover:bg-[#f8e7e2] transition-colors duration-300 min-h-[120px] w-full border border-gray-100 hover:shadow-xl group"
                  style={{ minHeight: 120 }}
                >
                  <div className="w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 mr-8 border border-gray-200 shadow-sm">
                    <img
                      src={prof.зураг || "/default-image.png"}
                      alt={prof.мэргэжил}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-lg font-semibold text-black mb-2 group-hover:text-gray-800">
                      {prof.мэргэжил || "N/A"}
                    </div>
                    <div className="text-gray-700 text-sm mb-1">
                      №: {prof["№"] ?? "N/A"}
                    </div>
                    <div className="text-gray-700 text-sm mb-1">
                      Цалингийн хязгаар:{" "}
                      {prof.цалингийн_хязгаар?.доод?.toLocaleString() || "N/A"}₮
                      -{" "}
                      {prof.цалингийн_хязгаар?.дээд?.toLocaleString() || "N/A"}₮
                    </div>
                    <div className="text-gray-700 text-sm mb-1">
                      Боловсролын түвшин:{" "}
                      {getDisplayEducationLevel(prof.боловсролын_түвшин) ||
                        "N/A"}
                    </div>
                    <div className="text-gray-700 text-sm mb-1">
                      IT технологи:{" "}
                      {prof.it_технологи !== undefined
                        ? prof.it_технологи
                          ? "Тийм"
                          : "Үгүй"
                        : "N/A"}
                    </div>
                  </div>
                  <div className="ml-6 text-black text-xl opacity-70 group-hover:opacity-100 transition-opacity duration-200">
                    &rarr;
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {isMenuOpen && <Menu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />}

      <Footer />
    </div>
  );
}

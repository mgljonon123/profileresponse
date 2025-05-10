'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Menu from '../components/Menu';
import Footer from '../components/footer';

interface SalaryRange {
  доод: number;
  дээд: number;
}

interface Profession {
  '№': number;
  мэргэжил: string;
  цалингийн_хязгаар: SalaryRange;
  нэгж: string;
  боловсролын_түвшин?: string;
  it_технологи?: boolean;
}

export default function SearchPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [filteredProfessions, setFilteredProfessions] = useState<Profession[]>([]);
  const [displayedProfessions, setDisplayedProfessions] = useState<Profession[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [minSalaryRange, setMinSalaryRange] = useState<number | null>(null);
  const [additionalJobs, setAdditionalJobs] = useState(false);
  const [educationLevel, setEducationLevel] = useState<string | null>(null);
  const [itTechJobs, setItTechJobs] = useState(false);
  const [businessJobs, setBusinessJobs] = useState(false);
  const router = useRouter();

  const educationLevels = ['Бакалавр', 'Мастер', 'Доктор', 'Дунд мэргэжил'];

  useEffect(() => {
    fetch('/professions.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch professions.json');
        }
        return res.json();
      })
      .then((data) => {
        const professionsData = Array.isArray(data.мэргэжлүүд) ? data.мэргэжлүүд : [];
        setProfessions(professionsData);
        setFilteredProfessions(professionsData);
        setDisplayedProfessions(professionsData.slice(0, 30));
      })
      .catch((err) => {
        console.error('Failed to load professions:', err);
        setProfessions([]);
        setFilteredProfessions([]);
        setDisplayedProfessions([]);
      });
  }, []);

  const getDisplayEducationLevel = (level?: string) => {
    if (!level) return 'Тодорхойгүй';
    if (['Коллеж', 'Техникч', 'Профессийн сургалт'].includes(level)) {
      return 'Дунд мэргэжил';
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
        if (minSalaryRange === 1000000) return minSalary >= 1000000 && minSalary < 2000000;
        if (minSalaryRange === 2000000) return minSalary >= 2000000 && minSalary < 3000000;
        if (minSalaryRange === 3000000) return minSalary >= 3000000 && minSalary < 4000000;
        if (minSalaryRange === 4000000) return minSalary >= 4000000 && minSalary < 5000000;
        if (minSalaryRange === 5000000) return minSalary >= 5000000;
        return true;
      });
    }

    if (additionalJobs) {
      filtered = filtered.filter((prof) =>
        prof.мэргэжил.toLowerCase().includes('нэмэлт')
      );
    }

    if (educationLevel) {
      filtered = filtered.filter((prof) => {
        const profEducationLevel = prof.боловсролын_түвшин?.trim().toLowerCase();
        if (!profEducationLevel) return false;

        const filterLevel = educationLevel.toLowerCase();

        if (filterLevel === 'дунд мэргэжил') {
          return ['коллеж', 'техникч', 'профессийн сургалт'].includes(profEducationLevel);
        }
        return profEducationLevel === filterLevel;
      });
    }

    if (itTechJobs) {
      filtered = filtered.filter((prof) =>
        prof.мэргэжил.toLowerCase().includes('it') ||
        prof.мэргэжил.toLowerCase().includes('технологи') ||
        prof.it_технологи === true
      );
    }

    if (businessJobs) {
      filtered = filtered.filter((prof) =>
        prof.мэргэжил.toLowerCase().includes('бизнес') ||
        prof.мэргэжил.toLowerCase().includes('менежер')
      );
    }

    const displayLimit = 30;
    setFilteredProfessions(filtered);
    setDisplayedProfessions(filtered.length > 0 ? filtered.slice(0, displayLimit) : []);
  }, [searchQuery, minSalaryRange, additionalJobs, educationLevel, itTechJobs, businessJobs, professions]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleProfessionClick = (title: string) => {
    router.push(`/careerdetail?title=${encodeURIComponent(title)}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#181818] text-white">

      <header className="flex items-center justify-between px-8 py-4 border-b border-gray-700">
        <Link href="/" className="text-2xl font-bold focus:outline-none">
        START UP
        </Link>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Хайх..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-400 text-black text-lg focus:outline-none focus:ring-2 focus:ring-[#E94A1F]"
            style={{ width: 250 }}
          />
          <button
            onClick={toggleMenu}
            className="w-9 h-9 bg-gray-200 text-black rounded-full flex items-center justify-center text-lg focus:outline-none hover:bg-gray-300 transition-colors duration-300 z-50"
            aria-label={isMenuOpen ? 'Менюг хаах' : 'Менюг нээх'}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      <div className="flex flex-1">

        <aside className="w-1/4 bg-[#181818] border-r border-gray-700 p-6">
          <h2 className="text-xl font-bold mb-6 text-[#E94A1F]">МЭРГЭЖИЛ</h2>
          <div className="text-lg space-y-6">

            <div>
              <label className="block text-gray-300 font-medium mb-3">Хамгийн бага цалин (₮)</label>
              <select
                value={minSalaryRange ?? 0}
                onChange={(e) => setMinSalaryRange(Number(e.target.value) || null)}
                className="w-full px-4 py-2 rounded-lg border border-gray-400 text-black text-lg focus:outline-none focus:ring-2 focus:ring-[#E94A1F]"
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
              <label className="block text-gray-300 font-medium mb-3">Боловсролын түвшин</label>
              <select
                value={educationLevel ?? ''}
                onChange={(e) => setEducationLevel(e.target.value || null)}
                className="w-full px-4 py-2 rounded-lg border border-gray-400 text-black text-lg focus:outline-none focus:ring-2 focus:ring-[#E94A1F]"
              >
                <option value="">Бүгд</option>
                {educationLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="additional-jobs"
                checked={additionalJobs}
                onChange={(e) => setAdditionalJobs(e.target.checked)}
                className="w-5 h-5 rounded border-gray-400 focus:ring-[#E94A1F]"
              />
              <label htmlFor="additional-jobs" className="text-gray-300">
                Нэмэлт ажлуудыг харуулах
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="it-tech-jobs"
                checked={itTechJobs}
                onChange={(e) => setItTechJobs(e.target.checked)}
                className="w-5 h-5 rounded border-gray-400 focus:ring-[#E94A1F]"
              />
              <label htmlFor="it-tech-jobs" className="text-gray-300">
                IT/Технологийн ажлуудыг харуулах
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="business-jobs"
                checked={businessJobs}
                onChange={(e) => setBusinessJobs(e.target.checked)}
                className="w-5 h-5 rounded border-gray-400 focus:ring-[#E94A1F]"
              />
              <label htmlFor="business-jobs" className="text-gray-300">
                Бизнесийн ажлуудыг харуулах
              </label>
            </div>
          </div>
        </aside>
        <main className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-8">Мэргэжлийн Жагсаалт</h1>
          {displayedProfessions.length === 0 ? (
            <p className="text-gray-400">Мэргэжил олдсонгүй.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProfessions.map((prof) => (
                <div
                  key={prof['№']}
                  onClick={() => handleProfessionClick(prof.мэргэжил)}
                  className="p-6 bg-[#2A2A2A] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                >
                  <h2 className="text-xl font-semibold text-[#E94A1F]">{prof.мэргэжил}</h2>
                  <p className="text-gray-400 mt-2">
                    Цалингийн хязгаар: {prof.цалингийн_хязгаар.доод.toLocaleString()}₮ -{' '}
                    {prof.цалингийн_хязгаар.дээд.toLocaleString()}₮
                  </p>
                  <p className="text-gray-400 mt-1">
                    Боловсролын түвшин: {getDisplayEducationLevel(prof.боловсролын_түвшин) || 'Тодорхойгүй'}
                  </p>
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
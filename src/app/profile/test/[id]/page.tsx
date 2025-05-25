"use client";

import Image from "next/image";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Roboto } from "next/font/google";

interface TestResult {
  career: string;
  match: number;
  tests: {
    mbti: string;
    holland: string;
    bigFive: {
      openness: number;
      conscientiousness: number;
      extraversion: number;
      agreeableness: number;
      neuroticism: number;
    };
    eq: number;
  };
  takenAt: string;
  aiResponse?: string;
}

const getChartData = (testResult: TestResult, selectedTest: string) => {
  switch (selectedTest) {
    case "MBTI":
      return [
        { name: "E/I", score: 65 }, // These would come from your database
        { name: "S/N", score: 60 },
        { name: "T/F", score: 55 },
        { name: "J/P", score: 70 },
      ];
    case "Holland":
      return [
        { name: "Realistic", score: 75 },
        { name: "Investigative", score: 85 },
        { name: "Artistic", score: 45 },
        { name: "Social", score: 60 },
        { name: "Enterprising", score: 40 },
        { name: "Conventional", score: 65 },
      ];
    case "EQ":
      return [
        { name: "Өөрийгөө Мэдэх", score: 82 },
        { name: "Өөрийгөө Удирдах", score: 78 },
        { name: "Урам Зориг", score: 85 },
        { name: "Энэрэл Хайр", score: 80 },
        { name: "Нийгмийн Ур чадвар", score: 75 },
      ];
    case "Big Five":
      return [
        { name: "Openness", score: testResult.tests.bigFive.openness },
        {
          name: "Conscientiousness",
          score: testResult.tests.bigFive.conscientiousness,
        },
        { name: "Extraversion", score: testResult.tests.bigFive.extraversion },
        {
          name: "Agreeableness",
          score: testResult.tests.bigFive.agreeableness,
        },
        { name: "Neuroticism", score: testResult.tests.bigFive.neuroticism },
      ];
    default:
      return [];
  }
};

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function TestDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [nickName, setNickName] = useState("Neo");
  const [profilePic, setProfilePic] = useState(
    "/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
  );
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTest, setSelectedTest] = useState("Big Five");
  const router = useRouter();
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  // Fetch test result from API
  useEffect(() => {
    const fetchTestResult = async () => {
      try {
        const response = await fetch(`/api/profile/test/${resolvedParams.id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch test result");
        }

        setTestResult(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTestResult();
  }, [resolvedParams.id]);

  // Fetch profile image and nickname from API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profile/settings");
        const data = await response.json();
        if (data.success) {
          setNickName(data.data.nickname || "Neo");
          setProfilePic(
            data.data.profilePicture ||
              "/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
          );
          return;
        }
      } catch {}
      // fallback to localStorage or default
      const storedNickName =
        typeof window !== "undefined" ? localStorage.getItem("nickName") : null;
      const storedProfilePic =
        typeof window !== "undefined"
          ? localStorage.getItem("profilePic")
          : null;
      setNickName(storedNickName || "Neo");
      setProfilePic(
        storedProfilePic ||
          "/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
      );
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-none mx-auto px-0 py-8 flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-none mx-auto px-0 py-8 flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  if (!testResult) {
    return (
      <div className="w-full max-w-none mx-auto px-0 py-8 flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Test result not found</div>
      </div>
    );
  }

  const chartData = getChartData(testResult, selectedTest);

  return (
    <div className="max-w-6xl mx-auto mt-8 scroll-smooth">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#232360]">
            Сайн Байна уу? <span className="text-[#F59E0B]">{nickName}</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {new Date().toLocaleDateString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 shadow-sm aspect-square">
            <Image
              src={profilePic}
              alt="profile"
              width={48}
              height={48}
              className="object-cover w-full h-full aspect-square"
            />
          </div>
          <button
            onClick={() => router.push("/profile")}
            className="bg-white p-3 rounded-full shadow hover:bg-gray-50 transition-all duration-300 flex items-center justify-center group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-gray-600 group-hover:text-[#E94A1F] transition-colors duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Gradient Banner */}
      <div className="w-full h-24 rounded-xl mb-10 bg-gradient-to-r from-[#F59E0B] to-[#F59E0B] flex items-end px-8 shadow-sm" />

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-8 mb-10">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#f0f0f5]">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-xl font-semibold text-[#232360]">
              Тестийн Дүнгийн Шинжилгээ
            </h2>
            <ul className="menu">
              <li className="item">
                <a href="#" className="link">
                  {selectedTest}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M7 10l5 5 5-5z" />
                  </svg>
                </a>
                <ul className="submenu">
                  <li className="submenu-item">
                    <a
                      href="#"
                      className="submenu-link"
                      onClick={() => setSelectedTest("MBTI")}
                    >
                      MBTI Тест
                    </a>
                  </li>
                  <li className="submenu-item">
                    <a
                      href="#"
                      className="submenu-link"
                      onClick={() => setSelectedTest("Holland")}
                    >
                      Холландын Код
                    </a>
                  </li>
                  <li className="submenu-item">
                    <a
                      href="#"
                      className="submenu-link"
                      onClick={() => setSelectedTest("EQ")}
                    >
                      EQ Тест
                    </a>
                  </li>
                  <li className="submenu-item">
                    <a
                      href="#"
                      className="submenu-link"
                      onClick={() => setSelectedTest("Big Five")}
                    >
                      Big Five Тест
                    </a>
                  </li>
                </ul>
              </li>
            </ul>

            <style jsx>{`
              .menu {
                font-size: 14px;
                line-height: 1.4;
                color: #000000;
                width: fit-content;
                display: flex;
                list-style: none;
              }

              .menu a {
                text-decoration: none;
                color: inherit;
                font-family: inherit;
                font-size: inherit;
                line-height: inherit;
              }

              .menu .link {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                padding: 8px 24px;
                border-radius: 12px;
                overflow: hidden;
                transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
                background-color: #f7f7fa;
                border: 1px solid #e5e5e5;
              }

              .menu .link::after {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: #f59e0b;
                z-index: -1;
                transform: scaleX(0);
                transform-origin: left;
                transition: transform 0.48s cubic-bezier(0.23, 1, 0.32, 1);
              }

              .menu .link svg {
                width: 12px;
                height: 12px;
                fill: #000000;
                transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
              }

              .menu .item {
                position: relative;
              }

              .menu .item .submenu {
                display: flex;
                flex-direction: column;
                align-items: center;
                position: absolute;
                top: 100%;
                border-radius: 0 0 12px 12px;
                left: 0;
                width: 100%;
                overflow: hidden;
                border: 1px solid #cccccc;
                opacity: 0;
                visibility: hidden;
                transform: translateY(-8px);
                transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
                z-index: 1;
                pointer-events: none;
                list-style: none;
                background-color: white;
              }

              .menu .item:hover .submenu {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
                pointer-events: auto;
                border-top: transparent;
                border-color: #f59e0b;
              }

              .menu .item:hover .link {
                color: #000000;
                border-radius: 12px 12px 0 0;
                background-color: white;
              }

              .menu .item:hover .link::after {
                transform: scaleX(0);
              }

              .menu .item:hover .link svg {
                fill: #000000;
                transform: rotate(-180deg);
              }

              .submenu .submenu-item {
                width: 100%;
                transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
              }

              .submenu .submenu-link {
                display: block;
                padding: 8px 16px;
                width: 100%;
                position: relative;
                text-align: center;
                transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
                color: #000000;
              }

              .submenu .submenu-item:last-child .submenu-link {
                border-bottom: none;
              }

              .submenu .submenu-link::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                transform: scaleX(0);
                width: 100%;
                height: 100%;
                background-color: #f59e0b;
                z-index: -1;
                transform-origin: left;
                transition: transform 0.48s cubic-bezier(0.23, 1, 0.32, 1);
              }

              .submenu .submenu-link:hover:before {
                transform: scaleX(1);
                transform-origin: right;
              }

              .submenu .submenu-link:hover {
                color: #ffffff;
              }
            `}</style>
          </div>
          <div className="h-[430px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={70}
                  tick={{ fill: "#666" }}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: "#666" }}
                  label={{
                    value: "Оноо (%)",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#666",
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #f0f0f0",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  dot={{
                    fill: "#fff",
                    stroke: "#F59E0B",
                    strokeWidth: 2,
                    r: 6,
                  }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Test Details */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#f0f0f5]">
        <div className="text-[#F59E0B] font-semibold mb-6 text-xl">
          Тестийн Дэлгэрэнгүй
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="font-semibold text-gray-700 mb-2">MBTI</h3>
            <p className="text-xl font-bold text-[#F59E0B]">
              {testResult.tests.mbti}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="font-semibold text-gray-700 mb-2">Холландын Код</h3>
            <p className="text-xl font-bold text-[#F59E0B]">
              {testResult.tests.holland}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="font-semibold text-gray-700 mb-2">EQ Оноо</h3>
            <p className="text-xl font-bold text-[#F59E0B]">
              {testResult.tests.eq}/200
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="font-semibold text-gray-700 mb-2">Тестийн Огноо</h3>
            <p className="text-xl font-bold text-[#F59E0B]">
              {new Date(testResult.takenAt).toLocaleDateString("mn-MN", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* AI Recommendations Section - Enhanced */}
      <div className="mt-8 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F59E0B' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-2xl shadow-xl p-8 border border-orange-100">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-[#F59E0B] to-orange-600 rounded-full opacity-10 -translate-x-8 -translate-y-8" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-yellow-400 to-orange-500 rounded-full opacity-5 translate-x-12 translate-y-12" />

          {/* Header */}
          <div className="relative flex items-center mb-8">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#F59E0B] to-orange-600 rounded-2xl shadow-lg mr-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#F59E0B] to-orange-600 bg-clip-text text-transparent mb-1">
                AI Мэргэжлийн Зөвлөмж
              </h2>
              <p className="text-gray-600 font-medium">
                Таны тест дүнд үндэслэсэн зөвлөмжүүд
              </p>
            </div>
          </div>

          {/* Content */}
          {testResult && testResult.aiResponse ? (
            <div className="space-y-4">
              {testResult.aiResponse
                .split(/\n\d+\./)
                .filter(Boolean)
                .map((item, idx) => {
                  const lines = item.trim().split(/\n/);
                  const title = lines[0];
                  const details = lines.slice(1).join("\n");
                  const isOpen = openIndexes.includes(idx);

                  return (
                    <div
                      key={idx}
                      className={`group relative overflow-hidden rounded-xl border transition-all duration-300 ${
                        isOpen
                          ? "border-[#F59E0B] shadow-lg shadow-orange-100 bg-white"
                          : "border-gray-200 bg-white/80 hover:bg-white hover:border-orange-200 hover:shadow-md"
                      }`}
                    >
                      {/* Accent Line */}
                      <div
                        className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 ${
                          isOpen
                            ? "bg-gradient-to-b from-[#F59E0B] to-orange-600"
                            : "bg-gray-200 group-hover:bg-orange-300"
                        }`}
                      />

                      <button
                        className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none transition-all duration-200"
                        onClick={() =>
                          setOpenIndexes((prev) =>
                            prev.includes(idx)
                              ? prev.filter((i) => i !== idx)
                              : [...prev, idx]
                          )
                        }
                      >
                        <div className="flex items-center space-x-4 flex-1">
                          {/* Number Badge */}
                          <div
                            className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-all duration-200 ${
                              isOpen
                                ? "bg-[#F59E0B] text-white shadow-md"
                                : "bg-gray-100 text-gray-600 group-hover:bg-orange-100 group-hover:text-[#F59E0B]"
                            }`}
                          >
                            {idx + 1}
                          </div>

                          {/* Title */}
                          <span
                            className={`font-semibold text-lg transition-colors duration-200 ${
                              isOpen
                                ? "text-[#232360]"
                                : "text-gray-700 group-hover:text-[#232360]"
                            }`}
                          >
                            {title}
                          </span>
                        </div>

                        {/* Expand Icon */}
                        <div
                          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                            isOpen
                              ? "bg-[#F59E0B] text-white rotate-180"
                              : "bg-gray-100 text-gray-500 group-hover:bg-orange-100 group-hover:text-[#F59E0B]"
                          }`}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </button>

                      {/* Content */}
                      <div
                        className={`transition-all duration-300 ease-out ${
                          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        } overflow-hidden`}
                      >
                        <div className="px-6 pb-6">
                          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4" />
                          <div className="relative bg-gradient-to-br from-white via-orange-25 to-amber-25 rounded-xl p-6 border border-orange-100 shadow-sm">
                            {/* Decorative corner accent */}
                            <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-[#F59E0B] to-transparent opacity-10 rounded-bl-3xl" />

                            {/* Content with better typography */}
                            <div className="relative">
                              <div className="prose prose-gray max-w-none">
                                <div className="text-gray-800 whitespace-pre-line leading-7 text-[15px] font-medium tracking-wide">
                                  {details
                                    .split("\n")
                                    .map((paragraph, pIdx) => {
                                      if (!paragraph.trim()) return null;

                                      // Check if it's a bullet point or list item
                                      if (
                                        paragraph.trim().startsWith("•") ||
                                        paragraph.trim().startsWith("-") ||
                                        paragraph.trim().startsWith("*")
                                      ) {
                                        return (
                                          <div
                                            key={pIdx}
                                            className="flex items-start space-x-3 mb-3 pl-2"
                                          >
                                            <div className="flex-shrink-0 w-2 h-2 bg-[#F59E0B] rounded-full mt-2.5"></div>
                                            <p className="text-gray-700 leading-6 m-0">
                                              {paragraph.replace(
                                                /^[•\-*]\s*/,
                                                ""
                                              )}
                                            </p>
                                          </div>
                                        );
                                      }

                                      // Check if it's a header (contains colon at the end or is short and bold-like)
                                      if (
                                        paragraph.includes(":") &&
                                        paragraph.length < 100
                                      ) {
                                        const [title, ...rest] =
                                          paragraph.split(":");
                                        return (
                                          <div key={pIdx} className="mb-4">
                                            <h4 className="text-[#232360] font-bold text-base mb-2 flex items-center">
                                              <span className="w-1 h-4 bg-[#F59E0B] rounded-full mr-2"></span>
                                              {title.trim()}:
                                            </h4>
                                            {rest.length > 0 && (
                                              <p className="text-gray-700 leading-6 ml-3 mb-3">
                                                {rest.join(":").trim()}
                                              </p>
                                            )}
                                          </div>
                                        );
                                      }

                                      // Regular paragraph
                                      return (
                                        <p
                                          key={pIdx}
                                          className="text-gray-700 leading-6 mb-3 last:mb-0"
                                        >
                                          {paragraph
                                            .replace("@page.tsx", "")
                                            .trim()}
                                        </p>
                                      );
                                    })}
                                </div>
                              </div>

                              {/* Bottom accent line */}
                              <div className="mt-4 h-0.5 bg-gradient-to-r from-[#F59E0B] via-orange-300 to-transparent rounded-full opacity-30"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.002-5.824-2.651M15 9.34c0-.386-.155-.734-.405-1.009C14.1 7.89 13.3 7.5 12.5 7.5s-1.6.39-2.095.831c-.25.275-.405.623-.405 1.009"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-gray-500 text-lg font-medium">
                AI зөвлөмж мэдээлэл байхгүй байна.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Тест дахин авч үзээрэй
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
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
        { name: "Self Awareness", score: 82 },
        { name: "Self Regulation", score: 78 },
        { name: "Motivation", score: 85 },
        { name: "Empathy", score: 80 },
        { name: "Social Skills", score: 75 },
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

export default function TestDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [nickName, setNickName] = useState("Neo");
  const [profilePic, setProfilePic] = useState("/profile.jpg");
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTest, setSelectedTest] = useState("Big Five");
  const router = useRouter();

  // Fetch test result from API
  useEffect(() => {
    const fetchTestResult = async () => {
      try {
        const response = await fetch(`/api/profile/test/${params.id}`);
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
  }, [params.id]);

  // Fetch profile image and nickname from API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profile/settings");
        const data = await response.json();
        if (data.success) {
          setNickName(data.data.nickname || "Neo");
          setProfilePic(data.data.profilePicture || "/profile.jpg");
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
      setProfilePic(storedProfilePic || "/profile.jpg");
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
    <div className="max-w-6xl mx-auto mt-8">
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
              Test Scores Analysis
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
                      MBTI Test
                    </a>
                  </li>
                  <li className="submenu-item">
                    <a
                      href="#"
                      className="submenu-link"
                      onClick={() => setSelectedTest("Holland")}
                    >
                      Holland Code
                    </a>
                  </li>
                  <li className="submenu-item">
                    <a
                      href="#"
                      className="submenu-link"
                      onClick={() => setSelectedTest("EQ")}
                    >
                      EQ Test
                    </a>
                  </li>
                  <li className="submenu-item">
                    <a
                      href="#"
                      className="submenu-link"
                      onClick={() => setSelectedTest("Big Five")}
                    >
                      Big Five Test
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
                    value: "Score (%)",
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
          Test Details
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="font-semibold text-gray-700 mb-2">MBTI</h3>
            <p className="text-xl font-bold text-[#F59E0B]">
              {testResult.tests.mbti}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="font-semibold text-gray-700 mb-2">Holland Code</h3>
            <p className="text-xl font-bold text-[#F59E0B]">
              {testResult.tests.holland}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="font-semibold text-gray-700 mb-2">EQ Score</h3>
            <p className="text-xl font-bold text-[#F59E0B]">
              {testResult.tests.eq}/200
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="font-semibold text-gray-700 mb-2">Test Date</h3>
            <p className="text-xl font-bold text-[#F59E0B]">
              {new Date(testResult.takenAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

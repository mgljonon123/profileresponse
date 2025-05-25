"use client";

import Image from "next/image";
import useSWR from "swr";
import { useRouter } from "next/navigation";

interface TestResult {
  id: string;
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

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProfilePage() {
  const router = useRouter();
  const { data: userData, error: userError } = useSWR(
    "/api/profile/settings",
    fetcher
  );
  const {
    data: testData,
    error: testError,
    mutate,
  } = useSWR("/api/profile", fetcher);

  if (userError || testError) {
    return (
      <div className="w-full max-w-none mx-auto px-0 py-8 flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-500">
          {userError?.message || testError?.message || "Failed to load profile"}
        </div>
      </div>
    );
  }

  if (!userData || !testData) {
    return (
      <div className="w-full max-w-none mx-auto px-0 py-8 flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  const nickName = userData.data?.nickname || "";
  const profilePicture =
    userData.data?.profilePicture ||
    "/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg";
  const testScores: TestResult[] = testData.data || [];

  const handleDelete = async (id: string) => {
    if (!confirm("Та энэ тестийг устгахдаа итгэлтэй байна уу?")) return;
    try {
      const res = await fetch(`/api/profile/test/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete test");
      await mutate(); // Refresh test list
    } catch (err) {
      alert("Тест устгах үед алдаа гарлаа.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-10 mt-8 border border-[#f0f0f5] animate-fadeIn">
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        .uiverse-remove-btn {
          background: #fff;
          border: none;
          padding: 10px 20px;
          display: inline-block;
          font-size: 15px;
          font-weight: 600;
          width: 120px;
          text-transform: uppercase;
          cursor: pointer;
          transform: skew(-21deg);
          position: relative;
          overflow: hidden;
          color: #232360;
          transition: color 0.5s;
        }
        .uiverse-remove-btn span {
          display: inline-block;
          transform: skew(21deg);
        }
        .uiverse-remove-btn::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          right: 100%;
          left: 0;
          background: #e53935;
          opacity: 0;
          z-index: -1;
          transition: all 0.5s;
        }
        .uiverse-remove-btn:hover {
          color: #fff;
        }
        .uiverse-remove-btn:hover::before {
          left: 0;
          right: 0;
          opacity: 1;
        }
      `}</style>

      {/* Header with Test Again Button */}
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
          <button
            onClick={() => router.push("/test")}
            className="bg-[#F59E0B] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#F59E0B]/90 transition-all duration-300 font-semibold text-sm sm:text-base touch-manipulation cursor-pointer whitespace-nowrap"
          >
            Тест дахин өгөх
          </button>
          <div
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-gray-200 shadow-sm flex items-center justify-center cursor-pointer hover:shadow-lg transition flex-shrink-0"
            onClick={() => router.push("/profile/settings")}
          >
            <Image
              src={profilePicture}
              alt="profile"
              width={64}
              height={64}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Gradient Banner */}
      <div className="w-full h-24 rounded-xl mb-10 bg-gradient-to-r from-[#C7E0FF] to-[#FFF2D1] flex items-end px-8 shadow-sm" />

      {/* Test Results Grid */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch w-full">
        <div className="w-full lg:flex-1 flex-grow basis-0">
          <div className="flex flex-col gap-6 sm:gap-8">
            {testScores.map((career, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row items-start bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 sm:p-8 border border-[#E6E6F2] gap-4 sm:gap-8 w-full cursor-pointer"
                onClick={() => {
                  if (!career.id) {
                    console.error("Test result ID is missing");
                    return;
                  }
                  router.push(`/profile/test/${career.id}`);
                }}
              >
                <div className="flex flex-col items-center w-full sm:w-auto">
                  <div className="relative w-40 h-40 rounded-xl overflow-hidden shadow-md">
                    <Image
                      src={profilePicture}
                      alt="cert"
                      fill
                      sizes="(max-width: 768px) 160px, 160px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <div className="font-semibold text-xl sm:text-2xl text-[#232360] mb-4">
                    {new Date(career.takenAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </div>
                  {/* Delete Button */}
                  <button
                    className="uiverse-remove-btn mb-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(career.id);
                    }}
                  >
                    <span>Устгах</span>
                  </button>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-xl">
                      <h3 className="font-semibold text-gray-700 mb-2">MBTI</h3>
                      <p className="text-xl sm:text-2xl font-bold text-[#F59E0B]">
                        {career.tests.mbti}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-xl">
                      <h3 className="font-semibold text-gray-700 mb-2">
                        Holland Code
                      </h3>
                      <p className="text-xl sm:text-2xl font-bold text-[#F59E0B]">
                        {career.tests.holland}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-xl">
                      <h3 className="font-semibold text-gray-700 mb-2">
                        EQ Score
                      </h3>
                      <p className="text-xl sm:text-2xl font-bold text-[#F59E0B]">
                        {career.tests.eq}/200
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-xl">
                      <h3 className="font-semibold text-gray-700 mb-2">
                        Big Five
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Openness
                          </span>
                          <span className="font-medium text-base">
                            {career.tests.bigFive.openness}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Conscientiousness
                          </span>
                          <span className="font-medium text-base">
                            {career.tests.bigFive.conscientiousness}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Extraversion
                          </span>
                          <span className="font-medium text-base">
                            {career.tests.bigFive.extraversion}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Agreeableness
                          </span>
                          <span className="font-medium text-base">
                            {career.tests.bigFive.agreeableness}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Neuroticism
                          </span>
                          <span className="font-medium text-base">
                            {career.tests.bigFive.neuroticism}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

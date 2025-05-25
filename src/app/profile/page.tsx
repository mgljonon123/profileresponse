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
  const profilePicture = userData.data?.profilePicture || "/profile.jpg";
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
      `}</style>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#232360]">
            Сайн Байна уу? <span className="text-[#F59E0B]">{nickName}</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">Mon, 25 May 2025</p>
        </div>
        <div>
          <button
            onClick={() => router.push("/profile/settings")}
            className="bg-white p-3 rounded-full shadow hover:bg-gray-50 transition-all duration-300 flex items-center justify-center group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-[#232360] group-hover:text-[#E94A1F] transition-colors duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="w-full h-24 sm:h-32 rounded-2xl mb-8 sm:mb-12 bg-gradient-to-r from-[#F59E0B] to-[#F59E0B] flex items-end px-6 sm:px-10 shadow-md" />

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch w-full">
        <div className="w-full lg:flex-1 flex-grow basis-0">
          <p className="mb-5 text-lg sm:text-xl text-[#232360]">
            Таний <b>test</b> хариунд тохирох <b>5 мэргэжил</b>
          </p>
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
                    {new Date(career.takenAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(career.id);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mb-4"
                  >
                    Устгах
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
                            {career.tests.bigFive.openness}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Conscientiousness
                          </span>
                          <span className="font-medium text-base">
                            {career.tests.bigFive.conscientiousness}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Extraversion
                          </span>
                          <span className="font-medium text-base">
                            {career.tests.bigFive.extraversion}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Agreeableness
                          </span>
                          <span className="font-medium text-base">
                            {career.tests.bigFive.agreeableness}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Neuroticism
                          </span>
                          <span className="font-medium text-base">
                            {career.tests.bigFive.neuroticism}%
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

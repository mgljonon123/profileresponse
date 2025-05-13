"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type MBTIScores = {
  E_I: { E: number; I: number };
  S_N: { S: number; N: number };
  T_F: { T: number; F: number };
  J_P: { J: number; P: number };
};

interface TestResults {
  bigFive: {
    Neuroticism: number;
    Extraversion: number;
    Openness: number;
    Agreeableness: number;
    Conscientiousness: number;
  } | null;
  mbti: MBTIScores;
  eq: number[];
  holland: Record<string, number>;
  recommendations: string[];
}

const ResultPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [results, setResults] = useState<TestResults | null>(null);

  useEffect(() => {
    if (searchParams) {
      const bigFive = searchParams.get("bigFive");
      const mbti = searchParams.get("mbti");
      const eq = searchParams.get("eq");
      const holland = searchParams.get("holland");
      const recommendations = searchParams.get("recommendations");

      setResults({
        bigFive: bigFive ? JSON.parse(bigFive) : null,
        mbti: mbti ? JSON.parse(mbti) : null,
        eq: eq ? JSON.parse(eq) : [],
        holland: holland ? JSON.parse(holland) : {},
        recommendations: recommendations ? JSON.parse(recommendations) : [],
      });
    }
  }, [searchParams]);

  const getMBTIType = (mbti: TestResults["mbti"]) => {
    if (!mbti) return "";
    return [
      mbti.E_I.E > mbti.E_I.I ? "E" : "I",
      mbti.S_N.S > mbti.S_N.N ? "S" : "N",
      mbti.T_F.T > mbti.T_F.F ? "T" : "F",
      mbti.J_P.J > mbti.J_P.P ? "J" : "P",
    ].join("");
  };

  const getHollandCode = (holland: TestResults["holland"]) => {
    if (!holland) return "";
    const scores = Object.entries(holland)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([code]) => code);
    return scores.join("");
  };

  const calculateEQScore = (eq: number[] | undefined) => {
    if (!eq || eq.length !== 40) return null;
    const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);
    return {
      selfAwareness: sum(eq.slice(0, 8)),
      selfRegulation: sum(eq.slice(8, 16)),
      motivation: sum(eq.slice(16, 24)),
      empathy: sum(eq.slice(24, 32)),
      socialSkills: sum(eq.slice(32, 40)),
      overall: sum(eq),
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Таны тестийн дүн
          </h1>

          {/* Personal Info */}
          <div className="mb-8 p-6 bg-gray-50 rounded-2xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Хувийн мэдээлэл
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Нэр:</p>
                <p className="font-medium">John Doe</p>
              </div>
              <div>
                <p className="text-gray-600">Тестийн огноо:</p>
                <p className="font-medium">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Test Results */}
          <div className="space-y-8">
            {/* MBTI Section */}
            {results?.mbti && (
              <div className="p-6 bg-gray-50 rounded-2xl">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  MBTI Зан чанар
                </h2>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-purple-600">
                    {getMBTIType(results.mbti)}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Гадагшаа чиглэсэн (E) vs Дотогшоо чиглэсэн (I)</span>
                    <span>
                      {results.mbti.E_I.E}-{results.mbti.E_I.I}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Мэдрэмж (S) vs Зөн совин (N)</span>
                    <span>
                      {results.mbti.S_N.S}-{results.mbti.S_N.N}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Бодол (T) vs Мэдрэмж (F)</span>
                    <span>
                      {results.mbti.T_F.T}-{results.mbti.T_F.F}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Шийдвэр (J) vs Уян хатан байдал (P)</span>
                    <span>
                      {results.mbti.J_P.J}-{results.mbti.J_P.P}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Holland Code Section */}
            {results?.holland && (
              <div className="p-6 bg-gray-50 rounded-2xl">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Holland Code
                </h2>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-blue-600">
                    {getHollandCode(results.holland)}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Практик (R)</span>
                    <span>{results.holland.R}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Судалгааны (I)</span>
                    <span>{results.holland.I}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Уран бүтээл (A)</span>
                    <span>{results.holland.A}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Нийгмийн (S)</span>
                    <span>{results.holland.S}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Бизнес (E)</span>
                    <span>{results.holland.E}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Удирдамж (C)</span>
                    <span>{results.holland.C}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Big Five Section */}
            {results?.bigFive && (
              <div className="p-6 bg-gray-50 rounded-2xl">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Big Five Зан чанар
                </h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600">
                        Сэтгэл хөдлөлийн тогтвортой байдал
                      </span>
                      <span className="font-medium">
                        {results.bigFive.Neuroticism}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{ width: `${results.bigFive.Neuroticism}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600">
                        Гадагшаа чиглэсэн зан
                      </span>
                      <span className="font-medium">
                        {results.bigFive.Extraversion}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{ width: `${results.bigFive.Extraversion}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600">
                        Шинэ санаанд нээлттэй байдал
                      </span>
                      <span className="font-medium">
                        {results.bigFive.Openness}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{ width: `${results.bigFive.Openness}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600">
                        Хамтран ажиллах чадвар
                      </span>
                      <span className="font-medium">
                        {results.bigFive.Agreeableness}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{ width: `${results.bigFive.Agreeableness}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600">
                        Төлөвлөлттэй, зохион байгуулалттай байдал
                      </span>
                      <span className="font-medium">
                        {results.bigFive.Conscientiousness}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{
                          width: `${results.bigFive.Conscientiousness}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* EQ Section */}
            {results?.eq && (
              <div className="p-6 bg-gray-50 rounded-2xl">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  EQ оноо
                </h2>
                {(() => {
                  const eqScore = calculateEQScore(results.eq);
                  if (!eqScore) return null;
                  return (
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">Өөрийгөө ойлгох</span>
                          <span className="font-medium">
                            {eqScore.selfAwareness}/40
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-green-500 h-2.5 rounded-full"
                            style={{
                              width: `${(eqScore.selfAwareness / 40) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">
                            Өөрийгөө зохицуулах
                          </span>
                          <span className="font-medium">
                            {eqScore.selfRegulation}/40
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-green-500 h-2.5 rounded-full"
                            style={{
                              width: `${(eqScore.selfRegulation / 40) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">Мотиваци</span>
                          <span className="font-medium">
                            {eqScore.motivation}/40
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-green-500 h-2.5 rounded-full"
                            style={{
                              width: `${(eqScore.motivation / 40) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">Өрөвдөх сэтгэл</span>
                          <span className="font-medium">
                            {eqScore.empathy}/40
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-green-500 h-2.5 rounded-full"
                            style={{
                              width: `${(eqScore.empathy / 40) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">
                            Нийгмийн ур чадвар
                          </span>
                          <span className="font-medium">
                            {eqScore.socialSkills}/40
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-green-500 h-2.5 rounded-full"
                            style={{
                              width: `${(eqScore.socialSkills / 40) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">Нийт оноо</span>
                          <span className="font-medium">
                            {eqScore.overall}/200
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-green-500 h-2.5 rounded-full"
                            style={{
                              width: `${(eqScore.overall / 200) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

          {/* Recommended Tests Section */}
          {results?.recommendations && results.recommendations.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Таны дараагийн алхам
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.recommendations.map((test, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200 hover:border-purple-300 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-purple-900">
                        {test}
                      </h3>
                      <span className="text-sm font-medium text-purple-600 bg-purple-100 px-4 py-2 rounded-full">
                        {index + 1}-р байр
                      </span>
                    </div>
                    <p className="text-purple-700 mb-4">
                      Энэ тест нь таны одоогийн үр дүнгээс үндэслэн танд хамгийн
                      тохиромжтой гэж үзэж байна.
                    </p>
                    <button
                      onClick={() =>
                        router.push(
                          `/test/${test.toLowerCase().replace(/\s+/g, "-")}`
                        )
                      }
                      className="w-full mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-center"
                    >
                      Тест өгөх
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Эдгээр тестүүд нь таны зан чанар, ур чадвар, сонирхлыг илүү
                  гүнзгийрүүлэн судлах боломжийг олгоно.
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={() => router.push("/profile")}
              className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
            >
              Профайл руу очих
            </button>
            <button
              onClick={() => router.push("/test")}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
            >
              Дахин тест өгөх
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;

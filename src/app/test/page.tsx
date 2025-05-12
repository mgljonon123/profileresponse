"use client";

import { useState } from "react";
import { questions } from "../../lib/TS_questions";
import Chatbot from "../../components/Chatbot";

const TestPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (score: number) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: score };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    return <Chatbot onQuizSubmit={answers} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Асуулт {currentQuestion + 1}/{questions.length}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-purple-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {questions[currentQuestion].text}
            </h2>
          </div>

          {/* Answer Options */}
          <div className="space-y-4">
            {[
              "Огт санал нийлэхгүй",
              "Санал нийлэхгүй",
              "Дундаж",
              "Санал нийлж байна",
              "Баттай санал нийлж байна",
            ].map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index + 1)}
                className="w-full p-4 text-left bg-white border border-gray-200 rounded-xl hover:bg-purple-50 hover:border-purple-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;

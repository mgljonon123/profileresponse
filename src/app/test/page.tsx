'use client';

import React, { useState } from 'react';
import StepperSidebar from '../components/StepperSidebar';
import QuestionPanel from '../components/QuestionPanel';
import ResultCard from '../components/ResultPage';  

const steps = [
  'Эхлэх',
  'Таны зан чанарын хэв маягийг тодорхойлох',
  'Танд тохирох ажил мэргэжлийн санал',
  'Хобби',
];

const questions = [
  {
    question: 'Таны зан чанарын хэв маягийг тодорхойлох',
    answers: ['Дургуй', 'Таалагддаггүй', 'Дунд', 'Таалагддаг'],
  },
  {
    question: 'Танд тохирох ажил мэргэжлийн санал',
    answers: ['Сонголт 1', 'Сонголт 2', 'Сонголт 3', 'Сонголт 4'],
  },
  {
    question: 'Таны хобби юу вэ?',
    answers: ['Унших', 'Спорт', 'Аялал', 'Тоглоом'],
  },
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [finished, setFinished] = useState(false);

  const isStart = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  const handleAnswerSelect = (index: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentStep - 1] = index;
    setAnswers(updatedAnswers);
  };

  const handleNextStep = () => {
    if (!isLast) setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleFinish = () => {
    setFinished(true);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#181818] via-[#23272f] to-[#181818]">
      <main className="flex flex-1 items-center justify-center">
        <div className={`w-full ${finished ? 'max-w-3xl' : 'max-w-xl'} flex flex-col items-center px-4`}>
          {finished ? (
            <ResultCard />
          ) : isStart ? (
            <button
              onClick={handleNextStep}
              className="mt-32 px-12 py-6 text-2xl font-bold text-black bg-white/90 border-2 border-blue-200 rounded-2xl shadow-xl hover:bg-blue-100 transition"
            >
              Continue assessment
            </button>
          ) : (
            <>
              <QuestionPanel
                question={questions[currentStep - 1].question}
                answers={questions[currentStep - 1].answers}
                selected={answers[currentStep - 1]}
                onSelect={handleAnswerSelect}
              />
              <div className="flex gap-4 mt-8">
                <button
                  onClick={handlePrevStep}
                  disabled={currentStep === 0}
                  className="px-6 py-2 rounded-md bg-gray-700 text-white disabled:opacity-50"
                >
                  Буцах
                </button>
                {!isLast ? (
                  <button
                    onClick={handleNextStep}
                    disabled={answers[currentStep - 1] === null}
                    className="px-6 py-2 rounded-md font-semibold bg-white text-black disabled:opacity-50"
                  >
                    Дараах
                  </button>
                ) : (
                  <button
                    onClick={handleFinish}
                    className="px-6 py-2 rounded-md font-semibold bg-green-600 text-white"
                  >
                    Дуусгах
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </main>
      {!finished && <StepperSidebar steps={steps} currentStep={currentStep} onStart={() => setCurrentStep(1)} />}
    </div>
  );
}
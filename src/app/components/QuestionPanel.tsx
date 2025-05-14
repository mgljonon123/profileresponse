import React from "react";

interface QuestionPanelProps {
  currentStep?: number;
  questions?: any[];
  onAnswer?: (answer: any) => void;
}

const QuestionPanel: React.FC<QuestionPanelProps> = ({
  currentStep = 0,
  questions = [],
  onAnswer,
}) => {
  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      {questions[currentStep] ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {questions[currentStep].question}
          </h2>
          <div className="space-y-2">
            {questions[currentStep].options?.map(
              (option: any, index: number) => (
                <button
                  key={index}
                  onClick={() => onAnswer?.(option)}
                  className="w-full p-3 text-left border rounded-md hover:bg-gray-50 transition-colors"
                >
                  {option}
                </button>
              )
            )}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">No questions available</div>
      )}
    </div>
  );
};

export default QuestionPanel;

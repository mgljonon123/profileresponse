import React from "react";

interface TimelineCardProps {
  steps: string[];
  currentStep: number;
  onStart?: () => void;
  className?: string;
}

const TimelineCard: React.FC<TimelineCardProps> = ({
  steps,
  currentStep,
  onStart,
  className,
}) => (
  <div
    className={`bg-gray-50 rounded-xl pt-8 pb-8 px-4 flex flex-col items-center w-full max-w-xs min-h-[350px] relative shadow-2xl border border-gray-300 justify-between ${className || ""}`}
  >
    {/* Timeline vertical line */}
    <div className="absolute left-6 top-6 w-1 h-[calc(100%-48px)] bg-gradient-to-b from-gray-400 via-gray-200 to-gray-400 rounded-full z-0"></div>
    <div className="flex flex-col gap-6 z-10 mt-2 justify-between h-full w-full">
      {steps.map((step, idx) => (
        <div key={idx} className="flex items-center gap-4 relative">
          {/* Step circle */}
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all duration-200 shadow-md
              ${
                idx === currentStep
                  ? "bg-gray-500 border-gray-500 text-white scale-110"
                  : "bg-white border-gray-300 text-gray-500"
              }
            `}
          >
            {idx === currentStep ? (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <span className="font-bold text-xs">{idx + 1}</span>
            )}
          </div>
          {/* Step label */}
          <span
            className={`text-base md:text-lg transition-all duration-200 ${
              idx === currentStep
                ? "font-extrabold text-gray-900"
                : "font-medium text-gray-700"
            }`}
          >
            {step}
          </span>
        </div>
      ))}
    </div>
    {onStart && (
      <button
        onClick={onStart}
        className="absolute top-3 right-3 bg-gray-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow hover:bg-gray-600 transition-colors"
      >
        Тест эхлэх
      </button>
    )}
  </div>
);

export default TimelineCard; 
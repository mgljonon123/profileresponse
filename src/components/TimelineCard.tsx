import React from "react";

interface TimelineCardProps {
  steps: string[];
  currentStep: number;
  onStart?: () => void;
  onProfileClick?: () => void;
  className?: string;
}

const TimelineCard: React.FC<TimelineCardProps> = ({
  steps,
  currentStep,
  onStart,
  onProfileClick,
  className,
}) => (
  <div
    className={`bg-gray-50 rounded-xl pt-15 pb-80 px-3 flex flex-col items-center w-full max-w-xs min-h-[350px] relative shadow-2xl border border-gray-300 justify-between ${
      className || ""
    }`}
  >
    {/* Top bar: Тест эхлэх + Profile icon */}
    <div className="flex flex-row items-center justify-end w-full px-10 mb-25 gap-10">
      {onStart && (
        <button
          onClick={onStart}
          className="bg-gray-500 text-white px-8.5 py-2 rounded-full text-sm font-semibold shadow hover:bg-gray-600 transition-colors"
        >
          Тест эхлэх
        </button>
      )}
      <button
        onClick={onProfileClick}
        className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center shadow hover:bg-gray-300 transition-colors"
        aria-label="Профайл"
      >
        <svg
          className="w-6 h-6 text-gray-600"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 8-4 8-4s8 0 8 4" />
        </svg>
      </button>
    </div>
    {/* Timeline vertical line and steps */}
    <div className="flex flex-row w-full h-full">
      {/* Timeline circles and line + Step labels */}
      <div className="flex flex-col w-full relative">
        {/* Vertical line */}
        <div className="absolute left-7.5 top-4 w-1 h-[calc(100%-32px)] bg-gradient-to-b from-gray-400 via-gray-200 to-gray-400 rounded-full z-0"></div>
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="flex flex-row items-center z-10 mb-30 last:mb-0 min-h-[48px]"
          >
            {/* Step circle */}
            <div
              className={`w-9 h-9 flex items-center justify-center rounded-full border-2 transition-all duration-200 shadow-md mr-8 relative z-10
                ${
                  idx === currentStep
                    ? "bg-gray-500 border-gray-500 text-white scale-110"
                    : "bg-white border-gray-300 text-gray-500"
                }
              `}
              style={{ marginLeft: "16px" }}
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
            <div
              className={`flex-1 ${
                idx === currentStep
                  ? "font-extrabold text-lg md:text-xl text-gray-900"
                  : "font-medium text-base md:text-lg text-gray-700"
              }`}
            >
              {step}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default TimelineCard;

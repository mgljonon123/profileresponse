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
}) => {
  const progressPercent = (currentStep / (steps.length - 1)) * 100;

  // Adjust highlighting to ensure we don't round up too early
  const getHighlightedStep = (stepIdx: number) => {
    // Only move to the next step if we've fully passed the current step's threshold
    return Math.floor(stepIdx);
  };

  const highlightedStep = getHighlightedStep(currentStep);

  return (
    <div
      className={`bg-gray-50 rounded-xl pt-8 pb-8 px-3 flex flex-col items-center w-full max-w-xs relative shadow-2xl border border-gray-300 justify-between ${
        className || ""
      } min-h-[140px] md:min-h-[350px]`}
    >
      {/* Top bar: Тест эхлэх + Profile icon (ЗӨВХӨН DESKTOP) */}
      <div className="hidden md:flex flex-row items-center justify-end w-full px-10 mb-25 gap-10">
        {onStart && (
          <button
            onClick={onStart}
            className="bg-gray-700 text-white px-8.5 py-2 rounded-full text-sm font-semibold shadow hover:bg-gray-600 transition-colors"
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
      <div className="flex w-full h-full">
        {/* MOBILE: Vertical timeline with progress bar and profile center top */}
        <div className="md:hidden flex flex-col items-center justify-start w-full py-2 relative">
          {/* Profile icon center top */}
          <div className="flex justify-center items-center w-full mb-2">
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
          {/* Тест эхлэх товчийг профайлын доор байрлуулах */}
          {onStart && (
            <button
              onClick={onStart}
              className="bg-gray-700 text-white px-2 py-1 rounded flex items-center justify-center text-[11px] font-semibold shadow hover:bg-gray-600 transition-colors mb-2"
              style={{ minWidth: 0, height: 28, lineHeight: "16px" }}
            >
              {/* Desktop-д текст, мобайлд илүү гоё restart icon */}
              <span className="md:inline hidden">Тест эхлэх</span>
              <span className="inline md:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  {/* Илүү гоё, төвтэй refresh/restart icon */}
                  <path
                    d="M12 4a8 8 0 1 0 8 8"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          )}
          {/* Vertical progress bar (mobile) */}
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              // Profile + "Тест эхлэх" товчны өндөр + margin-уудыг тооцож доошлуулна
              top: `calc(2.5rem + 40px + 30px)`, // pt-8 (2rem) + profile (40px) + button (28px) + mb-2 (2px)
              width: "4px",
              height: `calc(100% - 4.5rem - 40px - 30px)`, // нийт өндөр - profile - button - margin
              background: "#e5e7eb",
              borderRadius: "4px",
              zIndex: 0,
              overflow: "hidden",
            }}
          >
            <div
              className="bg-[#B04B2F] rounded-full absolute left-0 w-full transition-all duration-300"
              style={{
                top: 0,
                // 1-р дугаараас яг эхлүүлэхийн тулд 1-ээр хуваахгүй, харин idx === 0 дээр 0%,
                // idx === 1 дээр 1/(n-1)*100% гэх мэтээр үлдээж болно
                height: `${(highlightedStep / (steps.length - 1)) * 100}%`,
                zIndex: 1,
                position: "absolute",
              }}
            ></div>
          </div>
          <div className="flex flex-col items-center w-full z-10 pt-2">
            {steps.map((step, idx) => (
              <React.Fragment key={idx}>
                <div
                  className={`w-7 h-7 flex items-center justify-center rounded-full border-2 transition-all duration-200 shadow-md
                    ${
                      highlightedStep === idx
                        ? "bg-gray-700 border-gray-700 text-white scale-105"
                        : "bg-white border-gray-300 text-gray-700"
                    }`}
                  style={{ zIndex: 2 }}
                >
                  {/* CHECK ICON ALWAYS VISIBLE ON MOBILE */}
                  {highlightedStep === idx ? (
                    <svg
                      className="w-3 h-3"
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
                    // Дугаар үргэлж гарна
                    <span className="font-bold text-xs">{idx + 1}</span>
                  )}
                </div>
                {/* Draw line except after last step */}
                {idx < steps.length - 1 && (
                  <div
                    className="w-1"
                    style={{
                      height: 18,
                      background: idx < highlightedStep ? "#B04B2F" : "#e5e7eb",
                      borderRadius: 2,
                      margin: "2px 0",
                      transition: "background 0.3s",
                      zIndex: 1,
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        {/* DESKTOP: Vertical timeline with labels */}
        <div className="hidden md:flex flex-col w-full relative">
          {/* Vertical progress bar */}
          <div className="absolute left-7.5 top-10 w-1 h-[calc(100%-40px)] bg-gray-200 rounded-full z-0 overflow-hidden">
            <div
              className="bg-[#B04B2F] rounded-full absolute top-0 left-0 w-full transition-all duration-300"
              style={{ height: `${progressPercent}%` }}
            ></div>
          </div>
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-row items-center z-10 mb-30 last:mb-0 min-h-[4px]"
            >
              {/* Step circle */}
              <div
                className={`w-9 h-9 flex items-center justify-center rounded-full border-2 transition-all duration-200 shadow-md mr-8 relative z-10
                  ${
                    highlightedStep === idx
                      ? "bg-gray-700 border-gray-700 text-white scale-110"
                      : "bg-white border-gray-300 text-gray-700"
                  }`}
                style={{ marginLeft: "16px" }}
              >
                {highlightedStep === idx ? (
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
                  highlightedStep === idx
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
};

export default TimelineCard;

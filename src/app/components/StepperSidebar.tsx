import React from 'react';

interface StepperSidebarProps {
  steps: string[];
  currentStep: number;
  onStart?: () => void;
}

const StepperSidebar: React.FC<StepperSidebarProps> = ({ steps, currentStep, onStart }) => {
  return (
    <div
      className="bg-black text-white w-64 flex flex-col items-center py-8 min-h-screen rounded-l-3xl cursor-pointer hover:bg-gray-900 transition"
      onClick={onStart}
      tabIndex={0}
      role="button"
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onStart?.(); }}
    >
      <div className="flex justify-between items-center w-full px-8 mb-10">
        <button className="bg-gray-200 text-black px-4 py-1 rounded-lg font-semibold text-sm mr-auto">Тест эхлэх</button>
        <span className="w-8 h-8 bg-gray-200 rounded-full ml-2" />
      </div>
      <div className="flex flex-col items-center w-full gap-10">
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center w-full">
            <div className="flex items-center w-full">
              <span
                className={"w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 transition-all duration-200 border-white bg-white text-black"}
              >
                {idx === currentStep ? (
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                ) : null}
              </span>
              <span className={`text-lg font-bold ml-2 ${idx === currentStep ? 'text-white' : 'text-white/80'}`}>{step}</span>
            </div>
            {idx < steps.length - 1 && (
              <div className="h-10 border-l-2 border-white ml-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepperSidebar; 
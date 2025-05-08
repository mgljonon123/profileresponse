import React from 'react';

interface QuestionPanelProps {
  question: string;
  answers: string[];
  selected: number | null;
  onSelect: (idx: number) => void;
}

const QuestionPanel: React.FC<QuestionPanelProps> = ({ question, answers, selected, onSelect }) => {
  return (
    <div className="w-full max-w-lg bg-[#23272f] rounded-2xl shadow-2xl p-8 flex flex-col items-center">
      <h2 className="text-white text-xl font-bold mb-10 text-center drop-shadow-lg">{question}</h2>
      <div className="flex flex-col gap-6 w-full">
        {answers.map((ans, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(idx)}
            className={`px-3 py-1 rounded-md border-2 text-sm bg-black text-white border-gray-700 hover:border-white focus:border-white focus:ring-2 focus:ring-white transition font-medium mr-2 mb-2 ${selected === idx ? 'ring-2 ring-blue-400' : ''}`}
          >
            {ans}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionPanel; 
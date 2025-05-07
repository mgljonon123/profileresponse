"use client";

const cards = [
  {
    title: "Sales Strategies",
    desc: "Get tailored advice on increasing property visibility and driving sales.",
  },
  {
    title: "Negotiation Tactics",
    desc: "Learn expert negotiation tips to close deals effectively.",
  },
  {
    title: "Marketing Insights",
    desc: "Discover the best marketing strategies to showcase your properties.",
  },
  {
    title: "General Support",
    desc: "Need help with something else? Ask away, and we'll guide you.",
  },
];

export default function MessagesPage() {
  return (
    <div className="max-w-5xl mx-auto mt-8">
      {/* Gradient Banner */}
      <div className="w-full h-24 rounded-xl mb-10 bg-gradient-to-r from-[#C7E0FF] to-[#FFF2D1] flex items-end px-8 shadow-sm" />

      {/* Centered Content */}
      <div className="flex flex-col items-center justify-center text-center mb-16">
        <div className="mb-8">
          <svg width="56" height="56" viewBox="0 0 48 48" fill="none"><path d="M24 8L12 20H36L24 32" stroke="#232360" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h1 className="text-4xl font-bold mb-4">How can we <span className="text-purple-500">assist</span> you today?</h1>
        <p className="text-gray-500 max-w-xl mb-12 text-lg">Get expert guidance powered by AI agents specializing in Sales, Marketing, and Negotiation. Choose the agent that suits your needs and start your conversation with ease.</p>
        <div className="flex flex-wrap gap-8 justify-center w-full">
          {cards.map((card, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-8 w-72 text-left shadow hover:shadow-xl transition flex flex-col gap-3 cursor-pointer group">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-xl text-gray-800 group-hover:text-purple-600 transition">{card.title}</span>
                <span className="inline-block ml-2">
                  <svg width="22" height="22" fill="none" stroke="#888" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
                </span>
              </div>
              <div className="text-gray-500 text-base">{card.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Prompt Input Bar */}
      <div className="w-full bg-[#f7f7fa] rounded-2xl p-6 flex items-center gap-4 shadow border border-[#f0f0f5]">
        <button className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-200 text-gray-500 hover:bg-gray-300">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20v-8m0 0V4m0 8H4m8 0h8"/></svg>
        </button>
        <input className="flex-1 bg-transparent outline-none px-2 text-gray-700 text-lg" placeholder="type your prompt here" />
        <button className="w-12 h-12 rounded-full flex items-center justify-center bg-purple-500 text-white hover:bg-purple-600 transition">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
        <button className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-200 text-gray-500 hover:bg-gray-300">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 15s1.5-2 4-2 4 2 4 2"/><path d="M9 9h.01"/><path d="M15 9h.01"/></svg>
        </button>
      </div>
    </div>
  );
} 
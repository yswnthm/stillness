import React from 'react';

export const ClientLogos: React.FC = () => {
  return (
    <section className="py-12 bg-white border-y border-stone/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <p className="text-center text-[10px] uppercase tracking-[0.3em] text-stone/40 mb-10 font-bold">Trusted by forward-thinking teams</p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale">
          {/* Using text placeholders for logos as per portability constraint */}
          <span className="text-2xl font-bold tracking-tighter">TECHSTREAM</span>
          <span className="text-2xl font-serif">FlowState</span>
          <span className="text-2xl font-sans font-black italic">VANTAGE</span>
          <span className="text-2xl font-serif tracking-widest uppercase">Lumina</span>
        </div>
      </div>
    </section>
  );
};

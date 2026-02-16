import React from 'react';

export const Newsletter: React.FC = () => {
  return (
    <section className="design4-newsletter py-48 px-6 bg-[#0a0a0a]" role="region">
      <div className="max-w-xl mx-auto text-center bg-white/5 backdrop-blur-3xl p-20 rounded-[4rem] border border-white/10 shadow-2xl">
        <h2 className="text-white font-serif text-4xl mb-6">Enter the Grid</h2>
        <p className="text-white/40 font-sans font-light text-lg mb-12 leading-relaxed">
          Stay updated with our newest <br/> sanctuaries and quiet tech.
        </p>
        
        <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="EMAIL ADDRESS"
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white placeholder:text-white/20 font-sans tracking-widest text-[10px] focus:outline-none focus:border-seafoam transition-colors"
          />
          <button className="w-full py-5 bg-white text-stone rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-seafoam hover:text-white transition-all duration-500">
            CONNECT
          </button>
        </form>
      </div>
      
      <div className="mt-32 text-center text-white/10 text-[10px] uppercase tracking-[0.8em]">
        STILLNESS CORE — VERSION 1.0.0
      </div>
    </section>
  );
};

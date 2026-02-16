import React from 'react';

export const Newsletter: React.FC = () => {
  return (
    <section className="design3-newsletter py-48 px-6 bg-stone text-cream" role="region">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between border-t border-cream/10 pt-24">
        <div className="max-w-xl mb-16 md:mb-0">
          <h2 className="text-stone font-serif text-6xl md:text-8xl leading-none text-cream uppercase tracking-tighter mb-8">Stay <br/> Quiet</h2>
          <p className="text-wave font-sans text-xl leading-relaxed">
            Join our private mailing list for the latest essays and sanctuary announcements.
          </p>
        </div>
        
        <form className="w-full md:w-1/2 flex items-center border-b border-cream/30 focus-within:border-cream transition-colors py-4">
          <input 
            type="email" 
            placeholder="ENTER YOUR EMAIL"
            className="flex-grow bg-transparent text-cream placeholder:text-cream/20 font-serif italic text-2xl focus:outline-none"
          />
          <button className="text-xs uppercase tracking-[0.3em] text-seafoam hover:text-cream transition-colors font-bold">JOIN</button>
        </form>
      </div>
      
      <div className="max-w-7xl mx-auto mt-32 flex justify-between text-[10px] uppercase tracking-[0.5em] text-cream/20">
        <span>© 2026 Stillness</span>
        <span>Rights Reserved</span>
      </div>
    </section>
  );
};

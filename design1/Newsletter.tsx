import React from 'react';
import { motion } from 'framer-motion';

export const Newsletter: React.FC = () => {
  return (
    <section className="design1-newsletter py-32 px-6 bg-white border-t border-stone/5" role="region">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-stone font-serif text-3xl mb-12 font-light italic">
          Keep the Stillness
        </h2>
        
        <form className="relative group" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="email address"
            className="w-full bg-transparent border-b border-stone/10 py-4 px-2 font-sans font-light text-stone/60 placeholder:text-stone/20 focus:outline-none focus:border-seafoam transition-colors duration-500 text-center uppercase tracking-widest text-[10px]"
          />
          <button 
            type="submit"
            className="mt-12 text-[10px] uppercase tracking-[0.4em] text-stone/40 hover:text-stone transition-all duration-500 hover:tracking-[0.5em]"
          >
            Subscribe
          </button>
        </form>
        
        <p className="mt-12 text-[9px] uppercase tracking-[0.2em] text-stone/20">
          Infrequent updates. Eternal peace.
        </p>
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section className="design3-hero relative h-screen w-full bg-stone flex items-center justify-center overflow-hidden" role="banner">
      {/* Editorial Layout: Large Text behind image */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-[20vw] font-serif text-cream/5 uppercase leading-none tracking-tighter select-none">
          Stillness
        </h1>
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6 grid grid-cols-1 md:grid-cols-12 gap-0 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-5 md:col-start-2 z-20"
        >
          <div className="bg-sand p-1 aspect-[3/4] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1999&auto=format&fit=crop" 
              alt="Model in peaceful pose" 
              className="w-full h-full object-cover grayscale contrast-125"
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-5 md:col-start-7 mt-12 md:mt-0 text-cream"
        >
          <span className="text-seafoam text-xs uppercase tracking-[0.5em] mb-8 block">Issue No. 01</span>
          <h2 className="text-6xl md:text-8xl font-serif mb-12 leading-none italic font-medium">
            The Art of <br/> <span className="ml-12 md:ml-24">Absence</span>
          </h2>
          <p className="text-wave max-w-sm font-sans font-light text-lg mb-12 leading-relaxed">
            Curated experiences for the sophisticated minimalist. Define your space by what you leave out.
          </p>
          <button className="group flex items-center gap-6">
            <span className="text-xs uppercase tracking-widest border-b border-cream/30 pb-1 group-hover:border-cream transition-colors">Enter Publication</span>
            <div className="w-12 h-[1px] bg-cream/20 group-hover:w-24 transition-all duration-700" />
          </button>
        </motion.div>
      </div>

      {/* Vertical Side Text */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:block">
        <span className="text-cream/20 text-[10px] uppercase tracking-[1em] [writing-mode:vertical-lr]">
          Est. 2026 — Sanctuary for the soul
        </span>
      </div>
    </section>
  );
};

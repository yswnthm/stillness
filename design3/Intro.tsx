import React from 'react';
import { motion } from 'framer-motion';

export const Intro: React.FC = () => {
  return (
    <section className="design3-intro py-48 px-6 bg-cream" role="region">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
        <div className="md:col-span-4 md:col-start-2">
           <span className="text-stone/30 text-[10px] uppercase tracking-widest block mb-12">Manifesto</span>
           <h2 className="text-stone font-serif text-5xl italic leading-tight">
             Luxury is the <br/> <span className="text-seafoam">freedom to disconnect.</span>
           </h2>
        </div>
        
        <div className="md:col-span-6 md:col-start-6">
          <p className="text-stone/60 font-sans text-xl leading-relaxed mb-12 first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-stone">
            In an era of hyper-connectivity, the ultimate status symbol is the ability to be unreachable. Stillness provides the physical and mental architecture required to reclaim your cognitive sovereignty.
          </p>
          <p className="text-stone/60 font-sans text-xl leading-relaxed">
            We don't just provide services; we curate voids. Spaces where the noise of the world is intentionally filtered, leaving only the essential.
          </p>
        </div>
      </div>
    </section>
  );
};

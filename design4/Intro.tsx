import React from 'react';
import { motion } from 'framer-motion';

export const Intro: React.FC = () => {
  return (
    <section className="design4-intro py-32 px-6 bg-[#0a0a0a]" role="region">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/5 backdrop-blur-2xl p-16 md:p-24 rounded-[4rem] border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-seafoam/5 rounded-full blur-3xl -mr-32 -mt-32" />
          
          <div className="relative z-10 flex flex-col md:flex-row gap-20 items-center">
            <div className="w-full md:w-1/2">
               <h2 className="text-white font-serif text-5xl mb-8 leading-tight">
                 A sanctuary <br/> <span className="text-seafoam italic">redefined.</span>
               </h2>
               <div className="w-16 h-[2px] bg-seafoam rounded-full" />
            </div>
            
            <div className="w-full md:w-1/2">
              <p className="text-white/60 font-sans text-xl leading-relaxed font-light">
                We use adaptive lighting and biometric-responsive environments to create the perfect conditions for neurological rest. Stillness is where high-technology meets deep-humanity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

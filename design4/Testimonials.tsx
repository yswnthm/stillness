import React from 'react';
import { TESTIMONIALS } from '../constants';

export const Testimonials: React.FC = () => {
  return (
    <section className="design4-testimonials py-48 px-6 bg-[#0a0a0a]" role="region">
      <div className="max-w-4xl mx-auto text-center relative">
        <div className="absolute inset-0 bg-seafoam/5 rounded-full blur-[100px] -z-10" />
        
        <p className="text-white font-serif text-3xl md:text-5xl font-light italic leading-snug mb-16">
          "{TESTIMONIALS[0].quote}"
        </p>
        
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6 border border-white/20">
            <span className="text-seafoam text-xl font-serif italic">S</span>
          </div>
          <p className="text-white text-xs uppercase tracking-[0.4em] font-bold mb-1">
            {TESTIMONIALS[0].author}
          </p>
          <p className="text-white/20 text-[10px] uppercase tracking-widest italic">
            {TESTIMONIALS[0].location}
          </p>
        </div>
      </div>
    </section>
  );
};

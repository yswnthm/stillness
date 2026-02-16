import React from 'react';
import { TESTIMONIALS } from '../constants';

export const Testimonials: React.FC = () => {
  return (
    <section className="design2-testimonials py-32 px-6 bg-sage/10 text-stone" role="region">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm mb-12">
          "
        </div>
        <p className="text-3xl md:text-4xl font-serif italic mb-12 leading-snug">
          {TESTIMONIALS[1].quote}
        </p>
        <div className="font-sans">
          <p className="text-terracotta font-bold uppercase tracking-widest text-sm mb-1">{TESTIMONIALS[1].author}</p>
          <p className="text-stone/40 text-xs">{TESTIMONIALS[1].location}</p>
        </div>
      </div>
    </section>
  );
};

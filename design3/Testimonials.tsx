import React from 'react';
import { TESTIMONIALS } from '../constants';

export const Testimonials: React.FC = () => {
  return (
    <section className="design3-testimonials py-48 px-6 bg-cream text-stone overflow-hidden" role="region">
      <div className="max-w-7xl mx-auto relative">
         <div className="absolute -left-20 top-0 text-[15rem] font-serif text-stone/5 leading-none">“</div>
         
         <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
           <div className="md:col-span-8 md:col-start-3 text-center">
              <p className="text-4xl md:text-6xl font-serif italic mb-16 leading-tight">
                {TESTIMONIALS[2].quote}
              </p>
              <div className="w-16 h-[1px] bg-stone/20 mx-auto mb-8" />
              <p className="text-stone text-xs uppercase tracking-[0.4em] font-bold mb-2">{TESTIMONIALS[2].author}</p>
              <p className="text-stone/40 text-[10px] uppercase tracking-widest italic">{TESTIMONIALS[2].location}</p>
           </div>
         </div>
      </div>
    </section>
  );
};

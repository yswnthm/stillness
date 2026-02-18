import React, { useState } from 'react';
import { Section } from './Section';
import { TESTIMONIALS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ArrowLeft, ArrowRight } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <Section id="testimonials" className="bg-seafoam">
      <div className="max-w-4xl mx-auto text-center relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-12 text-white/10">
          <Quote size={80} fill="currentColor" />
        </div>

        <div className="h-[300px] md:h-[250px] flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6 }}
              className="px-4"
            >
              <p className="text-2xl md:text-3xl lg:text-4xl font-serif text-white italic leading-relaxed mb-8">
                "{TESTIMONIALS[activeIndex].quote}"
              </p>
              <div>
                <p className="font-sans font-bold text-sm tracking-widest text-white uppercase">
                  {TESTIMONIALS[activeIndex].author}
                </p>
                <p className="font-sans text-xs text-white/60 uppercase tracking-widest mt-1">
                  {TESTIMONIALS[activeIndex].location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center items-center gap-8 mt-12">
          <button
            onClick={prevTestimonial}
            className="p-3 rounded-full border border-white/20 text-white/50 hover:text-white hover:border-white transition-colors"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="flex gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activeIndex ? 'bg-white w-8' : 'bg-white/20 hover:bg-white/40'}`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="p-3 rounded-full border border-white/20 text-white/50 hover:text-white hover:border-white transition-colors"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </Section>
  );
};

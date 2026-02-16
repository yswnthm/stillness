import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../constants';

export const Testimonials: React.FC = () => {
  return (
    <section className="design1-testimonials py-32 px-6 bg-stone" role="region">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-seafoam/50 text-[10px] uppercase tracking-[0.5em] mb-16 block">
          Whispers
        </span>
        
        <div className="relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
          >
            {/* Just displaying the first one for the variant mockup */}
            <p className="text-cream font-serif text-3xl md:text-5xl font-light italic leading-snug mb-16">
              "{TESTIMONIALS[0].quote}"
            </p>
            
            <div className="flex flex-col items-center">
              <span className="text-cream text-xs tracking-widest uppercase mb-2">
                {TESTIMONIALS[0].author}
              </span>
              <span className="text-cream/30 text-[10px] tracking-[0.2em] uppercase italic">
                {TESTIMONIALS[0].location}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

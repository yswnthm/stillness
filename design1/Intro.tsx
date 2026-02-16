import React from 'react';
import { motion } from 'framer-motion';

export const Intro: React.FC = () => {
  return (
    <section className="design1-intro py-32 px-6 bg-white" role="region">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start gap-16">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/3 pt-2"
        >
          <h2 className="text-stone font-serif text-3xl italic font-light">
            Our Mission
          </h2>
          <div className="w-12 h-[1px] bg-seafoam mt-6" />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full md:w-2/3"
        >
          <p className="text-stone/70 font-sans font-light text-2xl leading-relaxed tracking-tight">
            We believe that the most profound insights occur in the gaps between thoughts. 
            Stillness is not just a place, but a practice of returning to the <span className="text-stone italic">essential self</span> through the curation of absence.
          </p>
          <p className="text-stone/50 font-sans font-light text-lg mt-8 leading-relaxed">
            In a world that demands your constant attention, we offer the luxury of being completely ignored.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'framer-motion';

export const BrandStory: React.FC = () => {
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 lg:gap-24">
        <motion.div 
          className="md:w-1/2"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-serif text-stone mb-8">Our Story</h2>
          <div className="space-y-6 text-stone/70 text-lg font-light leading-relaxed">
            <p>
              Stillness was born from a simple realization: that in our hyper-connected world, 
              silence is the ultimate luxury. 
            </p>
            <p>
              Founded in 2022 by Elena Corves, Stillness began as a small boutique float studio 
              dedicated to the art of doing nothing. Elena's own experience with chronic stress 
              led her to discover the profound healing power of sensory deprivation.
            </p>
            <p>
              What started as a single float tank has evolved into a holistic sanctuary 
              where thousands have rediscovered the spaciousness of their own minds.
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          className="md:w-1/2"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
            <img 
              src="https://images.unsplash.com/photo-1544161515-4ad6ce17906e?q=80&w=2070&auto=format&fit=crop" 
              alt="Serene spa environment" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

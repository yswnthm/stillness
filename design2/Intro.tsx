import React from 'react';
import { motion } from 'framer-motion';

export const Intro: React.FC = () => {
  return (
    <section className="design2-intro py-32 px-6 bg-white" role="region">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="inline-block px-4 py-1 bg-sage/10 text-sage rounded-full text-xs uppercase tracking-widest mb-8">
            Our Heart
          </span>
          <h2 className="text-stone font-serif text-4xl md:text-5xl mb-12 leading-tight">
            Grounded in nature, <br/> <span className="text-terracotta italic">centered in soul.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left mt-20">
            <p className="text-stone/70 font-sans text-lg leading-relaxed">
              Stillness is a sanctuary built on the belief that we are part of the landscape, not separate from it. We use earth-derived materials and ancient rituals to bring you back to your natural state.
            </p>
            <p className="text-stone/70 font-sans text-lg leading-relaxed">
              Our mission is to provide an open-hearted space where luxury feels like home, and quiet feels like a conversation with yourself.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'framer-motion';

export const MissionStatement: React.FC = () => {
  return (
    <section className="py-24 bg-midnightsea text-cream text-center overflow-hidden">
      <motion.div
        className="max-w-4xl mx-auto px-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      >
        <span className="text-seafoam text-sm uppercase tracking-[0.3em] font-bold mb-8 block">Our Mission</span>
        <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-10">
          Healing isn't a destination.<br />But you have to <span className="italic">start somewhere.</span>
        </h2>
        <div className="w-24 h-[1px] bg-cream/30 mx-auto mb-10"></div>
        <p className="text-breeze/70 text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto">
          Stillness exists because healing is real work — and everyone deserves a place to do it. Whether you're just curious or you've been waiting a long time, you're welcome here.
        </p>
      </motion.div>
    </section>
  );
};

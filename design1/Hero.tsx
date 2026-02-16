import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <header className="design1-hero relative h-screen w-full flex items-center justify-center bg-cream overflow-hidden" role="banner">
      {/* Floating abstract elements for 'Airy' feel */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-seafoam/10 rounded-full blur-3xl"
        animate={{ 
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-wave/10 rounded-full blur-3xl"
        animate={{ 
          x: [0, -50, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-xs uppercase tracking-[0.4em] text-seafoam font-sans mb-6 block">
            Welcome to Silence
          </span>
          <h1 className="text-6xl md:text-8xl font-serif text-stone mb-8 leading-none font-light italic">
            Stillness
          </h1>
          <p className="text-stone/60 max-w-md mx-auto font-sans font-light tracking-wide text-lg leading-relaxed mb-12">
            A minimalist sanctuary designed for the modern mind to exhale and expand.
          </p>
          
          <motion.button
            whileHover={{ y: -2 }}
            className="px-12 py-4 bg-transparent border border-stone/20 text-stone text-xs uppercase tracking-[0.3em] hover:bg-stone hover:text-cream transition-colors duration-500 rounded-sm"
          >
            Explore the Void
          </motion.button>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10"
      >
        <ChevronDown className="text-stone/30 w-6 h-6 stroke-[1px]" />
      </motion.div>
    </header>
  );
};

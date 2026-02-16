import React from 'react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section className="design4-hero relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]" role="banner">
      {/* Sophisticated Mesh Gradient Background */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-seafoam/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -80, 0],
            y: [0, -60, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-stone/40 rounded-full blur-[150px]" 
        />
        <motion.div 
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-wave/10 rounded-full blur-[100px]" 
        />
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/40 text-[10px] uppercase tracking-[0.3em] mb-12">
            The Future of Rest
          </div>
          <h1 className="text-7xl md:text-9xl font-serif text-white mb-8 leading-tight tracking-tight">
            Stillness
          </h1>
          <p className="text-white/40 max-w-lg mx-auto font-sans font-light text-xl leading-relaxed mb-16">
            Intelligent serenity for the digital age. <br/>
            Soft light. Quiet minds.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(104, 143, 157, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            className="px-14 py-5 bg-white text-stone rounded-2xl font-sans uppercase tracking-[0.2em] text-[10px] font-bold transition-all duration-500"
          >
            Start Immersion
          </motion.button>
        </motion.div>
      </div>

      {/* Soft Glow Ambient light */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-seafoam/5 to-transparent" />
    </section>
  );
};

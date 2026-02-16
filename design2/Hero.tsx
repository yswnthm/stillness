import React from 'react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section className="design2-hero relative h-[90vh] w-full bg-clay/20 flex items-center justify-center overflow-hidden" role="banner">
      {/* Organic Shapes */}
      <motion.div 
        className="absolute -top-20 -left-20 w-96 h-96 bg-terracotta/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div 
        className="absolute -bottom-32 -right-32 w-[30rem] h-[30rem] bg-sage/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-5xl w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h1 className="text-7xl md:text-9xl font-serif text-terracotta mb-8 leading-[0.85]">
            Stillness <br/> <span className="text-sage italic ml-12 md:ml-24">Within.</span>
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="bg-white/40 backdrop-blur-md p-10 rounded-[3rem] border border-white/20 shadow-xl shadow-terracotta/5"
        >
          <p className="text-stone font-sans text-xl leading-relaxed mb-10">
            A warm, grounded space for those seeking to reconnect with the earth and themselves.
          </p>
          <button className="w-full py-5 bg-terracotta text-white rounded-full font-sans uppercase tracking-widest text-sm hover:bg-sage transition-colors duration-500 shadow-lg shadow-terracotta/20">
            Find Your Ground
          </button>
        </motion.div>
      </div>
    </section>
  );
};

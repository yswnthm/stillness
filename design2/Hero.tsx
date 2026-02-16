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

      <div className="relative z-10 max-w-6xl w-full px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          className="md:col-span-7"
        >
          <h1 className="text-7xl md:text-[10rem] font-serif text-terracotta mb-8 leading-[0.8] tracking-tighter">
            Stillness <br/> <span className="text-sage italic ml-8 md:ml-32">Within.</span>
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="md:col-span-5 bg-white/30 backdrop-blur-xl p-12 rounded-[4rem] border border-white/40 shadow-2xl shadow-terracotta/10 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-sage/20 rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-700" />
          <p className="text-stone font-sans text-xl leading-relaxed mb-10 relative z-10">
            A warm, grounded space for those seeking to reconnect with the earth and themselves.
          </p>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-6 bg-terracotta text-white rounded-full font-sans uppercase tracking-[0.2em] text-xs hover:bg-sage transition-colors duration-500 shadow-xl shadow-terracotta/20 relative z-10"
          >
            Find Your Ground
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

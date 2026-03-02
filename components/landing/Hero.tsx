import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-stone">
      {/* Background visual - Using a high quality water texture placeholder */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2070&auto=format&fit=crop"
          alt="Calm deep water ripples"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone/40 via-transparent to-stone/80" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-cream mb-6 tracking-tight leading-tight">
            Find Your <span className="italic">Stillness</span>
          </h1>
          <p className="text-lg md:text-xl text-breeze/90 max-w-lg mx-auto font-sans font-light tracking-wide mb-10 leading-relaxed">
            Your sanctuary for deep relaxation and inner harmony.
            Come back to yourself.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <a
              href="#intro"
              className="inline-block px-10 py-4 bg-cream/10 backdrop-blur-sm border border-cream/30 rounded-full text-cream uppercase tracking-widest text-xs md:text-sm hover:bg-cream hover:text-stone transition-all duration-700"
            >
              Begin Your Journey
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="text-cream/50 animate-bounce w-8 h-8 font-light" />
        </motion.div>
      </div>
    </section>
  );
};

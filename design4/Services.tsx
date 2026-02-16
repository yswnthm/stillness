import React from 'react';
import { motion } from 'framer-motion';

const SERVICES = [
  { title: "Neuro-Float", desc: "Sensory deprivation with EEG-guided audio.", glow: "rgba(104, 143, 157, 0.2)" },
  { title: "Luma-Sync", desc: "Circadian rhythm alignment using soft spectrums.", glow: "rgba(164, 178, 186, 0.2)" },
  { title: "Void-Sync", desc: "Complete silence in zero-gravity environments.", glow: "rgba(247, 240, 236, 0.1)" }
];

export const Services: React.FC = () => {
  return (
    <section className="design4-services py-32 px-6 bg-[#0a0a0a]" role="region">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              whileHover={{ 
                y: -10,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderColor: "rgba(255, 255, 255, 0.2)"
              }}
              className="p-12 rounded-[3rem] border border-white/5 transition-all duration-700 cursor-pointer group"
              style={{ boxShadow: `0 0 40px ${s.glow}` }}
            >
              <h3 className="text-white font-serif text-3xl mb-6 group-hover:text-seafoam transition-colors">
                {s.title}
              </h3>
              <p className="text-white/40 font-sans font-light leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

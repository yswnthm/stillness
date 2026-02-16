import React from 'react';
import { motion } from 'framer-motion';

const SERVICES = [
  { title: "Clay Therapy", desc: "Mineral-rich earth wraps to detoxify and ground.", icon: "🌿" },
  { title: "Sage Smudging", desc: "Energy clearing rituals to invite clarity.", icon: "✨" },
  { title: "Earth Meditation", desc: "Guided sessions on raw terra-cotta floors.", icon: "⛰️" }
];

export const Services: React.FC = () => {
  return (
    <section className="design2-services py-32 px-6 bg-terracotta/5" role="region">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((s, i) => (
            <motion.div 
              key={s.title}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[2.5rem] border border-terracotta/10 shadow-sm"
            >
              <div className="text-4xl mb-6">{s.icon}</div>
              <h3 className="text-terracotta font-serif text-2xl mb-4">{s.title}</h3>
              <p className="text-stone/60 font-sans leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'framer-motion';

const SERVICES = [
  {
    title: "The Float",
    description: "Weightless suspension in skin-temperature saltwater. Zero gravity for the soul.",
    duration: "60 / 90 min"
  },
  {
    title: "Light Therapy",
    description: "Curated spectrums to recalibrate your circadian rhythm and mood.",
    duration: "30 min"
  },
  {
    title: "Sound Bath",
    description: "Frequency-based meditation to dissolve the boundaries of the physical.",
    duration: "45 min"
  }
];

export const Services: React.FC = () => {
  return (
    <section className="design1-services py-32 px-6 bg-breeze/30" role="region">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group"
            >
              <span className="text-[10px] uppercase tracking-widest text-seafoam mb-4 block">
                0{index + 1} — {service.duration}
              </span>
              <h3 className="text-stone font-serif text-2xl mb-4 group-hover:italic transition-all duration-500">
                {service.title}
              </h3>
              <p className="text-stone/60 font-sans font-light leading-relaxed">
                {service.description}
              </p>
              <div className="mt-8 w-0 group-hover:w-full h-[1px] bg-stone/20 transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'framer-motion';

const SERVICES = [
  { title: "SENSORY NULL", desc: "Total isolation in controlled environments." },
  { title: "CHRONOS PAUSE", desc: "Time-dilation therapy using light and sound." },
  { title: "VOID RITUAL", desc: "A guided transition into absolute silence." }
];

export const Services: React.FC = () => {
  return (
    <section className="design3-services py-32 px-6 bg-stone text-cream" role="region">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-24 border-b border-cream/10 pb-12">
          <h2 className="text-stone font-serif text-6xl uppercase tracking-tighter text-cream/80">Services</h2>
          <span className="text-wave text-xs uppercase tracking-[0.3em] mt-4 md:mt-0">The Collection</span>
        </div>

        <div className="space-y-0">
          {SERVICES.map((s, i) => (
            <motion.div 
              key={s.title}
              whileHover={{ x: 20 }}
              className="flex flex-col md:flex-row items-center py-16 border-b border-cream/10 group cursor-pointer transition-colors hover:bg-cream/5 px-4"
            >
              <span className="text-seafoam font-serif italic text-2xl mr-12 group-hover:scale-125 transition-transform">0{i+1}</span>
              <h3 className="text-4xl md:text-6xl font-serif uppercase tracking-tight flex-grow mb-4 md:mb-0">
                {s.title}
              </h3>
              <p className="text-wave font-sans font-light max-w-sm text-right">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

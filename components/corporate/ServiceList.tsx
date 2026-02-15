import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, Zap } from 'lucide-react';

const services = [
  {
    icon: <Users className="w-8 h-8" />,
    title: "Team Float Rituals",
    description: "Structured decompression sessions for small teams to reset together."
  },
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: "Executive Retreats",
    description: "Multi-day deep rest intensives for leadership teams in high-stress environments."
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Performance Workshops",
    description: "Breathwork and sound healing optimized for focus and creative flow."
  }
];

export const ServiceList: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-stone mb-6">Our Programs</h2>
          <p className="text-stone/60 text-lg font-light">
            Modular wellness solutions that integrate seamlessly into the modern work day.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <motion.div 
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl border border-stone/10 hover:border-seafoam/40 transition-all duration-500"
            >
              <div className="text-seafoam mb-6">{service.icon}</div>
              <h3 className="text-xl font-serif text-stone mb-4">{service.title}</h3>
              <p className="text-stone/60 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

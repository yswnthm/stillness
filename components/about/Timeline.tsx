import React from 'react';
import { motion } from 'framer-motion';

const milestones = [
  {
    year: "2022",
    title: "The Seed",
    description: "Elena Corves opens the first Stillness studio with two float tanks and a vision for urban silence."
  },
  {
    year: "2023",
    title: "Expansion",
    description: "We introduced guided breathwork and sound healing rituals to complement the float experience."
  },
  {
    year: "2024",
    title: "Community",
    description: "Stillness grows to three locations, becoming a cornerstone for mental wellness in the city."
  },
  {
    year: "2025",
    title: "The Future",
    description: "Launching our corporate wellness programs to bring stillness to the workspace."
  }
];

export const Timeline: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h3 className="text-2xl md:text-4xl font-serif text-stone mb-16 text-center">Our Journey</h3>
        
        <div className="flex flex-col space-y-12">
          {milestones.map((milestone, index) => (
            <motion.div 
              key={milestone.year}
              className="flex flex-col md:flex-row gap-6 md:gap-12 items-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="md:w-32 flex-shrink-0">
                <span className="text-4xl font-serif text-seafoam">{milestone.year}</span>
              </div>
              <div className="flex-grow pb-12 border-b border-stone/10 last:border-0">
                <h4 className="text-xl font-bold text-stone mb-3 uppercase tracking-widest">{milestone.title}</h4>
                <p className="text-stone/60 text-lg font-light leading-relaxed max-w-2xl">
                  {milestone.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

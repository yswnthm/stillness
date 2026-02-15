import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    step: "01",
    title: "Choose Your Ritual",
    desc: "Select between Float Therapy, Breathwork, or a combined session."
  },
  {
    step: "02",
    title: "Select Time",
    desc: "Pick a date and time that allows you at least 30 minutes of buffer before and after."
  },
  {
    step: "03",
    title: "Arrival",
    desc: "Arrive 15 minutes early. We'll provide everything you need—robes, towels, and silence."
  }
];

export const ReservationInstructions: React.FC = () => {
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((s, i) => (
            <motion.div 
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <span className="text-5xl font-serif text-seafoam/20 block mb-4">{s.step}</span>
              <h4 className="text-xl font-serif text-stone mb-3">{s.title}</h4>
              <p className="text-stone/60 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

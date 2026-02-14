import React from 'react';
import { Section } from './Section';
import { motion } from 'framer-motion';
import { Wind, Waves, Sparkles, Brain } from 'lucide-react';

const habits = [
  {
    icon: <Waves className="w-6 h-6" />,
    title: "Float Therapy",
    desc: "Zero-gravity sensory relief to decompress the spine and silence the mind."
  },
  {
    icon: <Wind className="w-6 h-6" />,
    title: "Breathwork",
    desc: "Guided pranayama sessions to shift from fight-or-flight to rest-and-digest."
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Sound Healing",
    desc: "Vibrational therapy using crystal bowls to synchronize brainwave states."
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Integration",
    desc: "Post-float journaling and tea rituals to anchor your calm before leaving."
  }
];

export const Heal: React.FC = () => {
  return (
    <Section id="heal" className="bg-gradient-to-b from-cream to-white">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-3xl md:text-5xl font-serif text-stone mb-6">Curated Calm</h2>
        <p className="text-stone/60 font-sans font-light text-lg">
          Beyond the water. A holistic ecosystem for your nervous system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {habits.map((habit, index) => (
          <motion.div
            key={habit.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className="group p-8 rounded-3xl bg-cream border border-stone/5 hover:border-seafoam/30 hover:shadow-xl hover:shadow-seafoam/5 transition-all duration-500 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-stone/5 text-stone group-hover:bg-seafoam group-hover:text-white flex items-center justify-center mb-6 transition-colors duration-500">
              {habit.icon}
            </div>
            <h3 className="text-xl font-serif text-stone mb-3">{habit.title}</h3>
            <p className="text-sm text-stone/60 leading-relaxed group-hover:text-stone/80 transition-colors">
              {habit.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

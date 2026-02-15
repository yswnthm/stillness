import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "Stillness has become an essential part of our quarterly planning cycle. The clarity it provides is unmatched.",
    author: "James Chen",
    role: "VP of Product, TechStream"
  },
  {
    quote: "Our team's stress levels dropped visibly after introducing the Friday Float program. It's a game changer for culture.",
    author: "Sarah Miller",
    role: "People Operations, FlowState"
  }
];

export const CorporateTestimonials: React.FC = () => {
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {testimonials.map((t, i) => (
            <motion.div 
              key={t.author}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="relative p-10 bg-white rounded-3xl"
            >
              <p className="text-xl font-serif text-stone mb-8 italic">"{t.quote}"</p>
              <div>
                <p className="font-bold text-stone uppercase tracking-widest text-xs">{t.author}</p>
                <p className="text-stone/50 text-xs">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'framer-motion';

const milestones = [
  {
    year: "Why",
    title: "Most of what we carry started young.",
    description: "In working with adults, a pattern became clear. Most of the pain people are processing in their 30s and 40s has roots in childhood — in things they were never given language for."
  },
  {
    year: "Decks",
    title: "Affirmation Decks",
    description: "Simple, visual affirmations designed for children aged 4–12. Beautiful, gentle, and genuinely fun to use — alone or with a parent."
  },
  {
    year: "Talks",
    title: "Conversation Decks",
    description: "Cards that open real conversations between kids and the adults who love them. About feelings, fears, and what it means to be okay."
  },
  {
    year: "Reason",
    title: "Why we built them",
    description: "Not as a product line. As a response to what we kept seeing in our adult sessions. Every card is built with intention — and with the child's inner world in mind."
  }
];

export const Timeline: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h3 className="text-2xl md:text-4xl font-serif text-midnightsea mb-16 text-center">Our Journey</h3>

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
              <div className="flex-grow pb-12 border-b border-midnightsea/10 last:border-0">
                <h4 className="text-xl font-bold text-midnightsea mb-3 uppercase tracking-widest">{milestone.title}</h4>
                <p className="text-midnightsea/60 text-lg font-light leading-relaxed max-w-2xl">
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

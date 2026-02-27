import React from 'react';
import { motion } from 'framer-motion';

export const BrandStory: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 lg:gap-24">
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-serif text-midnightsea mb-8">
            You don't have to keep carrying it.<br />
            We started outside. The real work began inside.
          </h2>
          <div className="space-y-6 text-midnightsea/70 text-lg font-light leading-relaxed">
            <p>
              Stillness is a wellness experience company based in Greater Vancouver. We create real, felt experiences that help people slow down, heal, and come back to themselves.
            </p>
            <p>
              In summer 2024, we launched with floating sound healing sessions in the Greater Vancouver area. The water. The open air. The quiet. It was the beginning of something.
            </p>
            <p>
              When the seasons changed, we moved indoors — and discovered that the container we'd been creating outside translated into something deeper when brought into an intimate, intentional space. We began offering sound journeys, breathwork, yoga, and guided meditation. And people kept showing up.
            </p>
            <p>
              Not just for wellness. But because something in them needed to be heard.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1544367563-12123d896889?q=80&w=2070&auto=format&fit=crop"
              alt="Serene spa environment"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

import React from 'react';
import { Section } from './Section';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import { CORPORATE_STATS } from '../constants';
import { motion } from 'framer-motion';

export const CorporateWellness: React.FC = () => {
  return (
    <Section id="corporate" className="bg-breeze/30">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-16">

        {/* Content Side */}
        <motion.div
          className="lg:w-1/2 space-y-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div>
            <span className="text-seafoam text-sm font-bold tracking-[0.2em] uppercase mb-2 block">For Teams</span>
            <h2 className="text-3xl md:text-5xl font-serif text-stone mb-6 leading-tight">
              Bring Stillness to <br />the Workplace
            </h2>
            <p className="text-stone/70 text-lg font-light leading-relaxed mb-8">
              Burnout is the silent killer of creativity. Our corporate programs are designed to
              reset your team's collective nervous system, fostering clarity, empathy, and sustainable productivity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-stone/10 pt-8">
            {CORPORATE_STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-serif text-seafoam mb-2">{stat.value}</p>
                <p className="text-xs text-stone/60 uppercase tracking-wide leading-relaxed">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Link to="/corporate">
              <Button variant="outline">Inquire for Teams</Button>
            </Link>
          </div>
        </motion.div>

        {/* Image Side */}
        <motion.div
          className="lg:w-1/2 w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1544367563-12123d896889?q=80&w=2070&auto=format&fit=crop"
              alt="Team retreat setting"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-out"
            />
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

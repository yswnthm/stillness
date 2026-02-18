import React from 'react';
import { Section } from './Section';
import { Button } from './Button';
import { motion } from 'framer-motion';

export const FloatingTeaser: React.FC = () => {
  return (
    <Section id="waitlist" className="bg-midnight relative overflow-hidden text-cream" fullWidth>
      {/* Background ambient light effect */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-midnight rounded-full blur-[128px] opacity-40 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-seafoam rounded-full blur-[150px] opacity-20 animate-pulse-slow" style={{ animationDelay: '4s' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32 flex flex-col md:flex-row items-center justify-between gap-12">

        <div className="md:w-1/2 space-y-8">
          <div className="inline-block px-3 py-1 border border-seafoam/30 rounded-full text-seafoam text-xs tracking-widest uppercase mb-4">
            Coming 2026
          </div>
          <h2 className="text-4xl md:text-6xl font-serif leading-none">
            The Depths <br /> Expansion
          </h2>
          <p className="text-wave text-lg font-light max-w-md leading-relaxed">
            We are breaking ground on three new immersion chambers designed for extended
            theta-state therapy. Be the first to experience the new stillness.
          </p>

          <div className="pt-8">
            <div className="flex gap-4 items-end">
              <div className="text-center">
                <span className="block text-3xl font-serif text-cream">04</span>
                <span className="text-[10px] uppercase tracking-widest text-wave">Chambers</span>
              </div>
              <div className="text-2xl font-serif text-wave/30 pb-2">:</div>
              <div className="text-center">
                <span className="block text-3xl font-serif text-cream">12</span>
                <span className="text-[10px] uppercase tracking-widest text-wave">Rituals</span>
              </div>
              <div className="text-2xl font-serif text-wave/30 pb-2">:</div>
              <div className="text-center">
                <span className="block text-3xl font-serif text-cream">∞</span>
                <span className="text-[10px] uppercase tracking-widest text-wave">Stillness</span>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          className="md:w-5/12 w-full bg-midnight/30 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/5"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-serif mb-2">Join the Waitlist</h3>
          <p className="text-sm text-wave mb-6">Secure early access to the expansion.</p>
          <form className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-stone/50 border border-stone/50 text-cream placeholder-stone/60 px-4 py-3 rounded-lg focus:outline-none focus:border-seafoam transition-colors"
              />
            </div>
            <div>
              <select className="w-full bg-stone/50 border border-stone/50 text-cream/60 px-4 py-3 rounded-lg focus:outline-none focus:border-seafoam transition-colors appearance-none">
                <option>Interested in...</option>
                <option>Floating Membership</option>
                <option>Private Events</option>
                <option>General News</option>
              </select>
            </div>
            <Button fullWidth className="mt-2 bg-seafoam text-white hover:bg-seafoam/80 border-none">
              Reserve My Spot
            </Button>
          </form>
        </motion.div>

      </div>
    </Section>
  );
};

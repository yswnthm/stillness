import React from 'react';
import { Section } from './Section';
import { Button } from './Button';

export const Newsletter: React.FC = () => {
  return (
    <Section className="bg-seafoam/5 border-t border-seafoam/10">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-serif text-midnight mb-4">Join Our Community</h2>
        <p className="text-stone/60 mb-8 font-light">
          Receive monthly rituals, reflections, and early access to new experiences directly to your inbox. No noise, just stillness.
        </p>

        <form className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-grow px-6 py-3 bg-white border-none rounded-full text-stone placeholder-stone/40 focus:ring-2 focus:ring-seafoam/50 outline-none shadow-sm"
          />
          <button className="inline-block px-8 py-3 bg-seafoam/20 backdrop-blur-md border border-seafoam/40 rounded-full text-seafoam uppercase tracking-widest text-xs shadow-md hover:bg-midnight hover:text-cream hover:border-midnight hover:shadow-lg transition-all duration-700 whitespace-nowrap">
            Subscribe
          </button>
        </form>
        <p className="mt-4 text-[10px] text-stone/40 uppercase tracking-widest">
          We respect your inbox. Unsubscribe at any time.
        </p>
      </div>
    </Section>
  );
};

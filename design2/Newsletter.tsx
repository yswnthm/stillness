import React from 'react';

export const Newsletter: React.FC = () => {
  return (
    <section className="design2-newsletter py-32 px-6 bg-terracotta text-white" role="region">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-serif mb-8">Join the Circle</h2>
        <p className="font-sans text-terracotta-100/80 mb-12 text-lg">
          Receive monthly reflections and grounded wisdom.
        </p>
        <form className="flex flex-col md:flex-row gap-4" onSubmit={e => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Your email address"
            className="flex-grow bg-white/10 border border-white/20 rounded-full py-4 px-8 text-white placeholder:text-white/40 focus:outline-none focus:bg-white/20 transition-all"
          />
          <button className="bg-white text-terracotta rounded-full py-4 px-10 font-bold uppercase tracking-widest text-xs hover:bg-clay hover:text-white transition-all">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

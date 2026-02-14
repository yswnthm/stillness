import React from 'react';
import { Section } from './Section';
import { motion } from 'framer-motion';

export const Intro: React.FC = () => {
  return (
    <Section id="intro" className="bg-cream">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Left: Image with rounded mask */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-t-[10rem] rounded-b-2xl">
            <img 
              src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1000&auto=format&fit=crop" 
              alt="Founder in contemplation" 
              className="w-full h-full object-cover"
            />
            {/* Soft overlay */}
            <div className="absolute inset-0 bg-stone/10 mix-blend-multiply"></div>
          </div>
          <div className="absolute -bottom-6 -right-6 md:-right-12 bg-white p-6 md:p-8 rounded-tl-3xl shadow-lg max-w-xs hidden md:block">
            <p className="font-serif italic text-stone text-lg">
              "We built this space not to escape life, but to find the strength to return to it."
            </p>
          </div>
        </motion.div>

        {/* Right: Content */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col space-y-8"
        >
          <span className="text-seafoam text-sm uppercase tracking-[0.2em] font-bold">Our Philosophy</span>
          <h2 className="text-4xl md:text-5xl font-serif text-stone leading-tight">
            Rest is a biological <br/>necessity, not a luxury.
          </h2>
          <div className="space-y-6 text-stone/80 text-lg font-light leading-relaxed">
            <p>
              In a world that demands constant output, Stillness is an invitation to pause. 
              Founded by Elena Corves after her own journey through burnout, our sanctuary is designed 
              around the principles of sensory reduction and nervous system regulation.
            </p>
            <p>
              Here, the water holds you so you don't have to hold yourself. 
              We strip away the noise—gravity, light, sound, expectations—leaving only 
              the spaciousness you need to exhale.
            </p>
          </div>
          
          <div className="pt-4">
             <button className="group flex items-center gap-2 text-stone hover:text-seafoam transition-colors duration-300 uppercase text-xs tracking-widest font-bold">
               Read the full story
               <span className="w-8 h-[1px] bg-stone group-hover:bg-seafoam transition-colors duration-300"></span>
             </button>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

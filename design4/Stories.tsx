import React from 'react';
import { motion } from 'framer-motion';
import { ARTICLES } from '../constants';

export const Stories: React.FC = () => {
  return (
    <section className="design4-stories py-32 px-6 bg-[#0a0a0a]" role="region">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-white font-serif text-5xl mb-24 text-center">Tech-Luxe Insights</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {ARTICLES.slice(0, 2).map((article, i) => (
            <motion.div 
              key={article.id}
              whileHover={{ scale: 1.01 }}
              className="relative group cursor-pointer"
            >
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden mb-8 border border-white/10 shadow-2xl">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000" />
              </div>
              <div className="px-6">
                <span className="text-seafoam text-[10px] uppercase tracking-[0.4em] mb-4 block">{article.category}</span>
                <h3 className="text-white font-serif text-3xl mb-4 leading-tight">{article.title}</h3>
                <p className="text-white/40 font-sans font-light line-clamp-2">{article.excerpt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

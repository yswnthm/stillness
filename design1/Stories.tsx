import React from 'react';
import { motion } from 'framer-motion';
import { ARTICLES } from '../constants';

export const Stories: React.FC = () => {
  return (
    <section className="design1-stories py-32 px-6 bg-white" role="region">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-20">
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-seafoam mb-4 block">Archive</span>
            <h2 className="text-stone font-serif text-5xl font-light italic">
              Essays on Quiet
            </h2>
          </div>
          <button className="hidden md:block text-[10px] uppercase tracking-widest text-stone/40 hover:text-stone transition-colors border-b border-stone/10 pb-1">
            View All
          </button>
        </div>

        <div className="space-y-32">
          {ARTICLES.map((article, index) => (
            <motion.article 
              key={article.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16`}
            >
              <div className="w-full md:w-1/2 overflow-hidden bg-breeze/20 aspect-[4/5] relative group">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:scale-105 transition-transform duration-[2s] ease-out"
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col items-start max-w-sm">
                <span className="text-[10px] uppercase tracking-[0.3em] text-wave mb-6">
                  {article.category} — {article.readTime}
                </span>
                <h3 className="text-stone font-serif text-4xl mb-8 leading-tight font-light">
                  {article.title}
                </h3>
                <p className="text-stone/50 font-sans font-light text-lg leading-relaxed mb-10">
                  {article.excerpt}
                </p>
                <button className="group flex items-center gap-4">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-stone">Begin Reading</span>
                  <div className="w-8 h-[1px] bg-stone/20 group-hover:w-12 transition-all duration-500" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Section } from './Section';
import { ARTICLES } from '../constants';
import { motion } from 'framer-motion';

export const Stories: React.FC = () => {
  return (
    <Section id="stories" className="bg-white">
      <div className="mb-16 text-center">
        <span className="text-seafoam text-xs font-bold uppercase tracking-widest mb-3 block">The Journal</span>
        <h2 className="text-4xl md:text-5xl font-serif text-stone">Reflections on Stillness</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {ARTICLES.map((article, index) => (
          <motion.article 
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className="flex flex-col h-full group cursor-pointer"
          >
            <div className="aspect-[3/2] overflow-hidden rounded-xl mb-6">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-seafoam text-xs uppercase tracking-widest font-bold">{article.category}</span>
              <span className="text-stone/30 text-xs">•</span>
              <span className="text-stone/40 text-xs uppercase tracking-wider">{article.readTime}</span>
            </div>
            <h3 className="text-2xl font-serif text-stone mb-3 leading-tight group-hover:text-seafoam transition-colors duration-300">
              {article.title}
            </h3>
            <p className="text-stone/60 font-light mb-6 flex-grow">
              {article.excerpt}
            </p>
            <div className="mt-auto">
              <span className="text-xs uppercase tracking-widest text-stone border-b border-stone/30 pb-0.5 group-hover:border-seafoam group-hover:text-seafoam transition-colors">Read Article</span>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
};

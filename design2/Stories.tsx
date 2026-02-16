import React from 'react';
import { motion } from 'framer-motion';
import { ARTICLES } from '../constants';

export const Stories: React.FC = () => {
  return (
    <section className="design2-stories py-32 px-6 bg-white" role="region">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-stone font-serif text-5xl text-center mb-20">Earth Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {ARTICLES.map(article => (
            <div key={article.id} className="group">
              <div className="aspect-square overflow-hidden rounded-3xl mb-8 relative">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-terracotta/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <h3 className="text-stone font-serif text-2xl mb-4 group-hover:text-terracotta transition-colors">{article.title}</h3>
              <p className="text-stone/50 font-sans text-sm line-clamp-2 mb-6">{article.excerpt}</p>
              <button className="text-terracotta text-xs uppercase tracking-widest font-bold">Read More</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

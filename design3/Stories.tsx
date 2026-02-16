import React from 'react';
import { motion } from 'framer-motion';
import { ARTICLES } from '../constants';

export const Stories: React.FC = () => {
  return (
    <section className="design3-stories py-48 px-6 bg-white" role="region">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-32">
          <h2 className="text-stone font-serif text-8xl md:text-[12rem] leading-none uppercase tracking-tighter opacity-10 select-none absolute left-0 right-0">Stories</h2>
          <span className="relative z-10 text-stone font-serif text-5xl md:text-7xl italic">The Journal</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Featured Article */}
          <div className="md:col-span-8 md:col-start-1 group cursor-pointer">
            <div className="aspect-[16/9] overflow-hidden mb-8 grayscale hover:grayscale-0 transition-all duration-1000">
              <img src={ARTICLES[0].image} alt={ARTICLES[0].title} className="w-full h-full object-cover" />
            </div>
            <div className="max-w-xl">
              <span className="text-seafoam text-xs uppercase tracking-widest font-bold mb-4 block">{ARTICLES[0].category}</span>
              <h3 className="text-stone font-serif text-5xl mb-6 group-hover:italic transition-all">{ARTICLES[0].title}</h3>
              <p className="text-stone/60 font-sans text-lg leading-relaxed mb-8">{ARTICLES[0].excerpt}</p>
              <button className="text-stone text-xs uppercase tracking-widest border-b border-stone/20 pb-1">Read Feature</button>
            </div>
          </div>

          {/* Sidebar Articles */}
          <div className="md:col-span-3 md:col-start-10 space-y-24">
            {ARTICLES.slice(1).map(article => (
              <div key={article.id} className="group cursor-pointer">
                <div className="aspect-square overflow-hidden mb-6 grayscale hover:grayscale-0 transition-all duration-700">
                   <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-stone font-serif text-2xl mb-4 group-hover:text-seafoam transition-colors">{article.title}</h4>
                <span className="text-stone/40 text-[10px] uppercase tracking-widest">{article.readTime}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

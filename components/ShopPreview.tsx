import React from 'react';
import { Section } from './Section';
import { PRODUCTS } from '../constants';
import { Button } from './Button';
import { ArrowRight } from 'lucide-react';

export const ShopPreview: React.FC = () => {
  return (
    <Section id="shop" className="bg-cream">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-2">
        <div>
          <h2 className="text-3xl md:text-5xl font-serif text-stone mb-4">Bring The Ritual Home</h2>
          <p className="text-stone/60 max-w-md">
            Tools and elements to maintain your nervous system regulation between sessions.
          </p>
        </div>
        <a href="#all-products" className="hidden md:flex items-center gap-2 text-stone text-sm uppercase tracking-widest hover:text-seafoam transition-colors mt-4 md:mt-0">
          View All <ArrowRight size={16} />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-6 bg-sand/20">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-stone/0 group-hover:bg-stone/5 transition-colors duration-500" />
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                <button className="bg-white text-stone px-4 py-2 rounded-full text-xs uppercase tracking-widest shadow-lg">
                  Quick Add
                </button>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-serif text-stone mb-1 group-hover:text-seafoam transition-colors">{product.name}</h3>
                <p className="text-sm text-stone/50">{product.description}</p>
              </div>
              <span className="text-stone font-medium">{product.price}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center md:hidden">
         <Button variant="outline">View Shop</Button>
      </div>
    </Section>
  );
};

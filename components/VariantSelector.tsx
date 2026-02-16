import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const VARIANTS = [
  { name: 'Original', path: '/', description: 'The existing baseline' },
  { name: 'Light & Airy', path: '/design1', description: 'Minimalist & Floating' },
  { name: 'Earth Tone', path: '/design2', description: 'Organic & Grounded' },
  { name: 'Modern Editorial', path: '/design3', description: 'Bold & High-Fashion' },
  { name: 'Soft Glow', path: '/design4', description: 'Tech-Luxe & Immersive' },
];

export const VariantSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="fixed bottom-8 left-8 z-[1000]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 p-6 bg-white/80 backdrop-blur-xl rounded-3xl border border-stone/10 shadow-2xl w-72"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-stone font-serif text-xl italic">Design Variants</h3>
              <button onClick={() => setIsOpen(false)} className="text-stone/40 hover:text-stone">
                <X size={18} />
              </button>
            </div>
            
            <div className="space-y-2">
              {VARIANTS.map((v) => (
                <Link
                  key={v.path}
                  to={v.path}
                  onClick={() => setIsOpen(false)}
                  className={`block p-4 rounded-2xl transition-all ${
                    location.pathname === v.path 
                      ? 'bg-stone text-cream' 
                      : 'hover:bg-stone/5 text-stone'
                  }`}
                >
                  <p className="text-sm font-bold uppercase tracking-widest">{v.name}</p>
                  <p className={`text-[10px] mt-1 ${location.pathname === v.path ? 'text-cream/50' : 'text-stone/40'}`}>
                    {v.description}
                  </p>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-stone text-cream rounded-full flex items-center justify-center shadow-2xl border border-white/20"
      >
        <Layers size={24} />
      </motion.button>
    </div>
  );
};

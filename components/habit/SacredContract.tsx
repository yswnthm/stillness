import React from 'react';
import { Sun } from 'lucide-react';

export const SacredContract: React.FC = () => {
    return (
        <div className="bg-stone text-cream p-12 md:p-16 rounded-[4.5rem] shadow-2xl flex flex-col justify-center items-center text-center h-full relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-seafoam/10 rounded-full -translate-y-1/2 translate-x-1/2 animate-breathe" />
            <Sun className="text-seafoam mb-10 opacity-60 group-hover:rotate-45 transition-transform duration-1000" size={56} />
            <h4 className="text-3xl font-serif mb-8 max-w-[200px]">The Sacred Contract.</h4>
            <p className="text-cream/50 leading-relaxed text-base font-light italic mb-10">
                "Your nervous system doesn't need more information. It needs more integration. Committing to 30 days is the first step."
            </p>
            <div className="px-10 py-4 rounded-full border border-white/10 text-[10px] uppercase tracking-[0.3em] font-bold bg-white/5 backdrop-blur-sm">
                Circle starts in 12 days
            </div>
        </div>
    );
};

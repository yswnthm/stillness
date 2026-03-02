import React from 'react';
import { Leaf } from 'lucide-react';

export const AvailabilityScarcity: React.FC = () => {
    return (
        <div className="bg-seafoam text-white p-12 md:p-16 rounded-[4rem] shadow-xl shadow-seafoam/20 flex flex-col justify-center items-center text-center h-full relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 animate-breathe" />
            <Leaf className="text-white mb-8 opacity-80 group-hover:rotate-12 transition-transform duration-700" size={48} />
            <h4 className="text-2xl font-serif mb-6">Limited Availability</h4>
            <p className="text-white/80 leading-relaxed text-sm">
                Due to the highly personalized, time-intensive nature of this offering, Curated Calm memberships are **strictly capped at 8 individuals** per year.
            </p>
            <div className="mt-10 px-6 py-3 rounded-full border border-white/30 text-[10px] uppercase tracking-[0.3em] font-light">
                Currently: 3 Spots Remaining
            </div>
        </div>
    );
};

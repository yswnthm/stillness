import React from 'react';
import { Users } from 'lucide-react';

export const IntimateCircle: React.FC = () => {
    return (
        <section className="py-40 bg-breeze text-stone overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="max-w-5xl mx-auto px-6 text-center reveal">
                <div className="w-24 h-24 border border-seafoam/20 rounded-full mx-auto flex items-center justify-center mb-12 bg-white/50 backdrop-blur-sm">
                    <Users size={40} className="text-seafoam" />
                </div>
                <h2 className="text-4xl md:text-6xl font-serif mb-10">Quality over Quantity</h2>
                <p className="text-stone/70 text-xl leading-relaxed max-w-3xl mx-auto mb-16 font-light">
                    The Stillness Habit is a deep-dive transmission. To maintain the integrity of the energetic field and ensure every participant receives direct guidance, cohorts are **strictly limited to 15 individuals**. This ensures an intimate, high-resonance experience for everyone involved.
                </p>
                <div className="inline-flex items-center gap-6 px-10 py-5 rounded-full bg-white/40 border border-white/60 text-xs uppercase tracking-[0.3em] font-bold shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-seafoam animate-pulse" />
                    Next Cohort: March 1st - March 30th
                </div>
            </div>
        </section>
    );
};

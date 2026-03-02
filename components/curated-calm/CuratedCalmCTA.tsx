import React from 'react';
import { Link } from 'react-router-dom';

export const CuratedCalmCTA: React.FC = () => {
    return (
        <div className="py-40 bg-white relative overflow-hidden text-center">
            <div className="absolute inset-0 bg-breeze/20 animate-breathe" />
            <div className="relative z-10 px-6 max-w-2xl mx-auto reveal">
                <h2 className="text-5xl md:text-7xl font-serif mb-12 leading-tight">Your sanctuary<br />reclaimed.</h2>
                <p className="text-stone/60 mb-16 italic font-light text-lg">"The world will wait. Your peace will not."</p>
                <div className="flex items-center justify-center gap-12">
                    <Link to="/about" className="text-[10px] uppercase tracking-[0.3em] text-stone/40 hover:text-stone transition-colors border-b border-stone/10 pb-2">Our Way</Link>
                    <Link to="/offerings" className="text-[10px] uppercase tracking-[0.3em] text-stone/40 hover:text-stone transition-colors border-b border-stone/10 pb-2">Other Rituals</Link>
                </div>
            </div>
        </div>
    );
};

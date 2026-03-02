import React from 'react';
import { Link } from 'react-router-dom';

export const HabitCTA: React.FC = () => {
    return (
        <div className="py-40 bg-white relative overflow-hidden text-center border-t border-stone/5">
            <div className="absolute inset-0 bg-breeze/10 animate-breathe" />
            <div className="relative z-10 px-6 max-w-2xl mx-auto reveal">
                <h2 className="text-5xl md:text-7xl font-serif mb-12 leading-tight text-stone">One month.<br /><span className="italic text-seafoam">One life.</span></h2>
                <p className="text-stone/40 mb-16 italic font-light text-xl">"The practice is for you. The results are for everyone."</p>
                <div className="flex items-center justify-center gap-16">
                    <Link to="/about" className="text-[10px] uppercase tracking-[0.4em] text-stone/40 hover:text-stone transition-colors border-b border-stone/10 pb-3 font-bold">Our Philosophy</Link>
                    <Link to="/offerings" className="text-[10px] uppercase tracking-[0.4em] text-stone/40 hover:text-stone transition-colors border-b border-stone/10 pb-3 font-bold">All Rituals</Link>
                </div>
            </div>
        </div>
    );
};

import React from 'react';
import { Link } from 'react-router-dom';

export const OfferingsCTA: React.FC = () => {
    return (
        <section className="py-60 relative overflow-hidden bg-white text-center">
            <div className="absolute inset-0 bg-breeze/20 animate-breathe" />
            <div className="relative z-10 px-6 max-w-2xl mx-auto reveal">
                <h2 className="text-5xl md:text-7xl font-serif mb-12 leading-tight">Your practice<br />awaits.</h2>
                <p className="text-stone/60 mb-16 italic">"The quietest voice is often the most important."</p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                    <Link to="/about" className="text-xs uppercase tracking-widest border-b border-stone/20 pb-2 hover:border-stone transition-colors">Our Philosophy</Link>
                    <a href="#memberships" className="bg-stone text-cream px-12 py-5 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-midnightsea transition-all duration-500">View Offerings</a>
                    <Link to="/contact" className="text-xs uppercase tracking-widest border-b border-stone/20 pb-2 hover:border-stone transition-colors">Inquire</Link>
                </div>
            </div>
        </section>
    );
};

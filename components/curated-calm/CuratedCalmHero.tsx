import React from 'react';
import { ArrowRight } from 'lucide-react';

export const CuratedCalmHero: React.FC = () => {
    return (
        <section className="relative h-screen flex items-center justify-center bg-midnightsea overflow-hidden">
            <div className="absolute inset-0 opacity-40">
                <img
                    src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2000&auto=format&fit=crop"
                    alt="Hero"
                    className="w-full h-full object-cover grayscale brightness-50"
                />
            </div>

            <div className="absolute top-1/4 right-10 w-64 h-64 bg-seafoam/20 rounded-full blur-3xl animate-breathe" />
            <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-breeze/10 rounded-full blur-3xl animate-breathe" style={{ animationDelay: '2s' }} />

            <div className="relative z-10 text-center px-6 mt-20">
                <div className="reveal">
                    <span className="inline-block text-seafoam tracking-[0.4em] uppercase text-xs mb-8">Sacred Space I</span>
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-cream mb-8 leading-[1.1] reveal reveal-delay-1 max-w-4xl mx-auto">
                    The In-Home<br />
                    <span className="italic font-light">Sanctuary</span>
                </h1>
                <p className="text-cream/60 max-w-xl mx-auto font-light leading-relaxed reveal reveal-delay-2 mb-12 italic">
                    "The deepest calm is the one you don't have to chase. We bring the ritual to your doorstep."
                </p>
                <div className="reveal reveal-delay-3">
                    <a
                        href="#narrative"
                        className="group relative inline-flex items-center gap-4 px-10 py-5 overflow-hidden"
                    >
                        <span className="absolute inset-0 border border-cream/20 rounded-full group-hover:scale-105 transition-transform duration-500" />
                        <span className="text-cream text-sm tracking-widest uppercase">Explore Membership</span>
                        <ArrowRight size={18} className="text-seafoam group-hover:translate-x-2 transition-transform duration-500" />
                    </a>
                </div>
            </div>
        </section>
    );
};

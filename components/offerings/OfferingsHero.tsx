import React from 'react';
import { ArrowRight } from 'lucide-react';

export const OfferingsHero: React.FC = () => {
    return (
        <section className="relative h-screen flex items-center justify-center bg-midnightsea overflow-hidden">
            <div className="absolute inset-0 opacity-40">
                <img
                    src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=2000&auto=format&fit=crop"
                    alt="Hero"
                    className="w-full h-full object-cover grayscale brightness-50"
                />
            </div>

            {/* Floating Elements for "Creativity" */}
            <div className="absolute top-1/4 left-10 w-64 h-64 bg-seafoam/20 rounded-full blur-3xl animate-breathe" />
            <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-breeze/10 rounded-full blur-3xl animate-breathe" style={{ animationDelay: '2s' }} />

            <div className="relative z-10 text-center px-6">
                <div className="reveal">
                    <span className="inline-block text-seafoam tracking-[0.3em] uppercase text-xs mb-8">Offerings of Presence</span>
                </div>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-cream mb-8 leading-[0.9] reveal reveal-delay-1">
                    The Sacred<br />
                    <span className="italic font-light">Stillness</span>
                </h1>
                <p className="text-cream/60 max-w-lg mx-auto font-light leading-relaxed reveal reveal-delay-2 mb-12">
                    A deliberate return to the center. Not an escape from the world, but a deeper integration into it.
                </p>
                <div className="reveal reveal-delay-3">
                    <a
                        href="#memberships"
                        className="group relative inline-flex items-center gap-4 px-10 py-5 overflow-hidden"
                    >
                        <span className="absolute inset-0 border border-cream/20 rounded-full group-hover:scale-105 transition-transform duration-500" />
                        <span className="text-cream text-sm tracking-widest uppercase">Begin the Journey</span>
                        <ArrowRight size={18} className="text-seafoam group-hover:translate-x-2 transition-transform duration-500" />
                    </a>
                </div>
            </div>

            {/* Bottom Stats/Indicator Style */}
            <div className="absolute bottom-12 left-0 w-full px-12 flex justify-between items-end opacity-40 text-cream text-[10px] tracking-widest uppercase reveal reveal-delay-3">
                <div className="flex gap-12">
                    <div>43° N / 79° W</div>
                    <div>Canada's First Sanctuary</div>
                </div>
                <div className="flex items-center gap-4">
                    <span>Scroll</span>
                    <div className="w-12 h-0.5 bg-cream/20 relative">
                        <div className="absolute top-0 left-0 h-full bg-seafoam w-1/3" />
                    </div>
                </div>
            </div>
        </section>
    );
};

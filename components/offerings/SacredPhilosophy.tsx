import React from 'react';
import { Wind } from 'lucide-react';

export const SacredPhilosophy: React.FC = () => {
    return (
        <section className="py-32 bg-white relative">
            <div className="absolute inset-0 custom-grid-bg" />
            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div className="reveal">
                        <div className="w-20 h-24 border border-stone/10 rounded-full flex items-center justify-center mb-12 overflow-hidden bg-breeze">
                            <Wind size={32} className="text-seafoam" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-8">
                            Why we practice<br />
                            <span className="text-seafoam">doing nothing.</span>
                        </h2>
                        <p className="text-stone/60 leading-relaxed mb-6">
                            Stillness isn't the absence of motion; it's the concentration of clarity. We live in an age that commodifies our attention, leaving us fragmented and fatigued.
                        </p>
                        <p className="text-stone/60 leading-relaxed">
                            Our offerings are designed as architectural interventions for the nervous system—spaces where the debris of modern life can finally settle.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="aspect-[4/5] rounded-[2rem] overflow-hidden curtain-reveal reveal">
                            <img
                                src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1200&auto=format&fit=crop"
                                alt="Philosophy"
                                className="w-full h-full object-cover transition-transform duration-[4s] hover:scale-110"
                            />
                        </div>
                        <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-seafoam rounded-3xl -z-10 reveal reveal-delay-2" />
                    </div>
                </div>
            </div>
        </section>
    );
};

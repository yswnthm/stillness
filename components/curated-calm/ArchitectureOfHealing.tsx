import React from 'react';

export const ArchitectureOfHealing: React.FC = () => {
    return (
        <section id="narrative" className="py-40 bg-white relative">
            <div className="absolute inset-0 custom-grid-bg" />
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-24 lg:gap-32">
                    <div className="w-full lg:w-1/2 relative">
                        <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl reveal curtain-reveal">
                            <img
                                src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1200&auto=format&fit=crop"
                                alt="Healing Space"
                                className="w-full h-full object-cover transition-transform duration-[4s] hover:scale-110"
                            />
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-breeze rounded-[2rem] -z-10 reveal reveal-delay-2" />
                    </div>
                    <div className="w-full lg:w-1/2 reveal reveal-delay-2">
                        <span className="text-seafoam tracking-[0.3em] uppercase text-[10px] mb-6 block">Our Approach</span>
                        <h2 className="text-4xl md:text-5xl font-serif mb-10 leading-tight">
                            A sacred year of<br />
                            <span className="italic text-seafoam">personalized</span> healing.
                        </h2>
                        <p className="text-stone/60 leading-relaxed text-lg mb-8">
                            Your life is full. Your recovery shouldn't require another commute, another appointment to rush to, or another unfamiliar space.
                        </p>
                        <p className="text-stone/60 leading-relaxed text-lg mb-12">
                            We believe the nervous system regulates most deeply in environments where it already feels safe. By bringing the practice to your home, we remove the friction of travel, allowing you to seamlessly integrate deep rest into your actual living space.
                        </p>
                        <div className="flex items-center gap-8 border-t border-stone/5 pt-12">
                            <div>
                                <div className="text-3xl font-serif text-stone mb-1">12</div>
                                <div className="text-[10px] uppercase tracking-widest text-stone/40">Months</div>
                            </div>
                            <div className="w-px h-12 bg-stone/5" />
                            <div>
                                <div className="text-3xl font-serif text-stone mb-1">11</div>
                                <div className="text-[10px] uppercase tracking-widest text-stone/40">Home Visits</div>
                            </div>
                            <div className="w-px h-12 bg-stone/5" />
                            <div>
                                <div className="text-3xl font-serif text-stone mb-1">1</div>
                                <div className="text-[10px] uppercase tracking-widest text-stone/40">Sound Bath</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

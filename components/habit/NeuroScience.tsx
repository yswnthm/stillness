import React from 'react';
import { Brain, Activity } from 'lucide-react';

export const NeuroScience: React.FC = () => {
    return (
        <section id="methodology" className="py-40 bg-white relative">
            <div className="absolute inset-0 custom-grid-bg" />
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row-reverse items-center gap-24 lg:gap-32">
                    <div className="w-full lg:w-1/2 relative">
                        <div className="aspect-[3/4] rounded-[3.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] reveal curtain-reveal">
                            <img
                                src="https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?q=80&w=1200&auto=format&fit=crop"
                                alt="Soma Practice"
                                className="w-full h-full object-cover transition-transform duration-[4s] hover:scale-110"
                            />
                        </div>
                        <div className="absolute -top-12 -left-12 w-56 h-56 bg-seafoam/10 rounded-[3rem] -z-10 reveal reveal-delay-2" />
                        <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-breeze/20 rounded-full blur-2xl -z-10 animate-breathe" />
                    </div>
                    <div className="w-full lg:w-1/2 reveal reveal-delay-2">
                        <span className="text-seafoam tracking-[0.3em] uppercase text-[10px] mb-6 block font-bold">The Science of Presence</span>
                        <h2 className="text-4xl md:text-5xl font-serif mb-10 leading-tight text-stone">
                            Rewire for<br />
                            <span className="italic text-seafoam">unshakeable</span> calm.
                        </h2>
                        <p className="text-stone/60 leading-relaxed text-lg mb-8 font-light">
                            Resistance to meditation isn't a personality flaw—it's a physiological response of a nervous system that hasn't found its rhythm. Modern life demands constant external attention, leaving the brain stuck in 'scanning' mode.
                        </p>
                        <p className="text-stone/60 leading-relaxed text-lg mb-8 font-light">
                            Our 30-day container is built on the principle of social regulation. By sitting together in a live, daily ritual, we bypass the isolation that makes habit formation difficult. We don't just teach you to sit; we create the environmental and communal conditions that make stillness the path of least resistance.
                        </p>
                        <p className="text-stone/60 leading-relaxed text-lg mb-12 font-light">
                            Through consistent repetition and somatic preparation, we move the body from a state of hyper-vigilance into a state of deep, restorative safety. This is how a temporary practice becomes a lifelong architecture.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-stone/5 pt-12">
                            {[
                                { icon: <Brain size={20} className="text-seafoam" />, title: "Neuro-Rewiring", text: "30 days is the threshold for true plastic change." },
                                { icon: <Activity size={20} className="text-seafoam" />, title: "Somatic Safety", text: "Moving the body into regulation before silence." }
                            ].map((item, i) => (
                                <div key={i} className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-breeze/40 flex items-center justify-center flex-shrink-0">
                                            {item.icon}
                                        </div>
                                        <span className="text-stone font-serif text-lg">{item.title}</span>
                                    </div>
                                    <p className="text-stone/50 text-[10px] leading-relaxed font-bold uppercase tracking-widest">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

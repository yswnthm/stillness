import React from 'react';
import { Sun, Wind, Users, Sparkles } from 'lucide-react';

export const RitualComponents: React.FC = () => {
    return (
        <section className="py-40 bg-midnightsea text-cream relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-1/2 h-full bg-white/5 -skew-x-12 -translate-x-1/4" />
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-32 reveal">
                    <span className="text-seafoam tracking-[0.4em] uppercase text-[10px] mb-6 block font-bold">Inside The Container</span>
                    <h2 className="text-4xl md:text-6xl font-serif leading-tight">30 Days of Guided Immersion</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {[
                        {
                            icon: <Sun className="text-seafoam" size={32} />,
                            title: "Daily Live Zoom Sessions",
                            desc: "30 days of live, facilitated practice at dawn. Show up exactly as you are. No recordings to fall behind on—just the raw, human experience of breathing together every single morning."
                        },
                        {
                            icon: <Wind className="text-seafoam" size={32} />,
                            title: "Somatic Regulation",
                            desc: "Integrative techniques to discharge stress from the nervous system before the sit. We use the breath to anchor the body in safety, making the silence an invitation rather than a chore."
                        },
                        {
                            icon: <Users className="text-seafoam" size={32} />,
                            title: "Accountability Circle",
                            desc: "An intimate cohort of maximum 15 seekers. This isn't a broadcast; it's a conversation. Share reflections, challenges, and breakthroughs in a safety-first container."
                        },
                        {
                            icon: <Sparkles className="text-seafoam" size={32} />,
                            title: "The Habit Toolkit",
                            desc: "A curated digital library of integration resources, including morning rituals, evening wind-downs, and the science of maintaining presence beyond the 30-day container."
                        }
                    ].map((feature, i) => (
                        <div key={i} className="reveal p-12 lg:p-14 rounded-[3rem] bg-stone/20 border border-white/5 hover:bg-white/5 transition-all duration-500 group">
                            <div className="mb-10 w-20 h-20 rounded-full bg-midnightsea border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-seafoam/30 transition-all duration-500">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-serif mb-6">{feature.title}</h3>
                            <p className="text-cream/60 leading-relaxed font-light text-lg">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

import React from 'react';
import { CheckCircle2, Wind, Sun, Sparkles } from 'lucide-react';

export const InHomeFeatures: React.FC = () => {
    return (
        <section className="py-40 bg-midnightsea text-cream relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-stone/20 -skew-x-12 translate-x-1/4" />
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-32 reveal">
                    <span className="text-seafoam tracking-[0.4em] uppercase text-[10px] mb-6 block">What's Included</span>
                    <h2 className="text-4xl md:text-6xl font-serif leading-tight">Crafted for your nervous system.</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {[
                        {
                            icon: <CheckCircle2 className="text-seafoam" size={32} />,
                            title: "11 Private In-Home Sessions",
                            desc: "Transform your living room into a healing sanctuary. Each session is uniquely crafted based on your body's physical and emotional landscape that day."
                        },
                        {
                            icon: <Wind className="text-seafoam" size={32} />,
                            title: "1 Floating Sound Bath",
                            desc: "An exclusive immersion in weightless sound therapy at Canada's first floating sanctuary. The ultimate nervous system reset."
                        },
                        {
                            icon: <Sun className="text-seafoam" size={32} />,
                            title: "Flexible Scheduling",
                            desc: "Priority booking tailored strictly around your demanding life. We work with your schedule to ensure consistency without added stress."
                        },
                        {
                            icon: <Sparkles className="text-seafoam" size={32} />,
                            title: "All Materials Provided",
                            desc: "From sustainable mats to ambient scents and sound healing tools, we bring everything needed to create a full sensory experience in your space."
                        }
                    ].map((feature, i) => (
                        <div key={i} className="reveal p-10 lg:p-12 rounded-[2.5rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-colors duration-500 group">
                            <div className="mb-8 w-16 h-16 rounded-full bg-midnightsea border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-serif mb-6">{feature.title}</h3>
                            <p className="text-cream/60 leading-relaxed font-light">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

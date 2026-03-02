import React from 'react';
import { Waves, Sparkles, Wind, Sun } from 'lucide-react';

export const SensoryPath: React.FC = () => {
    return (
        <div className="py-40 bg-breeze/30 -mx-6 md:-mx-12 px-12 rounded-[5rem] mb-60 reveal">
            <div className="text-center mb-24 uppercase tracking-[0.4em] text-[10px] text-seafoam">The Sensory Path</div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16">
                {[
                    { icon: <Waves />, title: "Immersion", desc: "Weightless release" },
                    { icon: <Sparkles />, title: "Frequency", desc: "Sound as healing" },
                    { icon: <Wind />, title: "Breath", desc: "The primary tool" },
                    { icon: <Sun />, title: "Ritual", desc: "Sacred habit" }
                ].map((item, i) => (
                    <div key={i} className="text-center group pointer-events-auto">
                        <div className="w-20 h-20 mx-auto border border-stone/10 rounded-full flex items-center justify-center mb-8 bg-white group-hover:scale-110 group-hover:border-seafoam transition-all duration-700">
                            {React.cloneElement(item.icon as React.ReactElement, { size: 24, className: "text-seafoam transition-transform duration-700 group-hover:rotate-12" })}
                        </div>
                        <h4 className="font-serif text-xl mb-2">{item.title}</h4>
                        <p className="text-stone/40 text-xs tracking-widest uppercase">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

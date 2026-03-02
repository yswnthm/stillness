import React from 'react';

export const DayInStillness: React.FC = () => {
    return (
        <section className="py-40 bg-stone text-cream relative overflow-hidden">
            <div className="absolute top-0 left-1/2 w-px h-full bg-white/5 -translate-x-1/2" />
            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <div className="text-center mb-32 reveal">
                    <span className="text-seafoam tracking-[0.4em] uppercase text-[10px] mb-6 block">Rhythm of Rest</span>
                    <h2 className="text-4xl md:text-6xl font-serif italic">A Day in Stillness</h2>
                </div>

                <div className="space-y-40">
                    {[
                        { time: "06:00", title: "Morning Dew", text: "Awaken to silence before the digital world demands your attention.", color: "bg-breeze/20" },
                        { time: "13:00", title: "The Midday Pause", text: "A deliberate check-in to reset the nervous system.", color: "bg-seafoam/20" },
                        { time: "20:00", title: "Evening Descent", text: "Communal practice to shed the day's weight.", color: "bg-midnightsea/40" }
                    ].map((item, i) => (
                        <div key={i} className={`flex items-center gap-12 md:gap-24 reveal ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                            <div className="w-1/2 text-right">
                                <div className={`aspect-square w-full max-w-[200px] ${i % 2 === 0 ? 'ml-auto' : 'mr-auto'} rounded-full ${item.color} flex items-center justify-center border border-white/10`}>
                                    <span className="text-4xl font-serif italic">{item.time}</span>
                                </div>
                            </div>
                            <div className="w-1/2">
                                <h4 className="text-2xl font-serif mb-4">{item.title}</h4>
                                <p className="text-cream/50 leading-relaxed text-sm md:text-base">{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Moon } from 'lucide-react';

export const StillnessHabitOffering: React.FC = () => {
    return (
        <div className="relative mb-40">
            <div className="flex flex-col lg:flex-row-reverse items-center">
                <div className="w-full lg:w-3/5 reveal">
                    <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=1600&auto=format&fit=crop"
                            alt="The Stillness Habit"
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-midnightsea/20" />
                    </div>
                </div>
                <div className="w-full lg:w-2/5 lg:-mr-24 z-10 mt-12 lg:mt-0 reveal reveal-delay-2">
                    <div className="bg-midnightsea text-cream p-10 lg:p-14 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] rounded-[3rem] border border-white/5 relative group min-h-[500px] flex flex-col justify-center">
                        <div className="absolute top-10 left-10 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                            <Moon size={100} />
                        </div>
                        <span className="text-seafoam tracking-widest uppercase text-xs mb-4 block">Membership II</span>
                        <h3 className="text-4xl md:text-5xl font-serif mb-6">The Stillness Habit</h3>
                        <p className="text-cream/60 leading-relaxed mb-8 text-sm">
                            Build a lifelong meditation practice in just 30 days. Join an intimate cohort for daily live-guided facilitation where consistency becomes sacred.
                        </p>

                        <div className="space-y-4 mb-10">
                            {[
                                "30 Daily Live Guided Sessions",
                                "Integrated Breathwork Training",
                                "Sacred Closing Ritual Event",
                                "Digital Habit Tracking Tools",
                                "Intimate Cohorts (Max 15)"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-cream/70 text-xs tracking-wide">
                                    <div className="w-1.5 h-1.5 rounded-full bg-seafoam" />
                                    {item}
                                </div>
                            ))}
                        </div>

                        <div className="mb-10 p-6 bg-white/5 rounded-2xl border border-white/10">
                            <div className="text-[10px] uppercase tracking-widest text-seafoam mb-1">Investment</div>
                            <div className="text-2xl font-serif text-cream">$333 <span className="text-sm font-sans uppercase tracking-[0.2em] opacity-40">CAD / Founders</span></div>
                            <div className="text-xs text-cream/40 mt-1">General Enrollment: $488 CAD</div>
                        </div>

                        <Link
                            to="/habit"
                            className="inline-flex items-center gap-4 text-cream group self-start"
                        >
                            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-cream group-hover:text-stone transition-all duration-500">
                                <ArrowLeft size={16} />
                            </div>
                            <span className="text-sm tracking-widest uppercase border-b border-transparent group-hover:border-cream transition-all duration-500 pb-1">Begin Practice</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

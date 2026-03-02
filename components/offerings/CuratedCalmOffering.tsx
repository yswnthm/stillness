import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf } from 'lucide-react';

export const CuratedCalmOffering: React.FC = () => {
    return (
        <div className="relative mb-60">
            <div className="flex flex-col lg:flex-row items-center">
                <div className="w-full lg:w-3/5 reveal">
                    <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1600&auto=format&fit=crop"
                            alt="Curated Calm"
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-stone/10" />
                    </div>
                </div>
                <div className="w-full lg:w-2/5 lg:-ml-24 z-10 mt-12 lg:mt-0 reveal reveal-delay-2">
                    <div className="bg-white p-10 lg:p-14 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] rounded-[3rem] border border-stone/5 relative group min-h-[500px] flex flex-col justify-center">
                        <div className="absolute top-10 right-10 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                            <Leaf size={100} />
                        </div>
                        <span className="text-seafoam tracking-widest uppercase text-xs mb-4 block">Membership I</span>
                        <h3 className="text-4xl md:text-5xl font-serif mb-6">Curated Calm</h3>
                        <p className="text-stone/60 leading-relaxed mb-8 text-sm">
                            A bespoke journey of 12 private in-home wellness sessions, evolving with your needs over the course of a year. Because the deepest calm is the one you don't have to chase.
                        </p>

                        <div className="space-y-4 mb-10">
                            {[
                                "11 Private In-Home Sessions",
                                "1 Floating Sound Bath Experience",
                                "Priority & Flexible Scheduling",
                                "Premium Stillness Tools Provided",
                                "Optional Guest Access ($99)"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-stone/80 text-xs tracking-wide">
                                    <div className="w-1.5 h-1.5 rounded-full bg-seafoam" />
                                    {item}
                                </div>
                            ))}
                        </div>

                        <div className="mb-10 p-6 bg-breeze/30 rounded-2xl border border-seafoam/10">
                            <div className="text-[10px] uppercase tracking-widest text-seafoam mb-1">Investment</div>
                            <div className="text-2xl font-serif text-stone">$3,333 <span className="text-sm font-sans uppercase tracking-[0.2em] opacity-40">CAD / Year</span></div>
                            <div className="text-xs text-stone/40 mt-1">or $297 / month</div>
                        </div>

                        <Link
                            to="/curated-calm"
                            className="inline-flex items-center gap-4 text-stone group self-start"
                        >
                            <div className="w-12 h-12 rounded-full border border-stone/20 flex items-center justify-center group-hover:bg-stone group-hover:text-white transition-all duration-500">
                                <ArrowRight size={16} />
                            </div>
                            <span className="text-sm tracking-widest uppercase border-b border-transparent group-hover:border-stone transition-all duration-500 pb-1">Enter Sanctuary</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

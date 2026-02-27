import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Leaf, Waves, Sun, Flower2, Wind, Sparkles, Moon } from 'lucide-react';

export const SacredOfferingsPage = () => {
    const { hash } = useLocation();
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        // Initialize Intersection Observer for reveals
        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });

        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => observerRef.current?.observe(el));

        if (hash) {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        } else {
            window.scrollTo(0, 0);
        }

        return () => observerRef.current?.disconnect();
    }, [hash]);

    return (
        <div className="min-h-screen bg-white text-stone overflow-hidden">
            <style>
                {`
                    .reveal {
                        opacity: 0;
                        transform: translateY(30px);
                        transition: all 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
                    }
                    .reveal.is-visible {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    .reveal-delay-1 { transition-delay: 0.2s; }
                    .reveal-delay-2 { transition-delay: 0.4s; }
                    .reveal-delay-3 { transition-delay: 0.6s; }
                    
                    .parallax-bg {
                        transition: transform 0.5s cubic-bezier(0.1, 0, 0.3, 1);
                    }
                    
                    .curtain-reveal {
                        position: relative;
                        overflow: hidden;
                    }
                    .curtain-reveal::after {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: #1D3152;
                        transform: translateX(0);
                        transition: transform 1.5s cubic-bezier(0.77, 0, 0.175, 1);
                        z-index: 2;
                    }
                    .curtain-reveal.is-visible::after {
                        transform: translateX(101%);
                    }

                    @keyframes breathe {
                        0%, 100% { transform: scale(1); opacity: 0.3; }
                        50% { transform: scale(1.1); opacity: 0.5; }
                    }
                    .animate-breathe {
                        animation: breathe 8s ease-in-out infinite;
                    }

                    .custom-grid-bg {
                        background-image: radial-gradient(#688F9D 0.5px, transparent 0.5px);
                        background-size: 40px 40px;
                        opacity: 0.1;
                    }
                `}
            </style>

            {/* Hero Section - Midnight Sea */}
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

            {/* Philosophy Section - Breeze Backdrop */}
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

            {/* Offerings Main - Overlapping Layout */}
            <section id="memberships" className="py-40 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Offering A: Curated Calm */}
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

                    {/* Ritual Elements Grid - New Creative Section */}
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

                    {/* Offering B: The Stillness Habit */}
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
                </div>
            </section>

            {/* A Day in Stillness - Timeline Concept */}
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

            {/* Final CTA - Breathing Background */}
            <section className="py-60 relative overflow-hidden bg-white text-center">
                <div className="absolute inset-0 bg-breeze/20 animate-breathe" />
                <div className="relative z-10 px-6 max-w-2xl mx-auto reveal">
                    <h2 className="text-5xl md:text-7xl font-serif mb-12 leading-tight">Your practice<br />awaits.</h2>
                    <p className="text-stone/60 mb-16 italic">"The quietest voice is often the most important."</p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                        <Link to="/about" className="text-xs uppercase tracking-widest border-b border-stone/20 pb-2 hover:border-stone transition-colors">Our Philosophy</Link>
                        <a href="#memberships" className="bg-stone text-cream px-12 py-5 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-midnightsea transition-all duration-500">View Offerings</a>
                        <Link to="/contact" className="text-xs uppercase tracking-widest border-b border-stone/20 pb-2 hover:border-stone transition-colors">Inquire</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

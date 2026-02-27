import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sun, Users, CheckCircle2, Sparkles, Wind, Brain, Activity, Clock } from 'lucide-react';

export const StillnessHabitPage = () => {
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

        window.scrollTo(0, 0);

        return () => observerRef.current?.disconnect();
    }, []);

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

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center bg-midnightsea overflow-hidden">
                <div className="absolute inset-0 opacity-40">
                    <img
                        src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2000&auto=format&fit=crop"
                        alt="Meditation Hero"
                        className="w-full h-full object-cover grayscale brightness-50"
                    />
                </div>

                <div className="absolute top-1/4 left-10 w-64 h-64 bg-seafoam/20 rounded-full blur-3xl animate-breathe" />
                <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-breeze/10 rounded-full blur-3xl animate-breathe" style={{ animationDelay: '2s' }} />

                <div className="relative z-10 text-center px-6 mt-20">
                    <div className="reveal">
                        <span className="inline-block text-seafoam tracking-[0.4em] uppercase text-xs mb-8 font-medium">Sacred Habit II</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-cream mb-8 leading-[1.1] reveal reveal-delay-1 max-w-4xl mx-auto">
                        The 30-Day<br />
                        <span className="italic font-light">Presence</span>
                    </h1>
                    <p className="text-cream/60 max-w-xl mx-auto font-light leading-relaxed reveal reveal-delay-2 mb-12 italic text-lg">
                        "Consistency is the highest form of self-love. We build the foundation, together."
                    </p>
                    <div className="reveal reveal-delay-3">
                        <a
                            href="#methodology"
                            className="group relative inline-flex items-center gap-4 px-10 py-5 overflow-hidden"
                        >
                            <span className="absolute inset-0 border border-cream/20 rounded-full group-hover:scale-105 transition-transform duration-500" />
                            <span className="text-cream text-sm tracking-widest uppercase font-medium">View Cohort Details</span>
                            <ArrowRight size={18} className="text-seafoam group-hover:translate-x-2 transition-transform duration-500" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Section 2: Architecture of the Mind (Neuroscience) */}
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

            {/* Section 3: The Ritual Components (Midnight Sea) */}
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

            {/* Section 4: The Intimate Circle (Breeze) */}
            <section className="py-40 bg-breeze text-stone overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="max-w-5xl mx-auto px-6 text-center reveal">
                    <div className="w-24 h-24 border border-seafoam/20 rounded-full mx-auto flex items-center justify-center mb-12 bg-white/50 backdrop-blur-sm">
                        <Users size={40} className="text-seafoam" />
                    </div>
                    <h2 className="text-4xl md:text-6xl font-serif mb-10">Quality over Quantity</h2>
                    <p className="text-stone/70 text-xl leading-relaxed max-w-3xl mx-auto mb-16 font-light">
                        The Stillness Habit is a deep-dive transmission. To maintain the integrity of the energetic field and ensure every participant receives direct guidance, cohorts are **strictly limited to 15 individuals**. This ensures an intimate, high-resonance experience for everyone involved.
                    </p>
                    <div className="inline-flex items-center gap-6 px-10 py-5 rounded-full bg-white/40 border border-white/60 text-xs uppercase tracking-[0.3em] font-bold shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-seafoam animate-pulse" />
                        Next Cohort: March 1st - March 30th
                    </div>
                </div>
            </section>

            {/* Section 5: Investment & Enrollment */}
            <section className="py-40 bg-white relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-stretch gap-12">
                        <div className="w-full lg:w-2/3 reveal">
                            <div className="bg-cream/20 p-12 md:p-16 rounded-[4.5rem] border border-stone/5 flex flex-col h-full shadow-[0_20px_50px_rgba(0,0,0,0.03)] backdrop-blur-sm">
                                <span className="text-seafoam tracking-[0.3em] uppercase text-[10px] mb-8 block font-bold">The Commitment</span>
                                <h3 className="text-4xl font-serif mb-12">Ritual Pathways</h3>

                                <div className="grid md:grid-cols-2 gap-8 flex-grow">
                                    <div className="p-12 rounded-[2.5rem] bg-white border border-stone/5 hover:border-seafoam/30 transition-all group shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
                                        <div className="text-xs uppercase tracking-widest text-stone/40 mb-6 group-hover:text-seafoam transition-colors font-bold">Founders Circle</div>
                                        <div className="text-6xl font-serif text-stone mb-3 leading-none">$333</div>
                                        <div className="text-[10px] text-stone/30 mb-8 uppercase tracking-[0.2em] font-bold">Early Intake / CAD</div>
                                        <ul className="space-y-5">
                                            {['Priority Intake Window', 'Lifetime Alumnus Hub', 'The Founders Bonus Workshop'].map((li, idx) => (
                                                <li key={idx} className="flex items-center gap-4 text-stone/60 text-sm">
                                                    <CheckCircle2 size={16} className="text-seafoam flex-shrink-0" /> {li}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="p-12 rounded-[2.5rem] bg-stone/5 border border-transparent hover:border-stone/10 transition-all group">
                                        <div className="text-xs uppercase tracking-widest text-stone/40 mb-6 font-bold">Standard Enrollment</div>
                                        <div className="text-6xl font-serif text-stone mb-3 leading-none">$444</div>
                                        <div className="text-[10px] text-stone/30 mb-8 uppercase tracking-[0.2em] font-bold">Regular Rate / CAD</div>
                                        <ul className="space-y-5">
                                            {['Full 30-Day Guided Journey', 'Digital Integration Library', 'Live Closing Fire Ritual'].map((li, idx) => (
                                                <li key={idx} className="flex items-center gap-4 text-stone/60 text-sm">
                                                    <CheckCircle2 size={16} className="text-seafoam flex-shrink-0" /> {li}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="mt-16 flex flex-col md:flex-row gap-6 pt-12 border-t border-stone/5">
                                    <Link to="/reserve" className="flex-1 bg-midnightsea text-cream text-center py-6 rounded-full text-[10px] uppercase tracking-[0.3em] hover:bg-stone transition-all shadow-xl font-bold">
                                        Apply for Intake
                                    </Link>
                                    <Link to="/contact" className="flex-1 border border-stone/20 text-stone text-center py-6 rounded-full text-[10px] uppercase tracking-[0.3em] hover:bg-stone/5 transition-all font-bold">
                                        Discovery Session
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/3 reveal reveal-delay-2 flex flex-col">
                            <div className="bg-stone text-cream p-12 md:p-16 rounded-[4.5rem] shadow-2xl flex flex-col justify-center items-center text-center h-full relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-seafoam/10 rounded-full -translate-y-1/2 translate-x-1/2 animate-breathe" />
                                <Sun className="text-seafoam mb-10 opacity-60 group-hover:rotate-45 transition-transform duration-1000" size={56} />
                                <h4 className="text-3xl font-serif mb-8 max-w-[200px]">The Sacred Contract.</h4>
                                <p className="text-cream/50 leading-relaxed text-base font-light italic mb-10">
                                    "Your nervous system doesn't need more information. It needs more integration. Committing to 30 days is the first step."
                                </p>
                                <div className="px-10 py-4 rounded-full border border-white/10 text-[10px] uppercase tracking-[0.3em] font-bold bg-white/5 backdrop-blur-sm">
                                    Circle starts in 12 days
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Floating Contact CTA */}
            <div className="py-40 bg-white relative overflow-hidden text-center border-t border-stone/5">
                <div className="absolute inset-0 bg-breeze/10 animate-breathe" />
                <div className="relative z-10 px-6 max-w-2xl mx-auto reveal">
                    <h2 className="text-5xl md:text-7xl font-serif mb-12 leading-tight text-stone">One month.<br /><span className="italic text-seafoam">One life.</span></h2>
                    <p className="text-stone/40 mb-16 italic font-light text-xl">"The practice is for you. The results are for everyone."</p>
                    <div className="flex items-center justify-center gap-16">
                        <Link to="/about" className="text-[10px] uppercase tracking-[0.4em] text-stone/40 hover:text-stone transition-colors border-b border-stone/10 pb-3 font-bold">Our Philosophy</Link>
                        <Link to="/offerings" className="text-[10px] uppercase tracking-[0.4em] text-stone/40 hover:text-stone transition-colors border-b border-stone/10 pb-3 font-bold">All Rituals</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

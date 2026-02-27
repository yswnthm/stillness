import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Leaf, Waves, Sun, Sparkles, Wind, Moon, CheckCircle2, Award } from 'lucide-react';

export const CuratedCalmPage = () => {
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

            {/* Back Navigation */}
            <div className="fixed top-8 left-8 z-50">
                <Link
                    to="/offerings"
                    className="group flex items-center gap-3 py-2 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-500"
                >
                    <ArrowLeft size={16} className="text-stone group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-stone font-medium">All Offerings</span>
                </Link>
            </div>

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center bg-midnightsea overflow-hidden">
                <div className="absolute inset-0 opacity-40">
                    <img
                        src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2000&auto=format&fit=crop"
                        alt="Hero"
                        className="w-full h-full object-cover grayscale brightness-50"
                    />
                </div>

                <div className="absolute top-1/4 right-10 w-64 h-64 bg-seafoam/20 rounded-full blur-3xl animate-breathe" />
                <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-breeze/10 rounded-full blur-3xl animate-breathe" style={{ animationDelay: '2s' }} />

                <div className="relative z-10 text-center px-6 mt-20">
                    <div className="reveal">
                        <span className="inline-block text-seafoam tracking-[0.4em] uppercase text-xs mb-8">Sacred Space I</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-cream mb-8 leading-[1.1] reveal reveal-delay-1 max-w-4xl mx-auto">
                        The In-Home<br />
                        <span className="italic font-light">Sanctuary</span>
                    </h1>
                    <p className="text-cream/60 max-w-xl mx-auto font-light leading-relaxed reveal reveal-delay-2 mb-12 italic">
                        "The deepest calm is the one you don't have to chase. We bring the ritual to your doorstep."
                    </p>
                    <div className="reveal reveal-delay-3">
                        <a
                            href="#narrative"
                            className="group relative inline-flex items-center gap-4 px-10 py-5 overflow-hidden"
                        >
                            <span className="absolute inset-0 border border-cream/20 rounded-full group-hover:scale-105 transition-transform duration-500" />
                            <span className="text-cream text-sm tracking-widest uppercase">Explore Membership</span>
                            <ArrowRight size={18} className="text-seafoam group-hover:translate-x-2 transition-transform duration-500" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Section 2: The Architecture of Healing */}
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

            {/* Section 3: Feature Immersion (Midnight Sea) */}
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

            {/* Section 4: Share The Stillness */}
            <section className="py-32 bg-white flex items-center justify-center">
                <div className="max-w-4xl mx-auto px-6 text-center reveal">
                    <div className="w-24 h-32 border border-stone/10 rounded-full mx-auto flex items-center justify-center mb-12 bg-breeze">
                        <Award size={40} className="text-seafoam" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif mb-8">Share The Stillness</h2>
                    <p className="text-stone/60 text-lg leading-relaxed max-w-2xl mx-auto mb-12">
                        Healing is profoundly powerful when shared. Invite a partner, friend, or family member to join any of your in-home sessions for a nominal addition of <span className="text-stone font-medium">$99 per guest</span>.
                    </p>
                </div>
            </section>

            {/* Section 5: Investment & Scarcity */}
            <section className="py-40 bg-breeze/30 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-stretch gap-12">
                        <div className="w-full lg:w-2/3 reveal">
                            <div className="bg-white p-12 md:p-16 rounded-[4rem] shadow-xl border border-stone/5 flex flex-col h-full">
                                <span className="text-seafoam tracking-[0.3em] uppercase text-[10px] mb-8 block">The Investment</span>
                                <h3 className="text-4xl font-serif mb-12">Membersip Tiers</h3>

                                <div className="grid md:grid-cols-2 gap-12 flex-grow">
                                    <div className="p-8 rounded-3xl bg-stone/5 border border-stone/5 hover:border-seafoam/30 transition-colors group">
                                        <div className="text-xs uppercase tracking-widest text-stone/40 mb-4 group-hover:text-seafoam transition-colors">Annual Sanctuary</div>
                                        <div className="text-5xl font-serif text-stone mb-2">$3,333</div>
                                        <div className="text-xs text-stone/40 mb-8 uppercase tracking-widest">CAD / Billed Yearly</div>
                                        <p className="text-stone/60 text-sm italic">"Save 10% and commit to a full cycle of presence."</p>
                                    </div>
                                    <div className="p-8 rounded-3xl bg-white border border-stone/5 shadow-sm hover:border-seafoam/30 transition-colors group">
                                        <div className="text-xs uppercase tracking-widest text-stone/40 mb-4 group-hover:text-seafoam transition-colors">Monthly Rhythm</div>
                                        <div className="text-5xl font-serif text-stone mb-2">$297</div>
                                        <div className="text-xs text-stone/40 mb-8 uppercase tracking-widest">CAD / Billed Monthly</div>
                                        <p className="text-stone/60 text-sm italic">"Flexible integration for the evolving seeker."</p>
                                    </div>
                                </div>

                                <div className="mt-12 flex flex-col md:flex-row gap-6 pt-12 border-t border-stone/5">
                                    <Link to="/reserve" className="flex-1 bg-stone text-cream text-center py-5 rounded-full text-xs uppercase tracking-widest hover:bg-midnightsea transition-all shadow-lg">
                                        Enroll Now
                                    </Link>
                                    <Link to="/contact" className="flex-1 border border-stone/20 text-stone text-center py-5 rounded-full text-xs uppercase tracking-widest hover:bg-stone/5 transition-all">
                                        Book Discovery Call
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/3 reveal reveal-delay-2 flex flex-col">
                            <div className="bg-midnightsea text-cream p-12 md:p-16 rounded-[4rem] shadow-2xl flex flex-col justify-center items-center text-center h-full relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-seafoam/10 rounded-full -translate-y-1/2 translate-x-1/2 animate-breathe" />
                                <Leaf className="text-seafoam mb-8 opacity-60 group-hover:rotate-12 transition-transform duration-700" size={48} />
                                <h4 className="text-2xl font-serif mb-6">Limited Availability</h4>
                                <p className="text-cream/60 leading-relaxed text-sm">
                                    Due to the highly personalized, time-intensive nature of this offering, Curated Calm memberships are **strictly capped at 8 individuals** per year.
                                </p>
                                <div className="mt-10 px-6 py-3 rounded-full border border-white/10 text-[10px] uppercase tracking-[0.3em] font-light">
                                    Currently: 3 Spots Remaining
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Floating Contact CTA */}
            <div className="py-40 bg-white relative overflow-hidden text-center">
                <div className="absolute inset-0 bg-breeze/20 animate-breathe" />
                <div className="relative z-10 px-6 max-w-2xl mx-auto reveal">
                    <h2 className="text-5xl md:text-7xl font-serif mb-12 leading-tight">Your sanctuary<br />reclaimed.</h2>
                    <p className="text-stone/60 mb-16 italic font-light text-lg">"The world will wait. Your peace will not."</p>
                    <div className="flex items-center justify-center gap-12">
                        <Link to="/about" className="text-[10px] uppercase tracking-[0.3em] text-stone/40 hover:text-stone transition-colors border-b border-stone/10 pb-2">Our Way</Link>
                        <Link to="/offerings" className="text-[10px] uppercase tracking-[0.3em] text-stone/40 hover:text-stone transition-colors border-b border-stone/10 pb-2">Other Rituals</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Award, CheckCircle2, ArrowRight } from 'lucide-react';

export const CuratedCalmPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-cream">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2000&auto=format&fit=crop"
                        alt="Curated Calm - In-Home Wellness"
                        className="w-full h-full object-cover object-center scale-105 transform transition-transform duration-[20s] ease-out"
                    />
                    <div className="absolute inset-0 bg-stone/40 backdrop-blur-[2px]" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-20">
                    <span className="inline-block py-2 px-6 rounded-full bg-cream/20 backdrop-blur-md border border-cream/30 text-cream text-sm tracking-widest uppercase mb-8">
                        Curated Calm
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-cream mb-6 leading-tight drop-shadow-sm">
                        A Private, In-Home Wellness Membership Designed To Meet You Where You Are.
                    </h1>
                    <p className="text-lg md:text-xl text-cream/90 font-light max-w-2xl mx-auto drop-shadow-sm italic">
                        Because the deepest calm is the one you don't have to chase.
                    </p>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-70">
                    <ArrowRight size={24} className="text-cream rotate-90" />
                </div>
            </section>

            {/* Introductory Section */}
            <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto text-center">
                <Leaf className="w-12 h-12 text-seafoam mx-auto mb-8 opacity-80" />
                <h2 className="text-3xl md:text-5xl font-serif text-stone mb-8">A sacred year of personalized healing delivered to your door.</h2>
                <p className="text-lg text-stone/70 leading-relaxed font-light">
                    Your life is full. Your recovery shouldn't require another commute, another appointment to rush to, or another unfamiliar space. Curated Calm is an exclusive wellness membership that brings the sanctuary to you.
                    <br /><br />
                    Over the course of twelve months, we design powerful, in-home wellness sessions tailored precisely to your body's needs and current emotional landscape, creating a sanctuary within the walls of your own home.
                </p>
            </section>

            {/* Features Section (Dark/Image overlay) */}
            <section className="relative py-32 bg-stone text-cream overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <img
                        src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2000&auto=format&fit=crop"
                        alt="Texture"
                        className="w-full h-full object-cover grayscale"
                    />
                </div>

                <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
                    <h2 className="text-4xl md:text-5xl font-serif mb-16 text-center">What's Included?</h2>

                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
                        <div className="space-y-10">
                            <div className="flex gap-6">
                                <span className="text-seafoam"><CheckCircle2 size={28} /></span>
                                <div>
                                    <h3 className="text-2xl font-serif mb-3">11 Private In-Home Sessions</h3>
                                    <p className="text-cream/70 leading-relaxed font-light">Transform your living room into a healing sanctuary. Each session is uniquely crafted based on your physical and emotional needs that day.</p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <span className="text-seafoam"><CheckCircle2 size={28} /></span>
                                <div>
                                    <h3 className="text-2xl font-serif mb-3">1 Floating Sound Bath</h3>
                                    <p className="text-cream/70 leading-relaxed font-light">Experience the ultimate nervous system reset with one exclusive floating therapy and sound bath session at our partner facilities.</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-10">
                            <div className="flex gap-6">
                                <span className="text-seafoam"><CheckCircle2 size={28} /></span>
                                <div>
                                    <h3 className="text-2xl font-serif mb-3">Flexible Scheduling</h3>
                                    <p className="text-cream/70 leading-relaxed font-light">Priority booking tailored around your demanding life. We work with your schedule to ensure consistency without added stress.</p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <span className="text-seafoam"><CheckCircle2 size={28} /></span>
                                <div>
                                    <h3 className="text-2xl font-serif mb-3">All Materials Provided</h3>
                                    <p className="text-cream/70 leading-relaxed font-light">From organic mats to sustainable props and ambient elements, we bring everything needed to create a fully immersive experience in your space.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Guest Access Section */}
            <section className="py-24 px-6 md:px-12 bg-white text-center border-b border-stone/10">
                <div className="max-w-3xl mx-auto">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sand mb-6">
                        <Award className="text-stone w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-serif text-stone mb-6">Share The Stillness</h2>
                    <p className="text-lg text-stone/70 leading-relaxed mb-8">
                        Healing is profoundly powerful when shared. As a Curated Calm member, you have the exclusive privilege to invite a partner, friend, or family member to join any of your in-home sessions for a nominal addition of $99 per guest.
                    </p>
                </div>
            </section>

            {/* Investment (Pricing Strip) */}
            <section className="py-16 bg-seafoam text-stone text-center px-6">
                <h2 className="text-3xl font-serif mb-8">The Investment</h2>
                <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-2xl mx-auto">
                    <div className="bg-cream/50 backdrop-blur-sm px-10 py-8 rounded-2xl w-full md:w-1/2">
                        <span className="block text-sm tracking-widest uppercase mb-2">Annual (Save 10%)</span>
                        <div className="text-4xl font-serif mb-2">$3,333 <span className="text-lg text-stone/60 font-sans">CAD</span></div>
                        <span className="text-sm text-stone/70">Billed yearly</span>
                    </div>
                    <div className="bg-cream/50 backdrop-blur-sm px-10 py-8 rounded-2xl w-full md:w-1/2">
                        <span className="block text-sm tracking-widest uppercase mb-2">Monthly</span>
                        <div className="text-4xl font-serif mb-2">$297 <span className="text-lg text-stone/60 font-sans">CAD</span></div>
                        <span className="text-sm text-stone/70">Billed monthly</span>
                    </div>
                </div>
            </section>

            {/* Why In-Home? & Scarcity */}
            <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="w-full lg:w-1/2">
                        <div className="aspect-square rounded-full overflow-hidden p-2 border border-stone/10">
                            <img
                                src="https://images.unsplash.com/photo-1522045558482-3d84a7e94f1c?q=80&w=1200&auto=format&fit=crop"
                                alt="In-home wellness space"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 space-y-6">
                        <h2 className="text-4xl font-serif text-stone mb-6">Why In-Home?</h2>
                        <p className="text-stone/70 leading-relaxed text-lg">
                            We believe that the nervous system regulates most deeply in environments where it already feels safe. By bringing the practice to your home, we remove the friction of travel, parking, and transitions, allowing you to seamlessly integrate deep rest into your actual living space.
                        </p>
                        <div className="p-6 bg-sand/30 rounded-2xl border-l-4 border-stone mt-8">
                            <h4 className="font-serif text-xl text-stone mb-2">Strictly Limited Availability</h4>
                            <p className="text-stone/70 text-sm leading-relaxed">
                                Due to the highly personalized, time-intensive nature of this offering, Curated Calm memberships are strictly capped. We accept a limited number of clients per year to ensure the highest quality of care and attention.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 bg-stone text-center px-6">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-serif text-cream mb-8">Ready to Begin?</h2>
                    <p className="text-cream/80 mb-12 font-light text-lg">Take the first step towards reclaiming your peace and regulating your nervous system.</p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link to="/reserve" className="bg-cream text-stone px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-seafoam hover:text-white transition-all duration-300">
                            Enroll Now
                        </Link>
                        <Link to="/contact" className="bg-transparent text-cream border border-cream/30 px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-cream/10 transition-all duration-300">
                            Book a Discovery Call
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

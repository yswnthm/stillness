import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Leaf, Waves, Sun, Flower2 } from 'lucide-react';

export const SacredOfferingsPage = () => {
    const { hash } = useLocation();

    // Handle smooth scrolling to sections if accessing via hash links
    useEffect(() => {
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
    }, [hash]);

    return (
        <div className="min-h-screen bg-cream">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=2000&auto=format&fit=crop"
                        alt="Join the Stillness Movement"
                        className="w-full h-full object-cover object-center scale-105 transform transition-transform duration-[20s] ease-out hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-stone/40" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-cream mb-6 leading-tight drop-shadow-sm">
                        Join the<br className="md:hidden" /> Stillness Movement
                    </h1>
                    <p className="text-lg md:text-xl text-cream/90 font-light mb-12 max-w-2xl mx-auto drop-shadow-sm">
                        Where ritual becomes rhythm, and presence becomes a way of life.
                    </p>
                    <a
                        href="#memberships"
                        className="inline-flex items-center gap-3 bg-cream text-stone px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-seafoam hover:text-white transition-all duration-300 group shadow-lg"
                    >
                        Choose Your Journey <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                    <a href="#memberships"><ArrowRight size={24} className="text-cream rotate-90" /></a>
                </div>
            </section>

            {/* The Stillness Membership Overview */}
            <main id="memberships" className="py-32 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24">
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-5xl font-serif text-stone mb-6">The Stillness Membership</h2>
                    <p className="text-stone/70 max-w-2xl mx-auto leading-relaxed">
                        Two distinct pathways designed to support your nervous system. Whether you seek deep, personalized one-on-one healing or the compounding power of a daily community practice, there is a space held for you here.
                    </p>
                </div>

                {/* Offering A: Curated Calm (Left Content, Right Image) */}
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 mb-32">
                    <div className="w-full lg:w-1/2 order-2 lg:order-1">
                        <span className="flex items-center gap-2 text-seafoam text-sm tracking-widest uppercase mb-4">
                            <Leaf size={16} /> Premium 1:1 Experience
                        </span>
                        <h3 className="text-4xl md:text-5xl font-serif text-stone mb-6">Curated Calm</h3>
                        <p className="text-lg text-stone/70 leading-relaxed mb-8">
                            A sacred year of personalized healing delivered to your door. Twelve powerful, in-home wellness sessions tailored precisely to your body's needs and current emotional landscape.
                        </p>

                        <div className="bg-sand/30 rounded-2xl p-8 mb-10 border border-stone/5">
                            <h4 className="text-stone font-serif text-xl mb-4">What's Included:</h4>
                            <ul className="space-y-4">
                                {[
                                    '11 Private In-Home Wellness Sessions',
                                    '1 Exclusive Floating Therapy / Sound Bath Session',
                                    'Flexible, priority scheduling curated around your life',
                                    'All tools and organic materials provided'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-seafoam shrink-0" />
                                        <span className="text-stone/80 text-sm leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Link
                            to="/curated-calm"
                            className="inline-flex items-center gap-3 bg-stone text-cream px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-stone/90 transition-all duration-300 group"
                        >
                            Explore Curated Calm <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="w-full lg:w-1/2 order-1 lg:order-2">
                        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1200&auto=format&fit=crop"
                                alt="Curated Calm Experience"
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[10s] ease-out"
                            />
                            {/* Decorative badge */}
                            <div className="absolute top-6 right-6 bg-cream/90 backdrop-blur-sm p-4 rounded-full text-stone shadow-lg">
                                <Waves size={24} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Offering B: The Stillness Habit (Left Image, Right Content) */}
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    <div className="w-full lg:w-1/2">
                        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=1200&auto=format&fit=crop"
                                alt="The Stillness Habit Cohort"
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[10s] ease-out"
                            />
                            {/* Decorative badge */}
                            <div className="absolute top-6 left-6 bg-cream/90 backdrop-blur-sm p-4 rounded-full text-stone shadow-lg">
                                <Sun size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2">
                        <span className="flex items-center gap-2 text-seafoam text-sm tracking-widest uppercase mb-4">
                            <Flower2 size={16} /> Group Cohort Journey
                        </span>
                        <h3 className="text-4xl md:text-5xl font-serif text-stone mb-6">The Stillness Habit</h3>
                        <p className="text-lg text-stone/70 leading-relaxed mb-8">
                            A highly-accountable 30-day journey to build a lifelong meditation practice. Join an intimate cohort for a daily, live 1-hour guided practice that transforms consistency from a struggle into a sacred ritual.
                        </p>

                        <div className="bg-sand/30 rounded-2xl p-8 mb-10 border border-stone/5">
                            <h4 className="text-stone font-serif text-xl mb-4">What's Included:</h4>
                            <ul className="space-y-4">
                                {[
                                    '30 Days of Live, 1-Hour Zoom Sessions',
                                    'Guided Meditation & Dedicated Breathwork',
                                    'Gentle Facilitation & Habit Tracking Tools',
                                    'Intimate Cohort Size (Max 15 Participants)',
                                    'Sacred Closing Ritual'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-seafoam shrink-0" />
                                        <span className="text-stone/80 text-sm leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Link
                            to="/habit"
                            className="inline-flex items-center gap-3 bg-stone text-cream px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-stone/90 transition-all duration-300 group"
                        >
                            Start Your 30-Day Practice <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

            </main>
        </div>
    );
};

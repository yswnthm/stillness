import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sun, CheckCircle2, Users, ArrowRight } from 'lucide-react';

export const StillnessHabitPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-cream">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=2000&auto=format&fit=crop"
                        alt="The Stillness Habit - 30 Day Journey"
                        className="w-full h-full object-cover object-center scale-105 transform transition-transform duration-[20s] ease-out"
                    />
                    <div className="absolute inset-0 bg-stone/50 backdrop-blur-[2px]" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-20">
                    <span className="inline-block py-2 px-6 rounded-full bg-sand/30 backdrop-blur-md border border-sand/30 text-cream text-sm tracking-widest uppercase mb-8">
                        The Stillness Habit
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-cream mb-6 leading-tight drop-shadow-sm">
                        Build A Lifelong Meditation Practice In Just 30 Days.
                    </h1>
                    <p className="text-lg md:text-xl text-cream/90 font-light max-w-2xl mx-auto drop-shadow-sm italic">
                        Consistency becomes sacred when Stillness becomes daily.
                    </p>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-70">
                    <ArrowRight size={24} className="text-cream rotate-90" />
                </div>
            </section>

            {/* Introductory Section */}
            <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto text-center">
                <Sun className="w-12 h-12 text-seafoam mx-auto mb-8 opacity-80" />
                <h2 className="text-3xl md:text-5xl font-serif text-stone mb-8">A 30-day guided meditation journey that transforms struggle into ritual.</h2>
                <p className="text-lg text-stone/70 leading-relaxed font-light">
                    We all know we "should" meditate. But trying to meditate alone often leads to inconsistency, frustration, and eventual abandonment of the practice.
                    <br /><br />
                    The Stillness Habit is a highly-accountable, intimate 30-day journey designed to build a foundation that lasts. By joining a dedicated cohort for a daily, live guided practice, you leverage the power of community to make consistency effortless.
                </p>
            </section>

            {/* Features Section (Dark/Image overlay) */}
            <section className="relative py-32 bg-stone text-cream overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <img
                        src="https://images.unsplash.com/photo-1543886566-70e2beba3d6d?q=80&w=2000&auto=format&fit=crop"
                        alt="Group meditation"
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
                                    <h3 className="text-2xl font-serif mb-3">30 Daily Live Zoom Sessions</h3>
                                    <p className="text-cream/70 leading-relaxed font-light">Show up from anywhere. We guide you through a gentle, accessible 1-hour practice every single day for a full month.</p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <span className="text-seafoam"><CheckCircle2 size={28} /></span>
                                <div>
                                    <h3 className="text-2xl font-serif mb-3">Guided Meditation & Breathwork</h3>
                                    <p className="text-cream/70 leading-relaxed font-light">Experience a variety of somatic practices, breathing techniques, and guided visualizations to discover what resonates with your nervous system.</p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <span className="text-seafoam"><CheckCircle2 size={28} /></span>
                                <div>
                                    <h3 className="text-2xl font-serif mb-3">Gentle Facilitation & Habit Tools</h3>
                                    <p className="text-cream/70 leading-relaxed font-light">Receive daily check-ins, a custom progression tracker, and gentle accountability from experienced facilitators who hold the space with grace.</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-10">
                            <div className="flex gap-6">
                                <span className="text-seafoam"><CheckCircle2 size={28} /></span>
                                <div>
                                    <h3 className="text-2xl font-serif mb-3">Intimate Cohort (Max 15)</h3>
                                    <p className="text-cream/70 leading-relaxed font-light">We keep our circles exceptionally small to ensure safety, connection, and the ability to share reflections after each practice.</p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <span className="text-seafoam"><CheckCircle2 size={28} /></span>
                                <div>
                                    <h3 className="text-2xl font-serif mb-3">Sacred Closing Ritual</h3>
                                    <p className="text-cream/70 leading-relaxed font-light">A profound final session to honor the commitment you've made to yourself and receive guidance on carrying the practice forward independently.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Target Audience Section */}
            <section className="py-24 px-6 md:px-12 bg-white text-center border-y border-stone/10">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-serif text-stone mb-12">Who This Is For</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                        <li className="flex items-start gap-4">
                            <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-sand flex items-center justify-center text-stone font-serif italic text-sm">01</div>
                            <p className="text-stone/70 leading-relaxed">Those who have tried apps and recorded meditations but struggle to maintain consistency.</p>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-sand flex items-center justify-center text-stone font-serif italic text-sm">02</div>
                            <p className="text-stone/70 leading-relaxed">Individuals feeling overwhelmed, burned out, and disconnected from their bodies.</p>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-sand flex items-center justify-center text-stone font-serif italic text-sm">03</div>
                            <p className="text-stone/70 leading-relaxed">Complete beginners who want a structured, supportive introduction to Stillness.</p>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-sand flex items-center justify-center text-stone font-serif italic text-sm">04</div>
                            <p className="text-stone/70 leading-relaxed">Anyone craving the profound resonance and accountability of a shared group practice.</p>
                        </li>
                    </ul>
                </div>
            </section>

            {/* Pricing Strip  */}
            <section className="py-16 bg-seafoam text-stone text-center px-6">
                <h2 className="text-3xl font-serif mb-8">Choose Your Enrollment</h2>
                <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-2xl mx-auto">
                    <div className="bg-cream/50 backdrop-blur-sm px-10 py-8 rounded-2xl w-full md:w-1/2 border-2 border-stone">
                        <span className="block text-sm tracking-widest uppercase mb-2">Founders Circle</span>
                        <div className="text-4xl font-serif mb-2">$333 <span className="text-lg text-stone/60 font-sans">CAD</span></div>
                        <span className="text-sm text-stone/70">Very Limited Availability</span>
                    </div>
                    <div className="bg-cream/50 backdrop-blur-sm px-10 py-8 rounded-2xl w-full md:w-1/2 opacity-70">
                        <span className="block text-sm tracking-widest uppercase mb-2">General Enrollment</span>
                        <div className="text-4xl font-serif mb-2">$488 <span className="text-lg text-stone/60 font-sans">CAD</span></div>
                        <span className="text-sm text-stone/70">Standard Rate</span>
                    </div>
                </div>
            </section>

            {/* Why 30 Days? & Methodology */}
            <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="w-full lg:w-1/2">
                        <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative">
                            <img
                                src="https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?q=80&w=1200&auto=format&fit=crop"
                                alt="Community practice"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-6 left-6 bg-cream/90 backdrop-blur-sm p-4 rounded-full text-stone shadow-lg">
                                <Users size={24} />
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 space-y-6">
                        <h2 className="text-4xl font-serif text-stone mb-6">Why 30 Days?</h2>
                        <p className="text-stone/70 leading-relaxed text-lg mb-6">
                            Neuroscience shows us that creating new neural pathways requires deep repetition. Thirty days is the exact threshold where conscious effort dissolves into unconscious rhythm.
                        </p>
                        <p className="text-stone/70 leading-relaxed text-lg">
                            We don't ask for a lifelong commitment right now. We ask for just one month. Give us 30 days to sit with you, guide you, and hold you accountable. The practice will take care of the rest.
                        </p>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 bg-stone text-center px-6">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-serif text-cream mb-8">Ready to Begin?</h2>
                    <p className="text-cream/80 mb-12 font-light text-lg">The next cohort is forming now. Secure your space in the circle.</p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link to="/reserve" className="bg-cream text-stone px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-seafoam hover:text-white transition-all duration-300">
                            Enroll Now
                        </Link>
                        <Link to="/contact" className="bg-transparent text-cream border border-cream/30 px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-cream/10 transition-all duration-300">
                            Speak with a Guide
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

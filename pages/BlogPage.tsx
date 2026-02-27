import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const ARTICLES = [
    {
        id: 1,
        category: 'Wellness',
        date: 'Feb 14, 2026',
        title: 'Why We Built Canada\'s First Floating Bath',
        excerpt: 'The story of how a decade of burnout, restlessness, and an obsessive curiosity about the nervous system led to the most profound and unconventional healing space in the country.',
        image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1200&auto=format&fit=crop',
        readTime: '7 min read',
        featured: true,
    },
    {
        id: 2,
        category: 'Meditation',
        date: 'Jan 28, 2026',
        title: 'The Science of Stillness: What Happens to Your Brain During Deep Rest',
        excerpt: 'Exploring the measurable neurological shifts that occur when we move from a state of chronic activation into genuine physiological rest.',
        image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800&auto=format&fit=crop',
        readTime: '5 min read',
        featured: false,
    },
    {
        id: 3,
        category: 'Ritual',
        date: 'Jan 10, 2026',
        title: 'How to Create a Morning Ritual That Actually Sticks',
        excerpt: 'The most effective morning rituals aren\'t the most elaborate ones. They are the ones that require the least willpower to begin.',
        image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=800&auto=format&fit=crop',
        readTime: '4 min read',
        featured: false,
    },
    {
        id: 4,
        category: 'Breathwork',
        date: 'Dec 22, 2025',
        title: 'Breathwork is Not a Trend. It\'s Your Most Underused Tool.',
        excerpt: 'A direct look at why the most powerful self-regulation tool available to you is completely free, always available, and almost universally ignored.',
        image: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?q=80&w=800&auto=format&fit=crop',
        readTime: '6 min read',
        featured: false,
    },
    {
        id: 5,
        category: 'Wellness',
        date: 'Dec 5, 2025',
        title: 'On Sensory Deprivation and the Art of Doing Nothing',
        excerpt: 'We are conditioned to believe that productivity is the highest virtue. Floating tanks represent a radical and profoundly healing act of refusal.',
        image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=800&auto=format&fit=crop',
        readTime: '5 min read',
        featured: false,
    },
    {
        id: 6,
        category: 'Corporate',
        date: 'Nov 19, 2025',
        title: '5 Signs Your Team Is Running on Stress, Not Motivation',
        excerpt: 'High performance is not the same as high stress. Learn to spot the signs that your team\'s output is being fueled by cortisol and what to do about it.',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop',
        readTime: '6 min read',
        featured: false,
    },
    {
        id: 7,
        category: 'Ritual',
        date: 'Nov 05, 2025',
        title: 'The Power of Sound: Why We Use Singing Bowls',
        excerpt: 'Vibration is a direct path to the nervous system. Discover how frequency-based healing can bypass the analytical mind and induce deep rest.',
        image: 'https://images.unsplash.com/photo-1514820402329-de527fdd2e6d?q=80&w=800&auto=format&fit=crop',
        readTime: '5 min read',
        featured: false,
    },
    {
        id: 8,
        category: 'Wellness',
        date: 'Oct 22, 2025',
        title: 'The Digital Detox: Practical Steps for a Quieter Mind',
        excerpt: 'We weren\'t built for 24/7 connectivity. Learn how to reclaim your attention and create boundaries that actually protect your peace.',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
        readTime: '4 min read',
        featured: false,
    },
    {
        id: 9,
        category: 'Meditation',
        date: 'Oct 08, 2025',
        title: 'The Ritual of Rest: Beyond the 10-Minute App',
        excerpt: 'Meditation isn\'t just something you do; it\'s a way you are. Exploring deeper states of presence through intention and environment.',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
        readTime: '6 min read',
        featured: false,
    },
];

const CATEGORIES = ['All', 'Wellness', 'Meditation', 'Ritual', 'Breathwork', 'Corporate'];

export const BlogPage = () => {
    const [activeCategory, setActiveCategory] = React.useState('All');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const featuredArticle = ARTICLES.find(a => a.featured);
    const filteredArticles = ARTICLES.filter(a => !a.featured && (activeCategory === 'All' || a.category === activeCategory));

    return (
        <div className="min-h-screen bg-cream">
            {/* Hero Section */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-stone">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=2000&auto=format&fit=crop"
                        alt="The Journal"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-stone/40 via-transparent to-stone/80" />
                </div>

                <div className="relative z-10 text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="max-w-4xl mx-auto"
                    >
                        <span className="block text-seafoam text-sm tracking-widest uppercase mb-4">The Journal</span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-cream mb-6 tracking-tight leading-tight">
                            Notes on <span className="italic">Stillness</span>
                        </h1>
                        <p className="text-cream/80 mt-4 font-light max-w-lg mx-auto text-lg md:text-xl leading-relaxed">
                            Thoughts on healing, ritual, and the profound art of coming home to yourself.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
                >
                    <ChevronDown className="text-cream/50 animate-bounce w-8 h-8 font-light" />
                </motion.div>
            </section>

            {/* Featured Article */}
            {featuredArticle && (
                <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
                    <Link to={`/journal/${featuredArticle.id}`} className="group grid md:grid-cols-2 gap-10 items-center">
                        <div className="aspect-video md:aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
                            <img
                                src={featuredArticle.image}
                                alt={featuredArticle.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        <div>
                            <span className="text-seafoam text-xs tracking-widest uppercase">{featuredArticle.category}</span>
                            <h2 className="text-3xl md:text-4xl font-serif text-stone my-4 group-hover:text-seafoam transition-colors leading-snug">
                                {featuredArticle.title}
                            </h2>
                            <p className="text-stone/60 leading-relaxed mb-6">{featuredArticle.excerpt}</p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 text-xs text-stone/50">
                                    <Clock size={14} />
                                    <span>{featuredArticle.readTime}</span>
                                    <span>&middot;</span>
                                    <span>{featuredArticle.date}</span>
                                </div>
                                <span className="inline-flex items-center gap-2 text-stone text-sm group-hover:text-seafoam transition-colors">
                                    Read <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </div>
                        </div>
                    </Link>
                </section>
            )}

            {/* Category Filters */}
            <div className="sticky top-16 z-20 bg-cream/90 backdrop-blur-md border-y border-stone/10 py-4 px-6">
                <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto no-scrollbar">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`flex-shrink-0 px-5 py-2 rounded-full text-xs tracking-widest uppercase transition-all duration-300 ${activeCategory === cat
                                ? 'bg-stone text-cream'
                                : 'bg-transparent text-stone/60 hover:text-stone hover:bg-stone/10'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Article Grid */}
            <main className="max-w-7xl mx-auto px-6 md:px-12 py-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredArticles.map((article, index) => (
                        <React.Fragment key={article.id}>
                            <Link to={`/journal/${article.id}`} className="group flex flex-col">
                                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 shadow-md">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                                <span className="text-seafoam text-xs tracking-widest uppercase mb-3">{article.category}</span>
                                <h3 className="text-xl font-serif text-stone mb-3 group-hover:text-seafoam transition-colors leading-snug">{article.title}</h3>
                                <p className="text-stone/60 text-sm leading-relaxed flex-1 mb-4">{article.excerpt}</p>
                                <div className="flex items-center gap-3 text-xs text-stone/40">
                                    <Clock size={12} />
                                    <span>{article.readTime}</span>
                                    <span>&middot;</span>
                                    <span>{article.date}</span>
                                </div>
                            </Link>
                            {/* Newsletter CTA injected after 2nd article */}
                            {index === 1 && (
                                <div className="md:col-span-2 lg:col-span-3 my-4 bg-stone rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
                                    <div>
                                        <BookOpen className="text-seafoam w-10 h-10 mb-4" />
                                        <h3 className="text-2xl font-serif text-cream mb-2">Stillness, delivered.</h3>
                                        <p className="text-cream/70 font-light max-w-md">New essays on healing, ritual, and presence, written for the quiet hours. Join the readers who begin their week with a little more ease.</p>
                                    </div>
                                    <form className="w-full md:w-auto flex flex-col sm:flex-row gap-3 min-w-[320px]" onSubmit={(e) => e.preventDefault()}>
                                        <input
                                            type="email"
                                            placeholder="your@email.com"
                                            className="flex-1 bg-cream/10 border border-cream/20 text-cream placeholder:text-cream/40 rounded-full px-6 py-3 text-sm focus:outline-none focus:border-seafoam"
                                        />
                                        <button type="submit" className="bg-cream text-stone rounded-full px-6 py-3 text-xs uppercase tracking-widest flex-shrink-0 hover:bg-seafoam hover:text-white transition-all duration-300">
                                            Subscribe
                                        </button>
                                    </form>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </main>
        </div>
    );
};

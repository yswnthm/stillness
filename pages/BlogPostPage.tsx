import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Share2, Bookmark } from 'lucide-react';
import { ARTICLES } from '../constants';

import ReactMarkdown from 'react-markdown';

export const BlogPostPage = () => {
    const { id } = useParams();
    const article = ARTICLES.find(a => a.id === Number(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!article) {
        return (
            <div className="min-h-screen bg-cream flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-serif text-stone mb-4">Article Not Found</h1>
                    <Link to="/journal" className="text-seafoam hover:underline">Back to Journal</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream selection:bg-seafoam/20">
            {/* Full Screen Hero */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-stone">
                <div className="absolute inset-0 z-0">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-stone/60 via-transparent to-stone/90" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <span className="px-4 py-1.5 rounded-full bg-seafoam/20 backdrop-blur-md border border-seafoam/30 text-seafoam text-xs tracking-widest uppercase">
                                {article.category}
                            </span>
                            <div className="flex items-center gap-2 text-cream/60 text-xs tracking-widest uppercase">
                                <Clock size={14} />
                                <span>{article.readTime}</span>
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-cream mb-8 leading-[1.1] tracking-tight">
                            {article.title}
                        </h1>

                        <p className="text-cream/70 text-lg md:text-2xl font-light italic max-w-3xl mx-auto leading-relaxed">
                            {article.excerpt}
                        </p>
                    </motion.div>
                </div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-12 text-cream/40">
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-[10px] uppercase tracking-[0.3em]">Date</span>
                        <span className="text-xs text-cream/70 uppercase tracking-widest">{article.date}</span>
                    </div>
                    <div className="w-[1px] h-8 bg-cream/20"></div>
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-[10px] uppercase tracking-[0.3em]">Author</span>
                        <span className="text-xs text-cream/70 uppercase tracking-widest">Stillness Co.</span>
                    </div>
                </div>
            </section>

            {/* Content Area */}
            <article className="relative z-10 max-w-3xl mx-auto px-6 py-24">
                <div className="flex items-center justify-between mb-16">
                    <Link to="/journal" className="group flex items-center gap-3 text-stone/40 hover:text-stone transition-colors">
                        <div className="w-10 h-10 rounded-full border border-stone/10 flex items-center justify-center group-hover:bg-stone group-hover:text-cream transition-all duration-300">
                            <ArrowLeft size={18} />
                        </div>
                        <span className="text-xs uppercase tracking-widest">Journal</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <button className="w-10 h-10 rounded-full border border-stone/10 flex items-center justify-center hover:bg-stone hover:text-white transition-all text-stone/60">
                            <Share2 size={16} />
                        </button>
                        <button className="w-10 h-10 rounded-full border border-stone/10 flex items-center justify-center hover:bg-stone hover:text-white transition-all text-stone/60">
                            <Bookmark size={16} />
                        </button>
                    </div>
                </div>

                <div className="prose prose-stone prose-lg max-w-none font-serif text-stone/80 leading-[1.8]">
                    <ReactMarkdown
                        components={{
                            p: ({ children }) => {
                                // Apply drop cap to the very first paragraph
                                if (typeof children === 'string' && children.startsWith('In an age of constant noise')) {
                                    return <p className="text-2xl text-stone leading-relaxed mb-12 first-letter:text-7xl first-letter:font-serif first-letter:float-left first-letter:mr-4 first-letter:text-seafoam first-letter:mt-2">{children}</p>;
                                }
                                return <p className="mb-8">{children}</p>;
                            },
                            h2: ({ children }) => <h2 className="text-3xl font-serif text-stone mt-16 mb-8 italic">{children}</h2>,
                            blockquote: ({ children }) => (
                                <blockquote className="my-16 pl-8 border-l-2 border-seafoam italic text-2xl text-stone/60 leading-relaxed font-light">
                                    {children}
                                </blockquote>
                            ),
                            img: ({ src, alt }) => (
                                <div className="my-20 aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl">
                                    <img src={src} alt={alt} className="w-full h-full object-cover" />
                                </div>
                            )
                        }}
                    >
                        {article.content}
                    </ReactMarkdown>
                </div>

                {/* Footer Section */}
                <div className="mt-24 pt-16 border-t border-stone/10 text-center">
                    <span className="text-xs uppercase tracking-[0.3em] text-stone/40 mb-4 block">Thank you for reading</span>
                    <p className="text-stone/60 font-serif italic mb-12">If this resonated with you, consider sharing it with someone who might need a moment of peace.</p>
                    <Link
                        to="/journal"
                        className="inline-flex items-center px-10 py-4 bg-stone text-cream rounded-full text-xs uppercase tracking-widest hover:bg-seafoam transition-all duration-500"
                    >
                        Explore More Notes
                    </Link>
                </div>
            </article>
        </div>
    );
};

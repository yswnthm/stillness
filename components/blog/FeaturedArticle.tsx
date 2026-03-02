import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';

interface Article {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    category: string;
    date: string;
    readTime: string;
    featured?: boolean;
}

interface FeaturedArticleProps {
    article: Article;
}

export const FeaturedArticle: React.FC<FeaturedArticleProps> = ({ article }) => {
    return (
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
            <Link to={`/journal/${article.id}`} className="group grid md:grid-cols-2 gap-10 items-center">
                <div className="aspect-video md:aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                </div>
                <div>
                    <span className="text-seafoam text-xs tracking-widest uppercase">{article.category}</span>
                    <h2 className="text-3xl md:text-4xl font-serif text-stone my-4 group-hover:text-seafoam transition-colors leading-snug">
                        {article.title}
                    </h2>
                    <p className="text-stone/60 leading-relaxed mb-6">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-stone/50">
                            <Clock size={14} />
                            <span>{article.readTime}</span>
                            <span>&middot;</span>
                            <span>{article.date}</span>
                        </div>
                        <span className="inline-flex items-center gap-2 text-stone text-sm group-hover:text-seafoam transition-colors">
                            Read <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                    </div>
                </div>
            </Link>
        </section>
    );
};

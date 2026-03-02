import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';

interface Article {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    category: string;
    date: string;
    readTime: string;
}

interface ArticleCardProps {
    article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
    return (
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
    );
};

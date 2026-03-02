import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface ProductBreadcrumbsProps {
    category: string;
    name: string;
}

export const ProductBreadcrumbs: React.FC<ProductBreadcrumbsProps> = ({ category, name }) => {
    return (
        <div className="px-6 md:px-12 max-w-7xl mx-auto mb-8">
            <nav className="flex items-center text-xs tracking-widest uppercase text-stone/50">
                <Link to="/" className="hover:text-stone transition-colors">Home</Link>
                <ChevronRight size={14} className="mx-2" />
                <Link to="/shop" className="hover:text-stone transition-colors">Shop</Link>
                <ChevronRight size={14} className="mx-2" />
                <Link to={`/shop?category=${category}`} className="hover:text-stone transition-colors">{category}</Link>
                <ChevronRight size={14} className="mx-2" />
                <span className="text-stone">{name}</span>
            </nav>
        </div>
    );
};

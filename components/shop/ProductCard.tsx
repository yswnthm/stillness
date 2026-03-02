import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Product {
    id: string;
    name: string;
    category: string;
    price: string;
    description: string;
    image: string;
    tag?: string;
}

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <Link to={`/product/${product.id}`} className="group cursor-pointer flex flex-col">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-6 bg-sand/20">
                {product.tag && (
                    <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm text-stone px-3 py-1 rounded-full text-xs uppercase tracking-wider font-medium">
                        {product.tag}
                    </div>
                )}
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-stone/0 group-hover:bg-stone/10 transition-colors duration-500" />
                <div className="absolute bottom-6 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <button
                        onClick={(e) => { e.preventDefault(); /* Add to cart logic */ }}
                        className="bg-seafoam text-white px-8 py-3 rounded-full text-sm uppercase tracking-widest shadow-lg hover:bg-seafoam/90 transition-colors"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
            <div className="flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-serif text-stone group-hover:text-seafoam transition-colors">{product.name}</h3>
                    <span className="text-seafoam font-medium ml-4 shrink-0">{product.price}</span>
                </div>
                <p className="text-sm text-stone/60 leading-relaxed mb-4">{product.description}</p>
                <div className="mt-auto hidden md:flex items-center gap-2 text-xs uppercase tracking-widest text-seafoam opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Details <ArrowRight size={14} />
                </div>
            </div>
        </Link>
    );
};

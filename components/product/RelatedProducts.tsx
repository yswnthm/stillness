import React from 'react';
import { Link } from 'react-router-dom';

interface RelatedProduct {
    id: string;
    name: string;
    category: string;
    price: string;
    image: string;
}

interface RelatedProductsProps {
    products: RelatedProduct[];
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
    return (
        <section>
            <div className="flex justify-between items-end mb-10">
                <h2 className="text-3xl font-serif text-stone">Pairs well with...</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map(product => (
                    <Link to={`/product/${product.id}`} key={product.id} className="group flex flex-col">
                        <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-4 bg-sand/20">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                            <div className="absolute inset-0 bg-stone/0 group-hover:bg-stone/5 transition-colors duration-300" />
                        </div>
                        <h3 className="text-lg font-serif text-stone group-hover:text-seafoam transition-colors mb-1">{product.name}</h3>
                        <span className="text-seafoam text-sm">{product.price}</span>
                    </Link>
                ))}
            </div>
        </section>
    );
};

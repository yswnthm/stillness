import React, { useState } from 'react';
import { Star, Minus, Plus, Heart, Share2 } from 'lucide-react';

interface ProductInfoProps {
    product: {
        name: string;
        price: string;
        description: string;
        details: {
            materials: string;
            care: string;
            shipping: string;
        };
    };
    quantity: number;
    setQuantity: (q: number) => void;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product, quantity, setQuantity }) => {
    const [activeTab, setActiveTab] = useState<'materials' | 'care' | 'shipping'>('materials');

    const priceValue = parseFloat(product.price.split(' ')[0].replace('$', ''));

    return (
        <div className="w-full lg:w-1/2 pt-4">
            <h1 className="text-4xl md:text-5xl font-serif text-stone mb-4">{product.name}</h1>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <span className="text-2xl text-seafoam">{product.price}</span>
                <div className="flex items-center gap-1 text-sm text-stone/70">
                    <div className="flex text-seafoam">
                        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                    </div>
                    <span className="ml-2">(2 Reviews)</span>
                </div>
            </div>

            <p className="text-stone/70 leading-relaxed mb-10">
                {product.description}
            </p>

            <div className="space-y-8 mb-12">
                {/* Purchase Type */}
                <div>
                    <span className="block text-xs uppercase tracking-widest text-stone/50 mb-3">Purchase Type</span>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button className="flex-1 py-3 px-4 rounded-xl border-2 border-seafoam bg-seafoam/5 text-seafoam text-sm font-medium flex justify-center items-center">
                            One-Time Purchase
                        </button>
                        <button className="flex-1 py-3 px-4 rounded-xl border border-stone/10 hover:border-stone/30 text-stone/70 text-sm flex justify-center items-center transition-colors">
                            Subscribe & Save 10%
                        </button>
                    </div>
                </div>

                {/* Quantity */}
                <div>
                    <span className="block text-xs uppercase tracking-widest text-stone/50 mb-3">Quantity</span>
                    <div className="inline-flex items-center border border-stone/20 rounded-full p-1">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-stone/5 text-stone transition-colors"
                        >
                            <Minus size={16} />
                        </button>
                        <span className="w-12 text-center text-stone">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-stone/5 text-stone transition-colors"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-12">
                <button className="flex-1 bg-seafoam text-white py-4 rounded-full text-sm uppercase tracking-widest shadow-lg hover:bg-seafoam/90 transition-colors">
                    Add to Cart — {(priceValue * quantity).toFixed(2)}
                </button>
                <button className="w-14 h-14 flex items-center justify-center border border-stone/20 rounded-full text-stone hover:bg-stone/5 transition-colors shrink-0">
                    <Heart size={20} />
                </button>
                <button className="w-14 h-14 flex items-center justify-center border border-stone/20 rounded-full text-stone hover:bg-stone/5 transition-colors shrink-0">
                    <Share2 size={20} />
                </button>
            </div>

            {/* Deep Dive Tabs */}
            <div className="border-t border-stone/10 pt-8">
                <div className="flex gap-8 border-b border-stone/10 mb-6 overflow-x-auto no-scrollbar">
                    {[
                        { id: 'materials', label: 'Details & Materials' },
                        { id: 'care', label: 'Care Instructions' },
                        { id: 'shipping', label: 'Shipping & Returns' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`whitespace-nowrap pb-4 text-xs tracking-widest uppercase transition-colors relative ${activeTab === tab.id ? 'text-stone font-semibold' : 'text-stone/50 hover:text-stone'}`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-stone rounded-t-full" />
                            )}
                        </button>
                    ))}
                </div>
                <div className="text-sm text-stone/70 leading-relaxed min-h-[100px]">
                    {product.details[activeTab as keyof typeof product.details]}
                </div>
            </div>
        </div>
    );
};

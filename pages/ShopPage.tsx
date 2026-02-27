import React, { useState } from 'react';
import { Leaf, Filter, ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CATEGORIES = ['All', 'Ritual Kits', 'Essentials', 'Subscriptions'];

const MOCK_PRODUCTS = [
    {
        id: '1',
        name: 'The Starter Stillness Kit',
        category: 'Ritual Kits',
        price: '$120.00 CAD',
        description: 'Everything you need to begin your daily practice.',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop',
        tag: 'Best Seller'
    },
    {
        id: '2',
        name: 'Sustainable Ritual Mat',
        category: 'Essentials',
        price: '$85.00 CAD',
        description: 'Earth-friendly, non-slip base for your daily journey.',
        image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: '3',
        name: 'Signature Aromatherapy Blend',
        category: 'Essentials',
        price: '$45.00 CAD',
        description: 'Grounding notes of cedar, frankincense, and lavender.',
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: '4',
        name: 'Monthly Calm Subscription',
        category: 'Subscriptions',
        price: '$29.00 CAD / mo',
        description: 'A curated delivery of incense, tea, and guided audio each month.',
        image: 'https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: '5',
        name: 'Ceramic Incense Holder',
        category: 'Essentials',
        price: '$35.00 CAD',
        description: 'Hand-thrown minimalist vessel for your daily burning.',
        image: 'https://images.unsplash.com/photo-1610705179421-4f11550974ad?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: '6',
        name: 'The Deep Rest Kit',
        category: 'Ritual Kits',
        price: '$140.00 CAD',
        description: 'Tools specifically curated for evening wind-down.',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000&auto=format&fit=crop'
    }
];

export const ShopPage = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredProducts = activeCategory === 'All'
        ? MOCK_PRODUCTS
        : MOCK_PRODUCTS.filter(p => p.category === activeCategory);

    return (
        <div className="pt-32 pb-24 min-h-screen bg-cream">
            {/* Hero Section */}
            <section className="px-6 md:px-12 max-w-7xl mx-auto mb-20 text-center">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-stone mb-6">Tools for your <span className="italic">stillness</span> practice.</h1>
                <p className="text-lg text-stone/70 max-w-2xl mx-auto">
                    Thoughtfully curated essentials to support your journey inward, designed with sustainability and quiet beauty in mind.
                </p>
            </section>

            {/* Value Proposition Bar */}
            <div className="bg-seafoam text-cream py-3 overflow-hidden whitespace-nowrap mb-16 relative">
                <div className="animate-marquee flex gap-12 text-sm tracking-widest uppercase">
                    <span>✦ Sustainable packaging</span>
                    <span>✦ Free shipping over $100</span>
                    <span>✦ Artisan crafted</span>
                    <span>✦ Consciously sourced</span>
                    {/* Duplicate for seamless scrolling */}
                    <span>✦ Sustainable packaging</span>
                    <span>✦ Free shipping over $100</span>
                    <span>✦ Artisan crafted</span>
                    <span>✦ Consciously sourced</span>
                    <span>✦ Sustainable packaging</span>
                    <span>✦ Free shipping over $100</span>
                    <span>✦ Artisan crafted</span>
                    <span>✦ Consciously sourced</span>
                </div>
            </div>

            {/* Main Shop Content */}
            <main className="px-6 md:px-12 max-w-7xl mx-auto">

                {/* Categories & Filter Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 pb-6 border-b border-stone/10">
                    <div className="flex overflow-x-auto w-full md:w-auto gap-8 pb-4 md:pb-0 scrollbar-hide">
                        {CATEGORIES.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`whitespace-nowrap text-sm tracking-widest uppercase transition-colors duration-300 ${activeCategory === category
                                    ? 'text-seafoam font-semibold'
                                    : 'text-stone/50 hover:text-seafoam'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    <button className="hidden md:flex items-center gap-2 text-sm text-stone/70 hover:text-stone transition-colors group">
                        <Filter size={16} /> Filter & Sort <ChevronDown size={14} className="group-hover:translate-y-1 transition-transform" />
                    </button>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {filteredProducts.map((product) => (
                        <Link to={`/product/${product.id}`} key={product.id} className="group cursor-pointer flex flex-col">
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
                    ))}
                </div>
            </main>
        </div>
    );
};

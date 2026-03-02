import React, { useState, useEffect } from 'react';
import { ShopHero } from '../components/shop/ShopHero';
import { ValuePropBar } from '../components/shop/ValuePropBar';
import { ShopFilters } from '../components/shop/ShopFilters';
import { ProductCard } from '../components/shop/ProductCard';

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

export const ShopPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const filteredProducts = activeCategory === 'All'
        ? MOCK_PRODUCTS
        : MOCK_PRODUCTS.filter(p => p.category === activeCategory);

    return (
        <div className="min-h-screen bg-cream">
            <main className="pt-32 pb-24">
                <ShopHero />
                <ValuePropBar />

                <div className="px-6 md:px-12 max-w-7xl mx-auto">
                    <ShopFilters
                        categories={CATEGORIES}
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ShopPage;

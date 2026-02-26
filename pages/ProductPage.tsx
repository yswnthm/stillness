import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Star, Minus, Plus, Heart, Share2, HelpCircle } from 'lucide-react';

const PRODUCT = {
    id: '1',
    name: 'The Starter Stillness Kit',
    category: 'Ritual Kits',
    price: '$120.00 CAD',
    description: 'Everything you need to begin your daily practice. This curated collection includes our signature meditation cushion, a 30-day guided journal, and a sample trio of our grounded incense blends. Designed to create a dedicated space for quiet reflection in your home.',
    images: [
        'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1200&auto=format&fit=crop'
    ],
    tag: 'Best Seller',
    details: {
        materials: 'Cushion cover is 100% organic cotton, filled with sustainably sourced buckwheat hulls. Journal is printed on recycled paper with soy-based inks. Incense is hand-rolled from pure botanical ingredients.',
        care: 'Cushion cover is removable and machine washable on cold, gentle cycle. Air dry only. Keep incense in a cool, dry place.',
        shipping: 'Free standard shipping across North America. Expedited options available at checkout. Ships within 2-3 business days.'
    },
    reviews: [
        { id: 1, author: 'Sarah M.', rating: 5, text: 'This kit completely transformed my morning routine. The quality is exceptional.' },
        { id: 2, author: 'James B.', rating: 5, text: 'Beautifully packaged and the incense scents are incredibly grounding.' }
    ],
    related: [
        {
            id: '2',
            name: 'Sustainable Ritual Mat',
            category: 'Essentials',
            price: '$85.00 CAD',
            image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=800&auto=format&fit=crop'
        },
        {
            id: '5',
            name: 'Ceramic Incense Holder',
            category: 'Essentials',
            price: '$35.00 CAD',
            image: 'https://images.unsplash.com/photo-1610705179421-4f11550974ad?q=80&w=800&auto=format&fit=crop'
        }
    ]
};

export const ProductPage = () => {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<'materials' | 'care' | 'shipping'>('materials');
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    // In a real app, you would fetch the product based on the specific 'id'
    // For now we use the mock PRODUCT above.

    return (
        <div className="pt-24 pb-24 min-h-screen bg-cream">

            {/* Breadcrumbs */}
            <div className="px-6 md:px-12 max-w-7xl mx-auto mb-8">
                <nav className="flex items-center text-xs tracking-widest uppercase text-stone/50">
                    <Link to="/" className="hover:text-stone transition-colors">Home</Link>
                    <ChevronRight size={14} className="mx-2" />
                    <Link to="/shop" className="hover:text-stone transition-colors">Shop</Link>
                    <ChevronRight size={14} className="mx-2" />
                    <Link to={`/shop?category=${PRODUCT.category}`} className="hover:text-stone transition-colors">{PRODUCT.category}</Link>
                    <ChevronRight size={14} className="mx-2" />
                    <span className="text-stone">{PRODUCT.name}</span>
                </nav>
            </div>

            <main className="px-6 md:px-12 max-w-7xl mx-auto">

                {/* Product Split Layout */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-24">

                    {/* Left: Sticky Media Gallery */}
                    <div className="w-full lg:w-1/2 flex flex-col-reverse lg:flex-row gap-4 lg:sticky lg:top-32 h-fit">
                        {/* Thumbnails */}
                        <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible w-full lg:w-20 shrink-0 scrollbar-hide">
                            {PRODUCT.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImageIndex(idx)}
                                    className={`relative aspect-square rounded-lg overflow-hidden shrink-0 w-20 lg:w-full border-2 transition-colors ${activeImageIndex === idx ? 'border-seafoam' : 'border-transparent'}`}
                                >
                                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                                    <div className={`absolute inset-0 bg-stone/20 transition-opacity ${activeImageIndex === idx ? 'opacity-0' : 'opacity-100 hover:opacity-50'}`} />
                                </button>
                            ))}
                        </div>

                        {/* Main Image */}
                        <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-sand/20">
                            {PRODUCT.tag && (
                                <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-sm text-stone px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium shadow-sm">
                                    {PRODUCT.tag}
                                </div>
                            )}
                            <img
                                src={PRODUCT.images[activeImageIndex]}
                                alt={PRODUCT.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Right: Product Details */}
                    <div className="w-full lg:w-1/2 pt-4">
                        <h1 className="text-4xl md:text-5xl font-serif text-stone mb-4">{PRODUCT.name}</h1>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <span className="text-2xl text-stone">{PRODUCT.price}</span>
                            <div className="flex items-center gap-1 text-sm text-stone/70">
                                <div className="flex text-seafoam">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                </div>
                                <span className="ml-2">(2 Reviews)</span>
                            </div>
                        </div>

                        <p className="text-stone/70 leading-relaxed mb-10">
                            {PRODUCT.description}
                        </p>

                        <div className="space-y-8 mb-12">
                            {/* Purchase Type (Example of Variants) */}
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
                                Add to Cart — {(parseFloat(PRODUCT.price.split(' ')[0].replace('$', '')) * quantity).toFixed(2)}
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
                            <div className="flex gap-8 border-b border-stone/10 mb-6">
                                {[
                                    { id: 'materials', label: 'Details & Materials' },
                                    { id: 'care', label: 'Care Instructions' },
                                    { id: 'shipping', label: 'Shipping & Returns' }
                                ].map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as any)}
                                        className={`pb-4 text-xs tracking-widest uppercase transition-colors relative ${activeTab === tab.id ? 'text-stone font-semibold' : 'text-stone/50 hover:text-stone'}`}
                                    >
                                        {tab.label}
                                        {activeTab === tab.id && (
                                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-stone rounded-t-full" />
                                        )}
                                    </button>
                                ))}
                            </div>
                            <div className="text-sm text-stone/70 leading-relaxed min-h-[100px]">
                                {PRODUCT.details[activeTab]}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Social Proof / Reviews */}
                <section className="mb-24 bg-white rounded-3xl p-12 lg:p-16 border border-stone/5">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-stone/10 pb-8">
                        <div>
                            <h2 className="text-3xl font-serif text-stone mb-4">Community Notes</h2>
                            <div className="flex items-center gap-4">
                                <div className="flex text-seafoam">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                                </div>
                                <span className="text-stone">5.0 based on 2 reviews</span>
                            </div>
                        </div>
                        <button className="hidden md:flex items-center gap-2 text-sm text-stone underline underline-offset-4 hover:text-seafoam transition-colors mt-6 md:mt-0">
                            Write a Review
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {PRODUCT.reviews.map(review => (
                            <div key={review.id} className="space-y-4">
                                <div className="flex text-seafoam">
                                    {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                </div>
                                <p className="text-lg text-stone/80 font-serif leading-relaxed">
                                    "{review.text}"
                                </p>
                                <span className="block text-sm text-stone/50 tracking-wider uppercase">— {review.author}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Related Offerings */}
                <section>
                    <div className="flex justify-between items-end mb-10">
                        <h2 className="text-3xl font-serif text-stone">Pairs well with...</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {PRODUCT.related.map(product => (
                            <Link to={`/product/${product.id}`} key={product.id} className="group flex flex-col">
                                <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-4 bg-sand/20">
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                                    <div className="absolute inset-0 bg-stone/0 group-hover:bg-stone/5 transition-colors duration-300" />
                                </div>
                                <h3 className="text-lg font-serif text-stone group-hover:text-seafoam transition-colors mb-1">{product.name}</h3>
                                <span className="text-stone/70 text-sm">{product.price}</span>
                            </Link>
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
};

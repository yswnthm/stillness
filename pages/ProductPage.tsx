import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductBreadcrumbs } from '../components/product/ProductBreadcrumbs';
import { ProductGallery } from '../components/product/ProductGallery';
import { ProductInfo } from '../components/product/ProductInfo';
import { ProductReviews } from '../components/product/ProductReviews';
import { RelatedProducts } from '../components/product/RelatedProducts';

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

export const ProductPage: React.FC = () => {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-cream">
            <main className="pt-24 pb-24">
                <ProductBreadcrumbs category={PRODUCT.category} name={PRODUCT.name} />

                <div className="px-6 md:px-12 max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-24">
                        <ProductGallery
                            images={PRODUCT.images}
                            activeImageIndex={activeImageIndex}
                            setActiveImageIndex={setActiveImageIndex}
                            tag={PRODUCT.tag}
                            productName={PRODUCT.name}
                        />
                        <ProductInfo
                            product={PRODUCT}
                            quantity={quantity}
                            setQuantity={setQuantity}
                        />
                    </div>

                    <ProductReviews reviews={PRODUCT.reviews} />
                    <RelatedProducts products={PRODUCT.related} />
                </div>
            </main>
        </div>
    );
};

export default ProductPage;

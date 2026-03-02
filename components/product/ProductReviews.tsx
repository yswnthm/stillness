import React from 'react';
import { Star } from 'lucide-react';

interface Review {
    id: number;
    author: string;
    rating: number;
    text: string;
}

interface ProductReviewsProps {
    reviews: Review[];
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({ reviews }) => {
    return (
        <section className="mb-24 bg-white rounded-3xl p-12 lg:p-16 border border-stone/5">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-stone/10 pb-8">
                <div>
                    <h2 className="text-3xl font-serif text-stone mb-4">Community Notes</h2>
                    <div className="flex items-center gap-4">
                        <div className="flex text-seafoam">
                            {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                        </div>
                        <span className="text-stone">5.0 based on {reviews.length} reviews</span>
                    </div>
                </div>
                <button className="hidden md:flex items-center gap-2 text-sm text-stone underline underline-offset-4 hover:text-seafoam transition-colors mt-6 md:mt-0">
                    Write a Review
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {reviews.map(review => (
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
    );
};

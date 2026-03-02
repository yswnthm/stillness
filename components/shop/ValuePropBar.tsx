import React from 'react';

export const ValuePropBar: React.FC = () => {
    return (
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
    );
};

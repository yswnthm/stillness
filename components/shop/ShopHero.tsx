import React from 'react';

export const ShopHero: React.FC = () => {
    return (
        <section className="px-6 md:px-12 max-w-7xl mx-auto mb-20 text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-stone mb-6">Tools for your <span className="italic">stillness</span> practice.</h1>
            <p className="text-lg text-stone/70 max-w-2xl mx-auto">
                Thoughtfully curated essentials to support your journey inward, designed with sustainability and quiet beauty in mind.
            </p>
        </section>
    );
};

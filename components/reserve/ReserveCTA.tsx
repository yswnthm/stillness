import React from 'react';

export const ReserveCTA: React.FC = () => {
    return (
        <section className="py-24 bg-seafoam text-cream text-center">
            <div className="max-w-2xl mx-auto px-6">
                <h2 className="text-4xl md:text-7xl font-serif mb-6">Need assistance?</h2>
                <p className="text-breeze/60 mb-8">Our concierge is available daily from 9am to 8pm to help you curate your perfect experience.</p>
                <a href="tel:5125550123" className="text-cream font-bold uppercase tracking-widest hover:text-white transition-colors underline underline-offset-8">Call Us: (512) 555-0123</a>
            </div>
        </section>
    );
};

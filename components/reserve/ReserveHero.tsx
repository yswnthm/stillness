import React from 'react';

export const ReserveHero: React.FC = () => {
    return (
        <section className="pt-32 pb-20 text-center">
            <div className="max-w-4xl mx-auto px-6">
                <span className="text-seafoam text-sm uppercase tracking-[0.3em] font-bold mb-6 block">Reservations</span>
                <h1 className="text-4xl md:text-7xl font-serif text-midnightsea mb-8">Secure Your Space.</h1>
                <p className="text-midnightsea/60 text-xl font-light max-w-xl mx-auto">
                    Book your session and begin the journey back to yourself.
                </p>
            </div>
        </section>
    );
};

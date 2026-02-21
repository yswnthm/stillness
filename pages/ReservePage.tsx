import React, { useEffect } from 'react';
import { BookingUI } from '../components/reserve/BookingUI';
import { ReservationInstructions } from '../components/reserve/ReservationInstructions';

export const ReservePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-midnightsea">
      <div className="pt-32 pb-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-seafoam text-sm uppercase tracking-[0.3em] font-bold mb-6 block">Reservations</span>
          <h1 className="text-4xl md:text-7xl font-serif text-cream mb-8">Secure Your Space.</h1>
          <p className="text-cream/70 text-xl font-light max-w-xl mx-auto">
            Book your session and begin the journey back to yourself.
          </p>
        </div>
      </div>

      <div className="pb-24">
        <BookingUI />
      </div>

      <ReservationInstructions />

      <section className="py-24 bg-seafoam text-cream text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-4xl md:text-7xl font-serif mb-6">Need assistance?</h2>
          <p className="text-breeze/60 mb-8">Our concierge is available daily from 9am to 8pm to help you curate your perfect experience.</p>
          <a href="tel:5125550123" className="text-cream font-bold uppercase tracking-widest hover:text-white transition-colors underline underline-offset-8">Call Us: (512) 555-0123</a>
        </div>
      </section>
    </div>
  );
};

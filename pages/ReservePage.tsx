import React, { useEffect } from 'react';
import { BookingUI } from '../components/reserve/BookingUI';
import { ReservationInstructions } from '../components/reserve/ReservationInstructions';
import { ReserveHero } from '../components/reserve/ReserveHero';
import { ReserveCTA } from '../components/reserve/ReserveCTA';

export const ReservePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      <main>
        <ReserveHero />

        <div className="pb-24">
          <BookingUI />
        </div>

        <ReservationInstructions />

        <ReserveCTA />
      </main>
    </div>
  );
};

export default ReservePage;

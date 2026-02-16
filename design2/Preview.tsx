import React from 'react';
import { Hero } from './Hero';
import { Intro } from './Intro';
import { Services } from './Services';
import { Stories } from './Stories';
import { Testimonials } from './Testimonials';
import { Newsletter } from './Newsletter';

export const Design2Preview: React.FC = () => {
  return (
    <div className="bg-white min-h-screen relative">
      <div className="noise-overlay" />
      <Hero />
      <Intro />
      <Services />
      <Stories />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Design2Preview;

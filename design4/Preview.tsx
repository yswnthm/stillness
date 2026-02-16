import React from 'react';
import { Hero } from './Hero';
import { Intro } from './Intro';
import { Services } from './Services';
import { Stories } from './Stories';
import { Testimonials } from './Testimonials';
import { Newsletter } from './Newsletter';

export const Design4Preview: React.FC = () => {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <Hero />
      <Intro />
      <Services />
      <Stories />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Design4Preview;

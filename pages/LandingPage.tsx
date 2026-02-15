import React from 'react';
import { Hero } from '../components/Hero';
import { Intro } from '../components/Intro';
import { Heal } from '../components/Heal';
import { CorporateWellness } from '../components/CorporateWellness';
import { FloatingTeaser } from '../components/FloatingTeaser';
import { ShopPreview } from '../components/ShopPreview';
import { Stories } from '../components/Stories';
import { Testimonials } from '../components/Testimonials';
import { Newsletter } from '../components/Newsletter';

export const LandingPage = () => {
  return (
    <>
      <Hero />
      <Intro />
      <Heal />
      <CorporateWellness />
      <FloatingTeaser />
      <ShopPreview />
      <Stories />
      <Testimonials />
      <Newsletter />
    </>
  );
};

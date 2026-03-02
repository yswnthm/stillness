import React from 'react';
import { Hero } from '../components/landing/Hero';
import { Intro } from '../components/landing/Intro';
import { Heal } from '../components/landing/Heal';
import { CorporateWellness } from '../components/landing/CorporateWellness';
import { FloatingTeaser } from '../components/landing/FloatingTeaser';
import { ShopPreview } from '../components/landing/ShopPreview';
import { Stories } from '../components/landing/Stories';
import { Testimonials } from '../components/landing/Testimonials';
import { Newsletter } from '../components/landing/Newsletter';

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

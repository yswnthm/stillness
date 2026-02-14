import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Intro } from './components/Intro';
import { Heal } from './components/Heal';
import { CorporateWellness } from './components/CorporateWellness';
import { FloatingTeaser } from './components/FloatingTeaser';
import { ShopPreview } from './components/ShopPreview';
import { Stories } from './components/Stories';
import { Testimonials } from './components/Testimonials';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-cream font-sans selection:bg-seafoam selection:text-white">
      <Header />
      <main>
        <Hero />
        <Intro />
        <Heal />
        <CorporateWellness />
        <FloatingTeaser />
        <ShopPreview />
        <Stories />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { LandingPage } from './pages/LandingPage';
import { AboutPage } from './pages/AboutPage';
import { CorporatePage } from './pages/CorporatePage';
import { ReservePage } from './pages/ReservePage';
import { ShopPage } from './pages/ShopPage';
import { ProductPage } from './pages/ProductPage';
import { SacredOfferingsPage } from './pages/SacredOfferingsPage';
import { CuratedCalmPage } from './pages/CuratedCalmPage';
import { StillnessHabitPage } from './pages/StillnessHabitPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';

function App() {
  return (
    <div className="min-h-screen bg-cream font-sans selection:bg-seafoam selection:text-white">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/corporate" element={<CorporatePage />} />
          <Route path="/reserve" element={<ReservePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/offerings" element={<SacredOfferingsPage />} />
          <Route path="/curated-calm" element={<CuratedCalmPage />} />
          <Route path="/habit" element={<StillnessHabitPage />} />
          <Route path="/journal" element={<BlogPage />} />
          <Route path="/journal/:id" element={<BlogPostPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

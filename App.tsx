import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { AboutPage } from './pages/AboutPage';
import { CorporatePage } from './pages/CorporatePage';
import { ReservePage } from './pages/ReservePage';
import Design1Preview from './design1/Preview';
import Design2Preview from './design2/Preview';
import Design3Preview from './design3/Preview';
import Design4Preview from './design4/Preview';
import { VariantSelector } from './components/VariantSelector';

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
          <Route path="/design1" element={<Design1Preview />} />
          <Route path="/design2" element={<Design2Preview />} />
          <Route path="/design3" element={<Design3Preview />} />
          <Route path="/design4" element={<Design4Preview />} />
        </Routes>
      </main>
      <VariantSelector />
      <Footer />
    </div>
  );
}

export default App;

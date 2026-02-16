import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { AboutPage } from './pages/AboutPage';
import { CorporatePage } from './pages/CorporatePage';
import { ReservePage } from './pages/ReservePage';
import Design1Preview from './design1/Preview';

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
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

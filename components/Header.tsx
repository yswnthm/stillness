import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled ? 'bg-cream/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className={`text-2xl md:text-3xl font-serif tracking-tight z-50 transition-colors duration-500 ${mobileMenuOpen ? 'text-stone' : 'text-stone'}`}>
          Stillness.
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-stone hover:text-seafoam transition-colors duration-300 text-sm tracking-widest uppercase font-sans"
            >
              {item.label}
            </Link>
          ))}
          <Link to="/reserve" className="px-6 py-2 border border-stone rounded-full text-stone text-xs uppercase tracking-widest hover:bg-stone hover:text-cream transition-all duration-500">
            Book
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 text-stone focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav Overlay */}
        <div className={`fixed inset-0 bg-cream z-40 flex flex-col items-center justify-center space-y-8 transition-opacity duration-500 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-serif text-stone hover:text-seafoam transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/reserve"
            onClick={() => setMobileMenuOpen(false)}
            className="px-8 py-3 border border-stone rounded-full text-stone text-sm uppercase tracking-widest"
          >
            Book Session
          </Link>
        </div>
      </div>
    </header>
  );
};

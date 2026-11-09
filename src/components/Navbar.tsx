import React, { useState, useEffect } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { WEDDING_CONFIG } from '../config/wedding';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF8F5]/90 backdrop-blur-md shadow-sm border-b border-[#EAE2D8]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Monogram / Logo */}
        <button
          onClick={() => scrollTo('hero')}
          className="text-left group flex items-center gap-2 cursor-pointer focus:outline-none"
        >
          <span className="font-serif text-2xl tracking-wider text-[#2A2725] group-hover:text-[#B89B6D] transition-colors">
            {WEDDING_CONFIG.couple.monogram}
          </span>
          <Heart className="w-3.5 h-3.5 text-[#B89B6D] fill-[#B89B6D]/20 animate-pulse" />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollTo('schedule')}
            className="text-xs uppercase tracking-[0.2em] text-[#5A544F] hover:text-[#B89B6D] transition-colors font-medium"
          >
            The Details
          </button>
          <button
            onClick={() => scrollTo('rsvp')}
            className="px-5 py-2.5 rounded-full bg-[#B89B6D] hover:bg-[#A38659] text-white text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0"
          >
            RSVP Now
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#2A2725] hover:text-[#B89B6D] focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-[#EAE2D8] px-6 py-6 shadow-xl space-y-4 animate-in fade-in slide-in-from-top duration-200">
          <button
            onClick={() => scrollTo('schedule')}
            className="block w-full text-left py-2 text-sm uppercase tracking-[0.2em] text-[#5A544F] hover:text-[#B89B6D] font-medium"
          >
            The Details
          </button>
          <div className="pt-2">
            <button
              onClick={() => scrollTo('rsvp')}
              className="block w-full py-3 text-center rounded-full bg-[#B89B6D] text-white text-xs uppercase tracking-[0.2em] font-medium shadow-md"
            >
              RSVP Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};


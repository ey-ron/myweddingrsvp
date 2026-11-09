import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';
import { WEDDING_CONFIG } from '../config/wedding';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    const hero = document.getElementById('hero');
    if (hero) {
      hero.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="snap-start snap-always border-t border-[#EAE2D8] bg-[#FAF8F5] py-16 px-4 sm:px-6 lg:px-8 text-center relative flex flex-col justify-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center w-full">
        <p className="font-serif text-2xl text-[#2A2725] mb-2">
          {WEDDING_CONFIG.couple.fullTitle}
        </p>

        <p className="text-xs uppercase tracking-[0.25em] text-[#8C7A5E] mb-6">
          {WEDDING_CONFIG.date.display} • {WEDDING_CONFIG.venue.name}
        </p>

        <div className="flex items-center justify-center gap-1.5 text-xs text-[#736B63] mb-8">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-[#B89B6D] fill-[#B89B6D]" />
          <span>for our treasured family and friends</span>
        </div>

        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#DFD0B7] text-[11px] uppercase tracking-wider text-[#5A544F] hover:text-[#2A2725] hover:border-[#B89B6D] transition-colors bg-white/60"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          Back to Top
        </button>

      </div>
    </footer>
  );
};


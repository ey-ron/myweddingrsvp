'use client';

import React, { useState, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Heart,
  Crown,
  Sparkles,
  ShieldCheck,
  Star
} from 'lucide-react';
import { WEDDING_CONFIG } from '../config/wedding';

interface WeddingPartyProps {
  onNavigate?: (pageIndex: number) => void;
  isActive?: boolean;
}

export const WeddingParty: React.FC<WeddingPartyProps> = ({ onNavigate, isActive = true }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [slideKey, setSlideKey] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection('prev');
      setCurrentSlide((prev) => prev - 1);
      setSlideKey((k) => k + 1);
    }
  };

  const nextSlide = () => {
    if (currentSlide < 2) {
      setDirection('next');
      setCurrentSlide((prev) => prev + 1);
      setSlideKey((k) => k + 1);
    }
  };

  const goToSlide = (idx: number) => {
    if (idx === currentSlide) return;
    setDirection(idx > currentSlide ? 'next' : 'prev');
    setCurrentSlide(idx);
    setSlideKey((k) => k + 1);
  };

  // Horizontal touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;
    touchStartX.current = null;
    touchStartY.current = null;

    // Detect predominantly horizontal swipe with a smooth 25px threshold
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 25) {
      if (diffX > 0) {
        // Swiped left -> advance to next slide
        nextSlide();
      } else {
        // Swiped right -> go to previous slide
        prevSlide();
      }
    }
  };

  const slideCategories = [
    { title: 'Parents & Honor Attendants', subtitle: 'Parents, Best Man & Matron of Honor' },
    { title: 'Principal Sponsors', subtitle: 'Ninongs & Ninangs' },
    { title: 'Bridal Party & Little Ones', subtitle: 'Companions & Bearers' },
  ];

  return (
    <section
      id="entourage"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-full flex flex-col items-center justify-between pt-3.5 xs:pt-4.5 sm:pt-6 pb-2 xs:pb-2.5 sm:pb-3 px-3 xs:px-4 sm:px-6 lg:px-8 bg-subtle-linen overflow-hidden touch-pan-y"
    >
      {/* Decorative luxury background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] bg-[#EDE4D4]/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mt-0.5 xs:mt-1 sm:mt-1.5 mb-1 xs:mb-1.5 tall:mb-2 sm:mb-2 flex-shrink-0">
        <span
          key={`pill-${isActive ? 'active' : 'inactive'}`}
          className={`text-[9px] xs:text-[10px] tall:text-[10.5px] sm:text-[11px] uppercase tracking-[0.28em] font-semibold text-[#8C7A5E] inline-block ${
            isActive ? 'animate-header-pill' : 'opacity-0'
          }`}
        >
          Our Circle of Honor
        </span>
        {/* Elegant Cursive Handwriting Headline */}
        <h2 className="text-script-headline text-[#2A2725] mt-0.5 leading-tight tracking-wide whitespace-nowrap overflow-hidden">
          <span
            key={isActive ? 'active' : 'inactive'}
            className={`${isActive ? 'animate-cursive-write' : 'opacity-0'} inline-block`}
          >
            Those Who Stand With Us
          </span>
        </h2>
        <p
          key={`sub-${isActive ? 'active' : 'inactive'}-${slideKey}`}
          className={`font-serif italic text-[10px] xs:text-[11px] tall:text-xs sm:text-xs text-[#736B63] ${
            isActive ? 'animate-header-sub' : 'opacity-0'
          }`}
        >
          {slideCategories[currentSlide].title} · 0{currentSlide + 1} of 03
        </p>
      </div>

      {/* Main Content Area with Navigation Controls */}
      <div className="max-w-xl sm:max-w-2xl w-full mx-auto flex-1 min-h-0 flex flex-col justify-center items-center my-auto">
        {/* Navigation Bar: Arrow Left, Category Name, Arrow Right */}
        <div className="flex items-center justify-between w-full max-w-lg mx-auto mb-1 xs:mb-1.5 px-1 flex-shrink-0">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            aria-label="Previous group"
            className={`w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all border ${
              currentSlide === 0
                ? 'border-transparent text-[#DFD0B7]/50 cursor-not-allowed bg-transparent'
                : 'border-[#DFD0B7] text-[#8C7A5E] hover:text-[#2A2725] hover:border-[#B89B6D] bg-white/90 shadow-xs active:scale-95 cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
          </button>

          {/* Current Category Pill Badge - Animated on Change */}
          <div key={`cat-${slideKey}`} className="text-center px-2 animate-header-pill">
            <span className="text-[9px] xs:text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-[#8C7A5E]">
              {slideCategories[currentSlide].subtitle}
            </span>
          </div>

          <button
            onClick={nextSlide}
            disabled={currentSlide === 2}
            aria-label="Next group"
            className={`w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all border ${
              currentSlide === 2
                ? 'border-transparent text-[#DFD0B7]/50 cursor-not-allowed bg-transparent'
                : 'border-[#DFD0B7] text-[#8C7A5E] hover:text-[#2A2725] hover:border-[#B89B6D] bg-white/90 shadow-xs active:scale-95 cursor-pointer'
            }`}
          >
            <ChevronRight className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
          </button>
        </div>

        {/* The Card Viewport with Entrance Animation - Scaled to fill space beautifully */}
        <div
          className={`w-full max-w-lg sm:max-w-xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl xs:rounded-3xl border border-[#EAE2D8] shadow-card hover:shadow-luxury transition-all p-3 xs:p-4 sm:p-5 flex-1 min-h-[330px] xs:min-h-[365px] sm:min-h-[410px] max-h-[440px] sm:max-h-[470px] flex flex-col justify-between overflow-hidden relative ${
            isActive ? 'animate-luxury-card' : 'opacity-0'
          }`}
        >
          {/* Animated Slide Content (Keyed on slideKey for reliable replay) */}
          <div
            key={slideKey}
            className={`flex-1 flex flex-col justify-between ${
              direction === 'next' ? 'animate-slide-in-right' : 'animate-slide-in-left'
            }`}
          >
            {/* SET 1 (SLIDE 0): PARENTS & HONOR ATTENDANTS (Separate Elegant Cards) */}
            {currentSlide === 0 && (
              <div className="flex-1 flex flex-col justify-between space-y-2 xs:space-y-2.5">
                
                {/* CARD 1: THE PARENTS */}
                <div className="p-2.5 xs:p-3 sm:p-3.5 rounded-xl xs:rounded-2xl bg-[#FAF8F5] border border-[#EAE2D8] flex flex-col justify-between animate-cascade-1 flex-1">
                  <div className="flex items-center justify-between pb-1 mb-1 border-b border-[#EAE2D8]/80">
                    <div className="flex items-center gap-1.5">
                      <Heart className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-[#B89B6D]" />
                      <span className="text-[9px] xs:text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-[#8C7A5E]">
                        The Parents
                      </span>
                    </div>
                    <span className="text-[7.5px] xs:text-[8.5px] text-[#A69781] italic">
                      Parents of the Couple
                    </span>
                  </div>

                  <div className="grid grid-cols-2 text-center my-auto relative">
                    {/* Absolutely Centered Vertical Divider */}
                    <div className="absolute top-1 bottom-1 left-1/2 -translate-x-1/2 w-px bg-[#EAE2D8]/80 pointer-events-none" />

                    {/* Groom's Parents */}
                    <div className="pr-2 xs:pr-3 sm:pr-4">
                      <span className="text-[8px] xs:text-[9px] uppercase font-semibold text-[#8C7A5E] block mb-0.5">
                        Groom&apos;s Parents
                      </span>
                      <p className="font-cormorant text-[13px] xs:text-[14.5px] sm:text-[16px] font-semibold text-[#2A2725] leading-snug tracking-[0.01em]">
                        {WEDDING_CONFIG.entourage.parents.groom[0].name}
                      </p>
                      <p className="font-cormorant text-[13px] xs:text-[14.5px] sm:text-[16px] font-semibold text-[#2A2725] leading-snug tracking-[0.01em] mt-0.5">
                        {WEDDING_CONFIG.entourage.parents.groom[1].name}
                      </p>
                    </div>

                    {/* Bride's Parents */}
                    <div className="pl-2 xs:pl-3 sm:pl-4">
                      <span className="text-[8px] xs:text-[9px] uppercase font-semibold text-[#8C7A5E] block mb-0.5">
                        Bride&apos;s Parents
                      </span>
                      <p className="font-cormorant text-[13px] xs:text-[14.5px] sm:text-[16px] font-semibold text-[#2A2725] leading-snug tracking-[0.01em]">
                        {WEDDING_CONFIG.entourage.parents.bride[0].name}
                      </p>
                      <p className="font-cormorant text-[13px] xs:text-[14.5px] sm:text-[16px] font-semibold text-[#2A2725] leading-snug tracking-[0.01em] mt-0.5">
                        {WEDDING_CONFIG.entourage.parents.bride[1].name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CARD 2: HONOR ATTENDANTS (Best Man & Matron of Honor) */}
                <div className="p-2.5 xs:p-3 sm:p-3.5 rounded-xl xs:rounded-2xl bg-[#FAF8F5] border border-[#EAE2D8] flex flex-col justify-between animate-cascade-2 flex-1">
                  <div className="flex items-center justify-between pb-1 mb-1 border-b border-[#EAE2D8]/80">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-[#B89B6D]" />
                      <span className="text-[9px] xs:text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-[#8C7A5E]">
                        Honor Attendants
                      </span>
                    </div>
                    <span className="text-[7.5px] xs:text-[8.5px] text-[#A69781] italic">
                      Witnesses of Honor
                    </span>
                  </div>

                  <div className="grid grid-cols-2 text-center my-auto relative">
                    {/* Absolutely Centered Vertical Divider */}
                    <div className="absolute top-1 bottom-1 left-1/2 -translate-x-1/2 w-px bg-[#EAE2D8]/80 pointer-events-none" />

                    {/* Best Man */}
                    <div className="pr-2 xs:pr-3 sm:pr-4">
                      <span className="text-[8px] xs:text-[9px] uppercase font-semibold text-[#8C7A5E] block mb-0.5">
                        Best Man
                      </span>
                      <p className="font-cormorant text-[14px] xs:text-[15.5px] sm:text-[17px] font-bold text-[#2A2725] leading-snug tracking-[0.01em]">
                        {WEDDING_CONFIG.entourage.honorAttendants.bestMan.name}
                      </p>
                      <span className="text-[7.5px] xs:text-[8.5px] text-[#A69781] italic block mt-0.5">
                        Groom&apos;s Right Hand
                      </span>
                    </div>

                    {/* Matron of Honor */}
                    <div className="pl-2 xs:pl-3 sm:pl-4">
                      <span className="text-[8px] xs:text-[9px] uppercase font-semibold text-[#8C7A5E] block mb-0.5">
                        Matron of Honor
                      </span>
                      <p className="font-cormorant text-[14px] xs:text-[15.5px] sm:text-[17px] font-bold text-[#2A2725] leading-snug tracking-[0.01em]">
                        {WEDDING_CONFIG.entourage.honorAttendants.matronOfHonor.name}
                      </p>
                      <span className="text-[7.5px] xs:text-[8.5px] text-[#A69781] italic block mt-0.5">
                        Bride&apos;s Confidante
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-center font-serif italic text-[9.5px] xs:text-[10.5px] sm:text-[11.5px] text-[#8C7A5E] pt-1 border-t border-[#F3EDE2] animate-cascade-3">
                  With boundless love to those who guide our path and stand closest to our hearts.
                </p>
              </div>
            )}

            {/* SET 2 (SLIDE 1): PRINCIPAL SPONSORS (7 Rows of Ninong & Ninang) */}
            {currentSlide === 1 && (
              <div className="flex-1 flex flex-col justify-between">
                <div className="grid grid-cols-2 gap-2 xs:gap-3 sm:gap-4 flex-1">
                  {/* Ninongs */}
                  <div className="p-2 xs:p-2.5 sm:p-3 rounded-xl xs:rounded-2xl bg-[#FAF8F5] border border-[#EAE2D8] flex flex-col justify-between animate-cascade-1">
                    <div className="flex items-center justify-center gap-1.5 pb-1 mb-1 border-b border-[#EAE2D8]/80">
                      <ShieldCheck className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-[#B89B6D]" />
                      <span className="text-[9.5px] xs:text-[10.5px] sm:text-[11px] uppercase tracking-wider font-bold text-[#8C7A5E]">
                        Ninong
                      </span>
                    </div>
                    <div className="space-y-1 xs:space-y-1.5 text-center my-auto py-0.5">
                      {WEDDING_CONFIG.entourage.principalSponsors.map((item, idx) => (
                        <p
                          key={`ninong-${idx}`}
                          className="font-cormorant text-[13px] xs:text-[14px] sm:text-[15.5px] font-semibold text-[#2A2725] leading-snug tracking-[0.01em]"
                        >
                          {item.ninong}
                        </p>
                      ))}
                    </div>
                    <div className="text-[7.5px] xs:text-[8.5px] text-[#A69781] text-center pt-0.5 border-t border-[#EAE2D8]/50">
                      Sponsors
                    </div>
                  </div>

                  {/* Ninangs */}
                  <div className="p-2 xs:p-2.5 sm:p-3 rounded-xl xs:rounded-2xl bg-[#FAF8F5] border border-[#EAE2D8] flex flex-col justify-between animate-cascade-2">
                    <div className="flex items-center justify-center gap-1.5 pb-1 mb-1 border-b border-[#EAE2D8]/80">
                      <Crown className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-[#B89B6D]" />
                      <span className="text-[9.5px] xs:text-[10.5px] sm:text-[11px] uppercase tracking-wider font-bold text-[#8C7A5E]">
                        Ninang
                      </span>
                    </div>
                    <div className="space-y-1 xs:space-y-1.5 text-center my-auto py-0.5">
                      {WEDDING_CONFIG.entourage.principalSponsors.map((item, idx) => (
                        <p
                          key={`ninang-${idx}`}
                          className="font-cormorant text-[13px] xs:text-[14px] sm:text-[15.5px] font-semibold text-[#2A2725] leading-snug tracking-[0.01em]"
                        >
                          {item.ninang}
                        </p>
                      ))}
                    </div>
                    <div className="text-[7.5px] xs:text-[8.5px] text-[#A69781] text-center pt-0.5 border-t border-[#EAE2D8]/50">
                      Sponsors
                    </div>
                  </div>
                </div>

                <p className="text-center font-serif italic text-[9.5px] xs:text-[10.5px] sm:text-[11.5px] text-[#8C7A5E] pt-1 mt-1 border-t border-[#F3EDE2] animate-cascade-3">
                  Guiding witnesses to our sacred covenant and lifelong journey.
                </p>
              </div>
            )}

            {/* SET 3 (SLIDE 2): GROOMSMEN (3) & BEARERS (3) ON LEFT, BRIDESMAIDS (7) & FLOWER GIRL (1) ON RIGHT */}
            {currentSlide === 2 && (
              <div className="flex-1 flex flex-col justify-between">
                <div className="grid grid-cols-2 gap-2 xs:gap-3 sm:gap-4 flex-1">
                  {/* Left Column: Groomsmen (Taller) + Bearers (3 Rows, Shorter) */}
                  <div className="flex flex-col gap-1.5 xs:gap-2 flex-1 justify-between">
                    {/* Groomsmen - Primary Card (Taller than Bearers) */}
                    <div className="p-2 xs:p-2.5 rounded-xl xs:rounded-2xl bg-[#FAF8F5] border border-[#EAE2D8] flex flex-col justify-between animate-cascade-1 flex-[1.4] min-h-0">
                      <div className="flex items-center justify-between pb-0.5 mb-1 border-b border-[#EAE2D8]/80 flex-shrink-0">
                        <span className="text-[9px] xs:text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-[#8C7A5E]">
                          Groomsmen
                        </span>
                        <span className="text-[7.5px] xs:text-[8.5px] text-[#A69781]">
                          {WEDDING_CONFIG.entourage.bridalParty.groomsmen.length} Gents
                        </span>
                      </div>
                      <div className="space-y-0.5 xs:space-y-1 text-center my-auto py-0.5">
                        {WEDDING_CONFIG.entourage.bridalParty.groomsmen.map((name, idx) => (
                          <p
                            key={`groomsman-${idx}`}
                            className="font-cormorant text-[13px] xs:text-[14px] sm:text-[15.5px] font-semibold text-[#2A2725] leading-snug tracking-[0.01em]"
                          >
                            {name}
                          </p>
                        ))}
                      </div>
                      <div className="text-[7.5px] xs:text-[8px] text-[#A69781] text-center pt-0.5 flex-shrink-0">
                        Gentlemen Attendants
                      </div>
                    </div>

                    {/* Little Attendants / Bearers (3 Rows, Compact, Shorter than Groomsmen) */}
                    <div className="p-2 xs:p-2.5 rounded-xl xs:rounded-2xl bg-[#FAF8F5] border border-[#EAE2D8] flex flex-col justify-between animate-cascade-2 flex-[0.8] min-h-0">
                      <div className="flex items-center justify-between pb-0.5 mb-0.5 border-b border-[#EAE2D8]/80 flex-shrink-0">
                        <span className="text-[8.5px] xs:text-[9.5px] sm:text-[10px] uppercase tracking-wider font-bold text-[#8C7A5E]">
                          The Bearers
                        </span>
                        <span className="text-[7.5px] xs:text-[8.5px] text-[#A69781]">3 Bearers</span>
                      </div>
                      <div className="space-y-1 xs:space-y-1.5 my-auto py-0.5 text-center">
                        {WEDDING_CONFIG.entourage.littleOnes.slice(0, 3).map((item, idx) => (
                          <div key={`bearer-${idx}`} className="text-center">
                            <span className="text-[7px] xs:text-[7.5px] sm:text-[8px] text-[#8C7A5E] uppercase tracking-wider font-bold block leading-none mb-0.5">
                              {item.role}
                            </span>
                            <p className="font-cormorant text-[12px] xs:text-[13px] sm:text-[14px] font-semibold text-[#2A2725] leading-tight tracking-[0.01em]">
                              {item.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Bridesmaids (7) + Flower Girl (1) */}
                  <div className="p-2 xs:p-2.5 rounded-xl xs:rounded-2xl bg-[#FAF8F5] border border-[#EAE2D8] flex flex-col justify-between animate-cascade-2 flex-1">
                    <div className="flex items-center justify-between pb-0.5 mb-1 border-b border-[#EAE2D8]/80">
                      <span className="text-[9px] xs:text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-[#8C7A5E]">
                        Bridesmaids
                      </span>
                      <span className="text-[7.5px] xs:text-[8.5px] text-[#A69781]">7 Ladies</span>
                    </div>
                    <div className="space-y-0.5 xs:space-y-1 text-center my-auto py-0.5">
                      {WEDDING_CONFIG.entourage.bridalParty.bridesmaids.map((name, idx) => (
                        <p
                          key={`bridesmaid-${idx}`}
                          className="font-cormorant text-[12px] xs:text-[13px] sm:text-[14px] font-semibold text-[#2A2725] leading-snug tracking-[0.01em]"
                        >
                          {name}
                        </p>
                      ))}
                    </div>

                    {/* Flower Girl at bottom of Ladies' side */}
                    <div className="pt-1 mt-0.5 border-t border-[#EAE2D8]/80 text-center">
                      <div className="flex items-center justify-center gap-1 mb-0.5">
                        <Sparkles className="w-2.5 h-2.5 text-[#B89B6D]" />
                        <span className="text-[7.5px] xs:text-[8.5px] uppercase tracking-wider font-bold text-[#8C7A5E]">
                          Flower Girl
                        </span>
                      </div>
                      <p className="font-cormorant text-[12px] xs:text-[13px] font-semibold text-[#2A2725] leading-none">
                        {WEDDING_CONFIG.entourage.littleOnes[3]?.name || 'BBB'}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-center font-serif italic text-[9.5px] xs:text-[10.5px] sm:text-[11.5px] text-[#8C7A5E] pt-1 mt-1 border-t border-[#F3EDE2] animate-cascade-3">
                  Cherished companions and little ones gracing our celebration with joy.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 3 Interactive Progress Dots */}
        <div className="flex items-center justify-center gap-1.5 xs:gap-2 mt-2 xs:mt-2.5 flex-shrink-0">
          {[0, 1, 2].map((index) => (
            <button
              key={`dot-${index}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                currentSlide === index
                  ? 'w-6 xs:w-7 h-1.5 bg-[#B89B6D] shadow-xs'
                  : 'w-1.5 h-1.5 bg-[#DFD0B7] hover:bg-[#B89B6D]/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Down Cue - Navigates to RSVP (Page 4) */}
      <button
        key={`scroll-${isActive ? 'active' : 'inactive'}`}
        onClick={() => (onNavigate ? onNavigate(3) : undefined)}
        aria-label="Scroll down to RSVP"
        className={`mt-auto mb-0.5 xs:mb-1 flex flex-col items-center text-[#8C7A5E] hover:text-[#2A2725] transition-all focus:outline-none flex-shrink-0 cursor-pointer pt-1 pb-0.5 ${
          isActive ? 'animate-scroll-cue' : 'opacity-0'
        }`}
      >
        <span className="text-[7.5px] xs:text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.2em] font-medium leading-none mb-0.5">
          Scroll Down to RSVP
        </span>
        <ChevronDown className="w-3 h-3 xs:w-3.5 xs:h-3.5 animate-bounce text-[#B89B6D]" />
      </button>
    </section>
  );
};

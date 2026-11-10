'use client';

import React, { useRef, useEffect } from 'react';
import { Calendar, MapPin, ChevronDown } from 'lucide-react';
import { WEDDING_CONFIG } from '../config/wedding';
import { useCountdown } from '../hooks/useCountdown';

interface HeroProps {
  onNavigate?: (pageIndex: number) => void;
  isReady?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, isReady = true }) => {
  const { timeLeft } = useCountdown();
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);

  // Play video only when Page 1 is visible
  useEffect(() => {
    if (isReady) {
      if (mobileVideoRef.current) {
        mobileVideoRef.current.currentTime = 0;
        mobileVideoRef.current.play().catch(() => {});
      }
      if (desktopVideoRef.current) {
        desktopVideoRef.current.currentTime = 0;
        desktopVideoRef.current.play().catch(() => {});
      }
    } else {
      if (mobileVideoRef.current) {
        mobileVideoRef.current.pause();
        mobileVideoRef.current.currentTime = 0;
      }
      if (desktopVideoRef.current) {
        desktopVideoRef.current.pause();
        desktopVideoRef.current.currentTime = 0;
      }
    }
  }, [isReady]);

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="slide-section bg-subtle-linen">
      {/* Decorative luxury background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] bg-[#EDE4D4]/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Header (Outside the Border) */}
      <div className="text-center max-w-3xl mx-auto mt-0.5 sm:mt-1.5 mb-[clamp(12px,2.2dvh,24px)] sm:mb-5 flex-shrink-0">
        <span
          key={`std-${isReady ? 'ready' : 'hidden'}`}
          className={`text-[clamp(10px,1.25dvh,11.5px)] uppercase tracking-[0.28em] font-semibold text-[#8C7A5E] inline-block ${
            isReady ? 'animate-header-pill' : 'opacity-0'
          }`}
        >
          Save The Date
        </span>
        {/* Elegant Cursive Handwriting Headline */}
        <h1 className="text-script-headline text-[#2A2725] mt-0.5 leading-tight tracking-wide whitespace-nowrap overflow-hidden">
          <span
            key={isReady ? 'ready' : 'hidden'}
            className={`${isReady ? 'animate-cursive-write' : 'opacity-0'} inline-block`}
          >
            We Are Getting Married
          </span>
        </h1>
      </div>

      {/* Centered Arch Border Container - Scaled to fill the viewport */}
      <div className={`w-full flex-1 flex flex-col justify-center items-center my-auto min-h-0 mb-[clamp(10px,1.8dvh,20px)] ${isReady ? 'animate-luxury-card' : 'opacity-0'}`}>
        {/* Elegant Arch Border Frame */}
        <div className="relative max-w-[370px] sm:max-w-2xl xl:max-w-5xl w-full mx-auto py-[clamp(12px,2dvh,22px)] sm:py-5 xl:py-4 px-3.5 sm:px-8 xl:px-6 rounded-[1.75rem] sm:rounded-[2.25rem] border border-[#EAE2D8] bg-[#FAF8F5]/85 backdrop-blur-sm shadow-luxury transition-all xl:flex xl:flex-row xl:items-stretch xl:gap-8">

          {/* Full Height Video (XL Screen View - Left Side) */}
          <div className="hidden xl:block xl:w-[46%] rounded-2xl overflow-hidden border border-[#DFD0B7] shadow-card relative flex-shrink-0 bg-[#EDE4D4]/30 self-stretch">
            <video
              ref={desktopVideoRef}
              src="/VID_20261025210443596.mov"
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Side Content on XL (Full Width on Mobile/Tablet) */}
          <div className="w-full xl:w-[54%] flex flex-col justify-center items-center">
            {/* Dynamic Viewport Looping Video (Mobile Screens) - Generous height */}
            <div className="xl:hidden w-full max-w-[340px] sm:max-w-[450px] h-[clamp(165px,25dvh,255px)] sm:h-[clamp(220px,28dvh,320px)] mx-auto mb-[clamp(8px,1.4dvh,16px)] sm:mb-3.5 rounded-xl sm:rounded-2xl overflow-hidden border border-[#DFD0B7] shadow-card relative flex-shrink-0 bg-[#EDE4D4]/30">
              <video
                ref={mobileVideoRef}
                src="/mobile.mov"
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Live Countdown Timer */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-[clamp(6px,1.2dvh,14px)] sm:mb-3.5 xl:mb-2">
              {timeBlocks.map((block) => (
                <div
                  key={block.label}
                  className="bg-white/90 backdrop-blur-sm border border-[#EAE2D8] rounded-xl sm:rounded-2xl px-2.5 sm:px-3.5 py-1.5 sm:py-2 xl:px-3 xl:py-1.5 shadow-xs text-center min-w-[54px] sm:min-w-[64px]"
                >
                  <div className="font-serif text-[clamp(16px,2.4dvh,22px)] sm:text-xl xl:text-lg font-light text-[#2A2725] tabular-nums leading-none">
                    {String(block.value).padStart(2, '0')}
                  </div>
                  <div className="text-[clamp(8px,1.1dvh,9px)] sm:text-[8.5px] uppercase tracking-[0.16em] text-[#8C7A5E] font-medium mt-0.5 sm:mt-1">
                    {block.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Couple Names - Grand, Stacked Script Typography with Gold Foil Shimmer */}
            <div className="my-[clamp(6px,1.2dvh,14px)] sm:my-3 xl:my-2 flex flex-col justify-center">
              <h2
                key={`names-${isReady ? 'ready' : 'hidden'}`}
                className={`flex flex-col items-center justify-center font-script text-[clamp(38px,5.8dvh,52px)] sm:text-[50px] xl:text-[44px] font-normal leading-[1.08] ${
                  isReady ? 'animate-gold-shimmer' : 'text-[#B89B6D]'
                }`}
              >
                <span>{WEDDING_CONFIG.couple.partner1}</span>
                <span className="text-xl sm:text-2xl xl:text-xl leading-none inline-flex items-center justify-center my-0.5 sm:my-1">
                  &
                </span>
                <span>{WEDDING_CONFIG.couple.partner2}</span>
              </h2>
            </div>

            {/* Divider Flourish */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 my-[clamp(4px,0.8dvh,10px)] sm:my-2.5 xl:my-2">
              <div className="h-px w-10 sm:w-16 bg-[#DFD0B7]" />
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#B89B6D]" />
              <div className="h-px w-10 sm:w-16 bg-[#DFD0B7]" />
            </div>

            {/* Date & Location Badges */}
            <div className="flex flex-col items-center justify-center gap-1 sm:gap-2 text-[clamp(11.5px,1.5dvh,13px)] sm:text-xs xl:text-[11px] text-[#5A544F] mb-[clamp(8px,1.5dvh,16px)] sm:mb-3.5 xl:mb-2.5 font-medium">
              {/* Row 1: Date */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B89B6D] flex-shrink-0" />
                <span>{WEDDING_CONFIG.date.display}</span>
              </div>

              {/* Row 2: Venue */}
              <a
                href={WEDDING_CONFIG.venue.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 sm:gap-2 hover:text-[#B89B6D] transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B89B6D] flex-shrink-0" />
                <span>{WEDDING_CONFIG.venue.name}{WEDDING_CONFIG.venue.city ? `, ${WEDDING_CONFIG.venue.city}` : ''}</span>
              </a>
            </div>

            {/* Action Buttons - Generous touch targets */}
            <div className="flex flex-row items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={() => onNavigate ? onNavigate(3) : scrollTo('rsvp')}
                className="flex-1 sm:flex-initial px-4 sm:px-6 py-[clamp(8px,1.2dvh,11px)] sm:py-2.5 rounded-full bg-[#2A2725] text-white hover:bg-[#B89B6D] text-[clamp(10.5px,1.35dvh,11.5px)] sm:text-[11px] uppercase tracking-[0.15em] font-semibold transition-all shadow-md hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
              >
                RSVP Attendance
              </button>
              <button
                onClick={() => onNavigate ? onNavigate(1) : scrollTo('schedule')}
                className="flex-1 sm:flex-initial px-4 sm:px-6 py-[clamp(8px,1.2dvh,11px)] sm:py-2.5 rounded-full border border-[#DFD0B7] hover:border-[#B89B6D] text-[#2A2725] hover:text-[#B89B6D] text-[clamp(10.5px,1.35dvh,11.5px)] sm:text-[11px] uppercase tracking-[0.15em] font-semibold transition-all bg-white/50"
              >
                Event Details
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Down Cue - Balanced spacing above the button */}
      <button
        key={`scroll-${isReady ? 'ready' : 'hidden'}`}
        onClick={() => onNavigate ? onNavigate(1) : scrollTo('schedule')}
        aria-label="Scroll down to Event Details"
        className={`flex flex-col items-center text-[#8C7A5E] hover:text-[#2A2725] transition-all focus:outline-none flex-shrink-0 cursor-pointer mt-auto pt-[clamp(12px,2dvh,22px)] pb-1 sm:pb-2 ${
          isReady ? 'animate-scroll-cue' : 'opacity-0'
        }`}
      >
        <span className="text-[clamp(8px,1.1dvh,9.5px)] uppercase tracking-[0.2em] font-medium leading-none mb-0.5">
          Scroll Down
        </span>
        <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-bounce text-[#B89B6D]" />
      </button>
    </section>
  );
};

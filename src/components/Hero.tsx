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
    <section id="hero" className="relative w-full h-full flex flex-col items-center justify-between pt-4 xs:pt-5 sm:pt-7 pb-2.5 xs:pb-3 sm:pb-4 px-3.5 xs:px-4 sm:px-6 lg:px-8 bg-subtle-linen overflow-hidden">
      {/* Decorative luxury background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] bg-[#EDE4D4]/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Header (Outside the Border) */}
      <div className="text-center max-w-3xl mx-auto mt-1 xs:mt-1.5 sm:mt-2 mb-1 xs:mb-1.5 tall:mb-2.5 sm:mb-2 flex-shrink-0">
        <span
          key={`std-${isReady ? 'ready' : 'hidden'}`}
          className={`text-[11px] xs:text-xs tall:text-sm sm:text-sm uppercase tracking-[0.35em] font-semibold text-[#8C7A5E] inline-block ${
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

      {/* Centered Arch Border Container - Scaled up to fill the viewport */}
      <div className={`w-full flex-1 flex flex-col justify-center items-center my-auto min-h-0 ${isReady ? 'animate-luxury-card' : 'opacity-0'}`}>
        {/* Elegant Arch Border Frame */}
        <div className="relative max-w-[345px] xs:max-w-[380px] sm:max-w-2xl xl:max-w-5xl w-full mx-auto py-3.5 xs:py-4.5 tall:py-6 sm:py-7 xl:py-6 px-4 xs:px-6 sm:px-10 xl:px-8 rounded-[1.85rem] xs:rounded-[2.25rem] tall:rounded-[2.5rem] sm:rounded-[2.5rem] border border-[#EAE2D8] bg-[#FAF8F5]/85 backdrop-blur-sm shadow-luxury transition-all xl:flex xl:flex-row xl:items-stretch xl:gap-8">

          {/* Full Height Video (XL Screen View - Left Side) */}
          <div className="hidden xl:block xl:w-[46%] rounded-2xl overflow-hidden border border-[#DFD0B7] shadow-card relative flex-shrink-0 bg-[#EDE4D4]/30 self-stretch">
            <video
              ref={desktopVideoRef}
              src="./VID_20261025210443596.mov"
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Side Content on XL (Full Width on Mobile/Tablet) */}
          <div className="w-full xl:w-[54%] flex flex-col justify-center items-center">
            {/* 2:1 Widescreen Looping Video (XS and SM / Small Screens) */}
            <div className="xl:hidden w-full max-w-[310px] xs:max-w-[340px] tall:max-w-[360px] sm:max-w-[460px] aspect-[2/1] mx-auto mb-2.5 xs:mb-3 tall:mb-4 sm:mb-5 rounded-xl xs:rounded-2xl overflow-hidden border border-[#DFD0B7] shadow-card relative flex-shrink-0 bg-[#EDE4D4]/30">
              <video
                ref={mobileVideoRef}
                src="./mobile.mov"
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Live Countdown Timer */}
            <div className="flex items-center justify-center gap-1.5 xs:gap-2.5 sm:gap-4 mb-2.5 xs:mb-3 sm:mb-5 xl:mb-3">
              {timeBlocks.map((block) => (
                <div
                  key={block.label}
                  className="bg-white/90 backdrop-blur-sm border border-[#EAE2D8] rounded-xl sm:rounded-2xl px-2.5 xs:px-3.5 sm:px-5 py-1.5 xs:py-2 sm:py-3 xl:px-4 xl:py-2.5 shadow-xs text-center min-w-[58px] xs:min-w-[66px] sm:min-w-[80px]"
                >
                  <div className="font-serif text-lg xs:text-2xl sm:text-3xl xl:text-2xl font-light text-[#2A2725] tabular-nums leading-none">
                    {String(block.value).padStart(2, '0')}
                  </div>
                  <div className="text-[8px] xs:text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#8C7A5E] font-medium mt-0.5 sm:mt-1">
                    {block.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Couple Names - Grand, Stacked Script Typography with Gold Foil Shimmer */}
            <div className="my-2 xs:my-2.5 tall:my-3 sm:my-4 xl:my-2.5 flex flex-col justify-center">
              <h2
                key={`names-${isReady ? 'ready' : 'hidden'}`}
                className={`flex flex-col items-center justify-center font-script text-[50px] xs:text-[58px] tall:text-[66px] sm:text-7xl xl:text-[56px] font-normal leading-[1.08] ${
                  isReady ? 'animate-gold-shimmer' : 'text-[#B89B6D]'
                }`}
              >
                <span>{WEDDING_CONFIG.couple.partner1}</span>
                <span className="text-2xl xs:text-3xl sm:text-4xl xl:text-[38px] leading-none inline-flex items-center justify-center my-0.5 sm:my-1.5">
                  &
                </span>
                <span>{WEDDING_CONFIG.couple.partner2}</span>
              </h2>
            </div>

            {/* Divider Flourish */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 my-2 xs:my-2.5 sm:my-4 xl:my-2.5">
              <div className="h-px w-10 sm:w-20 bg-[#DFD0B7]" />
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#B89B6D]" />
              <div className="h-px w-10 sm:w-20 bg-[#DFD0B7]" />
            </div>

            {/* Date & Location Badges */}
            <div className="flex flex-col items-center justify-center gap-1.5 xs:gap-2.5 sm:gap-3 xl:gap-2 text-xs xs:text-sm sm:text-base xl:text-sm text-[#5A544F] mb-3 xs:mb-4 sm:mb-6 xl:mb-4 font-medium">
              {/* Row 1: Date */}
              <div className="flex items-center gap-1.5 sm:gap-2.5">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#B89B6D] flex-shrink-0" />
                <span>{WEDDING_CONFIG.date.display}</span>
              </div>

              {/* Row 2: Venue */}
              <a
                href={WEDDING_CONFIG.venue.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 sm:gap-2.5 hover:text-[#B89B6D] transition-colors"
              >
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#B89B6D] flex-shrink-0" />
                <span>{WEDDING_CONFIG.venue.name}{WEDDING_CONFIG.venue.city ? `, ${WEDDING_CONFIG.venue.city}` : ''}</span>
              </a>
            </div>

            {/* Action Buttons - Scaled up with generous touch targets */}
            <div className="flex flex-row items-center justify-center gap-2.5 xs:gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={() => onNavigate ? onNavigate(2) : scrollTo('rsvp')}
                className="flex-1 sm:flex-initial px-4 xs:px-6 sm:px-8 py-2.5 xs:py-3.5 sm:py-3.5 rounded-full bg-[#2A2725] text-white hover:bg-[#B89B6D] text-[11px] xs:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] font-semibold transition-all shadow-md hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
              >
                RSVP Attendance
              </button>
              <button
                onClick={() => onNavigate ? onNavigate(1) : scrollTo('schedule')}
                className="flex-1 sm:flex-initial px-4 xs:px-6 sm:px-8 py-2.5 xs:py-3.5 sm:py-3.5 rounded-full border border-[#DFD0B7] hover:border-[#B89B6D] text-[#2A2725] hover:text-[#B89B6D] text-[11px] xs:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] font-semibold transition-all bg-white/50"
              >
                Event Details
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Down Cue - Animated entrance */}
      <button
        key={`scroll-${isReady ? 'ready' : 'hidden'}`}
        onClick={() => onNavigate ? onNavigate(1) : scrollTo('schedule')}
        aria-label="Scroll down to Event Details"
        className={`flex flex-col items-center text-[#8C7A5E] hover:text-[#2A2725] transition-all focus:outline-none flex-shrink-0 cursor-pointer pt-0.5 pb-0.5 ${
          isReady ? 'animate-scroll-cue' : 'opacity-0'
        }`}
      >
        <span className="text-[9px] xs:text-[10px] uppercase tracking-[0.25em] font-medium leading-none mb-0.5">
          Scroll Down
        </span>
        <ChevronDown className="w-3.5 h-3.5 xs:w-4 xs:h-4 animate-bounce text-[#B89B6D]" />
      </button>
    </section>
  );
};

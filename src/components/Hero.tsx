import React from 'react';
import { Calendar, MapPin, ChevronDown } from 'lucide-react';
import { WEDDING_CONFIG } from '../config/wedding';
import { useCountdown } from '../hooks/useCountdown';

interface HeroProps {
  onNavigate?: (pageIndex: number) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { timeLeft } = useCountdown();

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
    <section id="hero" className="relative w-full h-full flex flex-col items-center justify-start pt-1 sm:pt-2 pb-2 sm:pb-3 px-3.5 xs:px-4 sm:px-6 lg:px-8 bg-subtle-linen overflow-hidden">
      {/* Decorative luxury background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] bg-[#EDE4D4]/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Header (Outside the Border) */}
      <div className="text-center max-w-3xl mx-auto mb-1 sm:mb-2 flex-shrink-0">
        <span className="text-xs xs:text-sm uppercase tracking-[0.35em] font-semibold text-[#8C7A5E]">
          Save The Date
        </span>
        <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-serif text-[#2A2725] mt-0.5 leading-tight tracking-tight">
          We Are Getting Married
        </h1>
      </div>

      {/* Centered Arch Border Container */}
      <div className="w-full flex-1 min-h-0 flex flex-col justify-center items-center">
        {/* Elegant Arch Border Frame */}
        <div className="relative max-w-sm xs:max-w-lg sm:max-w-2xl xl:max-w-5xl w-full mx-auto py-4 xs:py-5 sm:py-7 xl:py-4 px-4 xs:px-7 sm:px-10 xl:px-8 rounded-[2rem] sm:rounded-[2.5rem] border border-[#EAE2D8] bg-[#FAF8F5]/80 backdrop-blur-sm shadow-luxury transition-all">

        {/* 2:1 Widescreen Looping Video (XS and SM / Small Screens) */}
        <div className="xl:hidden w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[460px] aspect-[2/1] mx-auto mb-3 xs:mb-4 sm:mb-5 rounded-2xl overflow-hidden border border-[#DFD0B7] shadow-card relative flex-shrink-0 bg-[#EDE4D4]/30">
          <video
            src="./mobile.mov"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* Live Countdown Timer */}
        <div className="flex items-center justify-center gap-2 xs:gap-3 sm:gap-4 mb-3 xs:mb-4 sm:mb-5 xl:mb-2.5">
          {timeBlocks.map((block) => (
            <div
              key={block.label}
              className="bg-white/90 backdrop-blur-sm border border-[#EAE2D8] rounded-xl sm:rounded-2xl px-3 xs:px-3.5 py-2 xs:py-2.5 sm:px-5 sm:py-3 xl:px-4 xl:py-2 shadow-sm text-center min-w-[58px] xs:min-w-[66px] sm:min-w-[80px]"
            >
              <div className="font-serif text-xl xs:text-2xl sm:text-3xl xl:text-2xl font-light text-[#2A2725] tabular-nums">
                {String(block.value).padStart(2, '0')}
              </div>
              <div className="text-[8px] xs:text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#8C7A5E] font-medium mt-0.5 sm:mt-1">
                {block.label}
              </div>
            </div>
          ))}
        </div>

        {/* Couple Names & Video Container */}
        <div className="my-2.5 xs:my-3.5 sm:my-4 xl:my-2 xl:flex xl:items-center xl:justify-center xl:gap-10">
          {/* 4-Second Looping Video (XL View Only) */}
          <div className="hidden xl:block w-64 h-52 rounded-2xl overflow-hidden border border-[#DFD0B7] shadow-card relative flex-shrink-0 bg-[#EDE4D4]/30">
            <video
              src="./VID_20261025210443596.mov"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>

          {/* Couple Names */}
          <div className="flex flex-col justify-center">
            <h2 className="flex flex-col items-center justify-center font-script text-5xl xs:text-[58px] sm:text-7xl xl:text-[54px] font-normal text-[#B89B6D] leading-[1.12]">
              <span>{WEDDING_CONFIG.couple.partner1}</span>
              <span className="text-2xl xs:text-3xl sm:text-4xl xl:text-[38px] leading-none inline-flex items-center justify-center my-1 sm:my-1.5">
                &
              </span>
              <span>{WEDDING_CONFIG.couple.partner2}</span>
            </h2>
          </div>
        </div>

        {/* Divider Flourish */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 my-2.5 xs:my-3 sm:my-4 xl:my-2">
          <div className="h-px w-12 sm:w-20 bg-[#DFD0B7]" />
          <div className="w-2 h-2 rounded-full bg-[#B89B6D]" />
          <div className="h-px w-12 sm:w-20 bg-[#DFD0B7]" />
        </div>

        {/* Date & Location Badges (Two Rows) */}
        <div className="flex flex-col items-center justify-center gap-2 xs:gap-2.5 sm:gap-3 xl:gap-2 text-xs xs:text-sm sm:text-base xl:text-sm text-[#5A544F] mb-4 xs:mb-5 sm:mb-6 xl:mb-3 font-medium">
          {/* Row 1: Date */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <Calendar className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#B89B6D] flex-shrink-0" />
            <span>{WEDDING_CONFIG.date.display}</span>
          </div>

          {/* Row 2: Venue */}
          <a
            href={WEDDING_CONFIG.venue.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 sm:gap-2.5 hover:text-[#B89B6D] transition-colors"
          >
            <MapPin className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#B89B6D] flex-shrink-0" />
            <span>{WEDDING_CONFIG.venue.name}{WEDDING_CONFIG.venue.city ? `, ${WEDDING_CONFIG.venue.city}` : ''}</span>
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={() => onNavigate ? onNavigate(2) : scrollTo('rsvp')}
            className="w-full sm:w-auto px-7 py-3 sm:px-8 sm:py-3.5 rounded-full bg-[#2A2725] text-white hover:bg-[#B89B6D] text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
          >
            RSVP Your Attendance
          </button>
          <button
            onClick={() => onNavigate ? onNavigate(1) : scrollTo('schedule')}
            className="w-full sm:w-auto px-7 py-3 sm:px-8 sm:py-3.5 rounded-full border border-[#DFD0B7] hover:border-[#B89B6D] text-[#2A2725] hover:text-[#B89B6D] text-xs uppercase tracking-[0.2em] font-semibold transition-all bg-white/50"
          >
            View Event Details
          </button>
        </div>

      </div>
      </div>

      {/* Scroll down cue */}
      <button
        onClick={() => onNavigate ? onNavigate(1) : scrollTo('schedule')}
        className="hidden sm:flex mt-1 flex-col items-center text-xs tracking-widest uppercase text-[#8C7A5E] hover:text-[#2A2725] transition-colors focus:outline-none xl:hidden"
      >
        <span className="mb-0.5 text-[10px]">Next</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
};

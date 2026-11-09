import React from 'react';
import { Calendar, MapPin, ChevronDown } from 'lucide-react';
import { WEDDING_CONFIG } from '../config/wedding';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center text-center px-4 pt-24 pb-16 sm:px-6 lg:px-8 bg-subtle-linen overflow-hidden">
      {/* Decorative luxury background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] bg-[#EDE4D4]/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Elegant Arch Border Frame */}
      <div className="relative max-w-3xl w-full mx-auto py-12 px-6 sm:px-12 rounded-[2.5rem] border border-[#EAE2D8] bg-[#FAF8F5]/80 backdrop-blur-sm shadow-luxury">
        
        {/* Monogram / Top Tagline */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-full border border-[#B89B6D]/40 flex items-center justify-center mb-4">
            <span className="font-serif italic text-base text-[#B89B6D]">
              {WEDDING_CONFIG.couple.monogram}
            </span>
          </div>
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8C7A5E]">
            Save The Date
          </span>
          <p className="font-serif italic text-sm text-[#736B63] mt-1">
            for the wedding celebration of
          </p>
        </div>

        {/* Couple Names */}
        <div className="my-6">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal text-[#2A2725] tracking-tight leading-[1.15]">
            <span className="block">{WEDDING_CONFIG.couple.partner1}</span>
            <span className="font-script text-4xl sm:text-5xl md:text-6xl text-[#B89B6D] -my-2 block select-none">
              &
            </span>
            <span className="block">{WEDDING_CONFIG.couple.partner2}</span>
          </h1>
        </div>

        {/* Divider Flourish */}
        <div className="flex items-center justify-center gap-3 my-6">
          <div className="h-px w-12 sm:w-20 bg-[#DFD0B7]" />
          <div className="w-2 h-2 rounded-full bg-[#B89B6D]" />
          <div className="h-px w-12 sm:w-20 bg-[#DFD0B7]" />
        </div>

        {/* Date & Location Badges */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-[#5A544F] mb-8 font-medium">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#B89B6D] flex-shrink-0" />
            <span>{WEDDING_CONFIG.date.display}</span>
          </div>
          <span className="hidden sm:inline text-[#DFD0B7]">•</span>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#B89B6D] flex-shrink-0" />
            <span>{WEDDING_CONFIG.venue.name}, {WEDDING_CONFIG.venue.city}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => scrollTo('rsvp')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#2A2725] text-white hover:bg-[#B89B6D] text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
          >
            RSVP Your Attendance
          </button>
          <button
            onClick={() => scrollTo('schedule')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-[#DFD0B7] hover:border-[#B89B6D] text-[#2A2725] hover:text-[#B89B6D] text-xs uppercase tracking-[0.2em] font-semibold transition-all bg-white/50"
          >
            View Event Details
          </button>
        </div>

      </div>

      {/* Scroll down cue */}
      <button
        onClick={() => scrollTo('countdown')}
        className="mt-8 flex flex-col items-center text-xs tracking-widest uppercase text-[#8C7A5E] hover:text-[#2A2725] transition-colors focus:outline-none"
      >
        <span className="mb-1 text-[10px]">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
};

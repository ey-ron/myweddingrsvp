'use client';

import React from 'react';
import { Clock, MapPin, Shirt, ExternalLink, ChevronDown } from 'lucide-react';
import { WEDDING_CONFIG } from '../config/wedding';

interface EventDetailsProps {
  onNavigate?: (pageIndex: number) => void;
  isActive?: boolean;
}

export const EventDetails: React.FC<EventDetailsProps> = ({ onNavigate, isActive = true }) => {
  const cascadeClasses = ['animate-cascade-1', 'animate-cascade-2', 'animate-cascade-3'];

  return (
    <section id="schedule" className="relative w-full h-full flex flex-col items-center justify-between pt-3.5 xs:pt-4.5 sm:pt-6 pb-2 xs:pb-3 sm:pb-4 md:pb-2.5 px-3 xs:px-4 sm:px-6 lg:px-8 bg-subtle-linen overflow-hidden">
      
      {/* Section Header - Aligned with Hero */}
      <div className="text-center max-w-3xl mx-auto mt-0.5 xs:mt-1 sm:mt-1.5 mb-1.5 xs:mb-2.5 tall:mb-3.5 sm:mb-4 flex-shrink-0">
        <span
          key={`pill-${isActive ? 'active' : 'inactive'}`}
          className={`text-[9px] xs:text-[10px] tall:text-[10.5px] sm:text-[11px] uppercase tracking-[0.28em] font-semibold text-[#8C7A5E] inline-block ${
            isActive ? 'animate-header-pill' : 'opacity-0'
          }`}
        >
          Celebration Schedule
        </span>
        {/* Elegant Cursive Handwriting Headline */}
        <h2 className="text-script-headline text-[#2A2725] mt-0.5 leading-tight tracking-wide whitespace-nowrap overflow-hidden">
          <span
            key={isActive ? 'active' : 'inactive'}
            className={`${isActive ? 'animate-cursive-write' : 'opacity-0'} inline-block`}
          >
            The Wedding Day
          </span>
        </h2>
        <p
          key={`date-${isActive ? 'active' : 'inactive'}`}
          className={`font-serif italic text-[10px] xs:text-[11px] tall:text-xs sm:text-xs text-[#736B63] ${
            isActive ? 'animate-header-sub' : 'opacity-0'
          }`}
        >
          {WEDDING_CONFIG.date.display}
        </p>
      </div>

      {/* Main Content Area - Anchored neatly with generous space below */}
      <div className="max-w-5xl w-full mx-auto flex-1 min-h-0 flex flex-col justify-start pt-0.5 xs:pt-1 tall:pt-2.5">
        
        {/* 3 Schedule Cards - Staggered sequential entrance */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 xs:gap-2 tall:gap-2.5 sm:gap-4 md:gap-5 mb-1.5 xs:mb-2 tall:mb-3 sm:mb-3.5">
          {WEDDING_CONFIG.schedule.map((item, index) => (
            <div
              key={`${index}-${isActive ? 'active' : 'inactive'}`}
              className={`bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl px-2.5 py-2 xs:px-3 xs:py-2.5 sm:p-4.5 md:p-5 border border-[#EAE2D8] shadow-card hover:shadow-luxury transition-all relative group flex flex-col justify-between ${
                isActive ? cascadeClasses[index] : 'opacity-0'
              }`}
            >
              <div className="flex items-start justify-between gap-2 xs:gap-2.5">
                {/* Left Side: Time, Title, Description */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5 sm:mb-1">
                    <span className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full bg-[#F7F3EB] text-[#7E633C] text-[8.5px] xs:text-[9.5px] sm:text-[11px] font-semibold tracking-wider">
                      <Clock className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 text-[#B89B6D]" />
                      {item.time}
                    </span>
                    <span className="text-[9px] xs:text-[10px] font-serif text-[#DFD0B7]">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="font-serif text-[11.5px] xs:text-[12.5px] sm:text-[15px] font-medium text-[#2A2725] leading-snug mb-0.5">
                    {item.title}
                  </h3>

                  <p className="text-[9px] xs:text-[9.5px] sm:text-[11px] text-[#736B63] leading-snug sm:leading-relaxed">
                    {item.description}
                  </p>

                  {/* Desktop Location link */}
                  <a
                    href={item.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#B89B6D] hover:text-[#9E8052] font-medium transition-colors mt-1.5"
                  >
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="underline-offset-2 hover:underline">{item.location}</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                  </a>
                </div>

                {/* Right Side: Small Photo ABOVE the location link */}
                <div className="flex flex-col items-end flex-shrink-0">
                  {/* Small Venue Photo */}
                  <div className="w-[62px] h-[35px] xs:w-[70px] xs:h-[40px] sm:w-[84px] sm:h-[48px] rounded-lg overflow-hidden border border-[#DFD0B7]/60 shadow-2xs bg-[#EDE4D4]/30 relative mb-1 group-hover:border-[#B89B6D] transition-colors">
                    <img
                      src={item.image}
                      alt={item.location}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  {/* Mobile Location link directly under the photo */}
                  <a
                    href={item.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex sm:hidden items-center gap-1 text-[8.5px] xs:text-[9.5px] text-[#B89B6D] hover:text-[#9E8052] font-medium transition-colors"
                  >
                    <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
                    <span className="underline-offset-2 underline">{item.location}</span>
                    <ExternalLink className="w-2 h-2 opacity-60" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Expanded Attire Section (Ninong & Ninang + Guests) - Staggered sequential entrance */}
        <div
          key={`attire-${isActive ? 'active' : 'inactive'}`}
          className={`bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 xs:p-2.5 sm:p-4 border border-[#EAE2D8] shadow-card max-w-5xl mx-auto w-full ${
            isActive ? 'animate-cascade-4' : 'opacity-0'
          }`}
        >
          <div className="flex items-center justify-center gap-2 mb-1.5 xs:mb-2 sm:mb-2.5">
            <span className="text-[9px] xs:text-[10px] sm:text-xs uppercase tracking-[0.22em] font-semibold text-[#8C7A5E]">
              Wedding Attire Guidance
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 xs:gap-2 sm:gap-3.5">
            
            {/* Part 1: Ninong & Ninang (Principal Sponsors) */}
            <div className="p-2 xs:p-2.5 sm:p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE2D8] flex flex-col justify-between">
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-[#EAE2D8]/80">
                <span className="text-[9px] xs:text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-[#8C7A5E]">
                  Ninong & Ninang
                </span>
                <span className="text-[7.5px] xs:text-[8.5px] sm:text-[9.5px] text-[#A69781] italic">
                  Principal Sponsors
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {/* Ninong / Gents */}
                <div className="flex flex-col items-center text-center px-1">
                  <div className="flex items-center gap-1 mb-0.5">
                    <Shirt className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 text-[#B89B6D]" />
                    <span className="text-[9px] xs:text-[10px] sm:text-[11px] font-semibold text-[#2A2725]">
                      Gents
                    </span>
                  </div>
                  <p className="text-[7.5px] xs:text-[8.5px] sm:text-[9.5px] text-[#736B63] leading-tight">
                    White Barong & Black Pants
                  </p>
                  <div className="flex items-center gap-1.5 mt-1 sm:mt-1.5">
                    <span
                      title="White Barong"
                      className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4.5 sm:h-4.5 rounded-full bg-white border border-[#DFD0B7] shadow-xs inline-block"
                    />
                    <span
                      title="Black Pants"
                      className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4.5 sm:h-4.5 rounded-full bg-[#1A1817] border border-black shadow-xs inline-block"
                    />
                  </div>
                  <span className="text-[6.5px] xs:text-[7.5px] sm:text-[8.5px] text-[#8C7A5E] mt-0.5 font-medium">
                    White · Black
                  </span>
                </div>

                {/* Ninang / Ladies */}
                <div className="flex flex-col items-center text-center px-1 border-l border-[#EAE2D8]">
                  <div className="flex items-center gap-1 mb-0.5">
                    <svg className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 text-[#B89B6D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 3 L15 3 L17 8 L14 10 L16 21 L8 21 L10 10 L7 8 Z" />
                      <path d="M10 3 C10 5, 14 5, 14 3" />
                    </svg>
                    <span className="text-[9px] xs:text-[10px] sm:text-[11px] font-semibold text-[#2A2725]">
                      Ladies
                    </span>
                  </div>
                  <p className="text-[7.5px] xs:text-[8.5px] sm:text-[9.5px] text-[#736B63] leading-tight">
                    Long Gown
                  </p>
                  <div className="flex items-center gap-1.5 mt-1 sm:mt-1.5">
                    <span
                      title="Champagne"
                      className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4.5 sm:h-4.5 rounded-full bg-[#EDE3D0] border border-[#DFD0B7] shadow-xs inline-block"
                    />
                    <span
                      title="Warm Taupe"
                      className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4.5 sm:h-4.5 rounded-full bg-[#CBB79F] border border-[#BFA88F] shadow-xs inline-block"
                    />
                    <span
                      title="Soft Mocha"
                      className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4.5 sm:h-4.5 rounded-full bg-[#9E8B79] border border-[#8C7A68] shadow-xs inline-block"
                    />
                  </div>
                  <span className="text-[6.5px] xs:text-[7.5px] sm:text-[8.5px] text-[#8C7A5E] mt-0.5 font-medium">
                    3 Neutral Tones
                  </span>
                </div>
              </div>
            </div>

            {/* Part 2: Guests */}
            <div className="p-2 xs:p-2.5 sm:p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE2D8] flex flex-col justify-between">
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-[#EAE2D8]/80">
                <span className="text-[9px] xs:text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-[#8C7A5E]">
                  Guests
                </span>
                <span className="text-[7.5px] xs:text-[8.5px] sm:text-[9.5px] text-[#A69781] italic">
                  Friends & Family
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {/* Gentlemen */}
                <div className="flex flex-col items-center text-center px-1">
                  <div className="flex items-center gap-1 mb-0.5">
                    <Shirt className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 text-[#B89B6D]" />
                    <span className="text-[9px] xs:text-[10px] sm:text-[11px] font-semibold text-[#2A2725]">
                      Gentlemen
                    </span>
                  </div>
                  <p className="text-[7.5px] xs:text-[8.5px] sm:text-[9.5px] text-[#736B63] leading-tight">
                    Polo / Long Sleeves & Black Pants
                  </p>
                  <div className="flex items-center gap-1.5 mt-1 sm:mt-1.5">
                    <span
                      title="White Top"
                      className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4.5 sm:h-4.5 rounded-full bg-white border border-[#DFD0B7] shadow-xs inline-block"
                    />
                    <span
                      title="Black Pants"
                      className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4.5 sm:h-4.5 rounded-full bg-[#1A1817] border border-black shadow-xs inline-block"
                    />
                  </div>
                  <span className="text-[6.5px] xs:text-[7.5px] sm:text-[8.5px] text-[#8C7A5E] mt-0.5 font-medium">
                    White · Black
                  </span>
                </div>

                {/* Ladies */}
                <div className="flex flex-col items-center text-center px-1 border-l border-[#EAE2D8]">
                  <div className="flex items-center gap-1 mb-0.5">
                    <svg className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 text-[#B89B6D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 3 L15 3 L17 8 L14 10 L16 21 L8 21 L10 10 L7 8 Z" />
                      <path d="M10 3 C10 5, 14 5, 14 3" />
                    </svg>
                    <span className="text-[9px] xs:text-[10px] sm:text-[11px] font-semibold text-[#2A2725]">
                      Ladies
                    </span>
                  </div>
                  <p className="text-[7.5px] xs:text-[8.5px] sm:text-[9.5px] text-[#736B63] leading-tight">
                    Formal Dress
                  </p>
                  <div className="flex items-center gap-1.5 mt-1 sm:mt-1.5">
                    <span
                      title="Champagne"
                      className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4.5 sm:h-4.5 rounded-full bg-[#EDE3D0] border border-[#DFD0B7] shadow-xs inline-block"
                    />
                    <span
                      title="Warm Taupe"
                      className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4.5 sm:h-4.5 rounded-full bg-[#CBB79F] border border-[#BFA88F] shadow-xs inline-block"
                    />
                    <span
                      title="Soft Mocha"
                      className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4.5 sm:h-4.5 rounded-full bg-[#9E8B79] border border-[#8C7A68] shadow-xs inline-block"
                    />
                  </div>
                  <span className="text-[6.5px] xs:text-[7.5px] sm:text-[8.5px] text-[#8C7A5E] mt-0.5 font-medium">
                    3 Neutral Tones
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Scroll Down Cue - Hidden on xs and sm, shown on md+ */}
      <button
        key={`scroll-${isActive ? 'active' : 'inactive'}`}
        onClick={() => onNavigate ? onNavigate(2) : undefined}
        aria-label="Scroll down to RSVP"
        className={`hidden md:flex mt-auto mb-0.5 xs:mb-1 flex-col items-center text-[#8C7A5E] hover:text-[#2A2725] transition-all focus:outline-none flex-shrink-0 cursor-pointer pt-1 pb-0.5 ${
          isActive ? 'animate-scroll-cue' : 'opacity-0'
        }`}
      >
        <span className="text-[7.5px] xs:text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.2em] font-medium leading-none mb-0.5">
          Scroll Down
        </span>
        <ChevronDown className="w-3 h-3 xs:w-3.5 xs:h-3.5 animate-bounce text-[#B89B6D]" />
      </button>
    </section>
  );
};

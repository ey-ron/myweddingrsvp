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
    <section id="schedule" className="slide-section bg-subtle-linen">
      
      {/* Section Header - Generous gap below */}
      <div className="text-center max-w-3xl mx-auto mt-0.5 sm:mt-1.5 mb-[clamp(14px,2.4dvh,26px)] sm:mb-5 flex-shrink-0">
        <span
          key={`pill-${isActive ? 'active' : 'inactive'}`}
          className={`text-[clamp(10px,1.25dvh,11px)] uppercase tracking-[0.28em] font-semibold text-[#8C7A5E] inline-block ${
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
          className={`font-serif italic text-[clamp(11px,1.35dvh,12.5px)] sm:text-xs text-[#736B63] ${
            isActive ? 'animate-header-sub' : 'opacity-0'
          }`}
        >
          {WEDDING_CONFIG.date.display}
        </p>
      </div>

      {/* Main Content Area - Anchored neatly, evenly distributed with height-fluid gaps */}
      <div className="max-w-5xl w-full mx-auto flex-1 min-h-0 flex flex-col justify-between sm:justify-start gap-[clamp(6px,1.2dvh,12px)] sm:gap-4 mb-[clamp(12px,2dvh,22px)] sm:mb-0">
        
        {/* 3 Schedule Cards - Fluid height-proportional distribution */}
        <div className="flex flex-col justify-between gap-[clamp(4px,0.8dvh,9px)] sm:grid sm:grid-cols-3 sm:gap-4 md:gap-5 flex-1 min-h-0">
          {WEDDING_CONFIG.schedule.map((item, index) => (
            <div
              key={`${index}-${isActive ? 'active' : 'inactive'}`}
              className={`bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl px-3 py-[clamp(5px,0.8dvh,9px)] sm:p-4.5 md:p-5 border border-[#EAE2D8] shadow-card hover:shadow-luxury transition-all relative group flex flex-col justify-center flex-1 min-h-0 ${
                isActive ? cascadeClasses[index] : 'opacity-0'
              }`}
            >
              <div className="flex items-center justify-between gap-2.5 sm:gap-3">
                {/* Left Side: Time, Title, Description */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5 sm:mb-1">
                    <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 rounded-full bg-[#F7F3EB] text-[#7E633C] text-[clamp(9.5px,1.2dvh,11px)] font-semibold tracking-wider">
                      <Clock className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#B89B6D]" />
                      {item.time}
                    </span>
                    <span className="text-[clamp(10px,1.25dvh,11px)] font-serif text-[#DFD0B7]">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="font-serif text-[clamp(12.5px,1.6dvh,15px)] font-medium text-[#2A2725] leading-snug mb-0.5">
                    {item.title}
                  </h3>

                  <p className="text-[clamp(9.5px,1.2dvh,11px)] text-[#736B63] leading-snug sm:leading-relaxed">
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

                {/* Right Side: Venue Photo ABOVE the location link */}
                <div className="flex flex-col items-end flex-shrink-0">
                  {/* Venue Photo - Height-fluid sizing */}
                  <div className="w-[clamp(68px,17vw,84px)] h-[clamp(38px,4.8dvh,48px)] sm:w-[84px] sm:h-[48px] rounded-lg overflow-hidden border border-[#DFD0B7]/60 shadow-2xs bg-[#EDE4D4]/30 relative mb-1 group-hover:border-[#B89B6D] transition-colors">
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
                    className="inline-flex sm:hidden items-center gap-1 text-[clamp(9.5px,1.2dvh,11px)] text-[#B89B6D] hover:text-[#9E8052] font-medium transition-colors"
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

        {/* Expanded Attire Section (Ninong & Ninang + Guests) */}
        <div
          key={`attire-${isActive ? 'active' : 'inactive'}`}
          className={`bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-[clamp(7px,1.1dvh,12px)] sm:p-4 border border-[#EAE2D8] shadow-card max-w-5xl mx-auto w-full flex-shrink-0 ${
            isActive ? 'animate-cascade-4' : 'opacity-0'
          }`}
        >
          <div className="flex items-center justify-center gap-2 mb-[clamp(3px,0.7dvh,7px)] sm:mb-2.5">
            <span className="text-[clamp(10px,1.25dvh,11.5px)] sm:text-xs uppercase tracking-[0.22em] font-semibold text-[#8C7A5E]">
              Wedding Attire Guidance
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[clamp(5px,0.9dvh,9px)] sm:gap-3.5">
            
            {/* Part 1: Ninong & Ninang (Principal Sponsors) */}
            <div className="p-[clamp(5px,0.9dvh,9px)] sm:p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE2D8] flex flex-col justify-between">
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-[#EAE2D8]/80">
                <span className="text-[clamp(9.5px,1.25dvh,11px)] sm:text-[11px] uppercase tracking-wider font-bold text-[#8C7A5E]">
                  Ninong & Ninang
                </span>
                <span className="text-[clamp(8.5px,1.05dvh,9.5px)] sm:text-[9.5px] text-[#A69781] italic">
                  Principal Sponsors
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {/* Ninong / Gents */}
                <div className="flex flex-col items-center text-center px-1">
                  <div className="flex items-center gap-1 mb-0.5">
                    <Shirt className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#B89B6D]" />
                    <span className="text-[clamp(9px,1.2dvh,10.5px)] font-semibold text-[#2A2725]">
                      Gents
                    </span>
                  </div>
                  <p className="text-[clamp(8px,1.1dvh,9px)] text-[#736B63] leading-tight">
                    White Barong & Black Pants
                  </p>
                  <div className="flex items-center gap-1.5 mt-1 sm:mt-1.5">
                    <span
                      title="White Barong"
                      className="w-[clamp(11px,1.6dvh,15px)] h-[clamp(11px,1.6dvh,15px)] sm:w-4.5 sm:h-4.5 rounded-full bg-white border border-[#DFD0B7] shadow-xs inline-block"
                    />
                    <span
                      title="Black Pants"
                      className="w-[clamp(11px,1.6dvh,15px)] h-[clamp(11px,1.6dvh,15px)] sm:w-4.5 sm:h-4.5 rounded-full bg-[#1A1817] border border-black shadow-xs inline-block"
                    />
                  </div>
                  <span className="text-[clamp(7.5px,1dvh,8.5px)] text-[#8C7A5E] mt-0.5 font-medium">
                    White · Black
                  </span>
                </div>

                {/* Ninang / Ladies */}
                <div className="flex flex-col items-center text-center px-1 border-l border-[#EAE2D8]">
                  <div className="flex items-center gap-1 mb-0.5">
                    <svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#B89B6D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 3 L15 3 L17 8 L14 10 L16 21 L8 21 L10 10 L7 8 Z" />
                      <path d="M10 3 C10 5, 14 5, 14 3" />
                    </svg>
                    <span className="text-[clamp(9px,1.2dvh,10.5px)] font-semibold text-[#2A2725]">
                      Ladies
                    </span>
                  </div>
                  <p className="text-[clamp(8px,1.1dvh,9px)] text-[#736B63] leading-tight">
                    Long Gown
                  </p>
                  <div className="flex items-center gap-1.5 mt-1 sm:mt-1.5">
                    <span
                      title="Champagne"
                      className="w-[clamp(11px,1.6dvh,15px)] h-[clamp(11px,1.6dvh,15px)] sm:w-4.5 sm:h-4.5 rounded-full bg-[#EDE3D0] border border-[#DFD0B7] shadow-xs inline-block"
                    />
                    <span
                      title="Warm Taupe"
                      className="w-[clamp(11px,1.6dvh,15px)] h-[clamp(11px,1.6dvh,15px)] sm:w-4.5 sm:h-4.5 rounded-full bg-[#CBB79F] border border-[#BFA88F] shadow-xs inline-block"
                    />
                    <span
                      title="Soft Mocha"
                      className="w-[clamp(11px,1.6dvh,15px)] h-[clamp(11px,1.6dvh,15px)] sm:w-4.5 sm:h-4.5 rounded-full bg-[#9E8B79] border border-[#8C7A68] shadow-xs inline-block"
                    />
                  </div>
                  <span className="text-[clamp(7.5px,1dvh,8.5px)] text-[#8C7A5E] mt-0.5 font-medium">
                    3 Neutral Tones
                  </span>
                </div>
              </div>
            </div>

            {/* Part 2: Guests */}
            <div className="p-[clamp(5px,0.9dvh,9px)] sm:p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE2D8] flex flex-col justify-between">
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-[#EAE2D8]/80">
                <span className="text-[clamp(9.5px,1.25dvh,11px)] sm:text-[11px] uppercase tracking-wider font-bold text-[#8C7A5E]">
                  Guests
                </span>
                <span className="text-[clamp(8.5px,1.05dvh,9.5px)] sm:text-[9.5px] text-[#A69781] italic">
                  Friends & Family
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {/* Gentlemen */}
                <div className="flex flex-col items-center text-center px-1">
                  <div className="flex items-center gap-1 mb-0.5">
                    <Shirt className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#B89B6D]" />
                    <span className="text-[clamp(9px,1.2dvh,10.5px)] font-semibold text-[#2A2725]">
                      Gentlemen
                    </span>
                  </div>
                  <p className="text-[clamp(8px,1.1dvh,9px)] text-[#736B63] leading-tight">
                    Polo / Long Sleeves & Black Pants
                  </p>
                  <div className="flex items-center gap-1.5 mt-1 sm:mt-1.5">
                    <span
                      title="White Top"
                      className="w-[clamp(11px,1.6dvh,15px)] h-[clamp(11px,1.6dvh,15px)] sm:w-4.5 sm:h-4.5 rounded-full bg-white border border-[#DFD0B7] shadow-xs inline-block"
                    />
                    <span
                      title="Black Pants"
                      className="w-[clamp(11px,1.6dvh,15px)] h-[clamp(11px,1.6dvh,15px)] sm:w-4.5 sm:h-4.5 rounded-full bg-[#1A1817] border border-black shadow-xs inline-block"
                    />
                  </div>
                  <span className="text-[clamp(7.5px,1dvh,8.5px)] text-[#8C7A5E] mt-0.5 font-medium">
                    White · Black
                  </span>
                </div>

                {/* Ladies */}
                <div className="flex flex-col items-center text-center px-1 border-l border-[#EAE2D8]">
                  <div className="flex items-center gap-1 mb-0.5">
                    <svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#B89B6D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 3 L15 3 L17 8 L14 10 L16 21 L8 21 L10 10 L7 8 Z" />
                      <path d="M10 3 C10 5, 14 5, 14 3" />
                    </svg>
                    <span className="text-[clamp(9px,1.2dvh,10.5px)] font-semibold text-[#2A2725]">
                      Ladies
                    </span>
                  </div>
                  <p className="text-[clamp(8px,1.1dvh,9px)] text-[#736B63] leading-tight">
                    Formal Dress
                  </p>
                  <div className="flex items-center gap-1.5 mt-1 sm:mt-1.5">
                    <span
                      title="Champagne"
                      className="w-[clamp(11px,1.6dvh,15px)] h-[clamp(11px,1.6dvh,15px)] sm:w-4.5 sm:h-4.5 rounded-full bg-[#EDE3D0] border border-[#DFD0B7] shadow-xs inline-block"
                    />
                    <span
                      title="Warm Taupe"
                      className="w-[clamp(11px,1.6dvh,15px)] h-[clamp(11px,1.6dvh,15px)] sm:w-4.5 sm:h-4.5 rounded-full bg-[#CBB79F] border border-[#BFA88F] shadow-xs inline-block"
                    />
                    <span
                      title="Soft Mocha"
                      className="w-[clamp(11px,1.6dvh,15px)] h-[clamp(11px,1.6dvh,15px)] sm:w-4.5 sm:h-4.5 rounded-full bg-[#9E8B79] border border-[#8C7A68] shadow-xs inline-block"
                    />
                  </div>
                  <span className="text-[clamp(7.5px,1dvh,8.5px)] text-[#8C7A5E] mt-0.5 font-medium">
                    3 Neutral Tones
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Scroll Down Cue - Navigates to Circle of Honor (Page 3) */}
      <button
        key={`scroll-${isActive ? 'active' : 'inactive'}`}
        onClick={() => onNavigate ? onNavigate(2) : undefined}
        aria-label="Scroll down to Circle of Honor"
        className={`flex mt-auto mb-0.5 flex-col items-center text-[#8C7A5E] hover:text-[#2A2725] transition-all focus:outline-none flex-shrink-0 cursor-pointer pt-[clamp(12px,2dvh,22px)] pb-1 sm:pb-2 group ${
          isActive ? 'animate-scroll-cue' : 'opacity-0'
        }`}
      >
        <span className="text-[clamp(8px,1.1dvh,9.5px)] uppercase tracking-[0.2em] font-medium leading-none mb-0.5">
          Scroll Down to Circle of Honor
        </span>
        <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-bounce text-[#B89B6D]" />
      </button>
    </section>
  );
};

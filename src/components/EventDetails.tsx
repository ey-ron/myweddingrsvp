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
      <div className="max-w-5xl xl:max-w-6xl w-full mx-auto flex-1 min-h-0 flex flex-col justify-between sm:justify-start gap-[clamp(6px,1.2dvh,12px)] sm:gap-4 mb-[clamp(12px,2dvh,22px)] sm:mb-0">
        
        {/* 3 Schedule Cards - Fluid height-proportional distribution */}
        <div className="ipad-venue-grid flex flex-col justify-between gap-[clamp(4px,0.8dvh,9px)] sm:grid sm:grid-cols-3 sm:gap-4 md:gap-5 flex-1 min-h-0">
          {WEDDING_CONFIG.schedule.map((item, index) => (
            <div
              key={`${index}-${isActive ? 'active' : 'inactive'}`}
              className={`ipad-venue-card bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl px-3 py-[clamp(5px,0.8dvh,9px)] sm:p-4.5 md:p-5 border border-[#EAE2D8] shadow-card hover:shadow-luxury transition-all relative group flex flex-col justify-center flex-1 min-h-0 ${
                isActive ? cascadeClasses[index] : 'opacity-0'
              }`}
            >
              <div className="ipad-venue-card-content flex items-center justify-between gap-2.5 sm:gap-3 xl:flex-col xl:items-stretch xl:justify-start xl:gap-3 h-full">
                {/* Left Side: Time, Title, Description (Bottom on XL) */}
                <div className="ipad-venue-info flex-1 min-w-0 xl:order-2 xl:w-full xl:flex xl:flex-col xl:justify-between xl:flex-1">
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5 sm:mb-1 xl:mb-1.5">
                      <span className="ipad-venue-badge inline-flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 rounded-full bg-[#F7F3EB] text-[#7E633C] text-[clamp(9.5px,1.2dvh,11px)] font-semibold tracking-wider">
                        <Clock className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#B89B6D]" />
                        {item.time}
                      </span>
                      <span className="text-[clamp(10px,1.25dvh,11px)] font-serif text-[#DFD0B7]">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="ipad-venue-title font-serif text-[clamp(12.5px,1.6dvh,15px)] sm:text-base font-medium text-[#2A2725] leading-snug mb-0.5 xl:mb-1">
                      {item.title}
                    </h3>

                    <p className="ipad-venue-desc text-[clamp(9.5px,1.2dvh,11px)] sm:text-xs text-[#736B63] leading-snug sm:leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Desktop Location link */}
                  <a
                    href={item.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ipad-venue-link hidden sm:inline-flex items-center gap-1.5 text-xs text-[#B89B6D] hover:text-[#9E8052] font-medium transition-colors mt-1.5 xl:mt-2.5"
                  >
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="underline-offset-2 hover:underline">{item.location}</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                  </a>
                </div>

                {/* Right Side: Venue Photo (TOP on XL) */}
                <div className="ipad-venue-media flex flex-col items-end flex-shrink-0 xl:order-1 xl:w-full xl:items-stretch">
                  {/* Venue Photo - Height-fluid sizing on mobile/tablet, Maximized on XL */}
                  <div className="ipad-venue-img-box w-[clamp(68px,17vw,84px)] h-[clamp(38px,4.8dvh,48px)] sm:w-[84px] sm:h-[48px] xl:w-full xl:h-[110px] rounded-lg xl:rounded-xl overflow-hidden border border-[#DFD0B7]/60 shadow-2xs bg-[#EDE4D4]/30 relative mb-1 xl:mb-0 group-hover:border-[#B89B6D] transition-colors">
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
                    className="ipad-venue-mobile-link inline-flex sm:hidden items-center gap-1 text-[clamp(9.5px,1.2dvh,11px)] text-[#B89B6D] hover:text-[#9E8052] font-medium transition-colors"
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
          className={`ipad-attire-card bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-[clamp(7px,1.1dvh,12px)] sm:p-4 xl:p-5 xl:py-4.5 border border-[#EAE2D8] shadow-card max-w-5xl xl:max-w-6xl mx-auto w-full flex-shrink-0 ${
            isActive ? 'animate-cascade-4' : 'opacity-0'
          }`}
        >
          <div className="flex items-center justify-center gap-2 mb-[clamp(3px,0.7dvh,7px)] sm:mb-2.5 xl:mb-3">
            <span className="ipad-attire-main-title text-[clamp(10px,1.25dvh,11.5px)] sm:text-xs xl:text-sm uppercase tracking-[0.22em] xl:tracking-[0.25em] font-semibold text-[#8C7A5E]">
              Wedding Attire Guidance
            </span>
          </div>

          <div className="ipad-attire-grid grid grid-cols-1 sm:grid-cols-2 gap-[clamp(5px,0.9dvh,9px)] sm:gap-3.5 xl:gap-5">
            
            {/* Part 1: Ninong & Ninang (Principal Sponsors) */}
            <div className="ipad-attire-box p-[clamp(5px,0.9dvh,9px)] sm:p-3.5 xl:p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE2D8] flex flex-col justify-between">
              <div className="ipad-attire-header flex items-center justify-between pb-1 mb-1 xl:pb-1.5 xl:mb-1.5 border-b border-[#EAE2D8]/80">
                <span className="ipad-attire-title text-[clamp(9.5px,1.25dvh,11px)] sm:text-[11px] xl:text-[13px] uppercase tracking-wider font-bold text-[#8C7A5E]">
                  Ninong & Ninang
                </span>
                <span className="text-[clamp(8.5px,1.05dvh,9.5px)] sm:text-[9.5px] xl:text-xs text-[#A69781] italic">
                  Principal Sponsors
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 xl:gap-3">
                {/* Ninong / Gents */}
                <div className="flex flex-col items-center text-center px-1">
                  <div className="flex items-center gap-1 mb-0.5 xl:mb-1">
                    <Shirt className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 xl:w-4 xl:h-4 text-[#B89B6D]" />
                    <span className="ipad-attire-label text-[clamp(9px,1.2dvh,10.5px)] sm:text-xs xl:text-[13px] font-semibold text-[#2A2725]">
                      Gents
                    </span>
                  </div>
                  <p className="ipad-attire-desc text-[clamp(8px,1.1dvh,9px)] sm:text-[10px] xl:text-xs text-[#736B63] leading-tight xl:leading-normal xl:mt-0.5">
                    White Barong & Black Pants
                  </p>
                  <div className="flex items-center gap-1.5 mt-1 sm:mt-1.5 xl:mt-2">
                    <span
                      title="White Barong"
                      className="ipad-attire-swatch w-[clamp(11px,1.6dvh,15px)] h-[clamp(11px,1.6dvh,15px)] sm:w-4.5 sm:h-4.5 xl:w-5 xl:h-5 rounded-full bg-white border border-[#DFD0B7] shadow-xs inline-block"
                    />
                    <span
                      title="Black Pants"
                      className="ipad-attire-swatch w-[clamp(11px,1.6dvh,15px)] h-[clamp(11px,1.6dvh,15px)] sm:w-4.5 sm:h-4.5 xl:w-5 xl:h-5 rounded-full bg-[#1A1817] border border-black shadow-xs inline-block"
                    />
                  </div>
                  <span className="ipad-attire-sub text-[clamp(7.5px,1dvh,8.5px)] sm:text-[9px] xl:text-[11px] text-[#8C7A5E] mt-0.5 xl:mt-1 font-medium">
                    White · Black
                  </span>
                </div>

                {/* Ninang / Ladies */}
                <div className="flex flex-col items-center text-center px-1 border-l border-[#EAE2D8]">
                  <div className="flex items-center gap-1 mb-0.5 xl:mb-1">
                    <svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 xl:w-4 xl:h-4 text-[#B89B6D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 3 L15 3 L17 8 L14 10 L16 21 L8 21 L10 10 L7 8 Z" />
                      <path d="M10 3 C10 5, 14 5, 14 3" />
                    </svg>
                    <span className="ipad-attire-label text-[clamp(9px,1.2dvh,10.5px)] sm:text-xs xl:text-[13px] font-semibold text-[#2A2725]">
                      Ladies
                    </span>
                  </div>
                  <p className="ipad-attire-desc text-[clamp(8px,1.1dvh,9px)] sm:text-[10px] xl:text-xs text-[#736B63] leading-tight xl:leading-normal xl:mt-0.5">
                    Long Gown
                  </p>
                  <div className="flex items-center gap-1.5 mt-1 sm:mt-1.5 xl:mt-2">
                    <span
                      title="Champagne"
                      className="ipad-attire-swatch w-[clamp(11px,1.6dvh,15px)] h-[clamp(11px,1.6dvh,15px)] sm:w-4.5 sm:h-4.5 xl:w-5 xl:h-5 rounded-full bg-[#EDE3D0] border border-[#DFD0B7] shadow-xs inline-block"
                    />
                    <span
                      title="Warm Taupe"
                      className="ipad-attire-swatch w-[clamp(11px,1.6dvh,15px)] h-[clamp(11px,1.6dvh,15px)] sm:w-4.5 sm:h-4.5 xl:w-5 xl:h-5 rounded-full bg-[#CBB79F] border border-[#BFA88F] shadow-xs inline-block"
                    />
                    <span
                      title="Soft Mocha"
                      className="ipad-attire-swatch w-[clamp(11px,1.6dvh,15px)] h-[clamp(11px,1.6dvh,15px)] sm:w-4.5 sm:h-4.5 xl:w-5 xl:h-5 rounded-full bg-[#9E8B79] border border-[#8C7A68] shadow-xs inline-block"
                    />
                  </div>
                  <span className="ipad-attire-sub text-[clamp(7.5px,1dvh,8.5px)] sm:text-[9px] xl:text-[11px] text-[#8C7A5E] mt-0.5 xl:mt-1 font-medium">
                    3 Neutral Tones
                  </span>
                </div>
              </div>
            </div>

            {/* Part 2: Guests */}
            <div className="ipad-attire-box p-[clamp(5px,0.9dvh,9px)] sm:p-3.5 xl:p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE2D8] flex flex-col justify-between">
              <div className="ipad-attire-header flex items-center justify-between pb-1 mb-1 xl:pb-1.5 xl:mb-1.5 border-b border-[#EAE2D8]/80">
                <span className="ipad-attire-title text-[clamp(9.5px,1.25dvh,11px)] sm:text-[11px] xl:text-[13px] uppercase tracking-wider font-bold text-[#8C7A5E]">
                  Guests
                </span>
                <span className="text-[clamp(8.5px,1.05dvh,9.5px)] sm:text-[9.5px] xl:text-xs text-[#A69781] italic">
                  Friends & Family
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 xl:gap-3">
                {/* Gentlemen */}
                <div className="flex flex-col items-center text-center px-1">
                  <div className="flex items-center gap-1 mb-0.5 xl:mb-1">
                    <Shirt className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 xl:w-4 xl:h-4 text-[#B89B6D]" />
                    <span className="ipad-attire-label text-[clamp(9px,1.2dvh,10.5px)] sm:text-xs xl:text-[13px] font-semibold text-[#2A2725]">
                      Gentlemen
                    </span>
                  </div>
                  <p className="ipad-attire-desc text-[clamp(8px,1.1dvh,9px)] sm:text-[10px] xl:text-xs text-[#736B63] leading-tight xl:leading-normal xl:mt-0.5">
                    Polo / Long Sleeves & Black Pants
                  </p>
                  <div className="flex items-center gap-1.5 mt-1 sm:mt-1.5 xl:mt-2">
                    <span
                      title="White Top"
                      className="ipad-attire-swatch w-[clamp(11px,1.6dvh,15px)] h-[clamp(11px,1.6dvh,15px)] sm:w-4.5 sm:h-4.5 xl:w-5 xl:h-5 rounded-full bg-white border border-[#DFD0B7] shadow-xs inline-block"
                    />
                    <span
                      title="Black Pants"
                      className="ipad-attire-swatch w-[clamp(11px,1.6dvh,15px)] h-[clamp(11px,1.6dvh,15px)] sm:w-4.5 sm:h-4.5 xl:w-5 xl:h-5 rounded-full bg-[#1A1817] border border-black shadow-xs inline-block"
                    />
                  </div>
                  <span className="ipad-attire-sub text-[clamp(7.5px,1dvh,8.5px)] sm:text-[9px] xl:text-[11px] text-[#8C7A5E] mt-0.5 xl:mt-1 font-medium">
                    White · Black
                  </span>
                </div>

                {/* Ladies */}
                <div className="flex flex-col items-center text-center px-1 border-l border-[#EAE2D8]">
                  <div className="flex items-center gap-1 mb-0.5 xl:mb-1">
                    <svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 xl:w-4 xl:h-4 text-[#B89B6D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 3 L15 3 L17 8 L14 10 L16 21 L8 21 L10 10 L7 8 Z" />
                      <path d="M10 3 C10 5, 14 5, 14 3" />
                    </svg>
                    <span className="ipad-attire-label text-[clamp(9px,1.2dvh,10.5px)] sm:text-xs xl:text-[13px] font-semibold text-[#2A2725]">
                      Ladies
                    </span>
                  </div>
                  <p className="ipad-attire-desc text-[clamp(8px,1.1dvh,9px)] sm:text-[10px] xl:text-xs text-[#736B63] leading-tight xl:leading-normal xl:mt-0.5">
                    Formal Dress
                  </p>
                  <div className="flex items-center gap-1.5 mt-1 sm:mt-1.5 xl:mt-2">
                    <span
                      title="Champagne"
                      className="ipad-attire-swatch w-[clamp(11px,1.6dvh,15px)] h-[clamp(11px,1.6dvh,15px)] sm:w-4.5 sm:h-4.5 xl:w-5 xl:h-5 rounded-full bg-[#EDE3D0] border border-[#DFD0B7] shadow-xs inline-block"
                    />
                    <span
                      title="Warm Taupe"
                      className="ipad-attire-swatch w-[clamp(11px,1.6dvh,15px)] h-[clamp(11px,1.6dvh,15px)] sm:w-4.5 sm:h-4.5 xl:w-5 xl:h-5 rounded-full bg-[#CBB79F] border border-[#BFA88F] shadow-xs inline-block"
                    />
                    <span
                      title="Soft Mocha"
                      className="ipad-attire-swatch w-[clamp(11px,1.6dvh,15px)] h-[clamp(11px,1.6dvh,15px)] sm:w-4.5 sm:h-4.5 xl:w-5 xl:h-5 rounded-full bg-[#9E8B79] border border-[#8C7A68] shadow-xs inline-block"
                    />
                  </div>
                  <span className="ipad-attire-sub text-[clamp(7.5px,1dvh,8.5px)] sm:text-[9px] xl:text-[11px] text-[#8C7A5E] mt-0.5 xl:mt-1 font-medium">
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

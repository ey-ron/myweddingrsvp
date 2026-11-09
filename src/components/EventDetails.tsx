import React from 'react';
import { Clock, MapPin, Shirt, ExternalLink } from 'lucide-react';
import { WEDDING_CONFIG } from '../config/wedding';

export const EventDetails: React.FC = () => {
  return (
    <section id="schedule" className="relative h-[100dvh] min-h-[100dvh] snap-start snap-always flex flex-col items-center justify-start pt-10 xs:pt-14 sm:pt-18 xl:pt-6 pb-4 xs:pb-5 sm:pb-8 xl:pb-4 px-3.5 xs:px-4 sm:px-6 lg:px-8 bg-subtle-linen w-full overflow-hidden">
      
      {/* Section Header - Perfectly aligned in position and scale with Hero */}
      <div className="text-center max-w-3xl mx-auto mb-2.5 xs:mb-3.5 sm:mb-6 xl:mb-3 flex-shrink-0">
        <span className="text-xs xs:text-sm uppercase tracking-[0.35em] font-semibold text-[#8C7A5E]">
          Celebration Schedule
        </span>
        <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-serif text-[#2A2725] mt-1.5 xs:mt-2 xl:mt-1 leading-tight tracking-tight">
          The Wedding Day
        </h2>
        <p className="font-serif italic text-xs xs:text-sm sm:text-base text-[#736B63] mt-0.5 sm:mt-1">
          {WEDDING_CONFIG.date.display}
        </p>
      </div>

      {/* Main Content Area - Centered in remaining vertical space */}
      <div className="max-w-5xl w-full mx-auto flex-1 flex flex-col justify-center">
        
        {/* 3 Schedule Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 xs:gap-3 sm:gap-5 md:gap-6 mb-2.5 xs:mb-3 sm:mb-5 xl:mb-3">
          {WEDDING_CONFIG.schedule.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-5 md:p-6 xl:p-4.5 border border-[#EAE2D8] shadow-card hover:shadow-luxury transition-all relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#F7F3EB] text-[#7E633C] text-xs xs:text-sm sm:text-sm md:text-base font-semibold tracking-wider">
                    <Clock className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-[#B89B6D]" />
                    {item.time}
                  </span>
                  <span className="text-xs xs:text-sm sm:text-base font-serif text-[#DFD0B7]">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="font-serif text-base xs:text-lg sm:text-xl md:text-2xl font-medium text-[#2A2725] mt-1 sm:mt-1.5 mb-0.5 sm:mb-1">
                  {item.title}
                </h3>
                <p className="text-xs xs:text-sm sm:text-sm md:text-base text-[#736B63] leading-snug sm:leading-relaxed">
                  {item.description}
                </p>
              </div>
              <a
                href={item.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pt-2 mt-2 sm:pt-3 sm:mt-3 border-t border-[#F3EDE2] flex items-center justify-between gap-1 text-xs xs:text-sm sm:text-base text-[#B89B6D] hover:text-[#9E8052] font-medium transition-colors group/loc"
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <MapPin className="w-3.5 h-3.5 xs:w-4 xs:h-4 flex-shrink-0" />
                  <span className="underline-offset-2 group-hover/loc:underline">{item.location}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 xs:w-4 xs:h-4 opacity-60 group-hover/loc:opacity-100" />
              </a>
            </div>
          ))}
        </div>

        {/* Attire Banner (Side-by-side full card layout) */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-5 md:p-6 border border-[#EAE2D8] shadow-card max-w-5xl mx-auto w-full">
          <div className="flex items-center justify-center gap-2 mb-2 xs:mb-2.5 sm:mb-3.5">
            <span className="text-xs xs:text-sm sm:text-base uppercase tracking-[0.28em] font-semibold text-[#8C7A5E]">
              Wedding Attire Guidance
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 xs:gap-3.5 sm:gap-5">
            {/* Gentlemen */}
            <div className="p-2.5 xs:p-3 sm:p-4.5 rounded-xl bg-[#FAF8F5] border border-[#EAE2D8] flex flex-col items-center text-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-[#DFD0B7] flex items-center justify-center mb-1 sm:mb-2 shadow-sm">
                <Shirt className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#B89B6D]" />
              </div>
              <span className="text-xs xs:text-sm sm:text-base uppercase tracking-wider font-semibold text-[#2A2725] mb-1 sm:mb-1.5">
                Gentlemen
              </span>

              {/* Color Swatches */}
              <div className="flex items-center justify-center gap-2.5 xs:gap-3.5 sm:gap-6 mt-1 mb-2 sm:mb-2.5">
                {/* Top: White or Beige */}
                <div className="flex flex-col items-center gap-1 sm:gap-1.5">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span
                      title="White"
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white border border-[#DFD0B7] shadow-sm flex-shrink-0 inline-block"
                    />
                    <span
                      title="Beige"
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#EADCC2] border border-[#DFD0B7] shadow-sm flex-shrink-0 inline-block"
                    />
                  </div>
                  <div className="text-[10px] xs:text-xs sm:text-sm uppercase tracking-wider text-[#736B63] font-medium text-center leading-tight">
                    <div>White / Beige</div>
                    <div>Top</div>
                  </div>
                </div>

                <div className="h-8 sm:h-10 w-px bg-[#EAE2D8] self-center" />

                {/* Pants: Black */}
                <div className="flex flex-col items-center gap-1 sm:gap-1.5">
                  <span
                    title="Black"
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#1A1817] border border-black shadow-sm flex-shrink-0 inline-block"
                  />
                  <div className="text-[10px] xs:text-xs sm:text-sm uppercase tracking-wider text-[#736B63] font-medium text-center leading-tight">
                    <div>Black</div>
                    <div>Pants</div>
                  </div>
                </div>
              </div>
              <p className="text-xs xs:text-sm sm:text-base text-[#736B63] leading-snug sm:leading-relaxed text-center">
                White or beige polo / shirt with black pants
              </p>
            </div>

            {/* Ladies */}
            <div className="p-2.5 xs:p-3 sm:p-4.5 rounded-xl bg-[#FAF8F5] border border-[#EAE2D8] flex flex-col items-center text-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-[#DFD0B7] flex items-center justify-center mb-1 sm:mb-2 shadow-sm">
                <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#B89B6D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 3 L15 3 L17 8 L14 10 L16 21 L8 21 L10 10 L7 8 Z" />
                  <path d="M10 3 C10 5, 14 5, 14 3" />
                </svg>
              </div>
              <span className="text-xs xs:text-sm sm:text-base uppercase tracking-wider font-semibold text-[#2A2725] mb-1 sm:mb-1.5">
                Ladies
              </span>

              {/* Color Swatch */}
              <div className="flex flex-col items-center gap-0.5 sm:gap-1 mt-1 mb-2 sm:mb-2.5">
                <span
                  title="Light Green"
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#B2D3B4] border border-[#8FB891] shadow-sm flex-shrink-0 inline-block"
                />
                <span className="text-[10px] xs:text-xs sm:text-sm uppercase tracking-wider text-[#736B63] font-medium whitespace-nowrap">
                  Light Green
                </span>
              </div>
              <p className="text-xs xs:text-sm sm:text-base text-[#736B63] leading-snug sm:leading-relaxed text-center">
                Light green dress or formal gown
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

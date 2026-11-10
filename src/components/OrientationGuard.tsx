'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

export const OrientationGuard: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isLandscapeBlocked, setIsLandscapeBlocked] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkOrientation = () => {
      if (typeof window === 'undefined') return;

      const isLandscape = window.innerWidth > window.innerHeight;
      
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const ua = navigator.userAgent || '';
      const isMobileUA = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua);
      const isIPad = (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) || /iPad/i.test(ua);
      const isDesktopPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

      // 1. Mobile phone in landscape (height <= 520px)
      const isMobileLandscape = isLandscape && window.innerHeight <= 520;

      // 2. Tablet in landscape (width <= 1366px, height <= 1024px, and has touch / tablet UA)
      const isTabletLandscape = isLandscape && 
        (isIPad || isMobileUA || (hasTouch && !isDesktopPointer)) && 
        window.innerWidth <= 1366 && 
        window.innerHeight <= 1024;

      setIsLandscapeBlocked(isMobileLandscape || isTabletLandscape);
    };

    checkOrientation();

    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    if (typeof screen !== 'undefined' && screen.orientation) {
      screen.orientation.addEventListener('change', checkOrientation);
    }

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
      if (typeof screen !== 'undefined' && screen.orientation) {
        screen.orientation.removeEventListener('change', checkOrientation);
      }
    };
  }, []);

  // Prevent background scrolling while landscape prompt is active
  useEffect(() => {
    if (isLandscapeBlocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLandscapeBlocked]);

  // If component is mounted and we know for certain it's NOT a blocked landscape, don't render
  if (mounted && !isLandscapeBlocked) {
    return null;
  }

  return (
    <aside
      role="alert"
      aria-live="polite"
      className="orientation-guard-container fixed inset-0 z-[99999] bg-[#FAF8F5]/96 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 select-none touch-none overflow-hidden"
    >
      {/* Decorative Ambient Background Rings */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40">
        <div className="w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] rounded-full border border-[#DFD0B7]/60" />
        <div className="absolute w-[440px] h-[440px] sm:w-[620px] sm:h-[620px] rounded-full border border-[#DFD0B7]/30" />
      </div>

      {/* Main Luxury Announcement Card */}
      <div className="orientation-card-layout relative z-10 w-full max-w-xl bg-white/92 border border-[#EAE2D8] rounded-2xl shadow-luxury p-4.5 sm:p-7 backdrop-blur-md flex flex-col items-center justify-center gap-4 sm:gap-6 text-center">
        
        {/* Animated Rotating Device Icon */}
        <div className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
          <svg
            viewBox="0 0 120 120"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="orientGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDF6EA" />
                <stop offset="35%" stopColor="#B89B6D" />
                <stop offset="70%" stopColor="#8A7045" />
                <stop offset="100%" stopColor="#EEDCBF" />
              </linearGradient>
              <linearGradient id="orientScreen" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FAF8F5" />
                <stop offset="100%" stopColor="#F4EFE6" />
              </linearGradient>
              <filter id="orientShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#8A7045" floodOpacity="0.22" />
              </filter>
            </defs>

            {/* Master Centered Coordinate System at (60, 60) */}
            <g transform="translate(60, 60)">
              {/* Glowing Backdrop */}
              <circle cx="0" cy="0" r="40" fill="#B89B6D" opacity="0.15" className="animate-orient-glow" style={{ transformOrigin: '0px 0px' }} />

              {/* Concentric Circular Guidance Track */}
              <circle cx="0" cy="0" r="46" stroke="#DFD0B7" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.75" />

              {/* Rotation Arrows on the Guidance Track */}
              <g className="animate-arrow-pulse" style={{ transformOrigin: '0px 0px' }}>
                <path
                  d="M 46 0 A 46 46 0 0 0 0 -46"
                  stroke="url(#orientGold)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <polygon points="0,-51 -10,-46 0,-41" fill="#B89B6D" />

                <path
                  d="M -46 0 A 46 46 0 0 0 0 46"
                  stroke="url(#orientGold)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <polygon points="0,51 10,46 0,41" fill="#B89B6D" />
              </g>

              {/* Rotating Smartphone Device */}
              <g className="animate-device-rotate" style={{ transformOrigin: '0px 0px' }} filter="url(#orientShadow)">
                {/* Device Chassis */}
                <rect
                  x="-19"
                  y="-30"
                  width="38"
                  height="60"
                  rx="8"
                  fill="url(#orientScreen)"
                  stroke="url(#orientGold)"
                  strokeWidth="2.2"
                />

                {/* Inner Screen */}
                <rect
                  x="-16"
                  y="-26.5"
                  width="32"
                  height="53"
                  rx="5.5"
                  fill="#FFFFFF"
                  stroke="#EAE2D8"
                  strokeWidth="0.8"
                />

                {/* Dynamic Island / Notch */}
                <rect x="-6" y="-24.5" width="12" height="2.2" rx="1.1" fill="#8A7045" opacity="0.7" />

                {/* Intertwined Gold Rings on Screen */}
                <circle cx="-4" cy="0" r="5.5" fill="none" stroke="url(#orientGold)" strokeWidth="1.2" />
                <circle cx="4" cy="0" r="5.5" fill="none" stroke="url(#orientGold)" strokeWidth="1.2" />
                <circle cx="4" cy="-5.5" r="1.1" fill="#FFFFFF" stroke="#B89B6D" strokeWidth="0.5" />

                {/* Monogram inside Rings */}
                <text
                  x="-4"
                  y="2"
                  fontFamily="'Playfair Display', Georgia, serif"
                  fontSize="4.8"
                  fontWeight="bold"
                  fill="#2A2725"
                  textAnchor="middle"
                >
                  A
                </text>
                <text
                  x="4"
                  y="2"
                  fontFamily="'Playfair Display', Georgia, serif"
                  fontSize="4.8"
                  fontWeight="bold"
                  fill="#2A2725"
                  textAnchor="middle"
                >
                  E
                </text>

                {/* Home Indicator Bar */}
                <rect x="-6.5" y="22.5" width="13" height="1.4" rx="0.7" fill="#DFD0B7" />
              </g>
            </g>
          </svg>
        </div>

        {/* Informative & Elegant Typography */}
        <div className="orientation-text-align flex-1 min-w-0 flex flex-col justify-center items-center">
          {/* Cursive Tag */}
          <div className="flex items-center gap-1.5 justify-center mb-0.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B89B6D]" />
            <span className="font-script text-[clamp(20px,3vh,26px)] text-[#B89B6D] leading-none">
              Kindly Rotate
            </span>
          </div>

          {/* Main Title */}
          <h2 className="font-serif text-[clamp(17px,2.5vh,22px)] text-[#2A2725] font-semibold leading-tight mb-1 sm:mb-1.5">
            Please View in Portrait Mode
          </h2>

          {/* Description */}
          <p className="font-sans text-[clamp(11.5px,1.6vh,13px)] text-[#736B63] leading-relaxed max-w-sm mb-2.5">
            Our wedding celebration is designed to be experienced vertically. Please rotate your phone or tablet upright to continue.
          </p>

          {/* Date & Monogram Footer */}
          <div className="flex items-center gap-2 justify-center text-[#8C7A5E] pt-2 border-t border-[#F3EDE2] w-full">
            <span className="h-[1px] w-6 bg-[#DFD0B7]" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-medium font-sans">
              Aaron &amp; Eileen &bull; 04.11.2027
            </span>
            <span className="h-[1px] w-6 bg-[#DFD0B7]" />
          </div>
        </div>
      </div>
    </aside>
  );
};


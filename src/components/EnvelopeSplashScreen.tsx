'use client';

import React, { useState } from 'react';
import { WEDDING_CONFIG } from '../config/wedding';

interface EnvelopeSplashScreenProps {
  onComplete: () => void;
}

export const EnvelopeSplashScreen: React.FC<EnvelopeSplashScreenProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'closed' | 'opening' | 'open' | 'fadeout'>('closed');

  const handleOpen = () => {
    if (stage !== 'closed') return;

    // 1. Soft dissolve of seal & top flap
    setStage('opening');

    // 2. Card begins slow, graceful glide up out of the envelope
    setTimeout(() => {
      setStage('open');
    }, 200);

    // 3. As the card settles, promptly transition into Page 1
    setTimeout(() => {
      setStage('fadeout');
      setTimeout(onComplete, 600);
    }, 2400);
  };

  const isRevealed = stage === 'open' || stage === 'fadeout';

  return (
    <div
      onClick={handleOpen}
      onTouchEnd={(e) => {
        // Prevent default tap delay on mobile devices
        e.preventDefault();
        handleOpen();
      }}
      role="button"
      tabIndex={0}
      aria-label="Open Wedding Invitation"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-between py-4 xs:py-6 sm:py-12 bg-[#FAF8F5] transition-opacity duration-600 ease-in-out cursor-pointer select-none px-4 ${
        stage === 'fadeout' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        backgroundImage: 'radial-gradient(#B89B6D 0.5px, transparent 0.5px), radial-gradient(#B89B6D 0.5px, #FAF8F5 0.5px)',
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 10px 10px',
      }}
    >
      {/* Soft Ambient Golden Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[520px] h-[340px] sm:h-[520px] bg-[#EDE4D4]/50 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Header */}
      <div className="text-center transition-all duration-700 flex-shrink-0 z-10 mt-1 xs:mt-2">
        <span className="text-[10px] xs:text-xs uppercase tracking-[0.35em] text-[#8C7A5E] font-semibold block mb-0.5">
          A Special Invitation
        </span>
        <h2 className="font-serif italic text-xl xs:text-2xl sm:text-4xl text-[#2A2725]">
          For Our Wedding Celebration
        </h2>
      </div>

      {/* Envelope & Card Presentation Container - Centered vertically on the screen */}
      <div className="relative w-[275px] xs:w-[315px] sm:w-[420px] h-[175px] xs:h-[195px] sm:h-[265px] my-auto">
        {/* 1. ENVELOPE BACK (z-0) - 100% solid, fully opaque */}
        <div className="absolute inset-0 bg-[#F4EFE6] rounded-2xl border border-[#DFD0B7] shadow-xl z-0" />

        {/* 2. INVITATION CARD (z-10) - Sits INSIDE the envelope pocket. Emerges smoothly out of the top! */}
        <div
          className="absolute inset-x-2.5 xs:inset-x-3.5 top-2 h-[155px] xs:h-[175px] sm:h-[235px] bg-white rounded-xl border border-[#DFD0B7] p-2 xs:p-2.5 sm:p-3 flex flex-col items-center justify-center text-center z-10 transition-all duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            transform: isRevealed
              ? 'translateY(-85px) scale(1.02)'
              : 'translateY(0px) scale(1)',
            boxShadow: isRevealed
              ? '0 25px 50px -12px rgba(184, 155, 109, 0.35), 0 0 1px 1px rgba(184, 155, 109, 0.2)'
              : 'none',
          }}
        >
          <div className="w-full h-full border border-[#DFD0B7] rounded-lg p-1.5 xs:p-2 flex flex-col items-center justify-center bg-[#FAF8F5]">
            <span className="text-[8.5px] xs:text-[9.5px] uppercase tracking-[0.3em] font-semibold text-[#8C7A5E]">
              Save The Date
            </span>
            <div className="font-script text-xl xs:text-2xl sm:text-4xl text-[#B89B6D] my-0.5 leading-tight">
              {WEDDING_CONFIG.couple.partner1} & {WEDDING_CONFIG.couple.partner2}
            </div>
            <div className="h-px w-12 bg-[#DFD0B7] my-0.5 xs:my-1" />
            <div className="font-serif text-[10px] xs:text-xs sm:text-sm font-semibold text-[#2A2725]">
              {WEDDING_CONFIG.date.display}
            </div>
            <div className="text-[8.5px] xs:text-[9.5px] sm:text-xs text-[#736B63] mt-0.5">
              {WEDDING_CONFIG.venue.name}
            </div>
          </div>
        </div>

        {/* 3. ENVELOPE FRONT POCKET (z-20) - 100% Solid Opaque Paper. Covers the card while inside! */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-2xl">
          {/* Bottom Fold - Solid paper */}
          <div
            className="absolute inset-x-0 bottom-0 h-full bg-[#EFE7DA] border-t border-[#DFD0B7]"
            style={{
              clipPath: 'polygon(0% 100%, 50% 50%, 100% 100%)',
            }}
          />
          {/* Left Fold - Solid paper */}
          <div
            className="absolute inset-y-0 left-0 w-full bg-[#F7F1E7]"
            style={{
              clipPath: 'polygon(0% 0%, 52% 50%, 0% 100%)',
            }}
          />
          {/* Right Fold - Solid paper */}
          <div
            className="absolute inset-y-0 right-0 w-full bg-[#F5EFE3]"
            style={{
              clipPath: 'polygon(100% 0%, 48% 50%, 100% 100%)',
            }}
          />
          {/* Front Center Trim - Solid paper */}
          <div
            className="absolute inset-x-0 bottom-0 h-full bg-[#EDE3D3]"
            style={{
              clipPath: 'polygon(0% 100%, 50% 55%, 100% 100%)',
            }}
          />
        </div>

        {/* 4. ENVELOPE TOP FLAP (z-30) - Dissolves softly on tap */}
        <div
          className={`absolute inset-x-0 top-0 h-[48%] z-30 transition-all duration-600 ease-out ${
            stage === 'closed'
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          <div
            className="absolute inset-0 bg-[#FAF4EA] border-b border-[#DFD0B7] filter drop-shadow-sm"
            style={{
              clipPath: 'polygon(0% 0%, 50% 100%, 100% 0%)',
            }}
          />
        </div>

        {/* 5. WAX SEAL (z-40) - Dissolves with a soft golden glow on tap */}
        <div
          className={`absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 transition-all duration-600 ease-out ${
            stage === 'closed'
              ? 'scale-100 opacity-100 hover:scale-105 active:scale-95'
              : 'scale-115 opacity-0 pointer-events-none'
          }`}
        >
          {/* Wax Seal Outer Oval */}
          <div className="relative w-[86px] h-[58px] xs:w-[96px] xs:h-[64px] rounded-full bg-gradient-to-br from-[#CEB894] via-[#B89B6D] to-[#7E633C] p-1 shadow-2xl flex items-center justify-center border border-[#EFE4D2]/40 animate-pulse">
            {/* Wax Seal Inner Ring */}
            <div className="w-full h-full rounded-full border border-[#FAF8F5]/60 flex items-center justify-center bg-gradient-to-tr from-[#9E8052] to-[#B89B6D] shadow-inner px-3">
              {/* Monogram A & E */}
              <div className="font-script text-white text-lg xs:text-xl font-normal drop-shadow-sm select-none flex items-center justify-center">
                <span>A</span>
                <span className="text-sm xs:text-base mx-1 opacity-90 font-serif italic">&</span>
                <span>E</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tap Prompt */}
      <div className="text-center flex-shrink-0">
        <span className={`inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-[#EAE2D8] text-xs uppercase tracking-[0.25em] text-[#8C7A5E] font-semibold shadow-sm transition-opacity duration-300 ${
          stage === 'closed' ? 'opacity-100 animate-bounce' : 'opacity-0'
        }`}>
          Tap to open invitation
        </span>
      </div>
    </div>
  );
};

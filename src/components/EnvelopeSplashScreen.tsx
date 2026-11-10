'use client';

import React, { useState } from 'react';
import { WEDDING_CONFIG } from '../config/wedding';

interface EnvelopeSplashScreenProps {
  onComplete: () => void;
}

export const EnvelopeSplashScreen: React.FC<EnvelopeSplashScreenProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'closed' | 'opening' | 'emerging' | 'unveiling' | 'fadeout'>('closed');

  const handleOpen = () => {
    if (stage !== 'closed') return;

    // 1. Wax seal dissolves, top flap opens smoothly
    setStage('opening');

    // 2. Card begins its smooth, graceful glide out of the envelope
    setTimeout(() => {
      setStage('emerging');
    }, 120);

    // 3. Without delay, card gracefully glides forward toward full view with gold sheen
    setTimeout(() => {
      setStage('unveiling');
    }, 1150);

    // 4. Silky cross-dissolve directly into Page 1 (Hero)
    setTimeout(() => {
      setStage('fadeout');
      setTimeout(onComplete, 550);
    }, 1750);
  };

  const isEmerging = stage === 'emerging' || stage === 'unveiling' || stage === 'fadeout';
  const isUnveiling = stage === 'unveiling' || stage === 'fadeout';

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
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-between py-4 sm:py-12 bg-[#FAF8F5] transition-opacity duration-600 ease-in-out cursor-pointer select-none px-4 overflow-hidden ${
        stage === 'fadeout' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        backgroundImage: 'radial-gradient(#B89B6D 0.5px, transparent 0.5px), radial-gradient(#B89B6D 0.5px, #FAF8F5 0.5px)',
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 10px 10px',
      }}
    >
      {/* Soft Ambient Golden Glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[540px] h-[340px] sm:h-[540px] rounded-full blur-3xl pointer-events-none -z-10 transition-all duration-1000 ${
          isUnveiling ? 'bg-[#EDE4D4]/80 scale-125' : 'bg-[#EDE4D4]/40 scale-100'
        }`}
      />

      {/* Top Header - Moved down gracefully with safe-area spacing */}
      <div className={`text-center transition-all duration-700 flex-shrink-0 z-10 mt-[clamp(20px,5dvh,42px)] sm:mt-10 pt-[max(env(safe-area-inset-top,0px),0px)] ${isUnveiling ? 'opacity-0 transform -translate-y-2' : 'opacity-100'}`}>
        <span className="text-[9.5px] sm:text-xs uppercase tracking-[0.28em] text-[#8C7A5E] font-semibold block mb-1 animate-header-pill">
          A Special Invitation
        </span>
        <h2 className="font-script text-[clamp(34px,5.2dvh,48px)] sm:text-5xl lg:text-6xl text-[#2A2725] mt-0.5 leading-[1.14] tracking-wide text-center">
          <span className="animate-cursive-write-row1">
            For Our Wedding
          </span>
          <span className="animate-cursive-write-row2">
            Celebration
          </span>
        </h2>
      </div>

      {/* Envelope & Card Presentation Container - Centered vertically on the screen */}
      <div className="relative w-[clamp(290px,85vw,360px)] sm:w-[420px] h-[clamp(185px,24dvh,225px)] sm:h-[265px] my-auto">
        {/* 1. ENVELOPE BACK (z-0) - Fades & blurs softly as the card zooms forward */}
        <div
          className={`absolute inset-0 bg-[#F4EFE6] rounded-2xl border border-[#DFD0B7] shadow-xl z-0 transition-all duration-800 ease-out ${
            isUnveiling ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'
          }`}
        />

        {/* 2. INVITATION CARD (z-10) - Sits INSIDE pocket, then smoothly rises and pushes forward into full view */}
        <div
          className="absolute inset-x-3 top-2 h-[clamp(165px,22dvh,205px)] sm:h-[240px] bg-white rounded-xl border border-[#DFD0B7] p-2 sm:p-3 flex flex-col items-center justify-center text-center z-10 overflow-hidden"
          style={{
            transition: isUnveiling
              ? 'transform 750ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 750ms ease-out, opacity 500ms ease-out'
              : isEmerging
              ? 'transform 1050ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 1050ms ease-out'
              : 'transform 400ms ease-out',
            transform: isUnveiling
              ? 'translateY(-75px) scale(1.15)'
              : isEmerging
              ? 'translateY(-92px) scale(1.02)'
              : 'translateY(0px) scale(1)',
            boxShadow: isUnveiling
              ? '0 30px 60px -10px rgba(184, 155, 109, 0.4), 0 0 40px rgba(223, 184, 115, 0.3)'
              : isEmerging
              ? '0 20px 40px -10px rgba(184, 155, 109, 0.3), 0 0 1px 1px rgba(184, 155, 109, 0.2)'
              : 'none',
          }}
        >
          {/* Subtle Golden Foil Light Sheen across the card on unveil */}
          {isUnveiling && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none animate-card-sheen" />
          )}

          <div className="w-full h-full border border-[#DFD0B7] rounded-lg p-2 flex flex-col items-center justify-center bg-[#FAF8F5] relative">
            <span className="text-[8.5px] sm:text-[10px] uppercase tracking-[0.28em] font-semibold text-[#8C7A5E]">
              Save The Date
            </span>
            <div className="font-script text-xl sm:text-3xl text-[#B89B6D] my-0.5 leading-tight">
              {WEDDING_CONFIG.couple.partner1} & {WEDDING_CONFIG.couple.partner2}
            </div>
            <div className="h-px w-12 bg-[#DFD0B7] my-0.5 sm:my-1" />
            <div className="font-serif text-[10.5px] sm:text-sm font-semibold text-[#2A2725]">
              {WEDDING_CONFIG.date.display}
            </div>
            <div className="text-[8.5px] sm:text-xs text-[#736B63] mt-0.5">
              {WEDDING_CONFIG.venue.name}
            </div>
          </div>
        </div>

        {/* 3. ENVELOPE FRONT POCKET (z-20) - Solid paper. Blurs & dissolves softly on unveil */}
        <div
          className={`absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-2xl transition-all duration-800 ease-out ${
            isUnveiling ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'
          }`}
        >
          {/* Bottom Fold */}
          <div
            className="absolute inset-x-0 bottom-0 h-full bg-[#EFE7DA] border-t border-[#DFD0B7]"
            style={{ clipPath: 'polygon(0% 100%, 50% 50%, 100% 100%)' }}
          />
          {/* Left Fold */}
          <div
            className="absolute inset-y-0 left-0 w-full bg-[#F7F1E7]"
            style={{ clipPath: 'polygon(0% 0%, 52% 50%, 0% 100%)' }}
          />
          {/* Right Fold */}
          <div
            className="absolute inset-y-0 right-0 w-full bg-[#F5EFE3]"
            style={{ clipPath: 'polygon(100% 0%, 48% 50%, 100% 100%)' }}
          />
          {/* Front Center Trim */}
          <div
            className="absolute inset-x-0 bottom-0 h-full bg-[#EDE3D3]"
            style={{ clipPath: 'polygon(0% 100%, 50% 55%, 100% 100%)' }}
          />
        </div>

        {/* 4. ENVELOPE TOP FLAP (z-30) - Dissolves softly on tap */}
        <div
          className={`absolute inset-x-0 top-0 h-[48%] z-30 transition-all duration-500 ease-out ${
            stage === 'closed'
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          <div
            className="absolute inset-0 bg-[#FAF4EA] border-b border-[#DFD0B7] filter drop-shadow-sm"
            style={{ clipPath: 'polygon(0% 0%, 50% 100%, 100% 0%)' }}
          />
        </div>

        {/* 5. WAX SEAL (z-40) - Dissolves with a gentle shrink on tap */}
        <div
          className={`absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 transition-all duration-400 ease-out ${
            stage === 'closed'
              ? 'scale-100 opacity-100 hover:scale-105 active:scale-95'
              : 'scale-90 opacity-0 pointer-events-none'
          }`}
        >
          {/* Wax Seal Outer Oval */}
          <div className="relative w-[92px] h-[62px] sm:w-[100px] sm:h-[68px] rounded-full bg-gradient-to-br from-[#CEB894] via-[#B89B6D] to-[#7E633C] p-1 shadow-2xl flex items-center justify-center border border-[#EFE4D2]/40 animate-pulse">
            {/* Wax Seal Inner Ring */}
            <div className="w-full h-full rounded-full border border-[#FAF8F5]/60 flex items-center justify-center bg-gradient-to-tr from-[#9E8052] to-[#B89B6D] shadow-inner px-3">
              {/* Monogram A & E */}
              <div className="font-script text-white text-xl sm:text-2xl font-normal drop-shadow-sm select-none flex items-center justify-center">
                <span>A</span>
                <span className="text-base sm:text-lg mx-1 opacity-90 font-serif italic">&</span>
                <span>E</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tap Prompt */}
      <div className={`text-center flex-shrink-0 transition-opacity duration-300 ${isEmerging ? 'opacity-0' : 'opacity-100'}`}>
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#EAE2D8] text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#8C7A5E] font-semibold shadow-sm animate-bounce">
          Tap to open invitation
        </span>
      </div>
    </div>
  );
};

'use client';

import React, { useState, useEffect } from 'react';

export const ViewportIndicator: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [info, setInfo] = useState({
    width: 0,
    height: 0,
    screenWidth: 0,
    screenHeight: 0,
    dpr: 1,
  });

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => {
      setInfo({
        width: window.innerWidth,
        height: window.innerHeight,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        dpr: Number(window.devicePixelRatio.toFixed(2)),
      });
    };

    update();
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', () => setTimeout(update, 150));
    return () => window.removeEventListener('resize', update);
  }, []);

  // Strict guard: NEVER render in production
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  if (!mounted) return null;

  const getWidthBreakpoint = (w: number) => {
    if (w < 380) return '<xs';
    if (w < 640) return 'xs';
    if (w < 768) return 'sm';
    if (w < 1024) return 'md';
    if (w < 1280) return 'lg';
    return 'xl';
  };

  const getHeightTier = (h: number) => {
    if (h >= 880) return 'xtall (≥880)';
    if (h >= 800) return 'tall (≥800)';
    return 'compact (<800)';
  };

  const videoCalcHeight = Math.round(
    info.width >= 640
      ? Math.min(320, Math.max(220, info.height * 0.28))
      : info.height >= 880
      ? Math.min(280, Math.max(210, info.height * 0.27))
      : info.height >= 800
      ? Math.min(235, Math.max(175, info.height * 0.245))
      : info.width >= 380
      ? Math.min(225, Math.max(165, info.height * 0.24))
      : Math.min(185, Math.max(145, info.height * 0.225))
  );

  return (
    <div className="fixed top-2.5 left-2.5 z-[9999] select-none font-mono">
      {!expanded ? (
        /* Discreet circle black dot with glowing yellow circle inside */
        <button
          onClick={() => setExpanded(true)}
          aria-label="Open Viewport Debug Info"
          title="Tap to view viewport debug info"
          className="w-6 h-6 rounded-full bg-black hover:bg-neutral-900 border-2 border-white shadow-2xl flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-90 group focus:outline-none"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 group-hover:bg-amber-300 animate-pulse" />
        </button>
      ) : (
        /* Expanded High-Contrast Debug Panel */
        <div className="relative animate-in fade-in zoom-in-95 duration-150">
          {/* Header pill button to collapse */}
          <button
            onClick={() => setExpanded(false)}
            aria-label="Close Viewport Debug Info"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black text-white shadow-2xl border-2 border-amber-400 cursor-pointer hover:bg-neutral-900 transition-all focus:outline-none mb-1.5"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="font-extrabold text-amber-300 text-xs tracking-wider uppercase">VIEWPORT DEBUG</span>
            <span className="text-white font-bold text-xs ml-1 bg-neutral-800 px-1.5 py-0.2 rounded-full">✕</span>
          </button>

          {/* Detailed high-contrast metrics card */}
          <div
            onClick={() => setExpanded(false)}
            className="p-3.5 rounded-2xl bg-black text-white border-2 border-amber-400 shadow-2xl space-y-2 text-xs min-w-[240px] cursor-pointer"
          >
            <div className="flex justify-between items-center border-b border-neutral-700 pb-1.5">
              <span className="text-white font-bold uppercase tracking-wider text-[11px]">Dimensions:</span>
              <span className="text-emerald-400 font-extrabold text-sm">{info.width} × {info.height} px</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-white font-medium">Width Breakpoint:</span>
              <span className="text-emerald-300 font-bold">{getWidthBreakpoint(info.width)} ({info.width}px)</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-white font-medium">Height Tier:</span>
              <span className="text-cyan-300 font-bold">{getHeightTier(info.height)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-white font-medium">Screen Resolution:</span>
              <span className="text-yellow-300 font-bold">{info.screenWidth} × {info.screenHeight} px</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-white font-medium">Device Pixel Ratio:</span>
              <span className="text-amber-300 font-bold">{info.dpr}x</span>
            </div>

            <div className="flex justify-between items-center border-t border-neutral-800 pt-1.5">
              <span className="text-white font-medium">Hero Video Calc:</span>
              <span className="text-amber-400 font-extrabold text-sm">~{videoCalcHeight}px</span>
            </div>

            <div className="pt-1.5 text-[10px] text-amber-300/90 font-semibold text-center border-t border-neutral-800">
              Tap anywhere to close · Dev only
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

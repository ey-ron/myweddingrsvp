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

  const videoCalcHeight = Math.min(230, Math.max(135, Math.round(info.height * 0.215)));

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="fixed top-2.5 left-2.5 z-[9999] cursor-pointer select-none font-mono text-[11px] leading-tight transition-all"
    >
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900/95 text-white shadow-xl border border-white/20 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span className="font-bold text-[#E5C388] uppercase">DEV</span>
        <span className="text-neutral-500">·</span>
        <span className="font-semibold text-emerald-300">
          {getWidthBreakpoint(info.width)}
        </span>
        <span className="text-neutral-500">·</span>
        <span className="font-semibold text-cyan-300">
          {getHeightTier(info.height).split(' ')[0]}
        </span>
        <span className="text-neutral-500">·</span>
        <span className="text-neutral-200">{info.width}×{info.height}</span>
      </div>

      {expanded && (
        <div className="mt-1.5 p-2.5 rounded-xl bg-neutral-900/95 text-neutral-200 border border-white/20 shadow-2xl space-y-1 text-[10px] min-w-[220px]">
          <div className="flex justify-between border-b border-neutral-700 pb-1 font-bold text-[#E5C388]">
            <span>Viewport Debug</span>
            <span>Dev Only</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Width Breakpoint:</span>
            <span className="font-semibold text-emerald-300">{getWidthBreakpoint(info.width)} ({info.width}px)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Height Tier:</span>
            <span className="font-semibold text-cyan-300">{getHeightTier(info.height)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Viewport Dimensions:</span>
            <span className="font-semibold">{info.width} × {info.height} px</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Screen Dimensions:</span>
            <span>{info.screenWidth} × {info.screenHeight} px</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Pixel Ratio:</span>
            <span>{info.dpr}x</span>
          </div>
          <div className="flex justify-between border-t border-neutral-800 pt-1">
            <span className="text-neutral-400">Hero Video (21.5dvh):</span>
            <span className="font-semibold text-amber-300">~{videoCalcHeight}px</span>
          </div>
          <div className="pt-1 text-[9px] text-neutral-400 italic text-center border-t border-neutral-800">
            Tap to close · Automatically hidden in prod
          </div>
        </div>
      )}
    </div>
  );
};

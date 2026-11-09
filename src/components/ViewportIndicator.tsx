import React, { useState, useEffect } from 'react';

export const ViewportIndicator: React.FC = () => {
  const [info, setInfo] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    screenWidth: typeof window !== 'undefined' ? window.screen.width : 0,
    screenHeight: typeof window !== 'undefined' ? window.screen.height : 0,
    dpr: typeof window !== 'undefined' ? window.devicePixelRatio : 1,
  });

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
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

  const isDev = import.meta.env.DEV;

  const getBreakpoint = (w: number) => {
    if (w < 380) return '<xs (<380)';
    if (w < 640) return 'xs (380+)';
    if (w < 768) return 'sm (640+)';
    if (w < 1024) return 'md (768+)';
    if (w < 1280) return 'lg (1024+)';
    return 'xl (1280+)';
  };

  const appHeight = typeof document !== 'undefined'
    ? document.documentElement.style.getPropertyValue('--app-height') || 'unset'
    : 'unset';

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="fixed top-2.5 left-2.5 z-[9999] cursor-pointer select-none font-mono text-[11px] leading-tight transition-all"
    >
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900/95 text-white shadow-xl border border-white/20 backdrop-blur-md">
        <span className={`w-2 h-2 rounded-full ${isDev ? 'bg-amber-400' : 'bg-emerald-400'} animate-pulse`} />
        <span className="font-bold text-[#E5C388] uppercase">
          {isDev ? 'DEV' : 'PROD'}
        </span>
        <span className="text-neutral-500">·</span>
        <span className="font-semibold text-emerald-300">
          {getBreakpoint(info.width)}
        </span>
        <span className="text-neutral-500">·</span>
        <span className="text-neutral-200">{info.width}×{info.height}</span>
      </div>

      {expanded && (
        <div className="mt-1.5 p-2.5 rounded-xl bg-neutral-900/95 text-neutral-200 border border-white/20 shadow-2xl space-y-1 text-[10px] min-w-[210px]">
          <div className="flex justify-between border-b border-neutral-700 pb-1 font-bold text-[#E5C388]">
            <span>Viewport Debug</span>
            <span>{isDev ? 'Local Vite' : 'Vercel Prod'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Breakpoint:</span>
            <span className="font-semibold text-emerald-300">{getBreakpoint(info.width)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Viewport:</span>
            <span className="font-semibold">{info.width} × {info.height} px</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Screen:</span>
            <span>{info.screenWidth} × {info.screenHeight} px</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Pixel Ratio:</span>
            <span>{info.dpr}x</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">App Height Var:</span>
            <span className={appHeight === '0px' ? 'text-red-400 font-bold' : 'text-emerald-400'}>{appHeight}</span>
          </div>
          <div className="pt-1 text-[9px] text-neutral-400 italic text-center border-t border-neutral-800">
            Tap to close
          </div>
        </div>
      )}
    </div>
  );
};


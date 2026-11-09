'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Hero } from '../components/Hero';
import { EventDetails } from '../components/EventDetails';
import { WeddingParty } from '../components/WeddingParty';
import { RSVPForm } from '../components/RSVPForm';
import { EnvelopeSplashScreen } from '../components/EnvelopeSplashScreen';

const ViewportIndicator = dynamic(
  () => import('../components/ViewportIndicator').then((m) => m.ViewportIndicator),
  { ssr: false }
);

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const showSplashRef = useRef(true);
  showSplashRef.current = showSplash;

  const [currentPage, setCurrentPage] = useState(0); // 0: Hero, 1: Schedule, 2: Wedding Party, 3: RSVP
  const isTransitioning = useRef(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchStartTime = useRef<number>(0);
  const isMultiTouch = useRef<boolean>(false);

  useEffect(() => {
    let wheelTimeout: ReturnType<typeof setTimeout> | null = null;
    let transitionUnlockTimeout: ReturnType<typeof setTimeout> | null = null;

    const lockTransition = (durationMs = 800) => {
      isTransitioning.current = true;
      if (transitionUnlockTimeout) clearTimeout(transitionUnlockTimeout);
      transitionUnlockTimeout = setTimeout(() => {
        isTransitioning.current = false;
      }, durationMs);
    };

    const handleWheel = (e: WheelEvent) => {
      if (showSplashRef.current) return;
      if (isTransitioning.current) return;

      // Never change pages if user is pinch-zoomed in
      if (typeof window !== 'undefined' && window.visualViewport && window.visualViewport.scale > 1.05) {
        return;
      }

      // Filter out small trackpad twitches / momentum drift
      if (Math.abs(e.deltaY) < 65) return;

      lockTransition(800);
      if (e.deltaY > 0) {
        // Scroll down -> next page
        setCurrentPage((prev) => Math.min(3, prev + 1));
      } else {
        // Scroll up -> prev page
        setCurrentPage((prev) => Math.max(0, prev - 1));
      }

      if (wheelTimeout) clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        isTransitioning.current = false;
      }, 800);
    };

    const handleTouchStart = (e: TouchEvent) => {
      // If user uses more than 1 finger (e.g. pinch to zoom), abort swipe tracking immediately
      if (e.touches.length > 1) {
        isMultiTouch.current = true;
        touchStartX.current = null;
        touchStartY.current = null;
        return;
      }
      isMultiTouch.current = false;
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      touchStartTime.current = Date.now();
    };

    const handleTouchMove = (e: TouchEvent) => {
      // If a second finger touches the screen at any point during the gesture, mark as multi-touch (pinch)
      if (e.touches.length > 1) {
        isMultiTouch.current = true;
        touchStartX.current = null;
        touchStartY.current = null;
      }
    };

    const handleTouchCancel = () => {
      isMultiTouch.current = false;
      touchStartX.current = null;
      touchStartY.current = null;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (showSplashRef.current) return;
      if (isTransitioning.current) return;

      // 1. If multi-touch (pinch-to-zoom) occurred, ignore completely
      if (isMultiTouch.current) {
        isMultiTouch.current = false;
        touchStartX.current = null;
        touchStartY.current = null;
        return;
      }

      // 2. If user is currently zoomed into the page, allow free panning without changing pages
      if (typeof window !== 'undefined' && window.visualViewport && window.visualViewport.scale > 1.05) {
        touchStartX.current = null;
        touchStartY.current = null;
        return;
      }

      if (touchStartY.current === null || touchStartX.current === null) return;
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchStartX.current - touchEndX;
      const diffY = touchStartY.current - touchEndY;
      const duration = Date.now() - touchStartTime.current;

      touchStartX.current = null;
      touchStartY.current = null;

      // 3. Ignore touches on interactive form controls
      const target = e.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'A'].includes(target.tagName)) {
        return;
      }

      // 4. Must be a clear vertical swipe (vertical distance must be at least 1.5x horizontal distance)
      // This protects against horizontal swiping on carousels or diagonal gestures
      if (Math.abs(diffY) < Math.abs(diffX) * 1.5) return;

      // 5. Calm threshold: require intentional, deliberate swipe
      // Either a clear flick of at least 70px under 400ms, or a deliberate drag of at least 100px
      const isIntentionalSwipe = (Math.abs(diffY) >= 70 && duration < 400) || Math.abs(diffY) >= 100;

      if (isIntentionalSwipe) {
        lockTransition(800);
        if (diffY > 0) {
          // Swipe up -> next page
          setCurrentPage((prev) => Math.min(3, prev + 1));
        } else {
          // Swipe down -> prev page
          setCurrentPage((prev) => Math.max(0, prev - 1));
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (showSplashRef.current) return;

      // Do NOT intercept keys when user is typing in any input, textarea, or select
      const activeElement = document.activeElement;
      if (
        activeElement &&
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeElement.tagName)
      ) {
        return;
      }

      // Only navigate on deliberate navigation keys (arrow keys, page up/down)
      if (['ArrowDown', 'PageDown'].includes(e.key)) {
        e.preventDefault();
        setCurrentPage((prev) => Math.min(3, prev + 1));
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        setCurrentPage((prev) => Math.max(0, prev - 1));
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchCancel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchCancel);
      window.removeEventListener('keydown', handleKeyDown);
      if (wheelTimeout) clearTimeout(wheelTimeout);
      if (transitionUnlockTimeout) clearTimeout(transitionUnlockTimeout);
    };
  }, []);

  return (
    <div className="bg-[#FAF8F5] text-[#2A2725] w-full h-[100dvh] min-h-[100dvh] max-h-[100dvh] overflow-hidden relative font-sans select-none">
      {/* Dev-Only Viewport Indicator (Tree-shaken & hidden in production) */}
      {process.env.NODE_ENV === 'development' && <ViewportIndicator />}

      {/* Wedding Envelope Splash Screen */}
      {showSplash && (
        <EnvelopeSplashScreen onComplete={() => setShowSplash(false)} />
      )}

      {/* Discreet Page Indicator Dots */}
      <nav aria-label="Page navigation" className="fixed top-2.5 right-2.5 sm:top-3 sm:right-5 z-50 flex flex-col items-center gap-1 sm:gap-1.5 px-1 py-1.5 sm:px-1 sm:py-2 rounded-full bg-white/65 backdrop-blur-md border border-[#EAE2D8]/80 shadow-xs">
        {[
          { label: 'Save The Date', index: 0 },
          { label: 'Event Details', index: 1 },
          { label: 'Circle of Honor', index: 2 },
          { label: 'RSVP', index: 3 },
        ].map((item) => (
          <button
            key={item.index}
            onClick={() => setCurrentPage(item.index)}
            aria-label={`Go to ${item.label}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              currentPage === item.index
                ? 'w-1 h-3.5 sm:w-1.5 sm:h-4.5 bg-[#B89B6D] shadow-xs'
                : 'w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#DFD0B7] hover:bg-[#B89B6D]/60'
            }`}
          />
        ))}
      </nav>

      {/* Discrete Pages: Only the current page is visible */}
      <main className="w-full h-full relative">
        <div 
          style={{ display: currentPage === 0 ? 'flex' : 'none' }} 
          className="w-full h-full flex-col animate-in fade-in duration-300 ease-out"
        >
          <Hero onNavigate={setCurrentPage} isReady={!showSplash && currentPage === 0} />
        </div>

        <div 
          style={{ display: currentPage === 1 ? 'flex' : 'none' }} 
          className="w-full h-full flex-col animate-in fade-in duration-300 ease-out"
        >
          <EventDetails onNavigate={setCurrentPage} isActive={currentPage === 1} />
        </div>

        <div 
          style={{ display: currentPage === 2 ? 'flex' : 'none' }} 
          className="w-full h-full flex-col animate-in fade-in duration-300 ease-out"
        >
          <WeddingParty onNavigate={setCurrentPage} isActive={currentPage === 2} />
        </div>

        <div 
          style={{ display: currentPage === 3 ? 'flex' : 'none' }} 
          className="w-full h-full flex-col animate-in fade-in duration-300 ease-out"
        >
          <RSVPForm onNavigate={setCurrentPage} isActive={currentPage === 3} />
        </div>
      </main>
    </div>
  );
}


'use client';

import { useState, useEffect, useRef } from 'react';
import { Hero } from '../components/Hero';
import { EventDetails } from '../components/EventDetails';
import { WeddingParty } from '../components/WeddingParty';
import { RSVPForm } from '../components/RSVPForm';
import { EnvelopeSplashScreen } from '../components/EnvelopeSplashScreen';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const showSplashRef = useRef(true);
  showSplashRef.current = showSplash;

  const [currentPage, setCurrentPage] = useState(0); // 0: Hero, 1: Schedule, 2: Wedding Party, 3: RSVP
  const isTransitioning = useRef(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    let wheelTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleWheel = (e: WheelEvent) => {
      if (showSplashRef.current) return;
      if (Math.abs(e.deltaY) < 25) return;
      if (isTransitioning.current) return;

      isTransitioning.current = true;
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
      }, 500);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (showSplashRef.current) return;
      if (touchStartY.current === null || touchStartX.current === null || isTransitioning.current) return;
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchStartX.current - touchEndX;
      const diffY = touchStartY.current - touchEndY;
      touchStartX.current = null;
      touchStartY.current = null;

      // If user is swiping horizontally (e.g., on the Wedding Party carousel), do NOT trigger vertical page change
      if (Math.abs(diffX) > Math.abs(diffY)) return;

      if (Math.abs(diffY) > 40) {
        isTransitioning.current = true;
        if (diffY > 0) {
          // Swipe up -> next page
          setCurrentPage((prev) => Math.min(3, prev + 1));
        } else {
          // Swipe down -> prev page
          setCurrentPage((prev) => Math.max(0, prev - 1));
        }
        setTimeout(() => {
          isTransitioning.current = false;
        }, 500);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (showSplashRef.current) return;
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        setCurrentPage((prev) => Math.min(3, prev + 1));
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        setCurrentPage((prev) => Math.max(0, prev - 1));
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
      if (wheelTimeout) clearTimeout(wheelTimeout);
    };
  }, []);

  return (
    <div className="bg-[#FAF8F5] text-[#2A2725] w-full h-[100dvh] min-h-[100dvh] max-h-[100dvh] overflow-hidden relative font-sans select-none">
      {/* Wedding Envelope Splash Screen */}
      {showSplash && (
        <EnvelopeSplashScreen onComplete={() => setShowSplash(false)} />
      )}

      {/* Discreet Page Indicator Dots */}
      <nav aria-label="Page navigation" className="fixed top-2.5 right-3 sm:top-3 sm:right-6 z-50 flex flex-col items-center gap-1.5 sm:gap-2 px-1.5 py-2 rounded-full bg-white/70 backdrop-blur-md border border-[#EAE2D8] shadow-xs">
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
            className={`transition-all duration-300 rounded-full ${
              currentPage === item.index
                ? 'w-1.5 h-4 sm:w-2 sm:h-5 bg-[#B89B6D] shadow-xs'
                : 'w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#DFD0B7] hover:bg-[#B89B6D]/60'
            }`}
          />
        ))}
      </nav>

      {/* Discrete Pages: Only the current page is visible */}
      <main className="w-full h-full relative">
        <div 
          style={{ display: currentPage === 0 ? 'flex' : 'none' }} 
          className="w-full h-full flex-col animate-in fade-in duration-200"
        >
          <Hero onNavigate={setCurrentPage} isReady={!showSplash && currentPage === 0} />
        </div>

        <div 
          style={{ display: currentPage === 1 ? 'flex' : 'none' }} 
          className="w-full h-full flex-col animate-in fade-in duration-200"
        >
          <EventDetails onNavigate={setCurrentPage} isActive={currentPage === 1} />
        </div>

        <div 
          style={{ display: currentPage === 2 ? 'flex' : 'none' }} 
          className="w-full h-full flex-col animate-in fade-in duration-200"
        >
          <WeddingParty onNavigate={setCurrentPage} isActive={currentPage === 2} />
        </div>

        <div 
          style={{ display: currentPage === 3 ? 'flex' : 'none' }} 
          className="w-full h-full flex-col animate-in fade-in duration-200"
        >
          <RSVPForm onNavigate={setCurrentPage} isActive={currentPage === 3} />
        </div>
      </main>
    </div>
  );
}


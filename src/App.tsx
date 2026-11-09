import { useState, useEffect, useRef } from 'react';
import { Hero } from './components/Hero';
import { EventDetails } from './components/EventDetails';
import { RSVPForm } from './components/RSVPForm';

function App() {
  const [currentPage, setCurrentPage] = useState(0); // 0: Hero, 1: Schedule, 2: RSVP
  const isTransitioning = useRef(false);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    let wheelTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 25) return;
      if (isTransitioning.current) return;

      isTransitioning.current = true;
      if (e.deltaY > 0) {
        // Scroll down -> next page
        setCurrentPage((prev) => Math.min(2, prev + 1));
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
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null || isTransitioning.current) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY.current - touchEndY;
      touchStartY.current = null;

      if (Math.abs(diffY) > 40) {
        isTransitioning.current = true;
        if (diffY > 0) {
          // Swipe up -> next page
          setCurrentPage((prev) => Math.min(2, prev + 1));
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
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        setCurrentPage((prev) => Math.min(2, prev + 1));
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
    <div className="bg-[#FAF8F5] text-[#2A2725] w-screen h-screen h-[100svh] max-h-[100svh] overflow-hidden relative font-sans select-none">
      {/* Discreet Page Indicator Dots - Positioned vertically at the top right of the header */}
      <nav aria-label="Page navigation" className="fixed top-2.5 right-3 sm:top-3 sm:right-6 z-50 flex flex-col items-center gap-1.5 sm:gap-2 px-1.5 py-2 rounded-full bg-white/70 backdrop-blur-md border border-[#EAE2D8] shadow-xs">
        {[
          { label: 'Save The Date', index: 0 },
          { label: 'Event Details', index: 1 },
          { label: 'RSVP', index: 2 },
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

      {/* Discrete Pages: Only the current page is visible. All others are display: none */}
      <main className="w-full h-full relative">
        <div 
          style={{ display: currentPage === 0 ? 'flex' : 'none' }} 
          className="w-full h-full flex-col animate-in fade-in duration-200"
        >
          <Hero onNavigate={setCurrentPage} />
        </div>

        <div 
          style={{ display: currentPage === 1 ? 'flex' : 'none' }} 
          className="w-full h-full flex-col animate-in fade-in duration-200"
        >
          <EventDetails onNavigate={setCurrentPage} />
        </div>

        <div 
          style={{ display: currentPage === 2 ? 'flex' : 'none' }} 
          className="w-full h-full flex-col animate-in fade-in duration-200"
        >
          <RSVPForm onNavigate={setCurrentPage} />
        </div>
      </main>
    </div>
  );
}

export default App;

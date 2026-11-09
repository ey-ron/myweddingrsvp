import React from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { Sparkles } from 'lucide-react';

export const Countdown: React.FC = () => {
  const { timeLeft, isPast } = useCountdown();

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section id="countdown" className="xl:hidden min-h-screen snap-start snap-always flex flex-col justify-center items-center py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-[#EAE2D8] bg-[#F9F6F0]/60">
      <div className="max-w-4xl mx-auto text-center w-full">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE4D4]/60 border border-[#DFD0B7]/50 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#B89B6D]" />
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#7E633C]">
            Counting Down
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#2A2725] mb-2">
          Until We Say &ldquo;I Do&rdquo;
        </h2>
        <p className="text-sm text-[#736B63] max-w-md mx-auto mb-10 font-sans">
          We can’t wait to celebrate this once-in-a-lifetime moment with our cherished family and friends.
        </p>

        {isPast ? (
          <div className="p-8 rounded-2xl bg-white border border-[#EAE2D8] shadow-sm max-w-md mx-auto">
            <p className="font-serif text-2xl text-[#2A2725]">Today is the Day!</p>
            <p className="text-sm text-[#736B63] mt-2">Thank you for being part of our story.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-3xl mx-auto">
            {timeBlocks.map((block) => (
              <div
                key={block.label}
                className="bg-white/80 backdrop-blur-sm border border-[#EAE2D8] rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="font-serif text-3xl sm:text-5xl font-light text-[#2A2725] group-hover:text-[#B89B6D] transition-colors tabular-nums">
                  {String(block.value).padStart(2, '0')}
                </div>
                <div className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#8C7A5E] font-medium">
                  {block.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};


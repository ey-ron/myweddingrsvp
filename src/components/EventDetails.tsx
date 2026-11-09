import React from 'react';
import { Clock, MapPin, Sparkles, Shirt, ExternalLink, CalendarPlus } from 'lucide-react';
import { WEDDING_CONFIG } from '../config/wedding';

export const EventDetails: React.FC = () => {
  const getGoogleCalendarUrl = () => {
    // Event: 2026-10-17 16:00 to 23:30 CEST (UTC+2 -> 14:00 to 21:30 UTC)
    const start = '20261017T140000Z';
    const end = '20261017T220000Z';
    const title = encodeURIComponent(WEDDING_CONFIG.date.calendarTitle);
    const details = encodeURIComponent(WEDDING_CONFIG.date.calendarDescription);
    const location = encodeURIComponent(`${WEDDING_CONFIG.venue.name}, ${WEDDING_CONFIG.venue.address}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
  };

  const downloadIcsFile = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Wedding Save The Date//EN',
      'BEGIN:VEVENT',
      'UID:wedding-eleanor-julian-2026',
      'DTSTAMP:20261017T140000Z',
      'DTSTART:20261017T140000Z',
      'DTEND:20261017T220000Z',
      `SUMMARY:${WEDDING_CONFIG.date.calendarTitle}`,
      `DESCRIPTION:${WEDDING_CONFIG.date.calendarDescription}`,
      `LOCATION:${WEDDING_CONFIG.venue.name}, ${WEDDING_CONFIG.venue.address}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'wedding-eleanor-julian.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="schedule" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8C7A5E]">
          Celebration Timeline
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2A2725] mt-2 mb-4">
          The Wedding Day
        </h2>
        <p className="text-sm sm:text-base text-[#736B63] font-sans">
          A weekend of joy, laughter, and timeless memories on the shores of Lake Como.
        </p>

        {/* Add to Calendar Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href={getGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium text-[#2A2725] bg-white border border-[#DFD0B7] hover:border-[#B89B6D] hover:bg-[#FAF8F5] transition-all shadow-sm"
          >
            <CalendarPlus className="w-4 h-4 text-[#B89B6D]" />
            Add to Google Calendar
          </a>
          <button
            onClick={downloadIcsFile}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium text-[#2A2725] bg-white border border-[#DFD0B7] hover:border-[#B89B6D] hover:bg-[#FAF8F5] transition-all shadow-sm"
          >
            <CalendarPlus className="w-4 h-4 text-[#B89B6D]" />
            Download Apple / Outlook (.ics)
          </button>
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {WEDDING_CONFIG.schedule.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 sm:p-7 border border-[#EAE2D8] shadow-card hover:shadow-luxury transition-all duration-300 relative group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F3EB] text-[#7E633C] text-xs font-semibold tracking-wider">
                  <Clock className="w-3.5 h-3.5" />
                  {item.time}
                </span>
                <span className="text-xs font-serif text-[#DFD0B7] group-hover:text-[#B89B6D] transition-colors">
                  0{index + 1}
                </span>
              </div>
              <h3 className="font-serif text-xl text-[#2A2725] mb-2 font-medium">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#736B63] leading-relaxed">
                {item.description}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#F3EDE2] flex items-center gap-1 text-[11px] text-[#B89B6D] font-medium uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              <span>Lake Terrace</span>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Cards: Venue & Dress Code */}
      <div id="venue" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Venue Information Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EAE2D8] shadow-card flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#DFD0B7] flex items-center justify-center mb-6">
              <MapPin className="w-5 h-5 text-[#B89B6D]" />
            </div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8C7A5E]">
              The Venue
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#2A2725] mt-1 mb-3">
              {WEDDING_CONFIG.venue.name}
            </h3>
            <p className="text-sm text-[#736B63] leading-relaxed mb-4">
              Perched on a wooded peninsula extending into the lake, this historical 18th-century villa features romantic terraced gardens and panoramic views.
            </p>
            <div className="bg-[#FAF8F5] rounded-xl p-4 border border-[#EAE2D8] text-xs sm:text-sm text-[#5A544F] space-y-1">
              <p className="font-medium text-[#2A2725]">Address:</p>
              <p>{WEDDING_CONFIG.venue.address}</p>
              <p className="text-xs text-[#8C7A5E] pt-1">
                Boat shuttles will depart from Lenno dock starting at 3:15 PM.
              </p>
            </div>
          </div>

          <div className="pt-6 mt-6">
            <a
              href={WEDDING_CONFIG.venue.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-semibold text-[#B89B6D] hover:text-[#9E8052] transition-colors"
            >
              Open in Google Maps
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Dress Code & Notes Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EAE2D8] shadow-card flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#DFD0B7] flex items-center justify-center mb-6">
              <Shirt className="w-5 h-5 text-[#B89B6D]" />
            </div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8C7A5E]">
              Attire & Accommodations
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#2A2725] mt-1 mb-3">
              {WEDDING_CONFIG.dressCode.title}
            </h3>
            <p className="text-sm text-[#736B63] leading-relaxed mb-6">
              {WEDDING_CONFIG.dressCode.description}
            </p>

            <div className="bg-[#FAF8F5] rounded-xl p-4 border border-[#EAE2D8] text-xs sm:text-sm text-[#5A544F] space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#2A2725] uppercase tracking-wider">
                <span>RSVP Deadline</span>
                <span className="text-[#B89B6D]">{WEDDING_CONFIG.notes.rsvpDeadline}</span>
              </div>
              <p className="text-xs text-[#736B63]">
                {WEDDING_CONFIG.notes.accommodations}
              </p>
            </div>
          </div>

          <div className="pt-6 mt-6">
            <p className="text-xs text-[#8C7A5E] italic">
              Note: The venue has stone walkways and stairs; block heels or dress wedges are highly recommended.
            </p>
          </div>
        </div>

      </div>

    </section>
  );
};

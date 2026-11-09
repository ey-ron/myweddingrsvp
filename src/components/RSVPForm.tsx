import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { supabase, isSupabaseConfigured, RSVPResponse } from '../lib/supabase';
import { WEDDING_CONFIG } from '../config/wedding';
import {
  Users,
  Check,
  HeartHandshake,
  AlertCircle,
  Loader2,
  Send,
  Plus,
  Minus,
  PartyPopper,
  MapPin,
  ExternalLink,
  Palmtree,
  Heart
} from 'lucide-react';

interface RSVPFormProps {
  onNavigate?: (pageIndex: number) => void;
  isActive?: boolean;
}

export const RSVPForm: React.FC<RSVPFormProps> = ({ onNavigate, isActive = true }) => {
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [attending, setAttending] = useState<boolean>(true);
  const [additionalGuests, setAdditionalGuests] = useState<number>(0);
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<RSVPResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Field validation states
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!firstName.trim()) {
      newErrors.firstName = 'Please enter your first name.';
    }
    if (!surname.trim()) {
      newErrors.surname = 'Please enter your surname.';
    }
    if (additionalGuests < 0 || additionalGuests > 10) {
      newErrors.additionalGuests = 'Guest count must be between 0 and 10.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#B89B6D', '#DFD0B7', '#4A5B4C', '#FAF8F5']
      });
    } catch {
      // Graceful fallback
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const payload: RSVPResponse = {
      first_name: firstName.trim(),
      surname: surname.trim(),
      attending,
      additional_guests: attending ? additionalGuests : 0,
      notes: notes.trim() || undefined,
    };

    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase
          .from('rsvp_responses')
          .insert([payload]);

        if (error) {
          throw new Error(error.message || 'Failed to record RSVP in Supabase.');
        }
      } else {
        // Mock delay for realistic feel when testing without credentials
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      setSubmittedData(payload);
      triggerCelebration();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.';
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedData(null);
    setFirstName('');
    setSurname('');
    setAttending(true);
    setAdditionalGuests(0);
    setNotes('');
    setErrors({});
    setErrorMessage(null);
  };

  return (
    <section id="rsvp" className="relative w-full h-full flex flex-col items-center justify-between pt-3.5 xs:pt-4.5 sm:pt-6 pb-2 xs:pb-2.5 sm:pb-3 px-3 xs:px-4 sm:px-6 lg:px-8 bg-subtle-linen overflow-hidden">

      {/* Section Header - Perfectly aligned with Page 1 and Page 2 */}
      <div className="text-center max-w-3xl mx-auto mt-0.5 xs:mt-1 sm:mt-1.5 mb-2 xs:mb-3 tall:mb-4 sm:mb-4.5 flex-shrink-0">
        <span
          key={`pill-${isActive ? 'active' : 'inactive'}`}
          className={`text-[10px] xs:text-xs tall:text-sm sm:text-sm uppercase tracking-[0.35em] font-semibold text-[#8C7A5E] inline-block ${isActive ? 'animate-header-pill' : 'opacity-0'
            }`}
        >
          RSVP
        </span>
        {/* Elegant Cursive Handwriting Headline */}
        <h2 className="text-script-headline text-[#2A2725] mt-0.5 leading-tight tracking-wide">
          <span
            key={isActive ? 'active' : 'inactive'}
            className={`${isActive ? 'animate-cursive-write' : 'opacity-0'} inline-block`}
          >
            Join Our Celebration
          </span>
        </h2>
        <p
          key={`date-${isActive ? 'active' : 'inactive'}`}
          className={`font-serif italic text-[11px] xs:text-xs tall:text-sm sm:text-sm text-[#736B63] ${isActive ? 'animate-header-sub' : 'opacity-0'
            }`}
        >
          Kindly favor us with your reply by <span className="font-semibold text-[#2A2725] not-italic">{WEDDING_CONFIG.notes.rsvpDeadline}</span>
        </p>
      </div>

      {/* Main Content Area - Centered in remaining vertical space */}
      <div className="max-w-xl xs:max-w-2xl sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl w-full mx-auto flex-1 min-h-0 flex flex-col lg:grid lg:grid-cols-2 lg:gap-6 xl:gap-8 lg:items-center justify-center mt-1 xs:mt-1.5 sm:my-auto">

        {/* RSVP Card - Cascades in first */}
        <div
          key={`rsvp-${isActive ? 'active' : 'inactive'}`}
          className={`bg-white rounded-2xl sm:rounded-3xl border border-[#EAE2D8] shadow-luxury p-2.5 xs:p-3 sm:p-5 xl:p-6 transition-all ${isActive ? 'animate-cascade-1' : 'opacity-0'
            }`}
        >
          {/* Card Header Badge */}
          <div className="flex items-center justify-center gap-1.5 mb-1.5 xs:mb-2 sm:mb-3">
            <HeartHandshake className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B89B6D]" />
            <span className="text-[10px] xs:text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold text-[#8C7A5E]">
              Official Guest RSVP
            </span>
          </div>

          {/* SUCCESS STATE */}
          {submittedData ? (
            <div className="text-center py-3 sm:py-5 space-y-2.5 sm:space-y-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E6ECE6] border border-[#CFDBCF] flex items-center justify-center mx-auto text-[#4A5B4C]">
                <PartyPopper className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-serif text-[#2A2725]">
                  Thank You, {submittedData.first_name}!
                </h3>
                <p className="text-[11px] xs:text-xs sm:text-sm text-[#736B63] mt-0.5 sm:mt-1 max-w-md mx-auto">
                  {submittedData.attending
                    ? 'Your RSVP has been joyfully saved! We cannot wait to celebrate together.'
                    : 'We are so sorry you cannot make it, but we deeply appreciate your warm wishes!'}
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-[#FAF8F5] border border-[#EAE2D8] rounded-xl p-2.5 sm:p-4 text-left max-w-md mx-auto space-y-1.5 text-xs sm:text-sm">
                <div className="flex justify-between items-center border-b border-[#EAE2D8] pb-1">
                  <span className="text-[#8C7A5E] uppercase tracking-wider font-semibold text-[9.5px] sm:text-xs">Primary Guest</span>
                  <span className="font-semibold text-[#2A2725]">
                    {submittedData.first_name} {submittedData.surname}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-[#EAE2D8] pb-1">
                  <span className="text-[#8C7A5E] uppercase tracking-wider font-semibold text-[9.5px] sm:text-xs">Attendance</span>
                  <span className={`inline-flex items-center gap-1 font-semibold text-[10px] sm:text-xs px-2 py-0.5 rounded-full ${submittedData.attending ? 'bg-[#E6ECE6] text-[#4A5B4C]' : 'bg-[#F7EEE9] text-[#7E633C]'
                    }`}>
                    {submittedData.attending ? 'Attending' : 'Regretfully Declines'}
                  </span>
                </div>
                {submittedData.attending && (
                  <div className="flex justify-between items-center border-b border-[#EAE2D8] pb-1">
                    <span className="text-[#8C7A5E] uppercase tracking-wider font-semibold text-[9.5px] sm:text-xs">Bringing With You</span>
                    <span className="font-medium text-[#2A2725]">
                      {submittedData.additional_guests === 0
                        ? 'Just yourself (0 guests)'
                        : `+${submittedData.additional_guests} guest(s) (${1 + submittedData.additional_guests} seats total)`}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center pt-1">
                <button
                  onClick={handleReset}
                  className="px-5 py-2 rounded-full border border-[#DFD0B7] text-[#2A2725] hover:bg-[#FAF8F5] text-[10px] xs:text-xs uppercase tracking-[0.2em] font-semibold transition-all"
                >
                  Submit Another RSVP
                </button>
              </div>
            </div>
          ) : (
            /* FORM STATE */
            <form onSubmit={handleSubmit} className="space-y-1.5 xs:space-y-2 sm:space-y-3">

              {/* Error banner if submission fails */}
              {errorMessage && (
                <div className="p-1.5 sm:p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-[11px] sm:text-xs flex items-start gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-red-600" />
                  <div>
                    <span className="font-semibold">Unable to submit RSVP: </span>
                    {errorMessage}
                  </div>
                </div>
              )}

              {/* Attendance Selection */}
              <div>
                <label className="block text-[10px] xs:text-xs uppercase tracking-[0.18em] font-semibold text-[#8C7A5E] mb-1">
                  Will You Be Attending? <span className="text-[#B89B6D]">*</span>
                </label>
                <div className="grid grid-cols-2 gap-1.5 xs:gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setAttending(true)}
                    className={`py-1.5 xs:py-2 sm:py-2.5 px-2 xs:px-3 rounded-xl border text-center transition-all flex items-center justify-center gap-1.5 text-[11px] xs:text-xs sm:text-sm font-medium ${attending
                      ? 'border-[#B89B6D] bg-[#F7F3EB] text-[#2A2725] ring-1 ring-[#B89B6D]/30 font-semibold'
                      : 'border-[#EAE2D8] hover:border-[#DFD0B7] bg-white text-[#5A544F]'
                      }`}
                  >
                    <div className={`w-3 h-3 xs:w-3.5 xs:h-3.5 rounded-full border flex items-center justify-center ${attending ? 'border-[#B89B6D] bg-[#B89B6D]' : 'border-[#DFD0B7]'
                      }`}>
                      {attending && <Check className="w-2 h-2 text-white" />}
                    </div>
                    <span>Joyfully Accept</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAttending(false);
                      setAdditionalGuests(0);
                    }}
                    className={`py-1.5 xs:py-2 sm:py-2.5 px-2 xs:px-3 rounded-xl border text-center transition-all flex items-center justify-center gap-1.5 text-[11px] xs:text-xs sm:text-sm font-medium ${!attending
                      ? 'border-[#B89B6D] bg-[#F7F3EB] text-[#2A2725] ring-1 ring-[#B89B6D]/30 font-semibold'
                      : 'border-[#EAE2D8] hover:border-[#DFD0B7] bg-white text-[#5A544F]'
                      }`}
                  >
                    <div className={`w-3 h-3 xs:w-3.5 xs:h-3.5 rounded-full border flex items-center justify-center ${!attending ? 'border-[#B89B6D] bg-[#B89B6D]' : 'border-[#DFD0B7]'
                      }`}>
                      {!attending && <Check className="w-2 h-2 text-white" />}
                    </div>
                    <span>Regretfully Decline</span>
                  </button>
                </div>
              </div>

              {/* Name and Surname Grid */}
              <div className="grid grid-cols-2 gap-1.5 xs:gap-2 sm:gap-3">
                <div>
                  <label htmlFor="first_name" className="block text-[9.5px] xs:text-[10.5px] sm:text-xs uppercase tracking-[0.18em] font-semibold text-[#8C7A5E] mb-0.5">
                    First Name <span className="text-[#B89B6D]">*</span>
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      if (errors.firstName) setErrors({ ...errors, firstName: '' });
                    }}
                    placeholder="e.g. Aaron"
                    className={`w-full px-2.5 xs:px-3 sm:px-3.5 py-1.5 xs:py-2 rounded-xl border bg-[#FCFBF9] text-xs xs:text-sm text-[#2A2725] placeholder-[#B5ADA4] focus:outline-none focus:ring-1.5 focus:ring-[#B89B6D]/30 focus:border-[#B89B6D] transition-all ${errors.firstName ? 'border-red-400 bg-red-50/20' : 'border-[#EAE2D8]'
                      }`}
                  />
                  {errors.firstName && (
                    <p className="mt-0.5 text-[10px] text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="surname" className="block text-[9.5px] xs:text-[10.5px] sm:text-xs uppercase tracking-[0.18em] font-semibold text-[#8C7A5E] mb-0.5">
                    Surname <span className="text-[#B89B6D]">*</span>
                  </label>
                  <input
                    type="text"
                    id="surname"
                    value={surname}
                    onChange={(e) => {
                      setSurname(e.target.value);
                      if (errors.surname) setErrors({ ...errors, surname: '' });
                    }}
                    placeholder="e.g. Handsome"
                    className={`w-full px-2.5 xs:px-3 sm:px-3.5 py-1.5 xs:py-2 rounded-xl border bg-[#FCFBF9] text-xs xs:text-sm text-[#2A2725] placeholder-[#B5ADA4] focus:outline-none focus:ring-1.5 focus:ring-[#B89B6D]/30 focus:border-[#B89B6D] transition-all ${errors.surname ? 'border-red-400 bg-red-50/20' : 'border-[#EAE2D8]'
                      }`}
                  />
                  {errors.surname && (
                    <p className="mt-0.5 text-[10px] text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.surname}
                    </p>
                  )}
                </div>
              </div>

              {/* Number of additional guests */}
              {attending && (
                <div>
                  <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                    <label className="text-[9.5px] xs:text-[10.5px] sm:text-xs uppercase tracking-[0.18em] font-semibold text-[#8C7A5E] flex items-center gap-1">
                      <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#B89B6D]" />
                      Bringing Additional Guests?
                    </label>
                    <span className="text-[9.5px] xs:text-[10.5px] sm:text-xs text-[#736B63]">
                      Total: <strong className="text-[#2A2725]">{1 + additionalGuests} seat(s)</strong>
                    </span>
                  </div>

                  {/* Counter & Quick Select */}
                  <div className="flex items-center gap-1.5 xs:gap-2.5 bg-[#FCFBF9] px-2.5 xs:px-3 py-1 xs:py-1.5 rounded-xl border border-[#EAE2D8]">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setAdditionalGuests(Math.max(0, additionalGuests - 1))}
                        disabled={additionalGuests === 0}
                        aria-label="Decrease guest count"
                        className="w-6 h-6 xs:w-7 xs:h-7 rounded-lg bg-white border border-[#DFD0B7] flex items-center justify-center text-[#2A2725] hover:border-[#B89B6D] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>

                      <span className="w-6 xs:w-7 text-center font-serif text-sm xs:text-base font-semibold text-[#2A2725] tabular-nums">
                        {additionalGuests}
                      </span>

                      <button
                        type="button"
                        onClick={() => setAdditionalGuests(Math.min(10, additionalGuests + 1))}
                        disabled={additionalGuests >= 10}
                        aria-label="Increase guest count"
                        className="w-6 h-6 xs:w-7 xs:h-7 rounded-lg bg-white border border-[#DFD0B7] flex items-center justify-center text-[#2A2725] hover:border-[#B89B6D] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1 ml-auto border-l border-[#EAE2D8] pl-2 xs:pl-3">
                      <span className="text-[9px] xs:text-[10px] uppercase tracking-wider text-[#8C7A5E] mr-0.5 hidden xs:inline">Quick:</span>
                      {[0, 1, 2, 3].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setAdditionalGuests(num)}
                          className={`w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 rounded-md text-[10px] xs:text-xs font-medium transition-all ${additionalGuests === num
                            ? 'bg-[#B89B6D] text-white shadow-2xs font-semibold'
                            : 'bg-white border border-[#EAE2D8] text-[#5A544F] hover:border-[#DFD0B7]'
                            }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Dietary requirements / Note to couple */}
              <div>
                <label htmlFor="notes" className="block text-[9.5px] xs:text-[10.5px] sm:text-xs uppercase tracking-[0.18em] font-semibold text-[#8C7A5E] mb-0.5">
                  Note to Couple (Optional)
                </label>
                <textarea
                  id="notes"
                  rows={1}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Excited to celebrate with you!"
                  className="w-full px-2.5 xs:px-3 sm:px-3.5 py-1 xs:py-1.5 rounded-xl border border-[#EAE2D8] bg-[#FCFBF9] text-xs text-[#2A2725] placeholder-[#B5ADA4] focus:outline-none focus:ring-1.5 focus:ring-[#B89B6D]/30 focus:border-[#B89B6D] transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-0.5 sm:pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 xs:py-2.5 sm:py-3.5 rounded-full bg-[#2A2725] hover:bg-[#B89B6D] text-white text-[11px] xs:text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-1.5 disabled:opacity-75 disabled:cursor-wait transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving Your RSVP...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3 h-3 xs:w-3.5 xs:h-3.5" />
                      <span>Confirm RSVP Response</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

        {/* Suggested Accommodations for Vacation - Cascades in after RSVP */}
        <div
          key={`acc-${isActive ? 'active' : 'inactive'}`}
          className={`mt-2 xs:mt-2.5 lg:mt-0 bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-[#EAE2D8] shadow-card p-2 xs:p-2.5 sm:p-4 xl:p-5 text-center transition-all ${isActive ? 'animate-cascade-3' : 'opacity-0'
            }`}
        >
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <Palmtree className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B89B6D]" />
            <span className="text-[10px] xs:text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold text-[#8C7A5E]">
              Staying for Vacation After?
            </span>
          </div>
          <p className="text-[9.5px] xs:text-[10.5px] sm:text-xs text-[#736B63] mb-1.5 xs:mb-2 max-w-xl mx-auto leading-tight">
            For friends wishing to stay for vacation, here are our suggested accommodations:
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-1.5 xs:gap-2 sm:gap-3 text-left">
            {WEDDING_CONFIG.accommodations.map((acc, idx) => (
              <a
                key={idx}
                href={acc.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 xs:p-2 sm:p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE2D8] hover:border-[#B89B6D] transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-1 mb-0.5">
                    <h4 className="font-serif text-[11px] xs:text-xs sm:text-sm md:text-base font-medium text-[#2A2725] group-hover:text-[#B89B6D] transition-colors leading-tight">
                      {acc.name}
                    </h4>
                    <ExternalLink className="w-3 h-3 text-[#B89B6D] opacity-60 group-hover:opacity-100 flex-shrink-0 mt-0.5" />
                  </div>
                  <p className="text-[9px] xs:text-[10px] sm:text-xs text-[#736B63] leading-snug line-clamp-1 sm:line-clamp-none">
                    {acc.description}
                  </p>

                  {/* Resort Photo - Balanced preview height */}
                  <div className="w-full h-[54px] xs:h-[62px] sm:h-[72px] lg:h-24 my-1 rounded-lg overflow-hidden border border-[#DFD0B7]/50 bg-[#EDE4D4]/30 relative">
                    <img
                      src={acc.image}
                      alt={acc.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[9px] xs:text-[10px] sm:text-xs text-[#B89B6D] font-medium pt-1 border-t border-[#F3EDE2]">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  <span className="group-hover:underline">View on Map</span>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Personal Groom Signature Footer - Animated entrance */}
      <button
        key={`sig-${isActive ? 'active' : 'inactive'}`}
        onClick={() => onNavigate ? onNavigate(0) : undefined}
        aria-label="Return to Save The Date"
        className={`flex items-center justify-center gap-1.5 font-script text-base xs:text-lg sm:text-xl tracking-wide text-[#8C7A5E] hover:text-[#2A2725] transition-all flex-shrink-0 cursor-pointer pt-0.5 pb-0.5 group focus:outline-none ${isActive ? 'animate-scroll-cue' : 'opacity-0'
          }`}
      >
        <span>Crafted with</span>
        <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B89B6D] fill-[#B89B6D] group-hover:scale-125 transition-transform" />
        <span>by the Groom for his bride, Eileen</span>
      </button>
    </section>
  );
};

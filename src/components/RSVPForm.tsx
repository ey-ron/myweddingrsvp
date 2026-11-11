'use client';

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
          console.error('Supabase RSVP insert error:', error);
          throw new Error(error.message || 'Failed to record RSVP in Supabase.');
        }
        console.log('RSVP successfully saved to Supabase:', payload);
      } else {
        // Mock delay for realistic feel when testing without credentials
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      setSubmittedData(payload);
      triggerCelebration();
    } catch (err: unknown) {
      console.error('RSVP form submission failed:', err);
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
    <section id="rsvp" className="slide-section bg-subtle-linen">

      {/* Section Header - Generous gap below */}
      <div className="text-center max-w-3xl mx-auto mt-0.5 sm:mt-1.5 mb-[clamp(14px,2.4dvh,26px)] sm:mb-5 flex-shrink-0">
        <span
          key={`pill-${isActive ? 'active' : 'inactive'}`}
          className={`text-[clamp(10px,1.25dvh,11px)] uppercase tracking-[0.28em] font-semibold text-[#8C7A5E] inline-block ${isActive ? 'animate-header-pill' : 'opacity-0'
            }`}
        >
          RSVP
        </span>
        {/* Elegant Cursive Handwriting Headline */}
        <h2 className="text-script-headline text-[#2A2725] mt-0.5 leading-tight tracking-wide whitespace-nowrap overflow-hidden">
          <span
            key={isActive ? 'active' : 'inactive'}
            className={`${isActive ? 'animate-cursive-write' : 'opacity-0'} inline-block`}
          >
            Join Our Celebration
          </span>
        </h2>
        <p
          key={`date-${isActive ? 'active' : 'inactive'}`}
          className={`font-serif italic text-[clamp(11px,1.35dvh,12.5px)] sm:text-xs text-[#736B63] ${isActive ? 'animate-header-sub' : 'opacity-0'
            }`}
        >
          Kindly favor us with your reply by <span className="font-semibold text-[#2A2725] not-italic">{WEDDING_CONFIG.notes.rsvpDeadline}</span>
        </p>
      </div>

      {/* Main Content Area - Cards sit naturally together without gaps between them */}
      <div className="ipad-rsvp-container max-w-xl sm:max-w-3xl lg:max-w-5xl w-full mx-auto flex-1 min-h-0 flex flex-col justify-start lg:grid lg:grid-cols-2 lg:gap-6 xl:gap-8 lg:items-center gap-[clamp(8px,1.3dvh,14px)] mb-[clamp(10px,1.8dvh,20px)] sm:mb-0">

        {/* RSVP Card */}
        <div
          key={`rsvp-${isActive ? 'active' : 'inactive'}`}
          className={`ipad-rsvp-card bg-white rounded-2xl sm:rounded-3xl border border-[#EAE2D8] shadow-luxury p-[clamp(10px,1.5dvh,18px)] sm:p-5 xl:p-6 transition-all flex flex-col justify-between flex-shrink-0 ${isActive ? 'animate-cascade-1' : 'opacity-0'
            }`}
        >
          {/* Card Header Badge */}
          <div className="flex items-center justify-center gap-1.5 mb-1 sm:mb-2">
            <HeartHandshake className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#B89B6D]" />
            <span className="text-[clamp(8.5px,1.1dvh,9.5px)] sm:text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8C7A5E]">
              Official Guest RSVP
            </span>
          </div>

          {/* SUCCESS STATE */}
          {submittedData ? (
            <div className="text-center py-2 sm:py-4 space-y-2 sm:space-y-3 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#E6ECE6] border border-[#CFDBCF] flex items-center justify-center mx-auto text-[#4A5B4C]">
                <PartyPopper className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-serif text-[#2A2725]">
                  Thank You, {submittedData.first_name}!
                </h3>
                <p className="text-[clamp(9px,1.2dvh,10.5px)] sm:text-[11px] text-[#736B63] mt-0.5 max-w-md mx-auto">
                  {submittedData.attending
                    ? 'Your RSVP has been joyfully saved! We cannot wait to celebrate together.'
                    : 'We are so sorry you cannot make it, but we deeply appreciate your warm wishes!'}
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-[#FAF8F5] border border-[#EAE2D8] rounded-xl p-2 sm:p-3 text-left max-w-md mx-auto space-y-1 text-xs">
                <div className="flex justify-between items-center border-b border-[#EAE2D8] pb-1">
                  <span className="text-[#8C7A5E] uppercase tracking-wider font-semibold text-[clamp(7.5px,1dvh,8.5px)]">Primary Guest</span>
                  <span className="font-semibold text-[#2A2725] text-[clamp(10px,1.25dvh,11.5px)] sm:text-xs">
                    {submittedData.first_name} {submittedData.surname}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-[#EAE2D8] pb-1">
                  <span className="text-[#8C7A5E] uppercase tracking-wider font-semibold text-[clamp(7.5px,1dvh,8.5px)]">Attendance</span>
                  <span className={`inline-flex items-center gap-1 font-semibold text-[clamp(8.5px,1.1dvh,9.5px)] px-1.5 py-0.5 rounded-full ${submittedData.attending ? 'bg-[#E6ECE6] text-[#4A5B4C]' : 'bg-[#F7EEE9] text-[#7E633C]'
                    }`}>
                    {submittedData.attending ? 'Attending' : 'Regretfully Declines'}
                  </span>
                </div>
                {submittedData.attending && (
                  <div className="flex justify-between items-center border-b border-[#EAE2D8] pb-1">
                    <span className="text-[#8C7A5E] uppercase tracking-wider font-semibold text-[clamp(7.5px,1dvh,8.5px)]">Bringing With You</span>
                    <span className="font-medium text-[#2A2725] text-[clamp(9.5px,1.2dvh,10.5px)] sm:text-[11px]">
                      {submittedData.additional_guests === 0
                        ? 'Just yourself (0 guests)'
                        : `+${submittedData.additional_guests} guest(s) (${1 + submittedData.additional_guests} seats total)`}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center pt-0.5">
                <button
                  onClick={handleReset}
                  className="px-3.5 py-1 rounded-full border border-[#DFD0B7] text-[#2A2725] hover:bg-[#FAF8F5] text-[clamp(8.5px,1.1dvh,9.5px)] uppercase tracking-[0.16em] font-semibold transition-all cursor-pointer"
                >
                  Submit Another RSVP
                </button>
              </div>
            </div>
          ) : (
            /* FORM STATE */
            <form onSubmit={handleSubmit} className="space-y-[clamp(5px,0.9dvh,10px)] sm:space-y-2.5">

              {/* Error banner if submission fails */}
              {errorMessage && (
                <div className="p-1 sm:p-2 rounded-xl bg-red-50 border border-red-200 text-red-800 text-[9px] sm:text-[10px] flex items-start gap-1">
                  <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0 text-red-600" />
                  <div>
                    <span className="font-semibold">Unable to submit RSVP: </span>
                    {errorMessage}
                  </div>
                </div>
              )}

              {/* Attendance Selection */}
              <div>
                <label className="block text-[clamp(8.5px,1.1dvh,9.5px)] uppercase tracking-[0.15em] font-semibold text-[#8C7A5E] mb-0.5 sm:mb-1">
                  Will You Be Attending? <span className="text-[#B89B6D]">*</span>
                </label>
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => setAttending(true)}
                    className={`ipad-rsvp-btn-attending py-[clamp(7px,1.25dvh,12px)] sm:py-2 px-2.5 sm:px-3 rounded-xl border text-center transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-[clamp(10px,1.35dvh,11.5px)] sm:text-xs font-medium ${attending
                      ? 'border-[#B89B6D] bg-[#F7F3EB] text-[#2A2725] ring-1 ring-[#B89B6D]/30 font-semibold'
                      : 'border-[#EAE2D8] hover:border-[#DFD0B7] bg-white text-[#5A544F]'
                      }`}
                  >
                    <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border flex items-center justify-center ${attending ? 'border-[#B89B6D] bg-[#B89B6D]' : 'border-[#DFD0B7]'
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
                    className={`ipad-rsvp-btn-attending py-[clamp(7px,1.25dvh,12px)] sm:py-2 px-2.5 sm:px-3 rounded-xl border text-center transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-[clamp(10px,1.35dvh,11.5px)] sm:text-xs font-medium ${!attending
                      ? 'border-[#B89B6D] bg-[#F7F3EB] text-[#2A2725] ring-1 ring-[#B89B6D]/30 font-semibold'
                      : 'border-[#EAE2D8] hover:border-[#DFD0B7] bg-white text-[#5A544F]'
                      }`}
                  >
                    <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border flex items-center justify-center ${!attending ? 'border-[#B89B6D] bg-[#B89B6D]' : 'border-[#DFD0B7]'
                      }`}>
                      {!attending && <Check className="w-2 h-2 text-white" />}
                    </div>
                    <span>Regretfully Decline</span>
                  </button>
                </div>
              </div>

              {/* Name and Surname Grid */}
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                <div>
                  <label htmlFor="first_name" className="block text-[clamp(8.5px,1.1dvh,9.5px)] uppercase tracking-[0.15em] font-semibold text-[#8C7A5E] mb-0.5">
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
                    className={`ipad-rsvp-input w-full px-2.5 sm:px-3 py-[clamp(7px,1.2dvh,11px)] sm:py-2 rounded-xl border bg-[#FCFBF9] text-[clamp(11.5px,1.4dvh,13px)] sm:text-xs text-[#2A2725] placeholder-[#B5ADA4] focus:outline-none focus:ring-1 focus:ring-[#B89B6D]/30 focus:border-[#B89B6D] transition-all ${errors.firstName ? 'border-red-400 bg-red-50/20' : 'border-[#EAE2D8]'
                      }`}
                  />
                  {errors.firstName && (
                    <p className="mt-0.5 text-[8px] text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-2.5 h-2.5" />
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="surname" className="block text-[clamp(8.5px,1.1dvh,9.5px)] uppercase tracking-[0.15em] font-semibold text-[#8C7A5E] mb-0.5">
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
                    className={`ipad-rsvp-input w-full px-2.5 sm:px-3 py-[clamp(7px,1.2dvh,11px)] sm:py-2 rounded-xl border bg-[#FCFBF9] text-[clamp(11.5px,1.4dvh,13px)] sm:text-xs text-[#2A2725] placeholder-[#B5ADA4] focus:outline-none focus:ring-1 focus:ring-[#B89B6D]/30 focus:border-[#B89B6D] transition-all ${errors.surname ? 'border-red-400 bg-red-50/20' : 'border-[#EAE2D8]'
                      }`}
                  />
                  {errors.surname && (
                    <p className="mt-0.5 text-[8px] text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-2.5 h-2.5" />
                      {errors.surname}
                    </p>
                  )}
                </div>
              </div>

              {/* Number of additional guests */}
              {attending && (
                <div>
                  <div className="flex items-center justify-between mb-0.5">
                    <label className="text-[clamp(8.5px,1.1dvh,9.5px)] uppercase tracking-[0.15em] font-semibold text-[#8C7A5E] flex items-center gap-1">
                      <Users className="w-2.5 h-2.5 text-[#B89B6D]" />
                      Bringing Additional Guests?
                    </label>
                    <span className="text-[clamp(8.5px,1.1dvh,9.5px)] text-[#736B63]">
                      Total: <strong className="text-[#2A2725]">{1 + additionalGuests} seat(s)</strong>
                    </span>
                  </div>

                  {/* Counter & Quick Select */}
                  <div className="flex items-center gap-1.5 bg-[#FCFBF9] px-2.5 py-[clamp(4px,0.7dvh,8px)] sm:py-1.5 rounded-xl border border-[#EAE2D8]">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setAdditionalGuests(Math.max(0, additionalGuests - 1))}
                        disabled={additionalGuests === 0}
                        aria-label="Decrease guest count"
                        className="ipad-rsvp-counter-btn w-5.5 h-5.5 sm:w-6.5 sm:h-6.5 rounded-lg bg-white border border-[#DFD0B7] flex items-center justify-center text-[#2A2725] hover:border-[#B89B6D] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs"
                      >
                        <Minus className="w-2.5 h-2.5" />
                      </button>

                      <span className="ipad-rsvp-counter-num w-5 sm:w-6 text-center font-serif text-[clamp(12px,1.6dvh,14px)] sm:text-base font-semibold text-[#2A2725] tabular-nums">
                        {additionalGuests}
                      </span>

                      <button
                        type="button"
                        onClick={() => setAdditionalGuests(Math.min(10, additionalGuests + 1))}
                        disabled={additionalGuests >= 10}
                        aria-label="Increase guest count"
                        className="ipad-rsvp-counter-btn w-5.5 h-5.5 sm:w-6.5 sm:h-6.5 rounded-lg bg-white border border-[#DFD0B7] flex items-center justify-center text-[#2A2725] hover:border-[#B89B6D] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs"
                      >
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1 ml-auto border-l border-[#EAE2D8] pl-2">
                      <span className="text-[7.5px] uppercase tracking-wider text-[#8C7A5E] mr-0.5 hidden sm:inline">Quick:</span>
                      {[0, 1, 2, 3].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setAdditionalGuests(num)}
                          className={`ipad-rsvp-quick-btn w-[clamp(20px,2.6dvh,24px)] h-[clamp(20px,2.6dvh,24px)] sm:w-6 sm:h-6 rounded-md text-[clamp(8.5px,1.1dvh,9.5px)] sm:text-[10px] font-medium transition-all ${additionalGuests === num
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
                <label htmlFor="notes" className="block text-[clamp(8.5px,1.1dvh,9.5px)] uppercase tracking-[0.15em] font-semibold text-[#8C7A5E] mb-0.5">
                  Note to Couple (Optional)
                </label>
                <textarea
                  id="notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Excited to celebrate with you!"
                  className="ipad-rsvp-textarea w-full px-2.5 sm:px-3 py-[clamp(5px,0.85dvh,9px)] rounded-xl border border-[#EAE2D8] bg-[#FCFBF9] text-[clamp(10.5px,1.3dvh,12px)] sm:text-xs text-[#2A2725] placeholder-[#B5ADA4] focus:outline-none focus:ring-1 focus:ring-[#B89B6D]/30 focus:border-[#B89B6D] transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-0.5 sm:pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="ipad-rsvp-submit-btn w-full py-[clamp(7.5px,1.25dvh,11px)] sm:py-2.5 rounded-full bg-[#2A2725] hover:bg-[#B89B6D] text-white text-[clamp(10px,1.25dvh,11px)] sm:text-[11px] uppercase tracking-[0.15em] font-semibold transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-1.5 disabled:opacity-75 disabled:cursor-wait transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>Saving Your RSVP...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3 h-3" />
                      <span>Confirm RSVP Response</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

        {/* Suggested Accommodations for Vacation */}
        <div
          key={`acc-${isActive ? 'active' : 'inactive'}`}
          className={`ipad-acc-card bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-[#EAE2D8] shadow-card p-[clamp(9px,1.35dvh,16px)] sm:p-3.5 xl:p-4 text-center transition-all flex flex-col justify-between flex-shrink-0 ${isActive ? 'animate-cascade-3' : 'opacity-0'
            }`}
        >
          <div className="flex items-center justify-center gap-1.5 mb-0.5">
            <Palmtree className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#B89B6D]" />
            <span className="text-[clamp(9px,1.15dvh,10.5px)] sm:text-[11px] uppercase tracking-[0.22em] font-semibold text-[#8C7A5E]">
              Staying for Vacation After?
            </span>
          </div>
          <p className="text-[clamp(8.5px,1.1dvh,9.5px)] sm:text-[10.5px] text-[#736B63] mb-[clamp(4px,0.6dvh,8px)] max-w-xl mx-auto leading-tight">
            For friends wishing to stay for vacation, here are our suggested accommodations:
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-[clamp(6px,0.85dvh,10px)] sm:gap-2.5 text-left">
            {WEDDING_CONFIG.accommodations.map((acc, idx) => (
              <a
                key={idx}
                href={acc.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-[clamp(6px,0.9dvh,10px)] sm:p-2.5 rounded-xl bg-[#FAF8F5] border border-[#EAE2D8] hover:border-[#B89B6D] transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-1 mb-0.5">
                    <h4 className="ipad-acc-title font-serif text-[clamp(10.5px,1.35dvh,12px)] sm:text-xs font-medium text-[#2A2725] group-hover:text-[#B89B6D] transition-colors leading-tight">
                      {acc.name}
                    </h4>
                    <ExternalLink className="w-2.5 h-2.5 text-[#B89B6D] opacity-60 group-hover:opacity-100 flex-shrink-0 mt-0.5" />
                  </div>
                  <p className="ipad-acc-desc text-[clamp(8px,1.05dvh,9px)] sm:text-[9.5px] text-[#736B63] leading-snug line-clamp-2 sm:line-clamp-none">
                    {acc.description}
                  </p>

                  {/* Resort Photo - Fluid height dynamically fills space on any screen */}
                  <div className="ipad-acc-img w-full h-[clamp(68px,10dvh,120px)] sm:h-[72px] lg:h-24 my-1 sm:my-1.5 rounded-lg overflow-hidden border border-[#DFD0B7]/50 bg-[#EDE4D4]/30 relative">
                    <img
                      src={acc.image}
                      alt={acc.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[clamp(8px,1.05dvh,9.5px)] sm:text-[10px] text-[#B89B6D] font-medium pt-0.5 border-t border-[#F3EDE2]">
                  <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
                  <span className="group-hover:underline">View on Map</span>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Personal Groom Signature Footer - Balanced space above */}
      <button
        key={`sig-${isActive ? 'active' : 'inactive'}`}
        onClick={() => onNavigate ? onNavigate(0) : undefined}
        aria-label="Return to Save The Date"
        className={`ipad-groom-sig flex items-center justify-center gap-1.5 font-script text-[clamp(13px,1.8dvh,16px)] sm:text-base tracking-wide text-[#8C7A5E] hover:text-[#2A2725] transition-all flex-shrink-0 cursor-pointer mt-auto pt-[clamp(12px,2dvh,22px)] pb-1 sm:pb-2 group focus:outline-none ${isActive ? 'animate-scroll-cue' : 'opacity-0'
          }`}
      >
        <span>Crafted with</span>
        <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#B89B6D] fill-[#B89B6D] group-hover:scale-125 transition-transform" />
        <span>by the Groom for his bride, Eileen</span>
      </button>
    </section>
  );
};

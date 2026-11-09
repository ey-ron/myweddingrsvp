import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { supabase, isSupabaseConfigured, RSVPResponse } from '../lib/supabase';
import { WEDDING_CONFIG } from '../config/wedding';
import { 
  Users, 
  Check, 
  HeartHandshake, 
  Sparkles, 
  AlertCircle, 
  Loader2, 
  CalendarPlus,
  Send,
  Plus,
  Minus,
  PartyPopper
} from 'lucide-react';

export const RSVPForm: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [attending, setAttending] = useState<boolean>(true);
  const [additionalGuests, setAdditionalGuests] = useState<number>(0);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
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
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
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
        colors: ['#B89B6D', '#DFD0B7', '#2A2725', '#FAF8F5'],
      });
    } catch {
      // Fallback if canvas is unavailable
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const payload: RSVPResponse = {
      first_name: firstName.trim(),
      surname: surname.trim(),
      attending,
      additional_guests: attending ? additionalGuests : 0,
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
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
    setEmail('');
    setPhone('');
    setNotes('');
    setErrors({});
    setErrorMessage(null);
  };

  const getGoogleCalendarUrl = () => {
    const start = '20261017T140000Z';
    const end = '20261017T220000Z';
    const title = encodeURIComponent(WEDDING_CONFIG.date.calendarTitle);
    const details = encodeURIComponent(WEDDING_CONFIG.date.calendarDescription);
    const location = encodeURIComponent(`${WEDDING_CONFIG.venue.name}, ${WEDDING_CONFIG.venue.address}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
  };

  return (
    <section id="rsvp" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-subtle-linen relative">
      <div className="max-w-3xl mx-auto">
        
        {/* Supabase Status Pill for User Convenience */}
        {!isSupabaseConfigured && (
          <div className="mb-6 p-4 rounded-2xl bg-[#EDE4D4]/60 border border-[#DFD0B7] text-[#604A2C] text-xs flex items-start sm:items-center gap-3">
            <AlertCircle className="w-5 h-5 text-[#B89B6D] flex-shrink-0 mt-0.5 sm:mt-0" />
            <div className="flex-1">
              <span className="font-semibold block sm:inline">Preview Mode Active: </span>
              Supabase credentials not configured in <code className="bg-white/80 px-1.5 py-0.5 rounded text-[11px] font-mono text-[#2A2725]">.env</code> yet. You can submit now to test the full UI flow smoothly!
            </div>
          </div>
        )}

        <div className="bg-white rounded-[2rem] border border-[#EAE2D8] shadow-luxury p-6 sm:p-12 transition-all">
          
          {/* Header */}
          <div className="text-center max-w-lg mx-auto mb-10">
            <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#DFD0B7] flex items-center justify-center mx-auto mb-4">
              <HeartHandshake className="w-5 h-5 text-[#B89B6D]" />
            </div>
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8C7A5E]">
              Save The Date RSVP
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#2A2725] mt-1 mb-2">
              Will You Join Us?
            </h2>
            <p className="text-xs sm:text-sm text-[#736B63]">
              Please reply by <span className="font-semibold text-[#2A2725]">{WEDDING_CONFIG.notes.rsvpDeadline}</span> to help us finalize arrangements for our celebration.
            </p>
          </div>

          {/* SUCCESS STATE */}
          {submittedData ? (
            <div className="text-center py-6 sm:py-8 space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-[#E6ECE6] border border-[#CFDBCF] flex items-center justify-center mx-auto text-[#4A5B4C]">
                <PartyPopper className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#2A2725]">
                  Thank You, {submittedData.first_name}!
                </h3>
                <p className="text-sm text-[#736B63] mt-2 max-w-md mx-auto">
                  {submittedData.attending
                    ? 'Your RSVP has been joyfully saved! We cannot wait to celebrate together.'
                    : 'We are so sorry you cannot make it, but we deeply appreciate your warm wishes!'}
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-[#FAF8F5] border border-[#EAE2D8] rounded-2xl p-6 text-left max-w-md mx-auto space-y-3 text-sm">
                <div className="flex justify-between items-center border-b border-[#EAE2D8] pb-2">
                  <span className="text-[#8C7A5E] text-xs uppercase tracking-wider font-semibold">Primary Guest</span>
                  <span className="font-semibold text-[#2A2725]">
                    {submittedData.first_name} {submittedData.surname}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-[#EAE2D8] pb-2">
                  <span className="text-[#8C7A5E] text-xs uppercase tracking-wider font-semibold">Attendance</span>
                  <span className={`inline-flex items-center gap-1 font-semibold text-xs px-2.5 py-1 rounded-full ${
                    submittedData.attending ? 'bg-[#E6ECE6] text-[#4A5B4C]' : 'bg-[#F7EEE9] text-[#7E633C]'
                  }`}>
                    {submittedData.attending ? 'Attending' : 'Regretfully Declines'}
                  </span>
                </div>
                {submittedData.attending && (
                  <div className="flex justify-between items-center border-b border-[#EAE2D8] pb-2">
                    <span className="text-[#8C7A5E] text-xs uppercase tracking-wider font-semibold">Bringing With You</span>
                    <span className="font-medium text-[#2A2725]">
                      {submittedData.additional_guests === 0
                        ? 'Just yourself (0 guests)'
                        : `+${submittedData.additional_guests} guest(s) (${1 + submittedData.additional_guests} seats total)`}
                    </span>
                  </div>
                )}
                {submittedData.email && (
                  <div className="flex justify-between items-center text-xs text-[#736B63] pt-1">
                    <span>Confirmation</span>
                    <span>{submittedData.email}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                {submittedData.attending && (
                  <a
                    href={getGoogleCalendarUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#B89B6D] hover:bg-[#A38659] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-md"
                  >
                    <CalendarPlus className="w-4 h-4" />
                    Save To Calendar
                  </a>
                )}
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#DFD0B7] text-[#2A2725] hover:bg-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-semibold transition-all"
                >
                  Submit Another RSVP
                </button>
              </div>
            </div>
          ) : (
            /* FORM STATE */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Error banner if submission fails */}
              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-600" />
                  <div>
                    <span className="font-semibold">Unable to submit RSVP: </span>
                    {errorMessage}
                  </div>
                </div>
              )}

              {/* Attendance Selection */}
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] font-semibold text-[#8C7A5E] mb-3">
                  Will You Be Attending? <span className="text-[#B89B6D]">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttending(true)}
                    className={`py-3.5 px-4 rounded-xl border text-center transition-all flex items-center justify-center gap-2 text-xs sm:text-sm font-medium ${
                      attending
                        ? 'border-[#B89B6D] bg-[#F7F3EB] text-[#2A2725] ring-2 ring-[#B89B6D]/30 font-semibold'
                        : 'border-[#EAE2D8] hover:border-[#DFD0B7] bg-white text-[#5A544F]'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      attending ? 'border-[#B89B6D] bg-[#B89B6D]' : 'border-[#DFD0B7]'
                    }`}>
                      {attending && <Check className="w-2.5 h-2.5 text-white" />}
                    </div>
                    <span>Joyfully Accept</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAttending(false);
                      setAdditionalGuests(0);
                    }}
                    className={`py-3.5 px-4 rounded-xl border text-center transition-all flex items-center justify-center gap-2 text-xs sm:text-sm font-medium ${
                      !attending
                        ? 'border-[#B89B6D] bg-[#F7F3EB] text-[#2A2725] ring-2 ring-[#B89B6D]/30 font-semibold'
                        : 'border-[#EAE2D8] hover:border-[#DFD0B7] bg-white text-[#5A544F]'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      !attending ? 'border-[#B89B6D] bg-[#B89B6D]' : 'border-[#DFD0B7]'
                    }`}>
                      {!attending && <Check className="w-2.5 h-2.5 text-white" />}
                    </div>
                    <span>Regretfully Decline</span>
                  </button>
                </div>
              </div>

              {/* Name and Surname Grid - Explicit requirement */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first_name" className="block text-xs uppercase tracking-[0.2em] font-semibold text-[#8C7A5E] mb-2">
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
                    placeholder="e.g. Alexander"
                    className={`w-full px-4 py-3 rounded-xl border bg-[#FCFBF9] text-sm text-[#2A2725] placeholder-[#B5ADA4] focus:outline-none focus:ring-2 focus:ring-[#B89B6D]/30 focus:border-[#B89B6D] transition-all ${
                      errors.firstName ? 'border-red-400 bg-red-50/20' : 'border-[#EAE2D8]'
                    }`}
                  />
                  {errors.firstName && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="surname" className="block text-xs uppercase tracking-[0.2em] font-semibold text-[#8C7A5E] mb-2">
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
                    placeholder="e.g. Dupont"
                    className={`w-full px-4 py-3 rounded-xl border bg-[#FCFBF9] text-sm text-[#2A2725] placeholder-[#B5ADA4] focus:outline-none focus:ring-2 focus:ring-[#B89B6D]/30 focus:border-[#B89B6D] transition-all ${
                      errors.surname ? 'border-red-400 bg-red-50/20' : 'border-[#EAE2D8]'
                    }`}
                  />
                  {errors.surname && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.surname}
                    </p>
                  )}
                </div>
              </div>

              {/* Number of additional guests bringing with them */}
              {attending && (
                <div className="pt-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <label className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C7A5E] flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-[#B89B6D]" />
                      Guests You Are Bringing With You
                    </label>
                    <span className="text-xs text-[#736B63]">
                      (Total seats: <strong className="text-[#2A2725]">{1 + additionalGuests}</strong>)
                    </span>
                  </div>

                  <p className="text-xs text-[#8C7A5E] mb-3">
                    Excluding yourself. If coming alone, leave as 0. If bringing a spouse, partner or children, select count.
                  </p>

                  {/* Interactive Counter & Quick Select */}
                  <div className="flex items-center gap-4 bg-[#FCFBF9] p-2.5 rounded-2xl border border-[#EAE2D8]">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setAdditionalGuests(Math.max(0, additionalGuests - 1))}
                        disabled={additionalGuests === 0}
                        aria-label="Decrease guest count"
                        className="w-10 h-10 rounded-xl bg-white border border-[#DFD0B7] flex items-center justify-center text-[#2A2725] hover:border-[#B89B6D] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <span className="w-12 text-center font-serif text-xl font-semibold text-[#2A2725] tabular-nums">
                        {additionalGuests}
                      </span>

                      <button
                        type="button"
                        onClick={() => setAdditionalGuests(Math.min(10, additionalGuests + 1))}
                        disabled={additionalGuests >= 10}
                        aria-label="Increase guest count"
                        className="w-10 h-10 rounded-xl bg-white border border-[#DFD0B7] flex items-center justify-center text-[#2A2725] hover:border-[#B89B6D] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quick Select Buttons */}
                    <div className="hidden sm:flex items-center gap-1.5 ml-auto border-l border-[#EAE2D8] pl-4">
                      <span className="text-[11px] uppercase tracking-wider text-[#8C7A5E] mr-1">Quick:</span>
                      {[0, 1, 2, 3, 4].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setAdditionalGuests(num)}
                          className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                            additionalGuests === num
                              ? 'bg-[#B89B6D] text-white shadow-sm font-semibold'
                              : 'bg-white border border-[#EAE2D8] text-[#5A544F] hover:border-[#DFD0B7]'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                  {errors.additionalGuests && (
                    <p className="mt-1.5 text-xs text-red-600">{errors.additionalGuests}</p>
                  )}
                </div>
              )}

              {/* Contact Information (Email / Phone) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-[0.2em] font-semibold text-[#8C7A5E] mb-2">
                    Email Address <span className="text-[10px] text-[#A89F95] lowercase tracking-normal font-normal">(for wedding updates)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    placeholder="alexander@example.com"
                    className={`w-full px-4 py-3 rounded-xl border bg-[#FCFBF9] text-sm text-[#2A2725] placeholder-[#B5ADA4] focus:outline-none focus:ring-2 focus:ring-[#B89B6D]/30 focus:border-[#B89B6D] transition-all ${
                      errors.email ? 'border-red-400' : 'border-[#EAE2D8]'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs uppercase tracking-[0.2em] font-semibold text-[#8C7A5E] mb-2">
                    Mobile Phone <span className="text-[10px] text-[#A89F95] lowercase tracking-normal font-normal">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 012-3456"
                    className="w-full px-4 py-3 rounded-xl border border-[#EAE2D8] bg-[#FCFBF9] text-sm text-[#2A2725] placeholder-[#B5ADA4] focus:outline-none focus:ring-2 focus:ring-[#B89B6D]/30 focus:border-[#B89B6D] transition-all"
                  />
                </div>
              </div>

              {/* Dietary requirements / Note to couple */}
              <div>
                <label htmlFor="notes" className="block text-xs uppercase tracking-[0.2em] font-semibold text-[#8C7A5E] mb-2">
                  Dietary Restrictions, Song Request, or Note to Couple
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Vegetarian for 1 guest, cannot wait to hear classic Italian jazz!"
                  className="w-full px-4 py-3 rounded-xl border border-[#EAE2D8] bg-[#FCFBF9] text-sm text-[#2A2725] placeholder-[#B5ADA4] focus:outline-none focus:ring-2 focus:ring-[#B89B6D]/30 focus:border-[#B89B6D] transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-[#2A2725] hover:bg-[#B89B6D] text-white text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-wait transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving Your RSVP...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Confirm RSVP Response</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-[11px] text-[#A89F95] flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#B89B6D]" />
                  Your information is saved securely to our private guest registry.
                </p>
              </div>

            </form>
          )}

        </div>
      </div>
    </section>
  );
};

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Users, 
  CheckCircle2, 
  XCircle, 
  ArrowLeft, 
  RefreshCw, 
  Search, 
  Heart, 
  Sparkles, 
  Calendar, 
  Clock, 
  MessageSquare,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  UserCheck,
  UserX
} from 'lucide-react';
import { supabase, isSupabaseConfigured, RSVPResponse } from '../../lib/supabase';
import { WEDDING_CONFIG } from '../../config/wedding';

// Mock sample data for preview if database has not recorded responses yet
const SAMPLE_RSVPS: RSVPResponse[] = [
  {
    id: 'demo-1',
    first_name: 'Marcus',
    surname: 'Vance',
    attending: true,
    additional_guests: 2,
    notes: 'So happy for both of you! Cannot wait to celebrate.',
    created_at: '2026-11-09T18:30:00Z',
  },
  {
    id: 'demo-2',
    first_name: 'Sophia',
    surname: 'Chen',
    attending: true,
    additional_guests: 1,
    notes: 'Congratulations Aaron & Eileen!',
    created_at: '2026-11-09T19:15:00Z',
  },
  {
    id: 'demo-3',
    first_name: 'David',
    surname: 'Miller',
    attending: false,
    additional_guests: 0,
    notes: 'Sending all our love and blessings from overseas!',
    created_at: '2026-11-09T20:05:00Z',
  },
  {
    id: 'demo-4',
    first_name: 'Elena',
    surname: 'Rostova',
    attending: true,
    additional_guests: 0,
    notes: '',
    created_at: '2026-11-09T21:40:00Z',
  },
];

export default function RSVPAdminPage() {
  const [responses, setResponses] = useState<RSVPResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'attending' | 'declined'>('all');
  const [useSampleData, setUseSampleData] = useState(false);
  const [showSqlHelp, setShowSqlHelp] = useState(true);
  const [copiedSql, setCopiedSql] = useState(false);

  const copySqlToClipboard = () => {
    const sql = `DROP POLICY IF EXISTS "Allow authenticated users to view RSVPs" ON public.rsvp_responses;\nDROP POLICY IF EXISTS "Allow public to view RSVPs" ON public.rsvp_responses;\nCREATE POLICY "Allow public to view RSVPs"\nON public.rsvp_responses\nFOR SELECT\nTO anon, authenticated\nUSING (true);`;
    navigator.clipboard.writeText(sql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  const fetchRSVPs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (!isSupabaseConfigured) {
        setResponses(SAMPLE_RSVPS);
        setUseSampleData(true);
        setIsLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('rsvp_responses')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      if (data && data.length > 0) {
        setResponses(data);
        setUseSampleData(false);
      } else {
        // No rows returned (could be empty table or RLS SELECT policy pending)
        setResponses([]);
      }
    } catch (err: any) {
      console.error('Error fetching RSVPs:', err);
      setError(err?.message || 'Could not fetch RSVPs from database.');
    } finally {
      setIsLoading(false);
      setLastRefreshed(new Date());
    }
  };

  useEffect(() => {
    fetchRSVPs();
  }, []);

  // Display list (switches to sample data when user explicitly toggles it)
  const displayList = useSampleData && responses.length === 0 ? SAMPLE_RSVPS : responses;

  // Filtered responses based on search query & attendance tab
  const filteredResponses = useMemo(() => {
    return displayList.filter((item) => {
      const fullName = `${item.first_name || ''} ${item.surname || ''}`.toLowerCase();
      const matchesSearch = fullName.includes(searchQuery.toLowerCase().trim());

      if (!matchesSearch) return false;

      if (statusFilter === 'attending') return item.attending;
      if (statusFilter === 'declined') return !item.attending;
      return true;
    });
  }, [displayList, searchQuery, statusFilter]);

  // Aggregate stats
  const stats = useMemo(() => {
    const list = displayList;
    const attendingResponses = list.filter((r) => r.attending);
    const declinedResponses = list.filter((r) => !r.attending);

    // Each attending party occupies 1 seat (primary guest) + additional_guests
    const totalSeats = attendingResponses.reduce(
      (sum, r) => sum + 1 + (Number(r.additional_guests) || 0),
      0
    );

    return {
      totalSubmissions: list.length,
      attendingParties: attendingResponses.length,
      declinedParties: declinedResponses.length,
      totalSeats,
    };
  }, [displayList]);

  const formatDate = (isoString?: string) => {
    if (!isoString) return 'Just now';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="w-full h-[100dvh] min-h-[100dvh] max-h-[100dvh] overflow-y-auto bg-[#FAF8F5] text-[#2A2725] font-sans flex flex-col justify-between selection:bg-[#B89B6D]/20">
      {/* Background ambient accents */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#EDE4D4]/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Content Area */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 pb-28">
        
        {/* Top Header & Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#EAE2D8] pb-5 mb-6">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C7A5E] hover:text-[#2A2725] transition-colors mb-2 uppercase tracking-[0.16em]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Invitation</span>
            </Link>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl text-[#2A2725] font-medium tracking-tight">
                RSVP Guest Registry
              </h1>
              <span className="font-script text-2xl sm:text-3xl text-[#B89B6D] -rotate-3 select-none">
                Aaron & Eileen
              </span>
            </div>
            <p className="text-xs text-[#7A726A] mt-1">
              {WEDDING_CONFIG.date.display} · {WEDDING_CONFIG.venue.name}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={fetchRSVPs}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#DFD0B7] bg-white hover:bg-[#FAF8F5] text-xs font-medium text-[#2A2725] shadow-xs transition-all active:scale-95 disabled:opacity-60 cursor-pointer"
              title="Refresh guest list from Supabase"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#8C7A5E] ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2A2725] hover:bg-[#B89B6D] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md active:scale-95"
            >
              Submit RSVP
            </Link>
          </div>
        </div>

        {/* Top Stats Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {/* Card 1: Total Confirmed Seats */}
          <div className="p-4 rounded-2xl bg-white border border-[#DFD0B7] shadow-card relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#8C7A5E] mb-2">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em]">
                Total Seats
              </span>
              <div className="w-7 h-7 rounded-full bg-[#EDE4D4]/60 flex items-center justify-center">
                <Users className="w-3.5 h-3.5 text-[#B89B6D]" />
              </div>
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-semibold text-[#2A2725] leading-none">
              {stats.totalSeats}
            </div>
            <div className="text-[10px] text-[#7A726A] mt-1 font-medium">
              Confirmed guests attending
            </div>
          </div>

          {/* Card 2: Attending Parties */}
          <div className="p-4 rounded-2xl bg-white border border-[#EAE2D8] shadow-card flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#4A5B4C] mb-2">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em]">
                Attending
              </span>
              <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center">
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
              </div>
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-semibold text-emerald-800 leading-none">
              {stats.attendingParties}
            </div>
            <div className="text-[10px] text-[#7A726A] mt-1 font-medium">
              Parties attending
            </div>
          </div>

          {/* Card 3: Declined Parties */}
          <div className="p-4 rounded-2xl bg-white border border-[#EAE2D8] shadow-card flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#8C7A5E] mb-2">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em]">
                Declined
              </span>
              <div className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center">
                <UserX className="w-3.5 h-3.5 text-neutral-500" />
              </div>
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-semibold text-neutral-600 leading-none">
              {stats.declinedParties}
            </div>
            <div className="text-[10px] text-[#7A726A] mt-1 font-medium">
              Regretfully declined
            </div>
          </div>

          {/* Card 4: Total Responses */}
          <div className="p-4 rounded-2xl bg-white border border-[#EAE2D8] shadow-card flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#8C7A5E] mb-2">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em]">
                Responses
              </span>
              <div className="w-7 h-7 rounded-full bg-[#EDE4D4]/40 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-[#B89B6D]" />
              </div>
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-semibold text-[#2A2725] leading-none">
              {stats.totalSubmissions}
            </div>
            <div className="text-[10px] text-[#7A726A] mt-1 font-medium">
              Total RSVPs received
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl border border-[#EAE2D8] shadow-xs mb-5 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8C7A5E] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by guest name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#EAE2D8] text-xs placeholder-[#9C948B] focus:outline-none focus:border-[#B89B6D] transition-colors"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 self-center sm:self-auto">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                statusFilter === 'all'
                  ? 'bg-[#2A2725] text-white shadow-xs'
                  : 'bg-[#FAF8F5] text-[#5A544F] hover:bg-[#EDE4D4]/50'
              }`}
            >
              All ({displayList.length})
            </button>
            <button
              onClick={() => setStatusFilter('attending')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                statusFilter === 'attending'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-[#FAF8F5] text-[#5A544F] hover:bg-emerald-50'
              }`}
            >
              Attending ({stats.attendingParties})
            </button>
            <button
              onClick={() => setStatusFilter('declined')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                statusFilter === 'declined'
                  ? 'bg-neutral-600 text-white shadow-xs'
                  : 'bg-[#FAF8F5] text-[#5A544F] hover:bg-neutral-100'
              }`}
            >
              Declined ({stats.declinedParties})
            </button>
          </div>
        </div>

        {/* Notice Banner: Demo Mode or Supabase RLS Helper */}
        {useSampleData && (
          <div className="mb-5 p-3 sm:p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>Showing sample preview data because no responses exist yet or Supabase is being configured.</span>
            </div>
            <button
              onClick={() => setUseSampleData(false)}
              className="text-[11px] font-bold text-amber-800 underline hover:text-amber-950 ml-2 whitespace-nowrap cursor-pointer"
            >
              Hide Sample
            </button>
          </div>
        )}

        {/* Empty State / RLS Help Card */}
        {!isLoading && responses.length === 0 && !useSampleData && (
          <div className="bg-white rounded-2xl border border-[#DFD0B7] p-5 sm:p-8 text-center my-4 sm:my-6 shadow-card">
            <div className="w-12 h-12 rounded-full bg-[#EDE4D4]/60 text-[#B89B6D] flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg sm:text-xl text-[#2A2725] mb-1">
              Why are no RSVPs showing up?
            </h3>
            <p className="text-xs text-[#7A726A] max-w-lg mx-auto mb-4">
              Your RSVPs <strong>are safely recorded in your Supabase database</strong>, but Supabase Row-Level Security (RLS) restricts public reading by default until you grant read permission to the public anon key.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
              <button
                onClick={() => setUseSampleData(true)}
                className="px-4 py-2 rounded-xl bg-[#2A2725] text-white hover:bg-[#B89B6D] text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Preview With Sample Data
              </button>
              <button
                onClick={copySqlToClipboard}
                className="px-3.5 py-2 rounded-xl border border-[#DFD0B7] bg-[#FAF8F5] hover:bg-white text-xs font-semibold text-[#2A2725] transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#B89B6D]" />
                <span>{copiedSql ? '✓ Copied SQL!' : 'Copy 1-Line Fix SQL'}</span>
              </button>
            </div>

            {/* Supabase SQL Helper Card */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#FAF8F5] border border-[#EAE2D8] text-left text-xs max-w-2xl mx-auto space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-[#2A2725] text-xs sm:text-sm">
                  1-Step Fix in Supabase Dashboard:
                </span>
                <span className="text-[10px] text-[#8C7A5E] bg-white px-2 py-0.5 rounded-full border border-[#DFD0B7]">
                  Takes 30 seconds
                </span>
              </div>
              <p className="text-[#5A544F] text-[11px] sm:text-xs leading-relaxed">
                Open your <a href="https://supabase.com/dashboard/project/hujbqwkuyggrmaossgay/sql" target="_blank" rel="noopener noreferrer" className="text-[#B89B6D] font-bold underline hover:text-[#9E8052]">Supabase SQL Editor</a>, paste the SQL below, and click <strong>RUN</strong>:
              </p>
              <div className="bg-[#1A1817] text-[#DFD0B7] p-3 rounded-xl font-mono text-[10.5px] sm:text-[11.5px] leading-relaxed overflow-x-auto relative group">
                <button
                  onClick={copySqlToClipboard}
                  className="absolute top-2 right-2 px-2 py-1 rounded bg-[#2A2725] hover:bg-[#B89B6D] text-white text-[10px] font-sans font-semibold transition-all cursor-pointer"
                >
                  {copiedSql ? '✓ Copied' : 'Copy SQL'}
                </button>
                DROP POLICY IF EXISTS &quot;Allow authenticated users to view RSVPs&quot; ON public.rsvp_responses;<br />
                DROP POLICY IF EXISTS &quot;Allow public to view RSVPs&quot; ON public.rsvp_responses;<br />
                <br />
                CREATE POLICY &quot;Allow public to view RSVPs&quot;<br />
                ON public.rsvp_responses<br />
                FOR SELECT<br />
                TO anon, authenticated<br />
                USING (true);
              </div>
              <p className="text-[11px] text-[#7A726A] pt-1">
                Once run, click <strong>Refresh</strong> at the top right of this page and all your saved guests and total seat counts will instantly appear!
              </p>
            </div>
          </div>
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="p-12 text-center text-[#8C7A5E] flex flex-col items-center justify-center gap-2">
            <RefreshCw className="w-6 h-6 animate-spin text-[#B89B6D]" />
            <span className="text-xs font-medium tracking-wide">Loading RSVP responses...</span>
          </div>
        )}

        {/* RSVP List Section */}
        {!isLoading && filteredResponses.length > 0 && (
          <div className="space-y-3">
            {/* Desktop Table View (hidden on small mobile) */}
            <div className="hidden md:block bg-white rounded-2xl border border-[#EAE2D8] shadow-card overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF8F5] border-b border-[#EAE2D8] text-[10px] uppercase font-bold text-[#8C7A5E] tracking-[0.16em]">
                  <tr>
                    <th className="py-3 px-4">Guest Name</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-center">Seat Count</th>
                    <th className="py-3 px-4">Wishes & Notes</th>
                    <th className="py-3 px-4 text-right">Date Submitted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE2D8]/60">
                  {filteredResponses.map((item, idx) => {
                    const seats = item.attending ? 1 + (Number(item.additional_guests) || 0) : 0;
                    return (
                      <tr key={item.id || idx} className="hover:bg-[#FAF8F5]/80 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-[#2A2725]">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-[#EDE4D4]/70 text-[#8C7A5E] font-serif font-bold text-xs flex items-center justify-center">
                              {(item.first_name?.[0] || 'G').toUpperCase()}
                            </div>
                            <span>{item.first_name} {item.surname}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          {item.attending ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200/60">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Attending</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-600 text-[11px] font-medium border border-neutral-200">
                              <XCircle className="w-3 h-3" />
                              <span>Declined</span>
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {item.attending ? (
                            <div className="inline-flex flex-col items-center">
                              <span className="font-serif font-bold text-base text-[#2A2725] leading-none">
                                {seats} {seats === 1 ? 'Seat' : 'Seats'}
                              </span>
                              <span className="text-[10px] text-[#8C7A5E]">
                                {item.additional_guests ? `Self + ${item.additional_guests}` : 'Primary Guest'}
                              </span>
                            </div>
                          ) : (
                            <span className="text-neutral-400 font-medium">0</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-[#5A544F] max-w-xs truncate italic">
                          {item.notes ? (
                            <div className="flex items-center gap-1.5" title={item.notes}>
                              <MessageSquare className="w-3.5 h-3.5 text-[#B89B6D] flex-shrink-0" />
                              <span className="truncate">&ldquo;{item.notes}&rdquo;</span>
                            </div>
                          ) : (
                            <span className="text-neutral-300 not-italic">—</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right text-[11px] text-[#8C7A5E] whitespace-nowrap">
                          {formatDate(item.created_at)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card List View (optimized for phones) */}
            <div className="md:hidden space-y-2.5">
              {filteredResponses.map((item, idx) => {
                const seats = item.attending ? 1 + (Number(item.additional_guests) || 0) : 0;
                return (
                  <div
                    key={item.id || idx}
                    className="p-3.5 rounded-2xl bg-white border border-[#EAE2D8] shadow-card flex flex-col gap-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#EDE4D4]/80 text-[#8C7A5E] font-serif font-bold text-xs flex items-center justify-center flex-shrink-0">
                          {(item.first_name?.[0] || 'G').toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-[#2A2725]">
                            {item.first_name} {item.surname}
                          </div>
                          <div className="text-[10px] text-[#8C7A5E]">
                            {formatDate(item.created_at)}
                          </div>
                        </div>
                      </div>

                      {/* Status & Seat Pill */}
                      <div className="text-right flex flex-col items-end gap-1">
                        {item.attending ? (
                          <>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Attending</span>
                            </span>
                            <span className="font-serif font-bold text-xs text-[#2A2725]">
                              {seats} {seats === 1 ? 'Seat' : 'Seats'}
                            </span>
                          </>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 text-[10px] font-medium border border-neutral-200">
                            <XCircle className="w-3 h-3" />
                            <span>Declined</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Guest Breakdown & Notes */}
                    {item.attending && item.additional_guests ? (
                      <div className="text-[10.5px] text-[#8C7A5E] bg-[#FAF8F5] px-2.5 py-1 rounded-lg border border-[#EAE2D8]/60 inline-flex items-center gap-1.5 self-start">
                        <Users className="w-3 h-3 text-[#B89B6D]" />
                        <span>Party of {seats} (Guest + {item.additional_guests} additional)</span>
                      </div>
                    ) : null}

                    {item.notes ? (
                      <div className="text-[11px] text-[#5A544F] bg-[#FAF8F5] p-2 rounded-xl border border-[#EAE2D8]/60 flex items-start gap-1.5 italic">
                        <MessageSquare className="w-3.5 h-3.5 text-[#B89B6D] flex-shrink-0 mt-0.5" />
                        <span>&ldquo;{item.notes}&rdquo;</span>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty filter result */}
        {!isLoading && displayList.length > 0 && filteredResponses.length === 0 && (
          <div className="p-8 text-center text-xs text-[#8C7A5E] bg-white rounded-2xl border border-[#EAE2D8]">
            No guests found matching &ldquo;{searchQuery}&rdquo;.
          </div>
        )}
      </div>

      {/* Sticky Bottom Summary Bar (Prominently displays the total number of seats for RSVP) */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-[#DFD0B7] shadow-luxury px-4 sm:px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          {/* Left: Quick Back Navigation */}
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-[#8C7A5E] hover:text-[#2A2725] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Save the Date</span>
            <span className="sm:hidden">Home</span>
          </Link>

          {/* Center / Right: Highlighted Total RSVP Seats */}
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-[10px] text-[#8C7A5E] uppercase tracking-wider font-semibold">
                Parties Attending
              </span>
              <span className="text-xs font-semibold text-[#2A2725]">
                {stats.attendingParties} of {stats.totalSubmissions} responded
              </span>
            </div>

            {/* Total Number of Seats Pill */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#2A2725] text-white shadow-md">
              <div className="w-2 h-2 rounded-full bg-[#B89B6D] animate-pulse" />
              <div className="flex items-baseline gap-1.5">
                <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.16em] text-[#DFD0B7]">
                  Total RSVP Seats:
                </span>
                <span className="font-serif text-base sm:text-lg font-bold text-white leading-none">
                  {stats.totalSeats}
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


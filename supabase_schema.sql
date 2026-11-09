-- =========================================================
-- WEDDING SAVE THE DATE & RSVP DATABASE SCHEMA FOR SUPABASE
-- Run this in your Supabase Project -> SQL Editor
-- =========================================================

-- 1. Create the RSVP responses table
CREATE TABLE IF NOT EXISTS public.rsvp_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name TEXT NOT NULL,
    surname TEXT NOT NULL,
    attending BOOLEAN NOT NULL DEFAULT true,
    additional_guests INTEGER NOT NULL DEFAULT 0 CHECK (additional_guests >= 0 AND additional_guests <= 10),
    email TEXT,
    phone TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Create indices for fast searches and admin exports
CREATE INDEX IF NOT EXISTS idx_rsvp_name ON public.rsvp_responses (lower(first_name), lower(surname));
CREATE INDEX IF NOT EXISTS idx_rsvp_created_at ON public.rsvp_responses (created_at DESC);

-- 3. Enable Row Level Security (RLS) for data privacy
ALTER TABLE public.rsvp_responses ENABLE ROW LEVEL SECURITY;

-- 4. Policy: Allow anyone (guests using the anon key) to submit an RSVP
DROP POLICY IF EXISTS "Allow public to submit RSVP" ON public.rsvp_responses;
CREATE POLICY "Allow public to submit RSVP"
ON public.rsvp_responses
FOR INSERT
TO anon, authenticated
WITH CHECK (
    char_length(trim(first_name)) > 0 AND
    char_length(trim(surname)) > 0 AND
    additional_guests >= 0
);

-- 5. Policy: Restrict reading to authenticated dashboard users (keeps guest info private)
DROP POLICY IF EXISTS "Allow authenticated users to view RSVPs" ON public.rsvp_responses;
CREATE POLICY "Allow authenticated users to view RSVPs"
ON public.rsvp_responses
FOR SELECT
TO authenticated
USING (true);

-- (Optional: If you want guests to verify their own submission or read total count,
-- you can create a secure Postgres RPC function or keep it private)

COMMENT ON TABLE public.rsvp_responses IS 'Stores guest RSVP submissions with first name, surname, and guest count.';

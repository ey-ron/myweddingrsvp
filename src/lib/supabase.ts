import { createClient } from '@supabase/supabase-js';

export interface RSVPResponse {
  id?: string;
  first_name: string;
  surname: string;
  attending: boolean;
  additional_guests: number;
  email?: string;
  phone?: string;
  notes?: string;
  created_at?: string;
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-supabase-url') &&
  !supabaseAnonKey.includes('your-anon-key')
);

// Fallback dummy client if credentials aren't set yet, so app renders smoothly
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://mock-wedding.supabase.co', 'mock-key');


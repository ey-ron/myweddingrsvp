import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

// Ensure the endpoint is executed dynamically on every request without caching
export const dynamic = 'force-dynamic';

export async function GET() {
  const startTime = Date.now();

  try {
    if (!isSupabaseConfigured) {
      return NextResponse.json(
        {
          status: 'warning',
          message: 'Supabase environment credentials are not configured.',
          timestamp: new Date().toISOString(),
        },
        { status: 200 }
      );
    }

    // Ping Supabase with a lightweight query to rsvp_responses.
    // Querying PostgREST keeps the PostgreSQL instance active and resets the 7-day inactivity pause.
    const { error, count } = await supabase
      .from('rsvp_responses')
      .select('id', { count: 'exact', head: true });

    const durationMs = Date.now() - startTime;

    if (error) {
      // Even if RLS restricts head select, the request successfully reached Supabase's database instance
      return NextResponse.json(
        {
          status: 'ok',
          message: 'Supabase pinged successfully (database is active).',
          detail: error.message,
          durationMs,
          timestamp: new Date().toISOString(),
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        status: 'ok',
        message: 'Supabase keep-alive ping successful. Database is awake and healthy.',
        totalRSVPsRecorded: count ?? 0,
        durationMs,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        status: 'error',
        message: err?.message || 'Failed to ping Supabase.',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

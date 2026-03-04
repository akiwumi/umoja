/**
 * POST /api/contact
 *
 * Receives a contact form submission, validates required fields,
 * and inserts the record into the `contact_submissions` Supabase table
 * using the privileged service-role key (server-side only).
 */
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

/* ── Types ── */
interface ContactPayload {
  full_name: string;
  email: string;
  organization?: string;
  role: string;
  country?: string;
  message?: string;
  interest_type: string;
}

/* ── Supabase admin client (never exposed to the browser) ── */
function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error('Supabase environment variables are not configured.');
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}

/* ── Route handler ── */
export async function POST(request: Request) {
  // Parse body
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  // Validate required fields
  const { full_name, email, role, interest_type } = body;
  if (!full_name || !email || !role || !interest_type) {
    return NextResponse.json(
      { error: 'Missing required fields: full_name, email, role, interest_type.' },
      { status: 422 },
    );
  }

  // Basic email sanity check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 422 });
  }

  // Insert into Supabase
  try {
    const supabase = getAdminClient();

    const { error } = await supabase.from('contact_submissions').insert([
      {
        full_name: full_name.trim(),
        email: email.trim().toLowerCase(),
        organization: body.organization?.trim() ?? null,
        role: role.trim(),
        country: body.country?.trim() ?? null,
        message: body.message?.trim() ?? null,
        interest_type: interest_type.trim(),
        submitted_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('[contact/route] Supabase insert error:', error);
      return NextResponse.json(
        { error: 'Failed to save your submission. Please try again.' },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('[contact/route] Unexpected error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 },
    );
  }
}

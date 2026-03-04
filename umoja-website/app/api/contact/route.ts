/**
 * POST /api/contact
 *
 * Receives a contact form submission, validates required fields,
 * and sends a notification email via Resend.
 */
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

interface ContactPayload {
  full_name: string;
  email: string;
  organization?: string;
  role: string;
  country?: string;
  message?: string;
  interest_type: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { full_name, email, role, interest_type } = body;
  if (!full_name || !email || !role || !interest_type) {
    return NextResponse.json(
      { error: 'Missing required fields: full_name, email, role, interest_type.' },
      { status: 422 },
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 422 });
  }

  try {
    const { error } = await resend.emails.send({
      from: 'UMOJA-ai <onboarding@resend.dev>',
      to: 'akiwumi@icloud.com',
      replyTo: email.trim().toLowerCase(),
      subject: `New inquiry from ${full_name.trim()} — ${interest_type.trim()}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
          <h2 style="color: #2d5016; margin-bottom: 24px;">New Contact Form Submission</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; font-weight: 600; width: 140px; vertical-align: top;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5;">${full_name.trim()}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; font-weight: 600; vertical-align: top;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5;">
                <a href="mailto:${email.trim().toLowerCase()}" style="color: #2d5016;">${email.trim().toLowerCase()}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; font-weight: 600; vertical-align: top;">Role</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5;">${role.trim()}</td>
            </tr>
            ${body.organization ? `<tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; font-weight: 600; vertical-align: top;">Organisation</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5;">${body.organization.trim()}</td>
            </tr>` : ''}
            ${body.country ? `<tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; font-weight: 600; vertical-align: top;">Country</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5;">${body.country.trim()}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; font-weight: 600; vertical-align: top;">Interest</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5;">${interest_type.trim()}</td>
            </tr>
            ${body.message ? `<tr>
              <td style="padding: 10px 0; font-weight: 600; vertical-align: top;">Message</td>
              <td style="padding: 10px 0; white-space: pre-wrap;">${body.message.trim()}</td>
            </tr>` : ''}
          </table>

          <p style="margin-top: 24px; font-size: 13px; color: #888;">
            You can reply directly to this email to respond to ${full_name.trim()}.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('[contact/route] Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send your message. Please try again.' },
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

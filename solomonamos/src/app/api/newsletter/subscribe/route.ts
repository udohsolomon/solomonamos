import { NextRequest, NextResponse } from 'next/server';

// Log env var presence on cold start (values are never logged)
console.log('[Newsletter] Environment check:', {
  hasPublicationId: !!process.env.BEEHIIV_PUBLICATION_ID,
  hasApiKey: !!process.env.BEEHIIV_API_KEY,
  publicationIdLength: process.env.BEEHIIV_PUBLICATION_ID?.length ?? 0,
  apiKeyLength: process.env.BEEHIIV_API_KEY?.length ?? 0,
});

const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, website } = body;

    // Honeypot: if the hidden "website" field is filled, it's a bot
    if (website) {
      return NextResponse.json({ success: true });
    }

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
    const apiKey = process.env.BEEHIIV_API_KEY;

    if (!publicationId || !apiKey) {
      return NextResponse.json(
        { error: 'Newsletter service not configured' },
        { status: 500 }
      );
    }

    const beehiivUrl = `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`;

    const response = await fetch(beehiivUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        send_welcome_email: true,
      }),
    });

    if (!response.ok) {
      try {
        const errorBody = await response.text();
        console.error(`[Newsletter] Beehiiv API error: status=${response.status}, body=${errorBody}`);
      } catch {
        console.error(`[Newsletter] Beehiiv API error: status=${response.status}, could not read body`);
      }

      const userMessage =
        response.status === 401 || response.status === 403
          ? 'Newsletter service authentication error'
          : response.status === 404
            ? 'Newsletter service configuration error'
            : response.status === 409
              ? 'This email is already subscribed'
              : response.status === 422
                ? 'Invalid email address'
                : response.status === 429
                  ? 'Too many requests. Please try again later.'
                  : 'Failed to subscribe. Please try again later.';

      return NextResponse.json(
        { error: userMessage },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Newsletter] Unhandled error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

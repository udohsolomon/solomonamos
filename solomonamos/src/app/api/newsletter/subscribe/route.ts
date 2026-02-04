import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
    const apiKey = process.env.BEEHIIV_API_KEY;

    console.log('Beehiiv config check:', {
      hasPublicationId: !!publicationId,
      hasApiKey: !!apiKey,
      publicationIdLength: publicationId?.length || 0,
    });

    if (!publicationId || !apiKey) {
      console.error('Beehiiv credentials not configured');
      return NextResponse.json(
        { error: 'Newsletter service not configured' },
        { status: 500 }
      );
    }

    const beehiivUrl = `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`;
    console.log('Calling Beehiiv API:', beehiivUrl);

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

    console.log('Beehiiv response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Beehiiv API error response:', errorText);

      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { raw: errorText };
      }

      return NextResponse.json(
        { error: 'Failed to subscribe', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Beehiiv success:', data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: String(error) },
      { status: 500 }
    );
  }
}

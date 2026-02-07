import type { Metadata } from 'next';
import Script from 'next/script';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://solomonamos.com';

export const metadata: Metadata = {
  title: 'Solomon Amos | Technical Architect & AI Consultant',
  description: 'Technical Architect helping organisations design and implement secure, scalable, and AI-powered solutions. PhD in Computer Science. AWS certified.',
  keywords: ['technical architect', 'AI consultant', 'cloud architecture', 'AI strategy', 'automation', 'AWS', 'security'],
  authors: [{ name: 'Solomon Amos' }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'icon', url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Solomon Amos | Technical Architect & AI Consultant',
    description: 'Technical Architect helping organisations design and implement secure, scalable, and AI-powered solutions.',
    url: siteUrl,
    siteName: 'Solomon Amos',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Solomon Amos - Technical Architect & AI Consultant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solomon Amos | Technical Architect & AI Consultant',
    description: 'Technical Architect helping organisations design and implement secure, scalable, and AI-powered solutions.',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    types: {
      'application/rss+xml': `${siteUrl}/feed.xml`,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: 'Solomon Amos',
      url: siteUrl,
      description: 'Technical Architect helping organisations design and implement secure, scalable, and AI-powered solutions.',
    },
    {
      '@type': 'Person',
      name: 'Solomon Amos',
      url: siteUrl,
      jobTitle: 'Technical Architect',
      description: 'Technical Architect with a PhD in Computer Science, helping organisations design and implement secure, scalable, and AI-powered solutions.',
      sameAs: [
        'https://x.com/laz_inc',
        'https://www.linkedin.com/in/solomonudoh/',
        'https://github.com/udohsolomon',
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-foreground font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-background focus:font-mono focus:text-sm"
        >
          Skip to main content
        </a>
        <div className="noise-overlay" aria-hidden="true" />
        <Navigation />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}

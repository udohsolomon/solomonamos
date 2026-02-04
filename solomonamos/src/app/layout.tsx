import type { Metadata } from 'next';
import Script from 'next/script';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Solomon Amos | AI & Tech Consultant',
  description: 'AI strategist and software engineer helping businesses leverage emerging technologies. Newsletter, consultancy, and software development services.',
  keywords: ['AI consultant', 'tech consultant', 'software development', 'AI strategy', 'automation'],
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
    title: 'Solomon Amos | AI & Tech Consultant',
    description: 'AI strategist and software engineer helping businesses leverage emerging technologies.',
    url: 'https://solomonamos.com',
    siteName: 'Solomon Amos',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solomon Amos | AI & Tech Consultant',
    description: 'AI strategist and software engineer helping businesses leverage emerging technologies.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased">
        <div className="noise-overlay" aria-hidden="true" />
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}

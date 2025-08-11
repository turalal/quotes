import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Inspirational Quotes | Daily Wisdom & Motivation',
  description: 'Discover thousands of inspirational quotes from famous authors, philosophers, and leaders. Get daily motivation with our collection of wisdom quotes organized by category.',
  keywords: 'quotes, inspiration, motivation, wisdom, famous quotes, daily quotes, inspirational quotes',
  authors: [{ name: 'Quotes App' }],
  robots: 'index, follow',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: '/apple-touch-icon.png'
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Inspirational Quotes | Daily Wisdom & Motivation',
    description: 'Discover thousands of inspirational quotes from famous authors, philosophers, and leaders.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inspirational Quotes | Daily Wisdom & Motivation',
    description: 'Discover thousands of inspirational quotes from famous authors, philosophers, and leaders.',
  }
};

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://your-domain.vercel.app" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Inspirational Quotes",
              "description": "Collection of inspirational quotes from famous authors and leaders",
              "url": "https://your-domain.vercel.app"
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        {children}
      </body>
    </html>
  );
}
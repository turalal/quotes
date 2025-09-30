import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'saying.to - Wisdom from Every Corner of Earth | Inspirational Quotes',
  description: 'Discover thousands of inspirational, motivational, and wisdom quotes from famous authors, philosophers, and leaders worldwide. Browse quotes by category: Life, Love, Philosophy, Spirituality, and more. Share beautiful quotes on WhatsApp, Instagram, Facebook, and Twitter.',
  keywords: 'quotes, inspirational quotes, motivational quotes, wisdom quotes, famous quotes, daily quotes, life quotes, love quotes, philosophy quotes, spirituality quotes, share quotes, quote of the day, saying.to',
  authors: [{ name: 'saying.to' }],
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
    title: 'saying.to - Wisdom from Every Corner of Earth',
    description: 'Discover thousands of inspirational, motivational, and wisdom quotes from famous authors and leaders. Browse by category and share beautiful quotes.',
    type: 'website',
    locale: 'en_US',
    url: 'https://saying.to',
    siteName: 'saying.to',
    images: [
      {
        url: 'https://saying.to/og-image.png',
        width: 1200,
        height: 630,
        alt: 'saying.to - Inspirational Quotes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'saying.to - Wisdom from Every Corner of Earth',
    description: 'Discover thousands of inspirational quotes from famous authors and leaders. Browse by category and share beautiful quotes.',
    site: '@sayingto',
    images: ['https://saying.to/og-image.png'],
  },
  alternates: {
    canonical: 'https://saying.to',
  },
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
        <meta name="google-site-verification" content="your-google-verification-code" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "saying.to",
              "alternateName": "Saying - Inspirational Quotes",
              "description": "Wisdom from every corner of Earth. Discover thousands of inspirational, motivational, and wisdom quotes from famous authors, philosophers, and leaders worldwide.",
              "url": "https://saying.to",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://saying.to/?search={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "saying.to",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://saying.to/logo.png"
                }
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "saying.to",
              "url": "https://saying.to",
              "description": "Browse and share inspirational quotes from famous authors and leaders",
              "applicationCategory": "LifestyleApplication",
              "operatingSystem": "All",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
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
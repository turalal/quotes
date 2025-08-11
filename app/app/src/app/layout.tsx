import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daily Quotes - Inspiration for Every Day",
  description: "Discover daily inspirational quotes from great minds throughout history. Get motivated with wisdom on life, success, love, courage, and more. New quote every day!",
  keywords: "daily quotes, inspirational quotes, motivational quotes, wisdom, inspiration, life quotes, success quotes",
  authors: [{ name: "Daily Quotes" }],
  creator: "Daily Quotes",
  publisher: "Daily Quotes",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://daily-quotes-app.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Daily Quotes - Inspiration for Every Day",
    description: "Discover daily inspirational quotes from great minds throughout history. Get motivated with wisdom on life, success, love, courage, and more.",
    url: 'https://daily-quotes-app.vercel.app',
    siteName: 'Daily Quotes',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Daily Quotes - Inspiration for Every Day',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Daily Quotes - Inspiration for Every Day",
    description: "Discover daily inspirational quotes from great minds throughout history.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={`${inter.className} antialiased bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900`}>
        {children}
      </body>
    </html>
  );
}

'use client';

import { Quote } from '@/types/quote';

interface JsonLdProps {
  quote?: Quote;
}

export default function JsonLd({ quote }: JsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://daily-quotes-app.vercel.app/#website',
        'url': 'https://daily-quotes-app.vercel.app',
        'name': 'Daily Quotes',
        'description': 'Discover daily inspirational quotes from great minds throughout history.',
        'publisher': {
          '@id': 'https://daily-quotes-app.vercel.app/#organization'
        }
      },
      {
        '@type': 'Organization',
        '@id': 'https://daily-quotes-app.vercel.app/#organization',
        'name': 'Daily Quotes',
        'url': 'https://daily-quotes-app.vercel.app',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://daily-quotes-app.vercel.app/logo.png'
        }
      },
      {
        '@type': 'WebPage',
        '@id': 'https://daily-quotes-app.vercel.app/#webpage',
        'url': 'https://daily-quotes-app.vercel.app',
        'name': 'Daily Quotes - Inspiration for Every Day',
        'description': 'Discover daily inspirational quotes from great minds throughout history. Get motivated with wisdom on life, success, love, courage, and more.',
        'datePublished': '2024-08-11',
        'dateModified': new Date().toISOString().split('T')[0],
        'isPartOf': {
          '@id': 'https://daily-quotes-app.vercel.app/#website'
        }
      }
    ]
  };

  if (quote) {
    (jsonLd['@graph'] as Array<Record<string, unknown>>).push({
      '@type': 'Quotation',
      'text': quote.quote,
      'author': {
        '@type': 'Person',
        'name': quote.author
      },
      'about': quote.category,
      'datePublished': new Date().toISOString().split('T')[0]
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
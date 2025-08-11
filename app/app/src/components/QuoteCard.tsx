'use client';

import { Quote } from '@/types/quote';
import { useState } from 'react';

interface QuoteCardProps {
  quote: Quote;
  className?: string;
}

export default function QuoteCard({ quote, className = '' }: QuoteCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`"${quote.quote}" - ${quote.author}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy quote:', error);
    }
  };

  const handleShare = async () => {
    const text = `"${quote.quote}" - ${quote.author}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Inspirational Quote',
          text,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className={`bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-xl border border-blue-200 dark:border-gray-700 ${className}`}>
      <div className="relative">
        <svg
          className="absolute -top-2 -left-2 w-8 h-8 text-blue-500 dark:text-blue-400"
          fill="currentColor"
          viewBox="0 0 32 32"
        >
          <path d="M10,8c-3.3,0-6,2.7-6,6v8c0,3.3,2.7,6,6,6h2c1.1,0,2-0.9,2-2s-0.9-2-2-2h-2c-1.1,0-2-0.9-2-2v-8c0-1.1,0.9-2,2-2h2c1.1,0,2-0.9,2-2S13.1,8,12,8H10z M26,8c-3.3,0-6,2.7-6,6v8c0,3.3,2.7,6,6,6h2c1.1,0,2-0.9,2-2s-0.9-2-2-2h-2c-1.1,0-2-0.9-2-2v-8c0-1.1,0.9-2,2-2h2c1.1,0,2-0.9,2-2S29.1,8,28,8H26z"/>
        </svg>
        
        <blockquote className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-gray-800 dark:text-gray-200 mb-6 pl-6">
          {quote.quote}
        </blockquote>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <cite className="text-lg font-medium text-gray-600 dark:text-gray-400">
            — {quote.author}
          </cite>
          
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {quote.category.charAt(0).toUpperCase() + quote.category.slice(1).replace('-', ' ')}
            </span>
            
            <button
              onClick={handleCopy}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
              title="Copy quote"
            >
              {copied ? (
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
            
            <button
              onClick={handleShare}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
              title="Share quote"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { Quote } from '@/types/quote';

interface QuoteCardProps {
  quote: Quote;
  onShare?: () => void;
}

export default function QuoteCard({ quote, onShare }: QuoteCardProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(`"${quote.quote}" - ${quote.author}`);
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(`&ldquo;${quote.quote}&rdquo; - ${quote.author}`);
    const url = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 m-4 max-w-2xl mx-auto transition-all duration-300 hover:shadow-xl">
      <blockquote className="text-lg md:text-xl text-gray-800 dark:text-gray-200 mb-4 italic leading-relaxed">
        &ldquo;{quote.quote}&rdquo;
      </blockquote>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <p className="text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300">
            — {quote.author}
          </p>
          <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full mt-2">
            {quote.category}
          </span>
        </div>
        
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button
            onClick={handleCopy}
            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors"
            title="Copy quote"
          >
            Copy
          </button>
          <button
            onClick={handleTwitterShare}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
            title="Share on Twitter"
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}
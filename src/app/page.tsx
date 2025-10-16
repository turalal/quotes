'use client';

import { useState, useEffect } from 'react';

const API_BASE_URL = '';

const categories = [
  { id: 'all', name: 'All', icon: '🌟', searchTerm: '' },
  { id: 'inspirational', name: 'Inspirational', icon: '✨', searchTerm: 'inspirational' },
  { id: 'life', name: 'Life', icon: '🌱', searchTerm: 'life' },
  { id: 'love', name: 'Love', icon: '❤️', searchTerm: 'love' },
  { id: 'wisdom', name: 'Wisdom', icon: '🧠', searchTerm: 'wisdom' },
  { id: 'philosophy', name: 'Philosophy', icon: '🤔', searchTerm: 'philosophy' },
  { id: 'spirituality', name: 'Spirituality', icon: '🕉️', searchTerm: 'spirituality' },
  { id: 'humor', name: 'Humor', icon: '😄', searchTerm: 'humor' }
];

interface Quote {
  id: number;
  text: string;
  author: string;
  category: string;
  tags?: string[];
}

export default function Home() {
  useEffect(() => {
    // Add AdSense script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3719459726247715';
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);

    // Add meta tag
    const meta = document.createElement('meta');
    meta.name = 'google-adsense-account';
    meta.content = 'ca-pub-3719459726247715';
    document.head.appendChild(meta);
  }, []);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadQuotes = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const selectedCategory = categories.find(c => c.id === currentCategory);
      let url = `${API_BASE_URL}/api/quotes?limit=50`;

      if (selectedCategory && selectedCategory.searchTerm) {
        url += `&search=${encodeURIComponent(selectedCategory.searchTerm)}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch quotes');

      const data = await response.json();
      setQuotes(data.quotes || []);
      setCurrentQuoteIndex(0);

    } catch (err) {
      console.error('Error loading quotes:', err);
      setError('Failed to load quotes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadQuotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategory]);

  const currentQuote = quotes[currentQuoteIndex];

  const nextQuote = () => {
    if (quotes.length === 0) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      const nextIndex = (currentQuoteIndex + 1) % quotes.length;
      setCurrentQuoteIndex(nextIndex);
      setIsAnimating(false);
    }, 300);
  };

  const shareQuote = (platform: string) => {
    if (!currentQuote) return;
    
    const text = `"${currentQuote.text}" - ${currentQuote.author || 'Unknown'}`;
    const url = 'https://saying.to';
    
    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' - ' + url)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      instagram: `https://www.instagram.com/`
    };
    
    if (platform === 'instagram') {
      alert('To share on Instagram: Take a screenshot and post it to your story or feed!');
      return;
    }
    
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  const copyToClipboard = () => {
    if (!currentQuote) return;
    
    const text = `"${currentQuote.text}" - ${currentQuote.author || 'Unknown'}\n\nFrom saying.to`;
    navigator.clipboard.writeText(text);
    alert('Quote copied to clipboard!');
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#003135' }}>
      {/* Subtle texture overlay */}
      <div className="fixed inset-0 -z-10 opacity-20 mix-blend-screen" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.02%22 numOctaves=%222%22 /%3E%3C/filter%3E%3Crect width=%22100%22 height=%22100%22 fill=%22%23ffffff%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E")',
        backgroundSize: '100px 100px'
      }}></div>

      {/* Header */}
      <header className="relative z-10 py-12 md:py-16 text-center" style={{ borderBottom: '1px solid #0FA4AF' }}>
        <div className="max-w-6xl mx-auto px-4">
          {/* Large decorative icon */}
          <div className="mb-8 flex justify-center">
            <svg className="w-24 h-24 md:w-32 md:h-32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="4" fill="#0FA4AF"/>
              <circle cx="50" cy="50" r="16" stroke="#0FA4AF" strokeWidth="1.5" opacity="0.7"/>
              <circle cx="50" cy="50" r="32" stroke="#0FA4AF" strokeWidth="1.5" opacity="0.5"/>
              <circle cx="50" cy="50" r="48" stroke="#0FA4AF" strokeWidth="1.5" opacity="0.3"/>
            </svg>
          </div>
          
          {/* Site name */}
          <h1 className="text-6xl md:text-8xl font-thin mb-3 tracking-wider" style={{ color: '#0FA4AF' }}>
            SAYING
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl font-light max-w-2xl mx-auto" style={{ color: '#0FA4AF' }}>
            Words that echo in silence
          </p>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-3 sm:px-4 py-8 sm:py-12">
        <div className="max-w-4xl w-full">
          
          {/* Category Navigation */}
          <nav className="mb-12 flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => {
                  setCurrentCategory(category.id);
                  setCurrentQuoteIndex(0);
                }}
                disabled={isLoading}
                className="px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl transition-all duration-300 font-light text-xs sm:text-sm hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: currentCategory === category.id ? '#0FA4AF' : '#024950',
                  color: currentCategory === category.id ? '#003135' : '#0FA4AF'
                }}
              >
                <span>{category.icon}</span>
                <span className="hidden xs:inline ml-1">{category.name}</span>
              </button>
            ))}
          </nav>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 mb-4" style={{ borderBottomColor: '#0FA4AF', borderColor: '#024950', borderWidth: '2px' }}></div>
              <p className="font-light text-lg" style={{ color: '#0FA4AF' }}>Loading amazing quotes...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">😞</div>
              <p className="text-lg mb-4 font-light" style={{ color: '#0FA4AF' }}>{error}</p>
              <button 
                onClick={loadQuotes}
                className="px-6 py-3 rounded-lg font-light text-sm hover:scale-105 transition-all"
                style={{ backgroundColor: '#0FA4AF', color: '#003135' }}
              >
                Try Again
              </button>
            </div>
          )}

          {/* Quote Display */}
          {!isLoading && !error && currentQuote && (
            <article className={`transition-all duration-500 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
              <div className="relative rounded-2xl sm:rounded-3xl shadow-2xl max-w-4xl mx-auto mb-8">
                <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16" style={{ backgroundColor: '#024950' }}>
                  <div className="text-center relative">
                    <blockquote className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-relaxed mb-8 px-2" style={{ color: '#AFDDE5' }}>
                      {'\u201c'}{currentQuote.text}{'\u201d'}
                    </blockquote>

                    <div className="flex items-center justify-center gap-3 mb-8">
                      <div className="h-px flex-1" style={{ backgroundColor: '#0FA4AF', maxWidth: '60px' }}></div>
                      <p className="text-base sm:text-lg md:text-xl font-light" style={{ color: '#0FA4AF' }}>
                        {currentQuote.author || 'Unknown'}
                      </p>
                      <div className="h-px flex-1" style={{ backgroundColor: '#0FA4AF', maxWidth: '60px' }}></div>
                    </div>
                    
                    {currentQuote.tags && currentQuote.tags.length > 0 && (
                      <div className="flex flex-wrap gap-3 justify-center mb-10">
                        {currentQuote.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="px-4 py-2 text-sm font-light rounded-full"
                            style={{ backgroundColor: '#003135', color: '#0FA4AF', border: '1px solid #0FA4AF' }}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-3 sm:gap-4 justify-center items-center">
                      <button
                        onClick={nextQuote}
                        disabled={isLoading || quotes.length <= 1}
                        className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-light text-sm sm:text-base hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ backgroundColor: '#0FA4AF', color: '#003135' }}
                      >
                        <span className="flex items-center gap-2">
                          <span className="hidden sm:inline">Next Quote</span>
                          <span className="sm:hidden">Next</span>
                          🚀
                        </span>
                      </button>

                      <button
                        onClick={copyToClipboard}
                        className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-light text-sm sm:text-base transition-all hover:scale-105"
                        style={{ backgroundColor: '#003135', color: '#0FA4AF', border: '1px solid #0FA4AF' }}
                      >
                        <span className="flex items-center gap-2">
                          📋 <span className="hidden sm:inline">Copy</span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Share Section */}
              <div className="max-w-4xl mx-auto rounded-2xl sm:rounded-3xl p-6 sm:p-8" style={{ backgroundColor: '#024950', border: '1px solid #0FA4AF' }}>
                <h3 className="text-center text-base sm:text-lg font-light mb-6" style={{ color: '#0FA4AF' }}>
                  📢 Share the Wisdom
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center">
                  <button
                    onClick={() => shareQuote('whatsapp')}
                    className="flex items-center gap-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium hover:scale-105 transition-all"
                    style={{ backgroundColor: '#0FA4AF', color: '#003135' }}
                  >
                    <span>📱</span>
                    <span className="hidden sm:inline">WhatsApp</span>
                  </button>
                  <button
                    onClick={() => shareQuote('instagram')}
                    className="flex items-center gap-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium hover:scale-105 transition-all"
                    style={{ backgroundColor: '#0FA4AF', color: '#003135' }}
                  >
                    <span>📷</span>
                    <span className="hidden sm:inline">Instagram</span>
                  </button>
                  <button
                    onClick={() => shareQuote('telegram')}
                    className="flex items-center gap-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium hover:scale-105 transition-all"
                    style={{ backgroundColor: '#0FA4AF', color: '#003135' }}
                  >
                    <span>✈️</span>
                    <span className="hidden sm:inline">Telegram</span>
                  </button>
                  <button
                    onClick={() => shareQuote('facebook')}
                    className="flex items-center gap-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium hover:scale-105 transition-all"
                    style={{ backgroundColor: '#0FA4AF', color: '#003135' }}
                  >
                    <span>👍</span>
                    <span className="hidden sm:inline">Facebook</span>
                  </button>
                  <button
                    onClick={() => shareQuote('twitter')}
                    className="flex items-center gap-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium hover:scale-105 transition-all"
                    style={{ backgroundColor: '#0FA4AF', color: '#003135' }}
                  >
                    <span>🐦</span>
                    <span className="hidden sm:inline">Twitter</span>
                  </button>
                </div>
              </div>
            </article>
          )}

          {/* Empty State */}
          {!isLoading && !error && quotes.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-lg mb-4 font-light" style={{ color: '#0FA4AF' }}>No quotes found for this category.</p>
              <p className="font-light" style={{ color: '#0FA4AF', opacity: 0.7 }}>Try selecting a different category.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-12 sm:mt-16 md:mt-20 py-8 sm:py-10 md:py-12" style={{ borderTop: '1px solid #0FA4AF' }}>
        <div className="max-w-6xl mx-auto px-3 sm:px-4 text-center">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-light mb-2" style={{ color: '#0FA4AF' }}>
              SAYING 🌍
            </h3>
            <p className="text-sm sm:text-base font-light" style={{ color: '#0FA4AF', opacity: 0.8 }}>
              Wisdom from every corner of Earth
            </p>
          </div>
          <div className="text-xs font-light space-y-1 sm:space-y-2" style={{ color: '#0FA4AF', opacity: 0.6 }}>
            <p>Made with ❤️ for quote lovers worldwide</p>
            {!isLoading && quotes.length > 0 && (
              <p className="hidden sm:block">Currently showing {quotes.length} inspiring quotes</p>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}

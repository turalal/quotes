'use client';

import { useState, useEffect } from 'react';

// API Configuration - use local API routes
const API_BASE_URL = '';

// Generate gradient colors for quotes
const generateGradientColor = (id: number, category: string) => {
  const gradients: Record<string, string[]> = {
    serious: [
      "from-purple-500 to-blue-600",
      "from-blue-500 to-cyan-400", 
      "from-indigo-500 to-purple-600",
      "from-slate-600 to-blue-600"
    ],
    funny: [
      "from-yellow-400 to-orange-500",
      "from-orange-400 to-red-500",
      "from-pink-400 to-yellow-400",
      "from-green-400 to-yellow-500"
    ],
    trending: [
      "from-red-500 to-pink-600",
      "from-pink-500 to-purple-600",
      "from-green-400 to-blue-500",
      "from-cyan-400 to-blue-500"
    ],
    default: [
      "from-gray-600 to-gray-800",
      "from-slate-500 to-gray-700"
    ]
  };
  
  const categoryGradients = gradients[category] || gradients.default;
  return categoryGradients[id % categoryGradients.length];
};

const categories = [
  { id: 'all', name: 'All', icon: '🌟', color: 'from-gray-600 to-gray-800', searchTerm: '' },
  { id: 'inspirational', name: 'Inspirational', icon: '✨', color: 'from-purple-600 to-blue-600', searchTerm: 'inspirational' },
  { id: 'life', name: 'Life', icon: '🌱', color: 'from-green-600 to-teal-600', searchTerm: 'life' },
  { id: 'love', name: 'Love', icon: '❤️', color: 'from-pink-500 to-rose-600', searchTerm: 'love' },
  { id: 'wisdom', name: 'Wisdom', icon: '🧠', color: 'from-indigo-600 to-purple-600', searchTerm: 'wisdom' },
  { id: 'philosophy', name: 'Philosophy', icon: '🤔', color: 'from-slate-600 to-indigo-600', searchTerm: 'philosophy' },
  { id: 'spirituality', name: 'Spirituality', icon: '🕉️', color: 'from-yellow-500 to-orange-600', searchTerm: 'spirituality' },
  { id: 'humor', name: 'Humor', icon: '😄', color: 'from-orange-500 to-red-500', searchTerm: 'humor' }
];

interface Quote {
  id: number;
  text: string;
  author: string;
  category: string;
  tags?: string[];
}

const FloatingElement = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <div 
    className="animate-bounce"
    style={{ 
      animationDelay: `${delay}s`,
      animationDuration: '3s',
      animationIterationCount: 'infinite'
    }}
  >
    {children}
  </div>
);

export default function Home() {
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
      instagram: `https://www.instagram.com/` // Instagram doesn't have direct sharing, opens app
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden" role="application" aria-label="Inspirational Quotes Application">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-10 animate-ping"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-pink-400 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-cyan-400 rounded-full opacity-10 animate-bounce"></div>
        <div className="absolute top-1/2 right-10 w-8 h-8 bg-green-400 rounded-full opacity-10 animate-spin"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="text-2xl sm:text-3xl animate-spin-slow">🌍</div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  saying.to
                </h1>
                <p className="text-xs sm:text-sm text-gray-400 hidden sm:block">Wisdom from every corner of Earth</p>
              </div>
            </div>
          </div>
        </div>
        <head>
  <script
    async
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3719459726247715"
    crossOrigin="anonymous"></script>
</head>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-JRK1WRSPDH"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-JRK1WRSPDH');
</script>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8">

        {/* Category Filter */}
        <nav aria-label="Quote categories" className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-12 justify-center">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => {
                setCurrentCategory(category.id);
                setCurrentQuoteIndex(0);
              }}
              disabled={isLoading}
              aria-label={`Filter by ${category.name} quotes`}
              aria-pressed={currentCategory === category.id}
              className={`group relative px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                currentCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-2xl shadow-purple-500/25`
                  : 'bg-white/10 backdrop-blur text-gray-300 hover:bg-white/20 border border-white/20'
              }`}
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-base sm:text-lg" aria-hidden="true">{category.icon}</span>
                <span className="hidden xs:inline">{category.name}</span>
              </div>
              {currentCategory === category.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse rounded-xl sm:rounded-2xl"></div>
              )}
            </button>
          ))}
        </nav>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12" role="status" aria-live="polite">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mb-4" aria-hidden="true"></div>
            <p className="text-white/70 text-lg">Loading amazing quotes...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😞</div>
            <p className="text-red-400 text-lg mb-4">{error}</p>
            <button 
              onClick={loadQuotes}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-bold hover:from-cyan-400 hover:to-blue-500 transition-all transform hover:scale-105"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Quote Card */}
        {!isLoading && !error && currentQuote && (
          <article className={`transition-all duration-500 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`} aria-live="polite">
            <div className={`relative bg-gradient-to-br ${generateGradientColor(currentQuote.id, currentQuote.category)} p-1 rounded-2xl sm:rounded-3xl shadow-2xl max-w-4xl mx-auto mb-6 sm:mb-8`}>
              <div className="bg-black/30 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12">
                
                {/* Decorative Elements */}
                <div className="absolute top-4 left-4">
                  <FloatingElement delay={0}>
                    <div className="text-2xl opacity-30">💭</div>
                  </FloatingElement>
                </div>
                <div className="absolute top-4 right-4">
                  <FloatingElement delay={1}>
                    <div className="text-2xl opacity-30">✨</div>
                  </FloatingElement>
                </div>

                <div className="text-center relative">
                  {/* Quote Text */}
                  <div className="mb-6 sm:mb-8">
                    <div className="text-4xl sm:text-6xl md:text-8xl font-bold text-white/10 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 sm:-translate-y-4 select-none">
                      &ldquo;
                    </div>
                    <blockquote className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-light text-white leading-relaxed relative z-10 mb-4 sm:mb-6 px-2">
                      {currentQuote.text}
                    </blockquote>
                  </div>

                  {/* Author */}
                  <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                    <p className="text-sm sm:text-base md:text-lg text-cyan-200 font-medium">
                      {currentQuote.author || 'Unknown'}
                    </p>
                    <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                  </div>
                  
                  {/* Tags */}
                  {currentQuote.tags && currentQuote.tags.length > 0 && (
                    <div className="flex flex-wrap gap-3 justify-center mb-8">
                      {currentQuote.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-4 py-2 bg-white/20 backdrop-blur text-white text-sm rounded-full border border-white/30 hover:bg-white/30 transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center items-center">
                    <button
                      onClick={nextQuote}
                      disabled={isLoading || quotes.length <= 1}
                      aria-label="Show next quote"
                      className="group px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base hover:from-cyan-400 hover:to-blue-500 transition-all transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="flex items-center gap-1.5 sm:gap-2">
                        <span className="hidden sm:inline">Next Quote</span>
                        <span className="sm:hidden">Next</span>
                        <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">🚀</span>
                      </span>
                    </button>

                    <button
                      onClick={copyToClipboard}
                      aria-label="Copy quote to clipboard"
                      className="px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-4 bg-white/20 backdrop-blur text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base hover:bg-white/30 transition-all transform hover:scale-105"
                    >
                      <span className="flex items-center gap-1.5 sm:gap-2">
                        <span aria-hidden="true">📋</span> <span className="hidden sm:inline">Copy</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* No Quotes State */}
        {!isLoading && !error && quotes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-white/70 text-lg mb-4">No quotes found for this category.</p>
            <p className="text-white/50 text-sm">Try selecting a different category.</p>
          </div>
        )}

        {/* Share Buttons - Enhanced with all platforms */}
        {!isLoading && !error && currentQuote && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/20">
              <h3 className="text-center text-base sm:text-lg font-bold text-cyan-300 mb-4 sm:mb-6">
                📢 Share the Wisdom
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center">
                <button
                  onClick={() => shareQuote('whatsapp')}
                  className="flex items-center gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-[#25D366] hover:bg-[#20BD5C] text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium hover:scale-105 transition-all shadow-lg"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span className="hidden sm:inline">WhatsApp</span>
                </button>
                <button
                  onClick={() => shareQuote('instagram')}
                  className="flex items-center gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium hover:scale-105 transition-all shadow-lg"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span className="hidden sm:inline">Instagram</span>
                </button>
                <button
                  onClick={() => shareQuote('telegram')}
                  className="flex items-center gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-[#0088cc] hover:bg-[#0077b5] text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium hover:scale-105 transition-all shadow-lg"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  <span className="hidden sm:inline">Telegram</span>
                </button>
                <button
                  onClick={() => shareQuote('facebook')}
                  className="flex items-center gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium hover:scale-105 transition-all shadow-lg"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="hidden sm:inline">Facebook</span>
                </button>
                <button
                  onClick={() => shareQuote('twitter')}
                  className="flex items-center gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-black hover:bg-gray-900 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium hover:scale-105 transition-all shadow-lg"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span className="hidden sm:inline">Twitter</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black/30 backdrop-blur-lg mt-10 sm:mt-16 md:mt-20 py-8 sm:py-10 md:py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 text-center">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
              saying.to 🌍
            </h3>
            <p className="text-sm sm:text-base text-gray-400">
              Wisdom from every corner of Earth
            </p>
          </div>
          <div className="text-xs text-gray-500 space-y-1 sm:space-y-2">
            <p>Made with ❤️ for quote lovers worldwide</p>
            {!isLoading && quotes.length > 0 && (
              <p className="hidden sm:block">Currently showing {quotes.length} inspiring quotes</p>
            )}
          </div>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 4s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

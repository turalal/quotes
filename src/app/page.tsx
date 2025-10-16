'use client';

import { useState, useEffect } from 'react';

const API_BASE_URL = '';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-10 animate-ping"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-pink-400 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-cyan-400 rounded-full opacity-10 animate-bounce"></div>
        <div className="absolute top-1/2 right-10 w-8 h-8 bg-green-400 rounded-full opacity-10 animate-spin"></div>
      </div>

      {/* New Header Design */}
      <header className="relative z-10 py-16 md:py-20 text-center" style={{ borderBottom: '1px solid #0FA4AF' }}>
        <div className="max-w-6xl mx-auto px-3 sm:px-4">
          {/* Ripple Icon */}
          <div className="mb-8 flex justify-center">
            <svg className="w-32 h-32 md:w-40 md:h-40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="4" fill="#0FA4AF"/>
              <circle cx="50" cy="50" r="16" stroke="#0FA4AF" strokeWidth="1.5" opacity="0.7"/>
              <circle cx="50" cy="50" r="32" stroke="#0FA4AF" strokeWidth="1.5" opacity="0.5"/>
              <circle cx="50" cy="50" r="48" stroke="#0FA4AF" strokeWidth="1.5" opacity="0.3"/>
            </svg>
          </div>
          
          {/* Title */}
          <h1 className="text-6xl md:text-8xl font-thin tracking-wider mb-4" style={{ color: '#0FA4AF' }}>
            SAYING
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl font-light" style={{ color: '#0FA4AF' }}>
            Words that echo in silence
          </p>
        </div>
      </header>

      {/* Welcome Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 pt-6 sm:pt-8 pb-4 sm:pb-6">
        <div className="bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-white/20 shadow-2xl">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mb-4">
              Welcome to Saying
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
              A clean and inspiring space where you can discover meaningful quotes, reflections, and short thoughts about life, happiness, and success. Every line here is created to spark inspiration and positive thinking.
            </p>
          </div>
        </div>
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8">

        <nav className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-12 justify-center">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => {
                setCurrentCategory(category.id);
                setCurrentQuoteIndex(0);
              }}
              disabled={isLoading}
              className={`group relative px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                currentCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-2xl shadow-purple-500/25`
                  : 'bg-white/10 backdrop-blur text-gray-300 hover:bg-white/20 border border-white/20'
              }`}
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-base sm:text-lg">{category.icon}</span>
                <span className="hidden xs:inline">{category.name}</span>
              </div>
              {currentCategory === category.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse rounded-xl sm:rounded-2xl"></div>
              )}
            </button>
          ))}
        </nav>

        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mb-4"></div>
            <p className="text-white/70 text-lg">Loading amazing quotes...</p>
          </div>
        )}

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

        {!isLoading && !error && currentQuote && (
          <article className={`transition-all duration-500 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            <div className={`relative bg-gradient-to-br ${generateGradientColor(currentQuote.id, currentQuote.category)} p-1 rounded-2xl sm:rounded-3xl shadow-2xl max-w-4xl mx-auto mb-6 sm:mb-8`}>
              <div className="bg-black/30 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12">
                
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
                  <div className="mb-6 sm:mb-8">
                    <div className="text-4xl sm:text-6xl md:text-8xl font-bold text-white/10 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 sm:-translate-y-4 select-none">
                      &ldquo;
                    </div>
                    <blockquote className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-light text-white leading-relaxed relative z-10 mb-4 sm:mb-6 px-2">
                      {currentQuote.text}
                    </blockquote>
                  </div>

                  <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                    <p className="text-sm sm:text-base md:text-lg text-cyan-200 font-medium">
                      {currentQuote.author || 'Unknown'}
                    </p>
                    <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                  </div>
                  
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

                  <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center items-center">
                    <button
                      onClick={nextQuote}
                      disabled={isLoading || quotes.length <= 1}
                      className="group px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base hover:from-cyan-400 hover:to-blue-500 transition-all transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="flex items-center gap-1.5 sm:gap-2">
                        <span className="hidden sm:inline">Next Quote</span>
                        <span className="sm:hidden">Next</span>
                        <span className="group-hover:translate-x-1 transition-transform">🚀</span>
                      </span>
                    </button>

                    <button
                      onClick={copyToClipboard}
                      className="px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-4 bg-white/20 backdrop-blur text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base hover:bg-white/30 transition-all transform hover:scale-105"
                    >
                      <span className="flex items-center gap-1.5 sm:gap-2">
                        <span>📋</span> <span className="hidden sm:inline">Copy</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        )}

        {!isLoading && !error && quotes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-white/70 text-lg mb-4">No quotes found for this category.</p>
            <p className="text-white/50 text-sm">Try selecting a different category.</p>
          </div>
        )}

        {!isLoading && !error && currentQuote && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/20">
              <h3 className="text-center text-base sm:text-lg font-bold text-cyan-300 mb-4 sm:mb-6">
                📢 Share the Wisdom
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center">
                <button
                  onClick={() => shareQuote('whatsapp')}
                  className="flex items-center gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium hover:scale-105 transition-all shadow-lg"
                >
                  <span>📱</span>
                  <span className="hidden sm:inline">WhatsApp</span>
                </button>
                <button
                  onClick={() => shareQuote('instagram')}
                  className="flex items-center gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 hover:opacity-90 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium hover:scale-105 transition-all shadow-lg"
                >
                  <span>📷</span>
                  <span className="hidden sm:inline">Instagram</span>
                </button>
                <button
                  onClick={() => shareQuote('telegram')}
                  className="flex items-center gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium hover:scale-105 transition-all shadow-lg"
                >
                  <span>✈️</span>
                  <span className="hidden sm:inline">Telegram</span>
                </button>
                <button
                  onClick={() => shareQuote('facebook')}
                  className="flex items-center gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium hover:scale-105 transition-all shadow-lg"
                >
                  <span>👍</span>
                  <span className="hidden sm:inline">Facebook</span>
                </button>
                <button
                  onClick={() => shareQuote('twitter')}
                  className="flex items-center gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-black hover:bg-gray-900 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium hover:scale-105 transition-all shadow-lg"
                >
                  <span>🐦</span>
                  <span className="hidden sm:inline">Twitter</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

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

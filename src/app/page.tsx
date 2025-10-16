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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-5 animate-ping"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-pink-400 rounded-full opacity-5 animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-cyan-400 rounded-full opacity-5 animate-bounce"></div>
        <div className="absolute top-1/2 right-10 w-8 h-8 bg-green-400 rounded-full opacity-5 animate-spin"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 py-16 md:py-20 text-center border-b border-white/5">
        <div className="max-w-6xl mx-auto px-3 sm:px-4">
          <div className="mb-8 flex justify-center">
            <svg className="w-28 h-28 md:w-36 md:h-36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="4" fill="#0FA4AF"/>
              <circle cx="50" cy="50" r="16" stroke="#0FA4AF" strokeWidth="1.5" opacity="0.7"/>
              <circle cx="50" cy="50" r="32" stroke="#0FA4AF" strokeWidth="1.5" opacity="0.5"/>
              <circle cx="50" cy="50" r="48" stroke="#0FA4AF" strokeWidth="1.5" opacity="0.3"/>
            </svg>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-extralight tracking-wider mb-3" style={{ color: '#0FA4AF', letterSpacing: '0.15em' }}>
            SAYING
          </h1>
          
          <p className="text-sm md:text-base font-light" style={{ color: '#0FA4AF', opacity: 0.8 }}>
            A quiet place for loud thoughts
          </p>
        </div>
      </header>

      {/* Welcome Section - Refined */}
      <div className="relative z-10 max-w-3xl mx-auto px-3 sm:px-4 pt-10 sm:pt-12 pb-8 sm:pb-10">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-light mb-3 text-gray-100">
            Discover words that heal, provoke, and linger
          </h2>
          <p className="text-sm text-gray-400 font-light leading-relaxed">
            Meaningful reflections on life, love, wisdom, and the human experience
          </p>
        </div>
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 py-8 sm:py-12">

        {/* Category Navigation */}
        <nav className="flex flex-wrap gap-2 sm:gap-3 mb-12 sm:mb-16 justify-center">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => {
                setCurrentCategory(category.id);
                setCurrentQuoteIndex(0);
              }}
              disabled={isLoading}
              className="relative px-4 sm:px-5 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all duration-300 hover:scale-105 disabled:opacity-50"
              style={{
                backgroundColor: currentCategory === category.id ? '#0FA4AF' : 'rgba(255,255,255,0.05)',
                color: currentCategory === category.id ? '#003135' : '#0FA4AF',
                border: currentCategory === category.id ? 'none' : '1px solid rgba(15, 164, 175, 0.2)'
              }}
            >
              <span>{category.icon}</span>
              <span className="hidden xs:inline ml-1.5">{category.name}</span>
            </button>
          ))}
        </nav>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-24">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#0FA4AF' }} mb-4></div>
            <p className="text-gray-400 text-base font-light mt-4">Loading your next moment of clarity...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">✕</div>
            <p className="text-gray-300 text-base mb-6 font-light">{error}</p>
            <button 
              onClick={loadQuotes}
              className="px-6 py-2.5 text-white rounded-lg font-medium transition-all hover:scale-105"
              style={{ backgroundColor: '#0FA4AF', color: '#003135' }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Quote Display */}
        {!isLoading && !error && currentQuote && (
          <article className={`transition-all duration-700 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            {/* Quote Card */}
            <div className={`relative bg-gradient-to-br ${generateGradientColor(currentQuote.id, currentQuote.category)} p-0.5 rounded-2xl max-w-4xl mx-auto mb-10`}
              style={{
                boxShadow: '0 20px 60px rgba(15, 164, 175, 0.15)'
              }}>
              <div className="bg-gradient-to-b from-slate-900/95 to-purple-950/95 backdrop-blur-xl rounded-2xl px-8 sm:px-10 md:px-14 py-16 sm:py-20">
                
                <div className="text-center">
                  {/* Main Quote Text - Large & Clear */}
                  <blockquote className="text-2xl sm:text-4xl md:text-5xl font-light leading-relaxed mb-10 text-white">
                    {'\u201c'}{currentQuote.text}{'\u201d'}
                  </blockquote>

                  {/* Author - Dimmed & Smaller */}
                  <div className="flex items-center justify-center gap-3 mb-12">
                    <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
                    <p className="text-sm md:text-base font-light" style={{ color: '#b0b0b0' }}>
                      {currentQuote.author || 'Unknown'}
                    </p>
                    <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
                  </div>
                  
                  {/* Tags */}
                  {currentQuote.tags && currentQuote.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-center mb-12">
                      {currentQuote.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 text-xs font-light rounded-full"
                          style={{ backgroundColor: 'rgba(15, 164, 175, 0.1)', color: '#0FA4AF', border: '1px solid rgba(15, 164, 175, 0.3)' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4 sm:gap-6 justify-center items-center">
                    <button
                      onClick={nextQuote}
                      disabled={isLoading || quotes.length <= 1}
                      className="px-8 py-3 rounded-lg font-semibold text-sm transition-all hover:scale-105 active:scale-95"
                      style={{ 
                        background: 'linear-gradient(135deg, #0FA4AF 0%, #089DA1 100%)',
                        color: '#003135',
                        boxShadow: '0 0 20px rgba(15, 164, 175, 0.3)'
                      }}
                    >
                      Next Quote
                    </button>

                    <button
                      onClick={copyToClipboard}
                      className="px-8 py-3 rounded-lg font-medium text-sm transition-all hover:scale-105 active:scale-95"
                      style={{ 
                        backgroundColor: 'rgba(15, 164, 175, 0.08)',
                        color: '#0FA4AF',
                        border: '1px solid #0FA4AF'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 15px rgba(15, 164, 175, 0.4)';
                        e.currentTarget.style.backgroundColor = 'rgba(15, 164, 175, 0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.backgroundColor = 'rgba(15, 164, 175, 0.08)';
                      }}
                    >
                      Copy Quote
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Share Section - Enhanced */}
            <div className="max-w-4xl mx-auto mt-12">
              <div className="border-t border-white/10 pt-10 pb-4">
                <p className="text-center text-xs font-semibold mb-8" style={{ color: '#0FA4AF', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                  Share the Wisdom
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={() => shareQuote('whatsapp')}
                    className="w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all hover:scale-110 active:scale-95"
                    style={{ 
                      backgroundColor: 'rgba(15, 164, 175, 0.1)',
                      border: '1px solid rgba(15, 164, 175, 0.3)',
                      color: '#0FA4AF'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(15, 164, 175, 0.4)';
                      e.currentTarget.style.backgroundColor = 'rgba(15, 164, 175, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.backgroundColor = 'rgba(15, 164, 175, 0.1)';
                    }}
                    title="Share on WhatsApp"
                  >
                    💬
                  </button>
                  <button
                    onClick={() => shareQuote('instagram')}
                    className="w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all hover:scale-110 active:scale-95"
                    style={{ 
                      backgroundColor: 'rgba(15, 164, 175, 0.1)',
                      border: '1px solid rgba(15, 164, 175, 0.3)',
                      color: '#0FA4AF'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(15, 164, 175, 0.4)';
                      e.currentTarget.style.backgroundColor = 'rgba(15, 164, 175, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.backgroundColor = 'rgba(15, 164, 175, 0.1)';
                    }}
                    title="Share on Instagram"
                  >
                    📷
                  </button>
                  <button
                    onClick={() => shareQuote('telegram')}
                    className="w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all hover:scale-110 active:scale-95"
                    style={{ 
                      backgroundColor: 'rgba(15, 164, 175, 0.1)',
                      border: '1px solid rgba(15, 164, 175, 0.3)',
                      color: '#0FA4AF'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(15, 164, 175, 0.4)';
                      e.currentTarget.style.backgroundColor = 'rgba(15, 164, 175, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.backgroundColor = 'rgba(15, 164, 175, 0.1)';
                    }}
                    title="Share on Telegram"
                  >
                    ✈️
                  </button>
                  <button
                    onClick={() => shareQuote('facebook')}
                    className="w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all hover:scale-110 active:scale-95"
                    style={{ 
                      backgroundColor: 'rgba(15, 164, 175, 0.1)',
                      border: '1px solid rgba(15, 164, 175, 0.3)',
                      color: '#0FA4AF'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(15, 164, 175, 0.4)';
                      e.currentTarget.style.backgroundColor = 'rgba(15, 164, 175, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.backgroundColor = 'rgba(15, 164, 175, 0.1)';
                    }}
                    title="Share on Facebook"
                  >
                    👍
                  </button>
                  <button
                    onClick={() => shareQuote('twitter')}
                    className="w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all hover:scale-110 active:scale-95"
                    style={{ 
                      backgroundColor: 'rgba(15, 164, 175, 0.1)',
                      border: '1px solid rgba(15, 164, 175, 0.3)',
                      color: '#0FA4AF'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(15, 164, 175, 0.4)';
                      e.currentTarget.style.backgroundColor = 'rgba(15, 164, 175, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.backgroundColor = 'rgba(15, 164, 175, 0.1)';
                    }}
                    title="Share on Twitter"
                  >
                    𝕏
                  </button>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Empty State */}
        {!isLoading && !error && quotes.length === 0 && (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">◆</div>
            <p className="text-gray-300 text-base mb-2 font-light">No quotes found</p>
            <p className="text-gray-500 text-sm">Try another category</p>
          </div>
        )}
      </main>

      {/* Footer - Enhanced */}
      <footer className="relative z-10 mt-24 py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 text-center">
          <p className="text-xs font-light" style={{ color: '#ffffff', opacity: 0.6, letterSpacing: '0.05em' }}>
            SAYING • A space for reflection
          </p>
          <p className="text-xs font-light mt-3" style={{ color: '#ffffff', opacity: 0.4 }}>
            🌍 Wisdom from every corner of Earth ✨
          </p>
        </div>
      </footer>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        body {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }
      `}</style>
    </div>
  );
}

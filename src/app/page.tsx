'use client';

import { useState, useEffect } from 'react';

const API_BASE_URL = '';

const generateGradientColor = (id: number, category: string) => {
  const gradients: Record<string, string[]> = {
    serious: ["from-purple-500 to-blue-600", "from-blue-500 to-cyan-400", "from-indigo-500 to-purple-600", "from-slate-600 to-blue-600"],
    funny: ["from-yellow-400 to-orange-500", "from-orange-400 to-red-500", "from-pink-400 to-yellow-400", "from-green-400 to-yellow-500"],
    trending: ["from-red-500 to-pink-600", "from-pink-500 to-purple-600", "from-green-400 to-blue-500", "from-cyan-400 to-blue-500"],
    default: ["from-gray-600 to-gray-800", "from-slate-500 to-gray-700"]
  };
  const categoryGradients = gradients[category] || gradients.default;
  return categoryGradients[id % categoryGradients.length];
};

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3719459726247715"
     crossorigin="anonymous"></script>
google.com, pub-3719459726247715, DIRECT, f08c47fec0942fa0
<meta name="google-adsense-account" content="ca-pub-3719459726247715">

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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-5 animate-ping"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-pink-400 rounded-full opacity-5 animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-cyan-400 rounded-full opacity-5 animate-bounce"></div>
        <div className="absolute top-1/2 right-10 w-8 h-8 bg-green-400 rounded-full opacity-5 animate-spin"></div>
      </div>

      <header className="relative z-10 py-12 md:py-14 text-center border-b border-white/5">
        <div className="max-w-6xl mx-auto px-3 sm:px-4">
          <div className="mb-6 flex justify-center">
            <svg className="w-20 h-20 md:w-24 md:h-24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="4" fill="#0FA4AF"/>
              <circle cx="50" cy="50" r="16" stroke="#0FA4AF" strokeWidth="1.5" opacity="0.7"/>
              <circle cx="50" cy="50" r="32" stroke="#0FA4AF" strokeWidth="1.5" opacity="0.5"/>
              <circle cx="50" cy="50" r="48" stroke="#0FA4AF" strokeWidth="1.5" opacity="0.3"/>
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-extralight tracking-wider mb-2" style={{ color: '#0FA4AF', letterSpacing: '0.15em' }}>
            SAYING
          </h1>
          <p className="text-xs md:text-sm font-light" style={{ color: '#0FA4AF', opacity: 0.8 }}>
            A quiet place for loud thoughts
          </p>
        </div>
      </header>

      <div className="relative z-10 max-w-2xl mx-auto px-3 sm:px-4 pt-8 sm:pt-10 pb-6 sm:pb-8">
        <div className="text-center">
          <h2 className="text-lg sm:text-xl md:text-2xl font-light mb-2 text-gray-100">
            Discover words that heal, provoke, and linger
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
            Meaningful reflections on life, love, wisdom, and the human experience
          </p>
        </div>
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <nav className="flex flex-wrap gap-2 mb-10 sm:mb-12 justify-center">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => {
                setCurrentCategory(category.id);
                setCurrentQuoteIndex(0);
              }}
              disabled={isLoading}
              className="relative px-3 sm:px-4 py-1.5 rounded-md font-medium text-xs transition-all hover:scale-105 disabled:opacity-50"
              style={{
                backgroundColor: currentCategory === category.id ? '#0FA4AF' : 'rgba(255,255,255,0.05)',
                color: currentCategory === category.id ? '#003135' : '#0FA4AF',
                border: currentCategory === category.id ? 'none' : '1px solid rgba(15, 164, 175, 0.2)'
              }}
            >
              <span>{category.icon}</span>
              <span className="hidden xs:inline ml-1">{category.name}</span>
            </button>
          ))}
        </nav>

        {isLoading && (
          <div className="text-center py-24">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#0FA4AF' }}></div>
            <p className="text-gray-400 text-base font-light mt-4">Loading your next moment of clarity...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">✕</div>
            <p className="text-gray-300 text-base mb-6 font-light">{error}</p>
            <button onClick={loadQuotes} className="px-6 py-2.5 text-white rounded-lg font-medium transition-all hover:scale-105" style={{ backgroundColor: '#0FA4AF', color: '#003135' }}>
              Try Again
            </button>
          </div>
        )}

        {!isLoading && !error && currentQuote && (
          <article className={`transition-all duration-700 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            <div className="relative bg-gradient-to-br p-0.5 rounded-2xl max-w-3xl mx-auto mb-8" style={{ backgroundImage: `linear-gradient(to bottom right, ${generateGradientColor(currentQuote.id, currentQuote.category)})`, boxShadow: '0 20px 60px rgba(15, 164, 175, 0.15)' }}>
              <div className="bg-gradient-to-b from-slate-900/95 to-purple-950/95 backdrop-blur-xl rounded-2xl px-6 sm:px-8 md:px-10 py-10 sm:py-12">
                <div className="text-center">
                  <blockquote className="text-xl sm:text-2xl md:text-3xl font-light leading-relaxed mb-6 sm:mb-8 text-white">
                    {'\u201c'}{currentQuote.text}{'\u201d'}
                  </blockquote>
                  <div className="flex items-center justify-center gap-2 sm:gap-3 mb-8">
                    <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
                    <p className="text-xs md:text-sm font-light" style={{ color: '#b0b0b0' }}>
                      {currentQuote.author || 'Unknown'}
                    </p>
                    <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
                  </div>
                  {currentQuote.tags && currentQuote.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-center mb-8">
                      {currentQuote.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 text-xs font-light rounded-full" style={{ backgroundColor: 'rgba(15, 164, 175, 0.1)', color: '#0FA4AF', border: '1px solid rgba(15, 164, 175, 0.3)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-3 sm:gap-4 justify-center items-center">
                    <button
                      onClick={nextQuote}
                      disabled={isLoading || quotes.length <= 1}
                      className="px-6 py-2.5 rounded-lg font-medium text-sm transition-all hover:scale-105 active:scale-95"
                      style={{ background: 'linear-gradient(135deg, #0FA4AF 0%, #089DA1 100%)', color: '#003135', boxShadow: '0 0 20px rgba(15, 164, 175, 0.3)' }}
                    >
                      Next Quote
                    </button>
                    <button
                      onClick={copyToClipboard}
                      className="px-6 py-2.5 rounded-lg font-medium text-sm transition-all hover:scale-105 active:scale-95"
                      style={{ backgroundColor: 'rgba(15, 164, 175, 0.08)', color: '#0FA4AF', border: '1px solid #0FA4AF' }}
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

            <div className="max-w-3xl mx-auto mt-8">
              <div className="border-t border-white/10 pt-6 pb-2">
                <p className="text-center text-xs font-semibold mb-4" style={{ color: '#0FA4AF', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                  Share the Wisdom
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {[
                    { name: 'whatsapp', path: 'M17.627 9.585c-.322-1.641-1.912-2.965-3.622-2.965-.529 0-1.029.129-1.466.357-1.386-.955-3.089-1.523-4.939-1.523-4.769 0-8.75 3.268-9.63 7.664-.02.098-.041.195-.041.295 0 .488.078.959.227 1.408.376 1.166 1.215 2.133 2.281 2.65l-.427 1.768c-.068.281.184.537.465.465l1.622-.391c.674.275 1.414.429 2.189.429 1.711 0 3.238-.977 3.976-2.395.437.228.937.355 1.467.355 1.71 0 3.3-1.324 3.622-2.965h.004c.05-.256.076-.519.076-.789 0-.27-.027-.533-.076-.789m-10.178 3.912c-.578 0-1.047-.469-1.047-1.047 0-.578.469-1.047 1.047-1.047.578 0 1.047.469 1.047 1.047 0 .578-.469 1.047-1.047 1.047m3.14 0c-.578 0-1.047-.469-1.047-1.047 0-.578.469-1.047 1.047-1.047.578 0 1.047.469 1.047 1.047 0 .578-.469 1.047-1.047 1.047m3.14 0c-.578 0-1.047-.469-1.047-1.047 0-.578.469-1.047 1.047-1.047.578 0 1.047.469 1.047 1.047 0 .578-.469 1.047-1.047 1.047' },
                    { name: 'instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.69.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 110-2.881 1.44 1.44 0 010 2.881z' },
                    { name: 'telegram', path: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-2.99-2.207-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.33-.373-.117l-6.869 4.332-2.97-.924c-.645-.213-.657-.645.136-.96l11.566-4.461c.52-.187 1.005.128.832 1.132z' },
                    { name: 'facebook', path: 'M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5c-.563-.074-2.313-.231-4.034-.231-4.125 0-7.008 2.388-7.008 6.769v2.462z' },
                    { name: 'twitter', path: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417a9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' }
                  ].map(icon => (
                    <button key={icon.name} onClick={() => shareQuote(icon.name)} className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95" style={{ backgroundColor: 'rgba(15, 164, 175, 0.1)', border: '2px solid rgba(15, 164, 175, 0.4)', color: '#0FA4AF' }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 25px rgba(15, 164, 175, 0.5)'; e.currentTarget.style.borderColor = 'rgba(15, 164, 175, 0.8)'; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(15, 164, 175, 0.4)'; }} title={`Share on ${icon.name}`}>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d={icon.path} />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </article>
        )}

        {!isLoading && !error && quotes.length === 0 && (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">◆</div>
            <p className="text-gray-300 text-base mb-2 font-light">No quotes found</p>
            <p className="text-gray-500 text-sm">Try another category</p>
          </div>
        )}
      </main>

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
    </div>
  );
}

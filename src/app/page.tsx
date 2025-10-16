<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>saying.to - Thoughts & Reflections</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600;700&family=Caveat:wght@400;700&display=swap" rel="stylesheet">
    <style>
        .serif { font-family: 'Crimson Text', serif; }
        .signature { font-family: 'Caveat', cursive; }
        body { font-family: 'Inter', sans-serif; }
        
        @keyframes fadeInQuote {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .quote-fade {
            animation: fadeInQuote 0.8s ease-out;
        }
        
        .article-card {
            transition: all 0.3s ease;
        }
        
        .article-card:hover {
            transform: translateY(-4px);
        }
        
        .reading-time::before {
            content: "•";
            margin: 0 8px;
            opacity: 0.5;
        }
        
        /* Subtle paper texture effect */
        .paper-texture {
            background-image: 
                repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 2px,
                    rgba(0,0,0,.03) 2px,
                    rgba(0,0,0,.03) 4px
                );
        }
        
        .gradient-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
    </style>
</head>
<body class="bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-gray-900">
    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-md shadow-sm border-b border-purple-100 sticky top-0 z-50">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <h1 class="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">saying.to</h1>
                    <span class="text-purple-300">|</span>
                    <p class="text-sm text-gray-600 hidden sm:block">Thoughts, Reflections & Random Musings</p>
                </div>
                <nav class="flex items-center gap-6">
                    <a href="#articles" class="text-sm font-medium text-gray-700 hover:text-purple-600 transition">Articles</a>
                    <a href="#about" class="text-sm font-medium text-gray-700 hover:text-purple-600 transition">About</a>
                    <button id="themeToggle" class="text-purple-600 hover:text-purple-800">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                        </svg>
                    </button>
                </nav>
            </div>
        </div>
    </header>

    <!-- Quote Section -->
    <section class="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white py-12 sm:py-16 relative overflow-hidden">
        <div class="absolute inset-0 bg-black/20"></div>
        <div class="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full opacity-10 blur-xl"></div>
        <div class="absolute bottom-10 right-10 w-40 h-40 bg-pink-400 rounded-full opacity-10 blur-xl"></div>
        <div class="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
            <div class="text-center">
                <p class="text-xs uppercase tracking-wider text-purple-200 mb-6 font-semibold">✨ Daily Wisdom ✨</p>
                <div id="quoteContainer" class="quote-fade">
                    <blockquote class="serif text-2xl sm:text-3xl md:text-4xl leading-relaxed mb-6 text-white">
                        "The only way to do great work is to love what you do."
                    </blockquote>
                    <p class="text-purple-100 text-lg">— Steve Jobs</p>
                </div>
                <button onclick="changeQuote()" class="mt-8 px-6 py-2 bg-white/20 backdrop-blur text-white rounded-full text-sm font-medium hover:bg-white/30 transition border border-white/30 shadow-lg">
                    Next Quote →
                </button>
            </div>
        </div>
    </section>

    <!-- Main Content -->
    <main class="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <!-- Featured Article -->
        <section class="mb-16">
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden article-card">
                <div class="md:flex">
                    <div class="md:w-2/5 h-64 md:h-auto bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <span class="text-6xl">📚</span>
                    </div>
                    <div class="p-8 md:p-10 md:w-3/5">
                        <div class="flex items-center gap-3 mb-4">
                            <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">Featured</span>
                            <span class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">Philosophy</span>
                        </div>
                        <h2 class="text-3xl font-bold text-gray-900 mb-4 serif">The Art of Living: Finding Meaning in Everyday Moments</h2>
                        <p class="text-gray-600 mb-6 leading-relaxed">
                            In our relentless pursuit of grand achievements, we often overlook the profound beauty nestled within ordinary moments. This piece explores how mindfulness and intentional living can transform our daily experiences into sources of deep fulfillment...
                        </p>
                        <div class="flex items-center justify-between">
                            <div class="flex items-center text-sm text-gray-500">
                                <span>Oct 15, 2025</span>
                                <span class="reading-time">8 min read</span>
                            </div>
                            <a href="#" class="text-purple-600 hover:text-purple-700 font-medium transition">
                                Read more →
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Article Categories -->
        <section class="mb-12">
            <div class="flex flex-wrap gap-3 justify-center">
                <button class="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full text-sm font-medium transition shadow-lg">All</button>
                <button class="px-5 py-2 bg-white text-gray-700 rounded-full text-sm font-medium hover:shadow-md transition border border-green-200 hover:border-green-400 hover:text-green-600">Life</button>
                <button class="px-5 py-2 bg-white text-gray-700 rounded-full text-sm font-medium hover:shadow-md transition border border-purple-200 hover:border-purple-400 hover:text-purple-600">Philosophy</button>
                <button class="px-5 py-2 bg-white text-gray-700 rounded-full text-sm font-medium hover:shadow-md transition border border-orange-200 hover:border-orange-400 hover:text-orange-600">Literature</button>
                <button class="px-5 py-2 bg-white text-gray-700 rounded-full text-sm font-medium hover:shadow-md transition border border-blue-200 hover:border-blue-400 hover:text-blue-600">Psychology</button>
                <button class="px-5 py-2 bg-white text-gray-700 rounded-full text-sm font-medium hover:shadow-md transition border border-pink-200 hover:border-pink-400 hover:text-pink-600">Religion</button>
            </div>
        </section>

        <!-- Articles Grid -->
        <section id="articles" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <!-- Article 1 -->
            <article class="bg-white rounded-xl shadow-md overflow-hidden article-card paper-texture">
                <div class="h-48 bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center">
                    <span class="text-5xl">🌱</span>
                </div>
                <div class="p-6">
                    <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Life</span>
                    <h3 class="text-xl font-bold text-gray-900 mt-4 mb-3 serif">Embracing Uncertainty: A Guide to Peaceful Living</h3>
                    <p class="text-gray-600 text-sm mb-4 leading-relaxed">
                        Life's unpredictability often causes anxiety, but what if we could transform uncertainty into opportunity? This exploration delves into...
                    </p>
                    <div class="flex items-center justify-between text-sm text-gray-500">
                        <span>Oct 12, 2025</span>
                        <span>5 min read</span>
                    </div>
                </div>
            </article>

            <!-- Article 2 -->
            <article class="bg-white rounded-xl shadow-md overflow-hidden article-card paper-texture">
                <div class="h-48 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                    <span class="text-5xl">📖</span>
                </div>
                <div class="p-6">
                    <span class="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">Literature</span>
                    <h3 class="text-xl font-bold text-gray-900 mt-4 mb-3 serif">The Lost Art of Letter Writing</h3>
                    <p class="text-gray-600 text-sm mb-4 leading-relaxed">
                        In an age of instant messages, we've forgotten the intimate beauty of handwritten correspondence. Let's rediscover...
                    </p>
                    <div class="flex items-center justify-between text-sm text-gray-500">
                        <span>Oct 8, 2025</span>
                        <span>7 min read</span>
                    </div>
                </div>
            </article>

            <!-- Article 3 -->
            <article class="bg-white rounded-xl shadow-md overflow-hidden article-card paper-texture">
                <div class="h-48 bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                    <span class="text-5xl">🧠</span>
                </div>
                <div class="p-6">
                    <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Psychology</span>
                    <h3 class="text-xl font-bold text-gray-900 mt-4 mb-3 serif">Understanding Emotional Intelligence</h3>
                    <p class="text-gray-600 text-sm mb-4 leading-relaxed">
                        Our ability to recognize, understand, and manage emotions shapes every aspect of our lives. Here's how to develop...
                    </p>
                    <div class="flex items-center justify-between text-sm text-gray-500">
                        <span>Oct 5, 2025</span>
                        <span>10 min read</span>
                    </div>
                </div>
            </article>

            <!-- Article 4 -->
            <article class="bg-white rounded-xl shadow-md overflow-hidden article-card paper-texture">
                <div class="h-48 bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                    <span class="text-5xl">✨</span>
                </div>
                <div class="p-6">
                    <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">Spirituality</span>
                    <h3 class="text-xl font-bold text-gray-900 mt-4 mb-3 serif">Finding Sacred in the Mundane</h3>
                    <p class="text-gray-600 text-sm mb-4 leading-relaxed">
                        Spirituality doesn't require grand gestures. Sometimes, the most profound connections happen in quiet, ordinary moments...
                    </p>
                    <div class="flex items-center justify-between text-sm text-gray-500">
                        <span>Oct 1, 2025</span>
                        <span>6 min read</span>
                    </div>
                </div>
            </article>

            <!-- Article 5 -->
            <article class="bg-white rounded-xl shadow-md overflow-hidden article-card paper-texture">
                <div class="h-48 bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                    <span class="text-5xl">🤔</span>
                </div>
                <div class="p-6">
                    <span class="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">Philosophy</span>
                    <h3 class="text-xl font-bold text-gray-900 mt-4 mb-3 serif">The Paradox of Choice in Modern Life</h3>
                    <p class="text-gray-600 text-sm mb-4 leading-relaxed">
                        More options don't always lead to greater happiness. Exploring how limitation can paradoxically lead to freedom...
                    </p>
                    <div class="flex items-center justify-between text-sm text-gray-500">
                        <span>Sep 28, 2025</span>
                        <span>8 min read</span>
                    </div>
                </div>
            </article>

            <!-- Article 6 -->
            <article class="bg-white rounded-xl shadow-md overflow-hidden article-card paper-texture">
                <div class="h-48 bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center">
                    <span class="text-5xl">🕊️</span>
                </div>
                <div class="p-6">
                    <span class="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-medium">Religion</span>
                    <h3 class="text-xl font-bold text-gray-900 mt-4 mb-3 serif">Faith in the Age of Science</h3>
                    <p class="text-gray-600 text-sm mb-4 leading-relaxed">
                        Can faith and reason coexist? A thoughtful examination of how spiritual beliefs adapt and thrive in our scientific era...
                    </p>
                    <div class="flex items-center justify-between text-sm text-gray-500">
                        <span>Sep 25, 2025</span>
                        <span>12 min read</span>
                    </div>
                </div>
            </article>
        </section>

        <!-- Load More -->
        <div class="text-center mb-16">
            <button class="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-medium hover:from-purple-700 hover:to-indigo-700 transition shadow-lg">
                Load More Articles
            </button>
        </div>

        <!-- About Section -->
        <section id="about" class="bg-gradient-to-br from-purple-100 via-white to-indigo-100 rounded-2xl shadow-xl p-8 md:p-12 mb-16 border border-purple-200">
            <div class="max-w-3xl mx-auto text-center">
                <h2 class="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 serif">About This Space</h2>
                <p class="text-gray-700 leading-relaxed mb-6">
                    Welcome to my personal corner of the internet. Here, I explore ideas that fascinate me — from the philosophical questions that keep me awake at night to the psychological insights that help us understand ourselves better. Each article is a journey through different aspects of human experience, written with curiosity and shared with hope that these thoughts might resonate with you too.
                </p>
                <p class="text-gray-700 leading-relaxed mb-8">
                    Between the articles, you'll find random quotes that have inspired me — little sparks of wisdom from minds across time and space. Because sometimes, a single sentence can change everything.
                </p>
                <div class="signature text-4xl text-purple-700">
                    ~ Your Name
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="bg-gradient-to-br from-purple-900 to-indigo-900 text-white py-12">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <h3 class="text-xl font-bold bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent mb-2">saying.to</h3>
            <p class="text-purple-200 text-sm mb-6">Thoughts, quotes, and everything in between</p>
            <div class="flex justify-center gap-6 mb-8">
                <a href="#" class="text-purple-300 hover:text-white transition">Twitter</a>
                <a href="#" class="text-purple-300 hover:text-white transition">RSS</a>
                <a href="#" class="text-purple-300 hover:text-white transition">Email</a>
            </div>
            <p class="text-purple-400 text-xs">© 2025 saying.to. All thoughts are my own.</p>
        </div>
    </footer>

    <script>
        // Sample quotes array
        const quotes = [
            { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
            { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
            { text: "The unexamined life is not worth living.", author: "Socrates" },
            { text: "What we think, we become.", author: "Buddha" },
            { text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu" },
            { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", author: "Ralph Waldo Emerson" }
        ];

        let currentQuoteIndex = 0;

        function changeQuote() {
            const container = document.getElementById('quoteContainer');
            container.style.opacity = '0';
            
            setTimeout(() => {
                currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
                const quote = quotes[currentQuoteIndex];
                
                container.innerHTML = `
                    <blockquote class="serif text-2xl sm:text-3xl md:text-4xl leading-relaxed mb-6 text-slate-100">
                        "${quote.text}"
                    </blockquote>
                    <p class="text-slate-300 text-lg">— ${quote.author}</p>
                `;
                
                container.style.opacity = '1';
                container.classList.add('quote-fade');
            }, 300);
        }

        // Auto-change quote every 30 seconds
        setInterval(changeQuote, 30000);

        // Theme toggle (basic implementation)
        document.getElementById('themeToggle').addEventListener('click', function() {
            document.body.classList.toggle('dark');
        });
    </script>
</body>
</html>

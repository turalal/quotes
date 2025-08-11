'use client';

import { useState, useEffect } from 'react';
import QuoteCard from '@/components/QuoteCard';
import EnhancedCategorySelector from '@/components/EnhancedCategorySelector';
import CategoryStats from '@/components/CategoryStats';
import SearchBar from '@/components/SearchBar';
import Header from '@/components/Header';
import JsonLd from '@/components/JsonLd';
import { Quote, CategoryInfo } from '@/types/quote';
import { getDailyQuote, getRandomQuote, getRandomQuoteByCategory, getCategories } from '@/lib/quotes';
import { formatCategoryName } from '@/lib/categories';

export default function Home() {
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [searchResults, setSearchResults] = useState<Quote[]>([]);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [dailyQuote, categoriesData] = await Promise.all([
          getDailyQuote(),
          getCategories()
        ]);
        
        setCurrentQuote(dailyQuote);
        setCategories(categoriesData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load data:', error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category);
    setLoading(true);
    
    try {
      let newQuote;
      if (category === 'all') {
        newQuote = await getRandomQuote();
      } else {
        newQuote = await getRandomQuoteByCategory(category);
      }
      setCurrentQuote(newQuote);
    } catch (error) {
      console.error('Failed to load quote:', error);
    }
    setLoading(false);
  };

  const getNewQuote = async () => {
    setLoading(true);
    try {
      let newQuote;
      if (selectedCategory === 'all') {
        newQuote = await getRandomQuote();
      } else {
        newQuote = await getRandomQuoteByCategory(selectedCategory);
      }
      setCurrentQuote(newQuote);
    } catch (error) {
      console.error('Failed to load quote:', error);
    }
    setLoading(false);
  };

  const handleSearchResults = (results: Quote[]) => {
    setSearchResults(results);
    setIsSearchMode(true);
    if (results.length > 0) {
      setCurrentQuote(results[0]);
    }
  };

  const handleClearSearch = () => {
    setSearchResults([]);
    setIsSearchMode(false);
    // Load a new random quote
    getNewQuote();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading inspiring quotes...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <JsonLd quote={currentQuote || undefined} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {isSearchMode 
              ? 'Search Results' 
              : selectedCategory === 'all' 
                ? 'Daily Quote' 
                : `${formatCategoryName(selectedCategory)} Quotes`
            }
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {isSearchMode 
              ? `Found ${searchResults.length} quotes matching your search` 
              : selectedCategory === 'all' 
                ? 'Start your day with inspiration. Every day brings a new quote to motivate and inspire you.' 
                : `Explore inspiring quotes about ${formatCategoryName(selectedCategory).toLowerCase()}.`
            }
          </p>
        </div>

        <SearchBar 
          onSearchResults={handleSearchResults}
          onClearSearch={handleClearSearch}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          <div className="lg:col-span-3">
            <EnhancedCategorySelector 
              categories={categories.map(c => c.category)}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>
          <div className="lg:col-span-1">
            <CategoryStats 
              categories={categories}
              onCategorySelect={handleCategoryChange}
            />
          </div>
        </div>

        {currentQuote && (
          <div className="max-w-4xl mx-auto mb-8">
            <QuoteCard quote={currentQuote} />
          </div>
        )}

        <div className="text-center">
          <button
            onClick={getNewQuote}
            className="inline-flex items-center px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Get New Quote
          </button>
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p className="mb-2">© 2024 Daily Quotes. Inspiring quotes for every day.</p>
            <p className="text-sm">Built with ❤️ using Next.js and deployed on Vercel</p>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}

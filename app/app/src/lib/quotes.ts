import { Quote, CategoryInfo } from '@/types/quote';

// Format category name for display
export function formatCategoryName(category: string): string {
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Get daily quote from API
export async function getDailyQuote(): Promise<Quote | null> {
  try {
    const response = await fetch('/api/quotes?type=daily', {
      next: { revalidate: 86400 } // Cache for 24 hours
    });
    if (!response.ok) throw new Error('Failed to fetch daily quote');
    return await response.json();
  } catch (error) {
    console.error('Error fetching daily quote:', error);
    return null;
  }
}

// Get random quote from API
export async function getRandomQuote(): Promise<Quote | null> {
  try {
    const response = await fetch('/api/quotes?type=random', {
      cache: 'no-store'
    });
    if (!response.ok) throw new Error('Failed to fetch random quote');
    return await response.json();
  } catch (error) {
    console.error('Error fetching random quote:', error);
    return null;
  }
}

// Get random quote by category from API
export async function getRandomQuoteByCategory(category: string): Promise<Quote | null> {
  try {
    const response = await fetch(`/api/quotes/category/${encodeURIComponent(category)}?type=random`, {
      cache: 'no-store'
    });
    if (!response.ok) throw new Error('Failed to fetch random quote by category');
    return await response.json();
  } catch (error) {
    console.error('Error fetching random quote by category:', error);
    return null;
  }
}

// Get quotes by category from API
export async function getQuotesByCategory(category: string, page: number = 1, limit: number = 10): Promise<Quote[]> {
  try {
    const response = await fetch(
      `/api/quotes/category/${encodeURIComponent(category)}?page=${page}&limit=${limit}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );
    if (!response.ok) throw new Error('Failed to fetch quotes by category');
    return await response.json();
  } catch (error) {
    console.error('Error fetching quotes by category:', error);
    return [];
  }
}

// Get all available categories from API
export async function getCategories(): Promise<CategoryInfo[]> {
  try {
    const response = await fetch('/api/categories', {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    if (!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Get all quotes from API
export async function getAllQuotes(page: number = 1, limit: number = 10): Promise<Quote[]> {
  try {
    const response = await fetch(`/api/quotes?type=all&page=${page}&limit=${limit}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    if (!response.ok) throw new Error('Failed to fetch all quotes');
    return await response.json();
  } catch (error) {
    console.error('Error fetching all quotes:', error);
    return [];
  }
}

// Search quotes from API
export async function searchQuotes(query: string, page: number = 1, limit: number = 10): Promise<Quote[]> {
  try {
    const response = await fetch(
      `/api/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`,
      { cache: 'no-store' }
    );
    if (!response.ok) throw new Error('Failed to search quotes');
    return await response.json();
  } catch (error) {
    console.error('Error searching quotes:', error);
    return [];
  }
}
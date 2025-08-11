import { Pool } from 'pg';

let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    if (!process.env.DATABASE_URL) {
      throw new Error(
        'DATABASE_URL environment variable is required. ' +
        'Please add it to your .env.local file or deployment environment variables.'
      );
    }

    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      },
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
  }
  
  return pool;
}

export interface Quote {
  id: number;
  quote: string;
  author: string;
  category: string;
}

export interface CategoryInfo {
  category: string;
  count: number;
}

// Get all quotes with pagination
export async function getAllQuotes(page: number = 1, limit: number = 10): Promise<Quote[]> {
  const pool = getPool();
  const offset = (page - 1) * limit;
  
  try {
    const result = await pool.query(
      'SELECT quote, author, category FROM quotes.quotes ORDER BY quote LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    return result.rows.map((row, index) => ({
      id: offset + index + 1,
      quote: row.quote,
      author: row.author,
      category: row.category.split(',')[0].trim() // Use first category for display
    }));
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return [];
  }
}

// Get random quote
export async function getRandomQuote(): Promise<Quote | null> {
  const pool = getPool();
  
  try {
    const result = await pool.query(
      'SELECT quote, author, category FROM quotes.quotes ORDER BY RANDOM() LIMIT 1'
    );
    if (result.rows[0]) {
      return {
        id: Math.floor(Math.random() * 1000000),
        quote: result.rows[0].quote,
        author: result.rows[0].author,
        category: result.rows[0].category.split(',')[0].trim() // Use first category for display
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching random quote:', error);
    return null;
  }
}

// Get daily quote (deterministic based on date)
export async function getDailyQuote(): Promise<Quote | null> {
  const pool = getPool();
  
  try {
    // Use current date as seed for consistent daily quote
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    
    const countResult = await pool.query('SELECT COUNT(*) FROM quotes.quotes');
    const totalQuotes = parseInt(countResult.rows[0].count);
    const offset = dayOfYear % totalQuotes;
    
    const result = await pool.query(
      'SELECT quote, author, category FROM quotes.quotes ORDER BY quote LIMIT 1 OFFSET $1',
      [offset]
    );
    
    if (result.rows.length === 0) {
      // Fallback to random quote if offset calculation fails
      return getRandomQuote();
    }
    
    return {
      id: offset + 1,
      quote: result.rows[0].quote,
      author: result.rows[0].author,
      category: result.rows[0].category.split(',')[0].trim() // Use first category for display
    };
  } catch (error) {
    console.error('Error fetching daily quote:', error);
    return getRandomQuote();
  }
}

// Get quotes by category
export async function getQuotesByCategory(category: string, page: number = 1, limit: number = 10): Promise<Quote[]> {
  const pool = getPool();
  const offset = (page - 1) * limit;
  
  try {
    // Search within comma-separated categories
    const result = await pool.query(
      'SELECT quote, author, category FROM quotes.quotes WHERE category ILIKE $1 ORDER BY quote LIMIT $2 OFFSET $3',
      [`%${category}%`, limit, offset]
    );
    return result.rows.map((row, index) => ({
      id: offset + index + 1,
      quote: row.quote,
      author: row.author,
      category: row.category.split(',')[0].trim() // Use first category for display
    }));
  } catch (error) {
    console.error('Error fetching quotes by category:', error);
    return [];
  }
}

// Get random quote by category
export async function getRandomQuoteByCategory(category: string): Promise<Quote | null> {
  const pool = getPool();
  
  try {
    const result = await pool.query(
      'SELECT quote, author, category FROM quotes.quotes WHERE category ILIKE $1 ORDER BY RANDOM() LIMIT 1',
      [`%${category}%`]
    );
    if (result.rows[0]) {
      return {
        id: Math.floor(Math.random() * 1000000),
        quote: result.rows[0].quote,
        author: result.rows[0].author,
        category: result.rows[0].category.split(',')[0].trim() // Use first category for display
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching random quote by category:', error);
    return null;
  }
}

// Get all categories with counts
export async function getCategories(): Promise<CategoryInfo[]> {
  const pool = getPool();
  
  try {
    // Since categories are comma-separated, we need to split them
    const result = await pool.query(
      `SELECT 
         TRIM(unnest(string_to_array(category, ','))) as category,
         COUNT(*) as count
       FROM quotes.quotes 
       GROUP BY TRIM(unnest(string_to_array(category, ',')))
       HAVING TRIM(unnest(string_to_array(category, ','))) != ''
       ORDER BY count DESC
       LIMIT 50`
    );
    return result.rows;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Get total quotes count
export async function getTotalQuotesCount(): Promise<number> {
  const pool = getPool();
  
  try {
    const result = await pool.query('SELECT COUNT(*) as total FROM quotes.quotes');
    return parseInt(result.rows[0].total);
  } catch (error) {
    console.error('Error fetching total quotes count:', error);
    return 0;
  }
}

// Search quotes
export async function searchQuotes(searchTerm: string, page: number = 1, limit: number = 10): Promise<Quote[]> {
  const pool = getPool();
  const offset = (page - 1) * limit;
  
  try {
    const result = await pool.query(
      `SELECT quote, author, category 
       FROM quotes.quotes 
       WHERE quote ILIKE $1 OR author ILIKE $1 OR category ILIKE $1 
       ORDER BY 
         CASE 
           WHEN quote ILIKE $2 THEN 1
           WHEN author ILIKE $2 THEN 2
           ELSE 3
         END,
         quote
       LIMIT $3 OFFSET $4`,
      [`%${searchTerm}%`, `${searchTerm}%`, limit, offset]
    );
    return result.rows.map((row, index) => ({
      id: offset + index + 1,
      quote: row.quote,
      author: row.author,
      category: row.category.split(',')[0].trim() // Use first category for display
    }));
  } catch (error) {
    console.error('Error searching quotes:', error);
    return [];
  }
}

// Test database connection
export async function testConnection(): Promise<boolean> {
  const pool = getPool();
  
  try {
    const result = await pool.query('SELECT NOW() as current_time');
    console.log('Database connected successfully:', result.rows[0]);
    
    // Test quotes table
    const quotesResult = await pool.query('SELECT COUNT(*) FROM quotes.quotes');
    console.log(`Found ${quotesResult.rows[0].count} quotes in database`);
    
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}
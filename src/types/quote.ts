export interface Quote {
  quote: string;
  author: string;
  category: string;
}

export interface QuoteResponse {
  quotes: Quote[];
  total: number;
}

export interface CategoryResponse {
  categories: string[];
}
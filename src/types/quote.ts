export interface Quote {
  id?: number;
  text: string;
  author: string;
  category: string;
  tags?: string[];
}

export interface QuoteResponse {
  quotes: Quote[];
  total: number;
}

export interface CategoryResponse {
  categories: string[];
}
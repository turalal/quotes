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

export interface QuoteCardProps {
  quote: Quote;
  className?: string;
}

export interface CategorySelectorProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}
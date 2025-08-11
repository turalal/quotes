'use client';

import { useMemo } from 'react';
import { getCategoryIcon, formatCategoryName, getCategoryColor } from '@/lib/categories';
import { CategoryInfo } from '@/types/quote';

interface CategoryStatsProps {
  categories: CategoryInfo[];
  onCategorySelect?: (category: string) => void;
}

interface CategoryStat {
  id: string;
  name: string;
  count: number;
  icon: string;
  color: string;
}

export default function CategoryStats({ categories, onCategorySelect }: CategoryStatsProps) {
  const categoryStats = useMemo(() => {
    return categories.map(cat => ({
      id: cat.category,
      name: formatCategoryName(cat.category),
      count: cat.count,
      icon: getCategoryIcon(cat.category),
      color: getCategoryColor(cat.category)
    })).sort((a, b) => b.count - a.count);
  }, [categories]);

  const loading = categories.length === 0;

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Category Statistics
        </h3>
        <div className="animate-pulse space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  const totalQuotes = categoryStats.reduce((sum, stat) => sum + stat.count, 0);
  const topCategories = categoryStats.slice(0, 10);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-6">
        📊 Category Statistics
      </h3>
      
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {totalQuotes.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Quotes Across {categoryStats.length} Categories
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
          Top Categories
        </h4>
        
        {topCategories.map((stat, index) => (
          <div
            key={stat.id}
            className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
              onCategorySelect 
                ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-md' 
                : ''
            }`}
            onClick={() => onCategorySelect?.(stat.id)}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-6">
                  #{index + 1}
                </span>
                <span className="text-xl">{stat.icon}</span>
              </div>
              <div>
                <div className="font-medium text-gray-800 dark:text-gray-200">
                  {stat.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.count} quotes
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full bg-gradient-to-r ${stat.color}`}
                  style={{
                    width: `${(stat.count / topCategories[0].count) * 100}%`
                  }}
                ></div>
              </div>
              
              {onCategorySelect && (
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>

      {categoryStats.length > 10 && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            And {categoryStats.length - 10} more categories...
          </p>
        </div>
      )}
    </div>
  );
}
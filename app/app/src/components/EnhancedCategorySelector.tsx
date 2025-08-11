'use client';

import { useState } from 'react';
import { categoryGroups, getCategoryInfo, formatCategoryName, getCategoryColor, getCategoryIcon, getCategoryDescription } from '@/lib/categories';

interface EnhancedCategorySelectorProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function EnhancedCategorySelector({ categories, selectedCategory, onCategoryChange }: EnhancedCategorySelectorProps) {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'grouped'>('grid');

  // Filter available categories to only show those we have data for
  const availableCategories = categories.filter(cat => cat !== 'all');

  const toggleGroup = (groupName: string) => {
    setActiveGroup(activeGroup === groupName ? null : groupName);
  };

  const CategoryCard = ({ categoryId, isSelected }: { categoryId: string; isSelected: boolean }) => {
    // const categoryInfo = getCategoryInfo(categoryId);
    const icon = getCategoryIcon(categoryId);
    const name = formatCategoryName(categoryId);
    const description = getCategoryDescription(categoryId);
    const colorClasses = getCategoryColor(categoryId);

    return (
      <button
        onClick={() => onCategoryChange(categoryId)}
        className={`group relative overflow-hidden rounded-xl p-4 text-left transition-all duration-300 hover:scale-105 hover:shadow-lg ${
          isSelected
            ? 'ring-2 ring-blue-500 shadow-lg'
            : 'hover:shadow-md'
        }`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{icon}</span>
            <h3 className={`font-semibold text-sm ${isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-gray-800 dark:text-gray-200'}`}>
              {name}
            </h3>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
            {description}
          </p>
        </div>
      </button>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            Choose a Category
          </h2>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'grid'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode('grouped')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'grouped'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              By Theme
            </button>
          </div>
        </div>

        {/* All Categories Button */}
        <div className="mb-6">
          <button
            onClick={() => onCategoryChange('all')}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <span className="text-xl">🌟</span>
              All Categories
            </span>
          </button>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {availableCategories.map((categoryId) => (
              <CategoryCard
                key={categoryId}
                categoryId={categoryId}
                isSelected={selectedCategory === categoryId}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(categoryGroups).map(([groupName, groupCategories]) => {
              const availableInGroup = groupCategories.filter(cat => availableCategories.includes(cat.id));
              if (availableInGroup.length === 0) return null;

              return (
                <div key={groupName} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleGroup(groupName)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex items-center justify-between"
                  >
                    <span className="font-medium text-gray-800 dark:text-gray-200">{groupName}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {availableInGroup.length} categories
                      </span>
                      <svg
                        className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform ${
                          activeGroup === groupName ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  {activeGroup === groupName && (
                    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {availableInGroup.map((categoryInfo) => (
                        <CategoryCard
                          key={categoryInfo.id}
                          categoryId={categoryInfo.id}
                          isSelected={selectedCategory === categoryInfo.id}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
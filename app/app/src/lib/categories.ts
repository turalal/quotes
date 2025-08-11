export interface CategoryInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  group: string;
}

export const categoryGroups = {
  'Life & Personal': [
    {
      id: 'life',
      name: 'Life',
      description: 'Wisdom about living and life experiences',
      icon: '🌱',
      color: 'from-green-400 to-blue-500',
      group: 'Life & Personal'
    },
    {
      id: 'life-lessons',
      name: 'Life Lessons',
      description: 'Valuable lessons learned from experience',
      icon: '📚',
      color: 'from-blue-400 to-purple-500',
      group: 'Life & Personal'
    },
    {
      id: 'happiness',
      name: 'Happiness',
      description: 'Finding joy and contentment in life',
      icon: '😊',
      color: 'from-yellow-400 to-orange-500',
      group: 'Life & Personal'
    },
    {
      id: 'wisdom',
      name: 'Wisdom',
      description: 'Deep insights and profound understanding',
      icon: '🦉',
      color: 'from-purple-400 to-indigo-500',
      group: 'Life & Personal'
    },
    {
      id: 'truth',
      name: 'Truth',
      description: 'Honesty and authentic living',
      icon: '💎',
      color: 'from-cyan-400 to-blue-500',
      group: 'Life & Personal'
    },
    {
      id: 'freedom',
      name: 'Freedom',
      description: 'Liberty, independence, and breaking free',
      icon: '🕊️',
      color: 'from-sky-400 to-cyan-500',
      group: 'Life & Personal'
    },
    {
      id: 'change',
      name: 'Change',
      description: 'Embracing transformation and growth',
      icon: '🔄',
      color: 'from-orange-400 to-red-500',
      group: 'Life & Personal'
    },
    {
      id: 'time',
      name: 'Time',
      description: 'The value and meaning of time',
      icon: '⏰',
      color: 'from-gray-400 to-gray-600',
      group: 'Life & Personal'
    }
  ],
  'Love & Relationships': [
    {
      id: 'love',
      name: 'Love',
      description: 'Romance, affection, and deep connections',
      icon: '💕',
      color: 'from-pink-400 to-red-500',
      group: 'Love & Relationships'
    },
    {
      id: 'friendship',
      name: 'Friendship',
      description: 'Bonds of friendship and companionship',
      icon: '🤝',
      color: 'from-blue-400 to-purple-500',
      group: 'Love & Relationships'
    },
    {
      id: 'relationships',
      name: 'Relationships',
      description: 'Human connections and interactions',
      icon: '👥',
      color: 'from-green-400 to-teal-500',
      group: 'Love & Relationships'
    },
    {
      id: 'family',
      name: 'Family',
      description: 'Family bonds and relationships',
      icon: '👨‍👩‍👧‍👦',
      color: 'from-orange-400 to-yellow-500',
      group: 'Love & Relationships'
    },
    {
      id: 'marriage',
      name: 'Marriage',
      description: 'Partnership and matrimony',
      icon: '💍',
      color: 'from-rose-400 to-pink-500',
      group: 'Love & Relationships'
    },
    {
      id: 'romance',
      name: 'Romance',
      description: 'Romantic love and passion',
      icon: '🌹',
      color: 'from-red-400 to-rose-500',
      group: 'Love & Relationships'
    }
  ],
  'Inspiration & Motivation': [
    {
      id: 'inspirational',
      name: 'Inspirational',
      description: 'Uplifting and motivating thoughts',
      icon: '✨',
      color: 'from-yellow-400 to-orange-500',
      group: 'Inspiration & Motivation'
    },
    {
      id: 'inspiration',
      name: 'Inspiration',
      description: 'Sources of creative and personal inspiration',
      icon: '💡',
      color: 'from-amber-400 to-yellow-500',
      group: 'Inspiration & Motivation'
    },
    {
      id: 'motivational',
      name: 'Motivational',
      description: 'Encouraging words for action and progress',
      icon: '🚀',
      color: 'from-blue-500 to-purple-600',
      group: 'Inspiration & Motivation'
    },
    {
      id: 'inspirational-quotes',
      name: 'Inspirational Quotes',
      description: 'Classic inspiring quotations',
      icon: '📖',
      color: 'from-indigo-400 to-purple-500',
      group: 'Inspiration & Motivation'
    },
    {
      id: 'success',
      name: 'Success',
      description: 'Achievement and reaching goals',
      icon: '🏆',
      color: 'from-yellow-500 to-orange-600',
      group: 'Inspiration & Motivation'
    },
    {
      id: 'dreams',
      name: 'Dreams',
      description: 'Aspirations and pursuing dreams',
      icon: '🌟',
      color: 'from-purple-400 to-pink-500',
      group: 'Inspiration & Motivation'
    },
    {
      id: 'hope',
      name: 'Hope',
      description: 'Optimism and positive outlook',
      icon: '🌈',
      color: 'from-sky-400 to-blue-500',
      group: 'Inspiration & Motivation'
    },
    {
      id: 'leadership',
      name: 'Leadership',
      description: 'Guidance and leading others',
      icon: '👑',
      color: 'from-yellow-500 to-yellow-600',
      group: 'Inspiration & Motivation'
    }
  ],
  'Philosophy & Spirituality': [
    {
      id: 'philosophy',
      name: 'Philosophy',
      description: 'Deep thoughts on existence and meaning',
      icon: '🤔',
      color: 'from-gray-500 to-gray-700',
      group: 'Philosophy & Spirituality'
    },
    {
      id: 'religion',
      name: 'Religion',
      description: 'Faith and religious perspectives',
      icon: '⛪',
      color: 'from-blue-600 to-indigo-700',
      group: 'Philosophy & Spirituality'
    },
    {
      id: 'spirituality',
      name: 'Spirituality',
      description: 'Spiritual growth and enlightenment',
      icon: '🙏',
      color: 'from-purple-500 to-purple-700',
      group: 'Philosophy & Spirituality'
    },
    {
      id: 'faith',
      name: 'Faith',
      description: 'Belief and trust in something greater',
      icon: '✝️',
      color: 'from-blue-500 to-blue-700',
      group: 'Philosophy & Spirituality'
    },
    {
      id: 'god',
      name: 'God',
      description: 'Divine and sacred reflections',
      icon: '☀️',
      color: 'from-yellow-500 to-orange-600',
      group: 'Philosophy & Spirituality'
    },
    {
      id: 'christianity',
      name: 'Christianity',
      description: 'Christian faith and values',
      icon: '✨',
      color: 'from-blue-600 to-purple-600',
      group: 'Philosophy & Spirituality'
    }
  ],
  'Arts & Culture': [
    {
      id: 'art',
      name: 'Art',
      description: 'Creative expression and artistic vision',
      icon: '🎨',
      color: 'from-pink-400 to-purple-500',
      group: 'Arts & Culture'
    },
    {
      id: 'books',
      name: 'Books',
      description: 'Literature and the power of reading',
      icon: '📚',
      color: 'from-brown-400 to-orange-500',
      group: 'Arts & Culture'
    },
    {
      id: 'reading',
      name: 'Reading',
      description: 'The joy and importance of reading',
      icon: '📖',
      color: 'from-green-500 to-teal-500',
      group: 'Arts & Culture'
    },
    {
      id: 'writing',
      name: 'Writing',
      description: 'The craft and art of writing',
      icon: '✍️',
      color: 'from-blue-500 to-indigo-600',
      group: 'Arts & Culture'
    },
    {
      id: 'poetry',
      name: 'Poetry',
      description: 'Beautiful and rhythmic expressions',
      icon: '🌸',
      color: 'from-pink-500 to-rose-500',
      group: 'Arts & Culture'
    },
    {
      id: 'beauty',
      name: 'Beauty',
      description: 'Appreciation of beauty in all forms',
      icon: '🌺',
      color: 'from-rose-400 to-pink-500',
      group: 'Arts & Culture'
    },
    {
      id: 'nature',
      name: 'Nature',
      description: 'The natural world and environment',
      icon: '🌳',
      color: 'from-green-500 to-emerald-600',
      group: 'Arts & Culture'
    }
  ],
  'Humor & Entertainment': [
    {
      id: 'humor',
      name: 'Humor',
      description: 'Wit, comedy, and finding joy in life',
      icon: '😄',
      color: 'from-yellow-400 to-orange-500',
      group: 'Humor & Entertainment'
    },
    {
      id: 'humour',
      name: 'Humour',
      description: 'British spelling of humor - wit and comedy',
      icon: '🎭',
      color: 'from-orange-400 to-red-500',
      group: 'Humor & Entertainment'
    },
    {
      id: 'funny',
      name: 'Funny',
      description: 'Amusing and entertaining quotes',
      icon: '🤣',
      color: 'from-lime-400 to-green-500',
      group: 'Humor & Entertainment'
    }
  ],
  'Challenges & Growth': [
    {
      id: 'fear',
      name: 'Fear',
      description: 'Overcoming fears and facing challenges',
      icon: '😰',
      color: 'from-red-500 to-orange-600',
      group: 'Challenges & Growth'
    },
    {
      id: 'death',
      name: 'Death',
      description: 'Reflections on mortality and loss',
      icon: '🕊️',
      color: 'from-gray-600 to-gray-800',
      group: 'Challenges & Growth'
    },
    {
      id: 'pain',
      name: 'Pain',
      description: 'Dealing with suffering and hardship',
      icon: '💔',
      color: 'from-red-600 to-red-800',
      group: 'Challenges & Growth'
    }
  ],
  'Society & World': [
    {
      id: 'politics',
      name: 'Politics',
      description: 'Government, society, and civic life',
      icon: '🏛️',
      color: 'from-blue-600 to-indigo-700',
      group: 'Society & World'
    },
    {
      id: 'history',
      name: 'History',
      description: 'Lessons from the past',
      icon: '📜',
      color: 'from-amber-600 to-orange-700',
      group: 'Society & World'
    },
    {
      id: 'war',
      name: 'War',
      description: 'Conflict and its consequences',
      icon: '⚔️',
      color: 'from-red-700 to-red-900',
      group: 'Society & World'
    },
    {
      id: 'humanity',
      name: 'Humanity',
      description: 'Human nature and the human condition',
      icon: '🌍',
      color: 'from-blue-500 to-green-600',
      group: 'Society & World'
    },
    {
      id: 'women',
      name: 'Women',
      description: 'Women\'s experiences and perspectives',
      icon: '👩',
      color: 'from-pink-500 to-purple-600',
      group: 'Society & World'
    },
    {
      id: 'science',
      name: 'Science',
      description: 'Scientific discovery and knowledge',
      icon: '🔬',
      color: 'from-cyan-500 to-blue-600',
      group: 'Society & World'
    }
  ],
  'Other': [
    {
      id: 'fantasy',
      name: 'Fantasy',
      description: 'Imagination and fantastical worlds',
      icon: '🧙‍♂️',
      color: 'from-purple-600 to-indigo-700',
      group: 'Other'
    },
    {
      id: 'paranormal-romance',
      name: 'Paranormal Romance',
      description: 'Supernatural love stories',
      icon: '🧛‍♀️',
      color: 'from-red-600 to-purple-700',
      group: 'Other'
    },
    {
      id: 'sex',
      name: 'Adult',
      description: 'Mature themes and relationships',
      icon: '🔞',
      color: 'from-red-500 to-pink-600',
      group: 'Other'
    }
  ]
};

// Flatten all categories into a single array
export const allCategories: CategoryInfo[] = Object.values(categoryGroups).flat();

// Get category info by id
export function getCategoryInfo(id: string): CategoryInfo | undefined {
  return allCategories.find(cat => cat.id === id);
}

// Get categories by group
export function getCategoriesByGroup(group: string): CategoryInfo[] {
  return categoryGroups[group as keyof typeof categoryGroups] || [];
}

// Get all group names
export const groupNames = Object.keys(categoryGroups);

// Format category name for display
export function formatCategoryName(category: string): string {
  const categoryInfo = getCategoryInfo(category);
  return categoryInfo?.name || category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Get category color classes
export function getCategoryColor(category: string): string {
  const categoryInfo = getCategoryInfo(category);
  return categoryInfo?.color || 'from-gray-400 to-gray-600';
}

// Get category icon
export function getCategoryIcon(category: string): string {
  const categoryInfo = getCategoryInfo(category);
  return categoryInfo?.icon || '💭';
}

// Get category description
export function getCategoryDescription(category: string): string {
  const categoryInfo = getCategoryInfo(category);
  return categoryInfo?.description || 'Quotes about ' + formatCategoryName(category);
}
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://saying.to';

  const categories = [
    'all',
    'inspirational',
    'life',
    'love',
    'wisdom',
    'philosophy',
    'spirituality',
    'humor'
  ];

  // Generate category pages
  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}?category=${category}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...categoryUrls,
    {
      url: `${baseUrl}/api/quotes`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    },
  ];
}
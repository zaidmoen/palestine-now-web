import { describe, expect, it } from 'vitest';
import { newsItems } from '../data/news';
import { filterNewsItems, sanitizeNewsCategory } from './newsFilters';

const categories = ['الكل', ...new Set(newsItems.map((item) => item.category))];

describe('news filters', () => {
  it('matches Arabic letter variants and multiple terms', () => {
    const results = filterNewsItems(newsItems, { query: 'غَزَّة مساعدات' });

    expect(results.length).toBeGreaterThan(0);
    expect(results.every((item) => item.location === 'غزة')).toBe(true);
  });

  it('combines category and query filters', () => {
    const results = filterNewsItems(newsItems, { category: 'التعليم', query: 'نابلس' });

    expect(results).toHaveLength(1);
    expect(results[0].category).toBe('التعليم');
  });

  it('returns all items for empty filters', () => {
    expect(filterNewsItems(newsItems)).toHaveLength(newsItems.length);
  });

  it('falls back when a URL category is unknown', () => {
    expect(sanitizeNewsCategory('غير موجودة', categories)).toBe('الكل');
  });
});

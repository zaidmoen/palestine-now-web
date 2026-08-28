import { describe, expect, it } from 'vitest';
import { searchContent } from './searchIndex';

describe('unified search index', () => {
  it('finds emergency services using Arabic text', () => {
    const results = searchContent('رقم الاسعاف');

    expect(results.some((item) => item.category === 'طوارئ')).toBe(true);
  });

  it('finds a checkpoint by name', () => {
    const results = searchContent('قلنديا');

    expect(results[0]?.title).toContain('قلنديا');
  });

  it('respects category filters', () => {
    const results = searchContent('', 'وظائف');

    expect(results.length).toBeGreaterThan(0);
    expect(results.every((item) => item.category === 'وظائف')).toBe(true);
  });

  it('returns no matches for unrelated text', () => {
    expect(searchContent('مصطلح غير موجود إطلاقاً')).toEqual([]);
  });
});

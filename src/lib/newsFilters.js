import { normalizeArabic } from './arabicText';

export const ALL_NEWS_CATEGORY = 'الكل';

export function sanitizeNewsCategory(value, categories) {
  return categories.includes(value) ? value : ALL_NEWS_CATEGORY;
}

export function filterNewsItems(items, { category = ALL_NEWS_CATEGORY, query = '' } = {}) {
  const normalizedQuery = normalizeArabic(query);
  const terms = normalizedQuery.split(' ').filter(Boolean);

  return items.filter((item) => {
    if (category !== ALL_NEWS_CATEGORY && item.category !== category) return false;
    if (terms.length === 0) return true;

    const searchable = normalizeArabic([
      item.title,
      item.excerpt,
      item.category,
      item.location,
      item.author,
    ].join(' '));

    return terms.every((term) => searchable.includes(term));
  });
}

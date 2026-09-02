import { currencies, fuel, gold } from './economy';
import { emergencyNumbers, hospitals } from './emergency';
import { jobItems } from './jobs';
import { newsItems } from './news';
import { checkpoints, crossings, mainRoutes, roadStatuses } from './roads';
import { campaigns } from './solidarity';
import { studentOpportunities } from './students';

export const normalizeArabic = (value = '') =>
  String(value)
    .toLocaleLowerCase('ar')
    .normalize('NFKD')
    .replace(/[\u064B-\u065F\u0670]/g, '')
    .replace(/[إأآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const entry = ({ id, category, title, description, meta, to, keywords = [] }) => ({
  id,
  category,
  title,
  description,
  meta,
  to,
  searchable: normalizeArabic([title, description, meta, ...keywords].filter(Boolean).join(' ')),
});

export const searchEntries = [
  ...newsItems.map((item) => entry({
    id: item.id,
    category: 'أخبار',
    title: item.title,
    description: item.excerpt,
    meta: `${item.category} · ${item.location}`,
    to: '/news',
    keywords: item.bullets,
  })),
  ...jobItems.map((item) => entry({
    id: item.id,
    category: 'وظائف',
    title: item.title,
    description: item.description,
    meta: `${item.company} · ${item.city} · ${item.type}`,
    to: '/jobs',
    keywords: [...item.requirements, ...item.benefits, item.category],
  })),
  ...checkpoints.map((item) => entry({
    id: item.id,
    category: 'طرق',
    title: item.name,
    description: item.note,
    meta: `${roadStatuses[item.status].label} · ${item.location} · ${item.waitTime}`,
    to: '/roads',
    keywords: [item.alternative],
  })),
  ...crossings.map((item) => entry({
    id: item.id,
    category: 'طرق',
    title: item.name,
    description: `ساعات العمل: ${item.hours}`,
    meta: `${roadStatuses[item.status].label} · انتظار ${item.waitTime}`,
    to: '/roads',
  })),
  ...mainRoutes.map((item) => entry({
    id: item.id,
    category: 'طرق',
    title: item.name,
    description: `المسافة ${item.distance} والوقت التقديري ${item.estimatedTime}`,
    meta: roadStatuses[item.status].label,
    to: '/roads',
  })),
  ...emergencyNumbers.map((item) => entry({
    id: item.id,
    category: 'طوارئ',
    title: item.name,
    description: item.description,
    meta: `رقم الطوارئ ${item.number}`,
    to: '/emergency',
    keywords: [item.number],
  })),
  ...hospitals.map((item) => entry({
    id: item.id,
    category: 'طوارئ',
    title: item.name,
    description: `أقسام: ${item.departments.join('، ')}`,
    meta: `${item.city} · ${item.phone} · ${item.hours}`,
    to: '/emergency',
    keywords: [item.phone, ...item.departments],
  })),
  ...campaigns.map((item) => entry({
    id: item.id,
    category: 'تكافل',
    title: item.title,
    description: item.description,
    meta: `${item.category} · ${Math.round((item.raised / item.goal) * 100)}% من الهدف`,
    to: '/solidarity',
  })),
  ...studentOpportunities.map((item) => entry({
    id: `student-${item.id}`,
    category: 'طلاب',
    title: item.title,
    description: item.description,
    meta: `${item.type} · ${item.provider} · ${item.deadline}`,
    to: '/students',
    keywords: ['طالب', 'جامعة', 'دراسة', 'منحة', 'تدريب', 'تمويل'],
  })),
  ...currencies.map((item) => entry({
    id: item.id,
    category: 'اقتصاد',
    title: item.name,
    description: `سعر الشراء ${item.buy} وسعر البيع ${item.sell}`,
    meta: `${item.symbol} · بيانات نموذجية`,
    to: '/economy',
  })),
  ...gold.map((item) => entry({
    id: item.id,
    category: 'اقتصاد',
    title: item.name,
    description: `السعر المعروض ${item.price} شيكل لكل ${item.unit}`,
    meta: 'بيانات نموذجية',
    to: '/economy',
  })),
  ...fuel.map((item) => entry({
    id: item.id,
    category: 'اقتصاد',
    title: item.name,
    description: `السعر المعروض ${item.price} شيكل لكل ${item.unit}`,
    meta: 'بيانات نموذجية',
    to: '/economy',
  })),
];

export const searchCategories = ['الكل', 'أخبار', 'وظائف', 'طلاب', 'طرق', 'طوارئ', 'تكافل', 'اقتصاد'];

export function searchContent(query, category = 'الكل') {
  const terms = normalizeArabic(query).split(' ').filter(Boolean);

  return searchEntries
    .filter((item) => category === 'الكل' || item.category === category)
    .map((item) => {
      const title = normalizeArabic(item.title);
      let matchedTerms = 0;
      const score = terms.reduce((total, term) => {
        if (title === term) {
          matchedTerms += 1;
          return total + 10;
        }
        if (title.includes(term)) {
          matchedTerms += 1;
          return total + 5;
        }
        if (item.searchable.includes(term)) {
          matchedTerms += 1;
          return total + 2;
        }
        return total;
      }, 0);
      return { ...item, score, matchedTerms };
    })
    .filter((item) => terms.length === 0 || item.matchedTerms === terms.length)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, 'ar'));
}

import { currencies, fuel } from './economy';
import { emergencyNumbers, hospitals } from './emergency';
import { jobItems } from './jobs';
import { newsItems } from './news';
import { checkpoints, mainRoutes, roadStatuses } from './roads';
import { campaigns, impactStories } from './solidarity';

export const governorates = [
  'القدس',
  'جنين',
  'طوباس',
  'طولكرم',
  'نابلس',
  'قلقيلية',
  'سلفيت',
  'رام الله',
  'أريحا',
  'بيت لحم',
  'الخليل',
  'غزة',
  'خان يونس',
];

export const interestOptions = [
  { id: 'news', label: 'الأخبار' },
  { id: 'roads', label: 'الطرق' },
  { id: 'jobs', label: 'الوظائف' },
  { id: 'students', label: 'الطلاب' },
  { id: 'economy', label: 'الاقتصاد' },
  { id: 'emergency', label: 'الطوارئ' },
  { id: 'solidarity', label: 'التكافل' },
];

export const defaultPreferences = {
  governorate: 'جنين',
  interests: ['news', 'roads', 'jobs', 'students', 'economy', 'emergency'],
};

const matchesGovernorate = (value, governorate) =>
  String(value ?? '').includes(governorate);

const takeLocalFirst = (items, predicate, count = 2) => {
  const local = items.filter(predicate);
  const remaining = items.filter((item) => !local.includes(item));
  return [...local, ...remaining].slice(0, count);
};

function createNewsItems(governorate) {
  return takeLocalFirst(newsItems, (item) => item.location === governorate).map((item) => ({
    id: `personal-${item.id}`,
    category: 'أخبار',
    title: item.title,
    description: item.excerpt,
    meta: `${item.location} · ${item.time}`,
    to: '/news',
    local: item.location === governorate,
    urgent: item.isBreaking,
  }));
}

function createRoadItems(governorate) {
  const roadItems = [
    ...checkpoints.map((item) => ({
      ...item,
      sourceId: item.id,
      title: item.name,
      description: item.note,
      meta: `${roadStatuses[item.status].label} · انتظار ${item.waitTime}`,
      matchText: `${item.name} ${item.location}`,
      urgent: item.status === 'closed',
    })),
    ...mainRoutes.map((item) => ({
      ...item,
      sourceId: item.id,
      title: item.name,
      description: `الوقت التقديري ${item.estimatedTime} لمسافة ${item.distance}`,
      meta: `${roadStatuses[item.status].label} · ازدحام ${item.congestionLevel}%`,
      matchText: item.name,
      urgent: item.status === 'closed',
    })),
  ];

  return takeLocalFirst(
    roadItems,
    (item) => matchesGovernorate(item.matchText, governorate),
  ).map((item) => ({
    id: `personal-${item.sourceId}`,
    category: 'طرق',
    title: item.title,
    description: item.description,
    meta: item.meta,
    to: '/roads',
    local: matchesGovernorate(item.matchText, governorate),
    urgent: item.urgent,
  }));
}

function createJobItems(governorate) {
  return takeLocalFirst(
    jobItems,
    (item) => item.city === governorate || item.type === 'عن بُعد',
  ).map((item) => ({
    id: `personal-${item.id}`,
    category: 'وظائف',
    title: item.title,
    description: item.description,
    meta: `${item.company} · ${item.city} · ${item.type}`,
    to: '/jobs',
    local: item.city === governorate,
    urgent: false,
  }));
}

function createStudentItems(governorate) {
  return [
    {
      id: 'personal-student-opportunities',
      category: 'طلاب',
      title: 'منح وتدريب وتمويل في مكان واحد',
      description: 'جهّز ملفك وتابع الفرص والمواعيد النهائية المناسبة للطلبة خطوة بخطوة.',
      meta: `مخصص لطلبة ${governorate}`,
      to: '/students',
      local: true,
      urgent: false,
    },
  ];
}

function createEconomyItems() {
  const usd = currencies.find((item) => item.id === 'usd');
  const petrol = fuel.find((item) => item.id === 'benzine-95');

  return [
    {
      id: 'personal-economy-usd',
      category: 'اقتصاد',
      title: `الدولار: ${usd.buy} شراء · ${usd.sell} بيع`,
      description: `التغير المعروض ${usd.changePercent}. راجع المصدر الرسمي قبل أي قرار مالي.`,
      meta: 'مؤشر اقتصادي · بيانات عرض',
      to: '/economy',
      local: false,
      urgent: false,
    },
    {
      id: 'personal-economy-fuel',
      category: 'اقتصاد',
      title: `${petrol.name}: ${petrol.price} ₪`,
      description: `السعر المعروض لكل ${petrol.unit} مع مقارنة سريعة بالتغير السابق.`,
      meta: 'أسعار المحروقات · بيانات عرض',
      to: '/economy',
      local: false,
      urgent: false,
    },
  ];
}

function createEmergencyItems(governorate) {
  const nearbyHospitals = hospitals.filter((item) => item.city === governorate);
  const ambulance = emergencyNumbers.find((item) => item.id === 'ambulance');

  return [
    ...nearbyHospitals.slice(0, 1).map((item) => ({
      id: `personal-${item.id}`,
      category: 'طوارئ',
      title: item.name,
      description: `أقسام ${item.departments.slice(0, 3).join('، ')} · يعمل ${item.hours}`,
      meta: `${item.city} · ${item.phone}`,
      to: '/emergency',
      local: true,
      urgent: false,
    })),
    {
      id: 'personal-emergency-ambulance',
      category: 'طوارئ',
      title: `${ambulance.name}: ${ambulance.number}`,
      description: ambulance.description,
      meta: 'رقم طوارئ سريع',
      to: '/emergency',
      local: false,
      urgent: true,
    },
  ].slice(0, 2);
}

function createSolidarityItems(governorate) {
  const localStory = impactStories.find((item) => item.location === governorate);
  const campaign = campaigns.find((item) => !item.completed) ?? campaigns[0];
  const progress = Math.round((campaign.raised / campaign.goal) * 100);

  return [
    {
      id: `personal-${campaign.id}`,
      category: 'تكافل',
      title: campaign.title,
      description: campaign.description,
      meta: `${progress}% من الهدف${localStory ? ` · قصة أثر من ${governorate}` : ''}`,
      to: '/solidarity',
      local: Boolean(localStory),
      urgent: false,
    },
  ];
}

const creators = {
  news: createNewsItems,
  roads: createRoadItems,
  jobs: createJobItems,
  students: createStudentItems,
  economy: createEconomyItems,
  emergency: createEmergencyItems,
  solidarity: createSolidarityItems,
};

export function buildPersonalFeed(preferences = defaultPreferences) {
  const governorate = governorates.includes(preferences.governorate)
    ? preferences.governorate
    : defaultPreferences.governorate;
  const interests = Array.isArray(preferences.interests)
    ? preferences.interests.filter((interest) => creators[interest])
    : defaultPreferences.interests;

  return interests.flatMap((interest) => creators[interest](governorate));
}

export function buildPersonalSummary(governorate) {
  const localNews = newsItems.filter((item) => item.location === governorate).length;
  const matchingJobs = jobItems.filter(
    (item) => item.city === governorate || item.type === 'عن بُعد',
  ).length;
  const roadAlerts = [...checkpoints, ...mainRoutes].filter(
    (item) =>
      matchesGovernorate(`${item.name} ${item.location}`, governorate) &&
      item.status !== 'open',
  ).length;
  const nearbyHospitals = hospitals.filter((item) => item.city === governorate).length;

  return { localNews, matchingJobs, roadAlerts, nearbyHospitals };
}


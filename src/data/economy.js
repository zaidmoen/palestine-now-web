export const currencies = [
  { id: 'usd', name: 'دولار أمريكي', symbol: '$', flag: '🇺🇸', buy: '3.69', sell: '3.72', change: '+0.03', changePercent: '+0.82%', isUp: true },
  { id: 'jod', name: 'دينار أردني', symbol: 'د.ا', flag: '🇯🇴', buy: '5.20', sell: '5.24', change: '+0.01', changePercent: '+0.19%', isUp: true },
  { id: 'eur', name: 'يورو', symbol: '€', flag: '🇪🇺', buy: '4.05', sell: '4.10', change: '-0.02', changePercent: '-0.49%', isUp: false },
  { id: 'gbp', name: 'جنيه إسترليني', symbol: '£', flag: '🇬🇧', buy: '4.68', sell: '4.73', change: '+0.05', changePercent: '+1.07%', isUp: true },
  { id: 'egp', name: 'جنيه مصري', symbol: 'ج.م', flag: '🇪🇬', buy: '0.075', sell: '0.078', change: '-0.001', changePercent: '-1.30%', isUp: false },
  { id: 'try', name: 'ليرة تركية', symbol: '₺', flag: '🇹🇷', buy: '0.108', sell: '0.112', change: '+0.002', changePercent: '+1.82%', isUp: true },
];

export const gold = [
  { id: 'gold-24', name: 'ذهب عيار 24', unit: 'غرام', price: '295.50', change: '+2.30', changePercent: '+0.78%', isUp: true },
  { id: 'gold-21', name: 'ذهب عيار 21', unit: 'غرام', price: '258.60', change: '+1.90', changePercent: '+0.74%', isUp: true },
  { id: 'gold-18', name: 'ذهب عيار 18', unit: 'غرام', price: '221.60', change: '+1.50', changePercent: '+0.68%', isUp: true },
  { id: 'gold-ounce', name: 'أونصة ذهب', unit: 'أونصة', price: '9,190', change: '-15.00', changePercent: '-0.16%', isUp: false },
];

export const fuel = [
  { id: 'benzine-95', name: 'بنزين 95', price: '6.83', unit: 'لتر', change: '0.00', isUp: null },
  { id: 'benzine-98', name: 'بنزين 98', price: '7.45', unit: 'لتر', change: '+0.12', isUp: true },
  { id: 'diesel', name: 'سولار (ديزل)', price: '6.24', unit: 'لتر', change: '-0.08', isUp: false },
  { id: 'gas', name: 'غاز طبخ', price: '65.00', unit: 'اسطوانة 12 كغ', change: '0.00', isUp: null },
];

export const economyMetrics = [
  { id: 'inflation', value: '2.4%', label: 'معدل التضخم', tone: 'border-accent/20 bg-accent/10 text-accent-light' },
  { id: 'unemployment', value: '25.7%', label: 'معدل البطالة', tone: 'border-pal-red/20 bg-pal-red/10 text-pal-red' },
  { id: 'gdp', value: '+3.1%', label: 'نمو الناتج المحلي', tone: 'border-primary/20 bg-primary/10 text-primary-light' },
];

export const priceHistory = [
  { day: 'الأحد', usd: 3.66, jod: 5.18, gold21: 256.70 },
  { day: 'الاثنين', usd: 3.67, jod: 5.19, gold21: 257.20 },
  { day: 'الثلاثاء', usd: 3.68, jod: 5.20, gold21: 258.10 },
  { day: 'الأربعاء', usd: 3.66, jod: 5.19, gold21: 256.90 },
  { day: 'الخميس', usd: 3.69, jod: 5.20, gold21: 258.60 },
  { day: 'الجمعة', usd: 3.70, jod: 5.21, gold21: 259.10 },
  { day: 'السبت', usd: 3.69, jod: 5.20, gold21: 258.60 },
];

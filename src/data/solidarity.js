export const campaigns = [
  { id: 'camp-1', title: 'حملة شتاء دافئ', description: 'توفير مستلزمات التدفئة للعائلات المتضررة في قطاع غزة خلال فصل الشتاء.', goal: 250000, raised: 187500, donors: 1240, daysLeft: 18, category: 'إغاثة', icon: '🧣', color: '#EF4444', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  { id: 'camp-2', title: 'كفالة يتيم', description: 'برنامج شهري لكفالة الأيتام يشمل التعليم والصحة والمعيشة.', goal: 500000, raised: 425000, donors: 3200, daysLeft: null, category: 'رعاية', icon: '👦', color: '#8B5CF6', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { id: 'camp-3', title: 'مشروع إفطار صائم', description: 'تقديم وجبات إفطار يومية للعائلات المحتاجة خلال شهر رمضان.', goal: 180000, raised: 180000, donors: 2100, daysLeft: 0, category: 'موسمية', icon: '🍽️', color: '#F59E0B', bg: 'bg-amber-500/10', border: 'border-amber-500/20', completed: true },
  { id: 'camp-4', title: 'منح دراسية للطلبة', description: 'منح دراسية جزئية وكاملة لطلبة الجامعات المتفوقين من الأسر محدودة الدخل.', goal: 320000, raised: 128000, donors: 890, daysLeft: 45, category: 'تعليم', icon: '🎓', color: '#3B82F6', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { id: 'camp-5', title: 'عيادات متنقلة', description: 'تمويل عيادات طبية متنقلة لخدمة القرى والتجمعات البعيدة عن المدن.', goal: 400000, raised: 220000, donors: 1560, daysLeft: 30, category: 'صحة', icon: '🏥', color: '#10B981', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { id: 'camp-6', title: 'ترميم البيوت المتضررة', description: 'ترميم وإعادة تأهيل البيوت المتضررة لإعادة العائلات لمنازلها.', goal: 600000, raised: 318000, donors: 2870, daysLeft: 60, category: 'إعمار', icon: '🏗️', color: '#0EA5E9', bg: 'bg-sky-500/10', border: 'border-sky-500/20' },
];

export const solidarityCategories = ['الكل', 'إغاثة', 'رعاية', 'تعليم', 'صحة', 'إعمار', 'موسمية'];

export const solidarityMetrics = [
  { id: 'total-raised', value: '1.45M ₪', label: 'إجمالي التبرعات', tone: 'border-primary/20 bg-primary/10 text-primary-light' },
  { id: 'families', value: '8,200+', label: 'عائلة مستفيدة', tone: 'border-accent/20 bg-accent/10 text-accent-light' },
  { id: 'donors', value: '12,500+', label: 'متبرع ومتبرعة', tone: 'border-pal-blue/20 bg-pal-blue/10 text-pal-blue' },
];

export const impactStories = [
  { id: 'story-1', name: 'أم خالد', location: 'خان يونس', text: 'بفضل حملة شتاء دافئ، أصبح لدينا تدفئة ومستلزمات للأطفال. شكرًا لكل من ساهم.', avatar: '👩', campaign: 'شتاء دافئ' },
  { id: 'story-2', name: 'أحمد محمد', location: 'نابلس', text: 'المنحة الدراسية غيّرت حياتي. الآن أكمل سنتي الجامعية الثالثة بتخصص الطب.', avatar: '👨‍🎓', campaign: 'منح دراسية' },
  { id: 'story-3', name: 'عائلة أبو سمرة', location: 'غزة', text: 'تم ترميم بيتنا بالكامل وعدنا لمنزلنا بعد أشهر من النزوح. شكرًا لكم.', avatar: '👨‍👩‍👧‍👦', campaign: 'ترميم البيوت' },
];

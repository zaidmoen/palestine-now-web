export const emergencyNumbers = [
  { id: 'police', name: 'الشرطة الفلسطينية', number: '100', icon: '🚔', color: '#3B82F6', bg: 'bg-blue-500/10', border: 'border-blue-500/20', description: 'للبلاغات الأمنية والحوادث' },
  { id: 'ambulance', name: 'الإسعاف والطوارئ', number: '101', icon: '🚑', color: '#EF4444', bg: 'bg-red-500/10', border: 'border-red-500/20', description: 'للحالات الصحية الطارئة' },
  { id: 'fire', name: 'الدفاع المدني', number: '102', icon: '🚒', color: '#F59E0B', bg: 'bg-amber-500/10', border: 'border-amber-500/20', description: 'للحرائق وعمليات الإنقاذ' },
  { id: 'redcrescent', name: 'الهلال الأحمر', number: '1669', icon: '🏥', color: '#EF4444', bg: 'bg-red-500/10', border: 'border-red-500/20', description: 'خدمات الإسعاف والإغاثة' },
  { id: 'electricity', name: 'أعطال الكهرباء', number: '121', icon: '⚡', color: '#EAB308', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', description: 'للإبلاغ عن انقطاع الكهرباء' },
  { id: 'water', name: 'أعطال المياه', number: '122', icon: '💧', color: '#06B6D4', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', description: 'للإبلاغ عن انقطاع المياه' },
];

export const hospitals = [
  { id: 'h-1', name: 'مجمع فلسطين الطبي', city: 'رام الله', phone: '02-2406260', emergency: true, departments: ['طوارئ', 'جراحة', 'أطفال', 'نسائية', 'باطنة'], hours: '24 ساعة' },
  { id: 'h-2', name: 'مستشفى المقاصد', city: 'القدس', phone: '02-6270222', emergency: true, departments: ['طوارئ', 'قلبية', 'عيون', 'عظام', 'أورام'], hours: '24 ساعة' },
  { id: 'h-3', name: 'مستشفى رفيديا الحكومي', city: 'نابلس', phone: '09-2390390', emergency: true, departments: ['طوارئ', 'جراحة', 'باطنة', 'أطفال', 'نسائية'], hours: '24 ساعة' },
  { id: 'h-4', name: 'مستشفى ثابت ثابت', city: 'طولكرم', phone: '09-2671017', emergency: true, departments: ['طوارئ', 'جراحة', 'باطنة'], hours: '24 ساعة' },
  { id: 'h-5', name: 'مستشفى الخليل الحكومي', city: 'الخليل', phone: '02-2220212', emergency: true, departments: ['طوارئ', 'جراحة', 'نسائية', 'أطفال'], hours: '24 ساعة' },
  { id: 'h-6', name: 'مستشفى بيت جالا الحكومي', city: 'بيت لحم', phone: '02-2741161', emergency: true, departments: ['طوارئ', 'جراحة', 'باطنة', 'أطفال'], hours: '24 ساعة' },
  { id: 'h-7', name: 'مستشفى جنين الحكومي', city: 'جنين', phone: '04-2500015', emergency: true, departments: ['طوارئ', 'جراحة', 'باطنة'], hours: '24 ساعة' },
  { id: 'h-8', name: 'مستشفى الشفاء', city: 'غزة', phone: '08-2862765', emergency: true, departments: ['طوارئ', 'جراحة', 'أورام', 'قلبية', 'أطفال'], hours: '24 ساعة' },
];

export const emergencyTips = [
  { id: 'tip-1', title: 'الإنعاش القلبي', icon: '❤️', steps: ['تأكد من سلامة المكان', 'اتصل بالإسعاف 101', 'ابدأ ضغطات الصدر 30 مرة', 'أعطِ نفسين إنقاذ', 'كرر حتى وصول الإسعاف'] },
  { id: 'tip-2', title: 'حالات النزيف', icon: '🩸', steps: ['اضغط مباشرة على الجرح', 'استخدم قماشة نظيفة', 'ارفع الطرف المصاب', 'لا تزل الضمادة', 'انتظر المساعدة الطبية'] },
  { id: 'tip-3', title: 'حالات الاختناق', icon: '🫁', steps: ['شجع المصاب على السعال', 'إذا لم يستطع: 5 ضربات بين الكتفين', 'ثم 5 ضغطات بطنية (هيمليك)', 'كرر حتى خروج الجسم', 'إن فقد الوعي: ابدأ الإنعاش'] },
  { id: 'tip-4', title: 'حالات الحروق', icon: '🔥', steps: ['أبعد المصاب عن مصدر الحرارة', 'اغسل بماء بارد 10-20 دقيقة', 'لا تضع ثلج أو معجون', 'غطِّ بضماد نظيف', 'توجه لأقرب مستشفى'] },
];

export const emergencyMetrics = [
  { id: 'hospitals', value: '52', label: 'مستشفى فعّال', tone: 'border-primary/20 bg-primary/10 text-primary-light' },
  { id: 'ambulances', value: '180+', label: 'سيارة إسعاف', tone: 'border-pal-red/20 bg-pal-red/10 text-pal-red' },
  { id: 'centers', value: '340', label: 'مركز صحي أولي', tone: 'border-pal-blue/20 bg-pal-blue/10 text-pal-blue' },
];

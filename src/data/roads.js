export const roadStatuses = {
  open: { label: 'مفتوح', color: '#22C55E', bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-400' },
  congested: { label: 'ازدحام', color: '#F59E0B', bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400' },
  closed: { label: 'مغلق', color: '#EF4444', bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-400' },
  partial: { label: 'مفتوح جزئياً', color: '#3B82F6', bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400' },
};

export const checkpoints = [
  { id: 'cp-1', name: 'حاجز قلنديا', location: 'رام الله ↔ القدس', status: 'congested', waitTime: '45 دقيقة', lastUpdate: 'منذ 5 دقائق', note: 'ازدحام شديد بسبب التفتيش الأمني المكثف', alternative: 'استخدم طريق الريحان البديل' },
  { id: 'cp-2', name: 'حاجز حوارة', location: 'نابلس ↔ رام الله', status: 'open', waitTime: '10 دقائق', lastUpdate: 'منذ 8 دقائق', note: 'حركة مرور عادية', alternative: null },
  { id: 'cp-3', name: 'حاجز بيت إيل', location: 'رام الله ↔ شمال', status: 'closed', waitTime: 'غير محدد', lastUpdate: 'منذ 12 دقيقة', note: 'مغلق حتى إشعار آخر', alternative: 'استخدم محور عين سينيا' },
  { id: 'cp-4', name: 'حاجز الكونتينر', location: 'بيت لحم ↔ الخليل', status: 'open', waitTime: '5 دقائق', lastUpdate: 'منذ 15 دقيقة', note: 'سير طبيعي', alternative: null },
  { id: 'cp-5', name: 'حاجز ترقوميا', location: 'الخليل ↔ الداخل', status: 'partial', waitTime: '25 دقيقة', lastUpdate: 'منذ 20 دقيقة', note: 'مسار واحد فقط مفتوح', alternative: 'محور صوريف' },
];

export const crossings = [
  { id: 'cr-1', name: 'معبر الكرامة (الأردن)', status: 'open', waitTime: '30 دقيقة', hours: '7:00 ص - 8:00 م', lastUpdate: 'منذ 10 دقائق' },
  { id: 'cr-2', name: 'معبر رفح (مصر)', status: 'closed', waitTime: 'غير محدد', hours: 'مغلق حالياً', lastUpdate: 'منذ ساعة' },
  { id: 'cr-3', name: 'معبر بيت حانون (إيرز)', status: 'partial', waitTime: '45 دقيقة', hours: '8:00 ص - 4:00 م', lastUpdate: 'منذ 25 دقيقة' },
];

export const mainRoutes = [
  { id: 'rt-1', name: 'طريق رام الله - نابلس', status: 'open', distance: '58 كم', estimatedTime: '55 دقيقة', congestionLevel: 30 },
  { id: 'rt-2', name: 'طريق رام الله - الخليل', status: 'congested', distance: '45 كم', estimatedTime: '80 دقيقة', congestionLevel: 70 },
  { id: 'rt-3', name: 'طريق نابلس - جنين', status: 'open', distance: '42 كم', estimatedTime: '45 دقيقة', congestionLevel: 20 },
  { id: 'rt-4', name: 'طريق الخليل - بيت لحم', status: 'open', distance: '30 كم', estimatedTime: '35 دقيقة', congestionLevel: 40 },
  { id: 'rt-5', name: 'طريق طولكرم - قلقيلية', status: 'partial', distance: '18 كم', estimatedTime: '40 دقيقة', congestionLevel: 55 },
  { id: 'rt-6', name: 'طريق رام الله - أريحا', status: 'open', distance: '55 كم', estimatedTime: '50 دقيقة', congestionLevel: 15 },
];

export const roadMetrics = [
  { id: 'open-routes', value: '73%', label: 'طرق مفتوحة', tone: 'border-green-500/20 bg-green-500/10 text-green-400' },
  { id: 'avg-wait', value: '22 د', label: 'متوسط الانتظار', tone: 'border-accent/20 bg-accent/10 text-accent-light' },
  { id: 'alerts', value: '3', label: 'تنبيهات فعالة', tone: 'border-pal-red/20 bg-pal-red/10 text-pal-red' },
];

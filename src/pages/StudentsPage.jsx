import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  Bell,
  Briefcase,
  CheckCircle2,
  Crown,
  FileText,
  GraduationCap,
  MessageCircle,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react';

const tracks = [
  {
    id: 'training',
    title: 'التدريب العملي',
    subtitle: 'أول خبرة ميدانية حقيقية',
    icon: Briefcase,
    iconShell: 'bg-primary/10 border-primary/25 text-primary-light',
    border: 'border-primary/25 hover:border-primary/45',
    glow: 'shadow-[0_24px_70px_rgba(26,107,60,0.18)]',
    bullets: ['سيرة ذاتية جاهزة', 'رسالة تقديم', 'متابعة أسبوعية'],
  },
  {
    id: 'jobs',
    title: 'فرص العمل للطلبة',
    subtitle: 'دخل مرن مع الحفاظ على الدراسة',
    icon: TrendingUp,
    iconShell: 'bg-accent/10 border-accent/25 text-accent-light',
    border: 'border-accent/25 hover:border-accent/45',
    glow: 'shadow-[0_24px_70px_rgba(212,160,23,0.16)]',
    bullets: ['دوام جزئي', 'تنبيهات فرص جديدة', 'جدول متوازن'],
  },
  {
    id: 'study',
    title: 'الخطط الدراسية',
    subtitle: 'تنظيم أسبوعي وشهري',
    icon: FileText,
    iconShell: 'bg-pal-blue/10 border-pal-blue/25 text-pal-blue',
    border: 'border-pal-blue/25 hover:border-pal-blue/45',
    glow: 'shadow-[0_24px_70px_rgba(41,128,185,0.16)]',
    bullets: ['خطة 7 أيام', 'إعادة جدولة', 'تذكير قبل الامتحان'],
  },
  {
    id: 'career',
    title: 'المسار المهني',
    subtitle: 'تجهيزك لما بعد الجامعة',
    icon: GraduationCap,
    iconShell: 'bg-green-bright/10 border-green-bright/25 text-green-bright',
    border: 'border-green-bright/25 hover:border-green-bright/45',
    glow: 'shadow-[0_24px_70px_rgba(39,174,96,0.16)]',
    bullets: ['ملف رقمي', 'منح وفعاليات', 'مشاريع صغيرة'],
  },
];

const plans = [
  {
    id: 'free',
    name: 'Starter',
    title: 'الخطة المجانية',
    badge: 'للبداية',
    price: { monthly: 'مجاني', semester: 'مجاني' },
    icon: Sparkles,
    iconShell: 'bg-primary/10 border-primary/20 text-primary-light',
    shell: 'bg-surface/80 border-subtle',
    features: ['عرض البطاقات الأساسية', 'الوصول للخطة العامة', 'بدون واتساب'],
  },
  {
    id: 'pro',
    name: 'Pro',
    title: 'نسخة الطالب المحترف',
    badge: 'الأكثر طلبًا',
    price: { monthly: '29₪ / شهر', semester: '99₪ / فصل' },
    icon: Crown,
    iconShell: 'bg-accent/10 border-accent/20 text-accent-light',
    shell: 'bg-[linear-gradient(180deg,rgba(26,107,60,0.18),rgba(17,26,20,0.9))] border-primary/40',
    features: ['خطط إضافية', 'إشعارات واتساب', 'تنبيهات ذكية', 'متابعة أسبوعية'],
  },
  {
    id: 'teams',
    name: 'Teams',
    title: 'للأندية والمبادرات',
    badge: 'للمجموعات',
    price: { monthly: '79₪ / شهر', semester: '259₪ / فصل' },
    icon: GraduationCap,
    iconShell: 'bg-pal-blue/10 border-pal-blue/20 text-pal-blue',
    shell: 'bg-surface-2/80 border-pal-blue/30',
    features: ['خطط جماعية', 'تنبيهات جماعية', 'لوحة مسؤول', 'متابعة النشاط'],
  },
];

const channels = [
  {
    id: 'whatsapp',
    title: 'واتساب',
    icon: MessageCircle,
    shell: 'bg-green-bright/10 border-green-bright/20 text-green-bright',
    text: 'رسائل قصيرة تصل وقت الحاجة: تذكير جلسة، اقتراب تسليم، أو فرصة جديدة.',
    preview: [
      '08:10 - باقي 45 دقيقة على جلسة الدراسة.',
      '12:30 - تم فتح فرصة تدريب جديدة مناسبة لك.',
      '18:00 - تبقّت لك مهمة واحدة قبل نهاية اليوم.',
    ],
  },
  {
    id: 'alerts',
    title: 'تنبيهات فورية',
    icon: Bell,
    shell: 'bg-accent/10 border-accent/20 text-accent-light',
    text: 'تنبيهات داخل المنصة مرتبة حسب الأولوية: عاجل، اليوم، هذا الأسبوع.',
    preview: [
      'أولوية عالية: تسليم تقرير خلال 6 ساعات.',
      'هذا الأسبوع: فرصة منحة جديدة.',
      'متابعة: تم تأجيل مهمتين ويجب إعادة التوزيع.',
    ],
  },
  {
    id: 'smart',
    title: 'ذكاء تنبيهي',
    icon: Zap,
    shell: 'bg-primary/10 border-primary/20 text-primary-light',
    text: 'النظام يلاحظ التأخير أو ضغط المواعيد ويقترح إعادة جدولة أو تصعيد التنبيه.',
    preview: [
      'تحليل: يوجد تكدس خلال 3 أيام.',
      'اقتراح: انقل مراجعة المادة الاختيارية إلى الثلاثاء.',
      'أثر الخطة: الالتزام اليوم يقلل التأخير 32%.',
    ],
  },
];

const billingOptions = [
  { id: 'monthly', label: 'شهري' },
  { id: 'semester', label: 'فصلي' },
];

export default function StudentsPage() {
  const [activeTrackId, setActiveTrackId] = useState(tracks[0].id);
  const [billing, setBilling] = useState('monthly');
  const [activeChannelId, setActiveChannelId] = useState(channels[0].id);

  const activeTrack = tracks.find((track) => track.id === activeTrackId) ?? tracks[0];
  const activeChannel = channels.find((channel) => channel.id === activeChannelId) ?? channels[0];
  const ActiveTrackIcon = activeTrack.icon;
  const ActiveChannelIcon = activeChannel.icon;

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg pt-[88px] font-cairo" dir="rtl">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -40, 0], opacity: [0.25, 0.42, 0.25] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-24 top-0 h-[420px] w-[420px] rounded-full bg-primary/20 blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 40, 0], opacity: [0.18, 0.32, 0.18] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
          className="absolute -left-24 top-1/3 h-[360px] w-[360px] rounded-full bg-pal-blue/10 blur-[120px]"
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 pb-20 sm:px-6 lg:px-8">
        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-[32px] border border-subtle bg-surface/85 p-6 shadow-2xl shadow-black/20 sm:p-8 lg:p-10"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(42,138,80,0.14),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(41,128,185,0.14),transparent_38%)]" />
            <div className="relative">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-bold text-primary-light">
                <Crown size={14} />
                Student Pro Platform
              </div>

              <h1 className="text-4xl font-extrabold leading-tight text-t1 sm:text-5xl lg:text-[58px]">
                صفحة طلاب احترافية
                <span className="gradient-text block pt-2">بخطط إضافية وتنبيهات واتساب واشتراك Pro</span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-t2 sm:text-lg">
                صارت الصفحة تعرض مسارات أساسية مجانية، وباقات مدفوعة فيها تنبيهات واتساب وتذكيرات ذكية ومتابعة عملية تعطي سببًا
                حقيقيًا للدفع.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#plans"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-primary px-7 text-sm font-extrabold text-white transition-all hover:scale-[1.02] hover:bg-primary-light"
                >
                  استعرض باقات الاشتراك
                  <ArrowLeft size={18} />
                </a>
                <a
                  href="#notifications"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-subtle bg-white/[0.02] px-7 text-sm font-bold text-t1 transition-all hover:border-subtle-hover hover:bg-surface-2"
                >
                  شاهد تنبيهات واتساب
                </a>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-subtle bg-white/[0.03] px-5 py-4">
                  <p className="text-2xl font-extrabold text-t1">04</p>
                  <p className="mt-1 text-sm text-t2">مسارات أساسية</p>
                </div>
                <div className="rounded-2xl border border-subtle bg-white/[0.03] px-5 py-4">
                  <p className="text-2xl font-extrabold text-t1">03</p>
                  <p className="mt-1 text-sm text-t2">باقات اشتراك</p>
                </div>
                <div className="rounded-2xl border border-subtle bg-white/[0.03] px-5 py-4">
                  <p className="text-2xl font-extrabold text-t1">واتساب</p>
                  <p className="mt-1 text-sm text-t2">تنبيهات مباشرة</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.55, ease: 'easeOut' }}
            className={`relative overflow-hidden rounded-[32px] border border-subtle bg-surface-2/80 p-6 shadow-2xl shadow-black/20 sm:p-8 ${activeTrack.glow}`}
          >
            <div className="relative flex h-full flex-col">
              <div className="mb-5 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5 text-xs font-bold text-accent-light">
                  <Sparkles size={12} />
                  قابل للتوسعة داخل Pro
                </span>
                <span className="text-xs font-bold tracking-[0.18em] text-t3">PRO READY</span>
              </div>

              <div className={`mb-5 flex h-16 w-16 items-center justify-center rounded-3xl border ${activeTrack.iconShell}`}>
                <ActiveTrackIcon size={28} />
              </div>

              <p className="text-sm font-bold text-t2">{activeTrack.subtitle}</p>
              <h2 className="mt-2 text-3xl font-extrabold leading-tight text-t1">{activeTrack.title}</h2>

              <div className="mt-6 space-y-3">
                {activeTrack.bullets.map((bullet) => (
                  <div key={bullet} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-black/10 px-4 py-3">
                    <CheckCircle2 size={18} className="shrink-0 text-primary-light" />
                    <span className="text-sm font-semibold text-t1">{bullet}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-6 rounded-3xl border border-white/8 bg-black/15 p-4">
                <p className="text-xs font-bold text-t3">قيمة Pro لهذا المسار</p>
                <p className="mt-2 text-sm leading-7 text-t1">
                  تذكير واتساب، تنبيه تأخير، وخطة إضافية جاهزة بدل الاعتماد فقط على العرض الأساسي.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
          {tracks.map((track, index) => {
            const Icon = track.icon;
            const isActive = track.id === activeTrackId;

            return (
              <motion.button
                key={track.id}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.06, duration: 0.35 }}
                whileHover={{ y: -4 }}
                onClick={() => setActiveTrackId(track.id)}
                className={`group relative overflow-hidden rounded-[28px] border bg-surface/80 p-5 text-right backdrop-blur transition-all duration-300 ${track.border} ${
                  isActive ? `${track.glow} border-white/20` : ''
                }`}
              >
                <div className="relative flex h-full flex-col">
                  <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border ${track.iconShell}`}>
                    <Icon size={24} />
                  </div>
                  <p className="text-xs font-bold text-t3">{track.subtitle}</p>
                  <h3 className="mt-2 text-xl font-extrabold text-t1">{track.title}</h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {track.bullets.map((bullet) => (
                      <span key={bullet} className="rounded-full border border-white/8 px-2.5 py-1 text-[11px] font-semibold text-t2">
                        {bullet}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </section>

        <section id="plans" className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold text-primary-light">الاشتراكات</p>
                <h2 className="mt-2 text-3xl font-extrabold text-t1">النسخة المجانية مقابل النسخة Pro</h2>
              </div>
              <div className="inline-flex rounded-full border border-subtle bg-surface-2/80 p-1">
                {billingOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setBilling(option.id)}
                    className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${
                      billing === option.id ? 'bg-primary text-white' : 'text-t2'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-5 xl:grid-cols-3">
              {plans.map((plan, index) => {
                const Icon = plan.icon;
                return (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                    className={`relative overflow-hidden rounded-[30px] border p-6 shadow-2xl shadow-black/20 ${plan.shell}`}
                  >
                    <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-bold text-t2">
                      {plan.badge}
                    </div>
                    <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border ${plan.iconShell}`}>
                      <Icon size={24} />
                    </div>
                    <p className="text-sm font-bold text-t2">{plan.name}</p>
                    <h3 className="mt-2 text-2xl font-extrabold text-t1">{plan.title}</h3>
                    <p className="mt-4 text-3xl font-extrabold text-t1">{plan.price[billing]}</p>
                    <div className="mt-5 space-y-3">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-black/10 px-4 py-3">
                          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary-light" />
                          <span className="text-sm leading-7 text-t1">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <section id="notifications" className="rounded-[30px] border border-subtle bg-surface/85 p-6 shadow-2xl shadow-black/20 sm:p-8">
            <p className="text-sm font-bold text-primary-light">واتساب والتنبيهات</p>
            <h2 className="mt-2 text-3xl font-extrabold text-t1">هذه هي نقطة البيع الأقوى</h2>
            <p className="mt-4 text-sm leading-8 text-t2">
              المستخدم لا يدفع فقط على المحتوى الإضافي، بل يدفع على الالتزام والوصول السريع والمتابعة الذكية.
            </p>

            <div className="mt-6 space-y-3">
              {channels.map((channel) => {
                const Icon = channel.icon;
                const isActive = channel.id === activeChannelId;

                return (
                  <button
                    key={channel.id}
                    type="button"
                    onClick={() => setActiveChannelId(channel.id)}
                    className={`w-full rounded-[24px] border p-4 text-right transition-all ${
                      isActive ? 'border-primary/40 bg-surface-2 shadow-[0_20px_50px_rgba(26,107,60,0.14)]' : 'border-subtle bg-surface/60'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${channel.shell}`}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-extrabold text-t1">{channel.title}</p>
                        <p className="mt-2 text-sm leading-7 text-t2">{channel.text}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeChannel.id}
                initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                transition={{ duration: 0.3 }}
                className="mt-6 rounded-[28px] border border-white/8 bg-black/15 p-5"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-extrabold text-t1">{activeChannel.title}</p>
                    <p className="mt-1 text-xs font-bold text-t3">معاينة نسخة Pro</p>
                  </div>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${activeChannel.shell}`}>
                    <ActiveChannelIcon size={20} />
                  </div>
                </div>
                <div className="space-y-3">
                  {activeChannel.preview.map((item) => (
                    <div key={item} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm leading-7 text-t1">
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </section>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="overflow-hidden rounded-[32px] border border-subtle bg-surface/90 p-6 shadow-2xl shadow-black/20 sm:p-8 lg:p-10"
        >
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-bold text-primary-light">جاهزية أعلى</p>
              <h2 className="mt-2 text-3xl font-extrabold text-t1">الصفحة الآن تعرض منتجًا مجانيًا ومدفوعًا بشكل مقنع</h2>
              <p className="mt-4 max-w-3xl text-sm leading-8 text-t2 sm:text-base">
                صار عندك الآن مسارات أساسية ومنطق واضح للاشتراك وتنبيهات واتساب تعطي مبررًا حقيقيًا للدفع. والخطوة التالية ممكن
                تكون ربط بوابة دفع وتفعيل حفظ تفضيلات الإشعارات.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                to="/login"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-sm font-extrabold text-white transition-all hover:scale-[1.02] hover:bg-primary-light"
              >
                افتح حساب الطالب
                <ArrowLeft size={18} />
              </Link>
              <Link
                to="/search"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-subtle bg-white/[0.03] px-6 text-sm font-bold text-t1 transition-all hover:border-subtle-hover hover:bg-surface-2"
              >
                اسأل المساعد الذكي
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

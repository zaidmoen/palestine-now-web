import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowLeft,
  BellRing,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  GraduationCap,
  HeartHandshake,
  Hospital,
  MapPinned,
  Newspaper,
  PhoneCall,
  RefreshCw,
  Route,
  Settings2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import Footer from '../components/Footer';
import { Link } from '../lib/router';
import {
  buildPersonalFeed,
  buildPersonalSummary,
  defaultPreferences,
  governorates,
  interestOptions,
} from '../data/personalization';

const STORAGE_KEY = 'palestine-now-preferences-v1';

const categoryConfig = {
  أخبار: { icon: Newspaper, color: '#38BDF8', bg: 'rgba(56,189,248,0.10)' },
  طرق: { icon: Route, color: '#F59E0B', bg: 'rgba(245,158,11,0.10)' },
  وظائف: { icon: BriefcaseBusiness, color: '#A78BFA', bg: 'rgba(167,139,250,0.10)' },
  طلاب: { icon: GraduationCap, color: '#60A5FA', bg: 'rgba(96,165,250,0.10)' },
  اقتصاد: { icon: CircleDollarSign, color: '#34D399', bg: 'rgba(52,211,153,0.10)' },
  طوارئ: { icon: Hospital, color: '#F87171', bg: 'rgba(248,113,113,0.10)' },
  تكافل: { icon: HeartHandshake, color: '#FB7185', bg: 'rgba(251,113,133,0.10)' },
};

const summaryCards = [
  { key: 'localNews', label: 'أخبار محلية', icon: Newspaper, tone: '#38BDF8' },
  { key: 'matchingJobs', label: 'فرص مناسبة', icon: BriefcaseBusiness, tone: '#A78BFA' },
  { key: 'roadAlerts', label: 'تنبيهات طرق', icon: Route, tone: '#F59E0B' },
  { key: 'nearbyHospitals', label: 'مستشفيات قريبة', icon: Hospital, tone: '#34D399' },
];

function readStoredPreferences() {
  if (typeof window === 'undefined') return defaultPreferences;

  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    const governorate = governorates.includes(stored?.governorate)
      ? stored.governorate
      : defaultPreferences.governorate;
    const allowedInterests = new Set(interestOptions.map((item) => item.id));
    const interests = Array.isArray(stored?.interests)
      ? stored.interests.filter((item) => allowedInterests.has(item))
      : defaultPreferences.interests;

    return {
      governorate,
      interests: interests.length > 0 ? interests : defaultPreferences.interests,
    };
  } catch {
    return defaultPreferences;
  }
}

function SummaryCard({ item, value }) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[22px] border p-4 sm:p-5"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-2xl font-black sm:text-3xl" style={{ color: 'var(--text-primary)' }}>
            {value}
          </p>
          <p className="mt-1 text-sm font-bold" style={{ color: 'var(--text-muted)' }}>
            {item.label}
          </p>
        </div>
        <div
          className="grid h-11 w-11 place-items-center rounded-2xl"
          style={{ color: item.tone, background: `${item.tone}14`, border: `1px solid ${item.tone}28` }}
        >
          <Icon size={20} />
        </div>
      </div>
    </motion.div>
  );
}

function FeedCard({ item, index }) {
  const config = categoryConfig[item.category];
  const Icon = config.icon;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ delay: index * 0.035 }}
      className="group relative overflow-hidden rounded-[26px] border p-5 transition-colors sm:p-6"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
    >
      <div
        className="absolute inset-x-10 top-0 h-px opacity-70"
        style={{ background: `linear-gradient(90deg, transparent, ${config.color}, transparent)` }}
      />

      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl"
            style={{ color: config.color, background: config.bg, border: `1px solid ${config.color}28` }}
          >
            <Icon size={20} />
          </div>
          <div>
            <p className="text-sm font-black" style={{ color: config.color }}>{item.category}</p>
            <p className="mt-0.5 flex items-center gap-1 text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
              <Clock3 size={12} /> {item.meta}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-1.5">
          {item.local ? (
            <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] font-black text-primary">
              قريب منك
            </span>
          ) : null}
          {item.urgent ? (
            <span className="rounded-full border border-red-400/20 bg-red-400/10 px-2.5 py-1 text-[11px] font-black text-red-400">
              مهم
            </span>
          ) : null}
        </div>
      </div>

      <h3 className="text-lg font-black leading-8 sm:text-xl" style={{ color: 'var(--text-primary)' }}>
        {item.title}
      </h3>
      <p className="mt-3 line-clamp-3 text-sm leading-7" style={{ color: 'var(--text-secondary)' }}>
        {item.description}
      </p>

      <Link
        to={item.to}
        className="mt-5 inline-flex items-center gap-2 text-sm font-black transition-all group-hover:gap-3"
        style={{ color: config.color }}
      >
        افتح القسم <ArrowLeft size={15} />
      </Link>
    </motion.article>
  );
}

export default function MyPalestinePage() {
  const [preferences, setPreferences] = useState(readStoredPreferences);
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const feed = useMemo(() => buildPersonalFeed(preferences), [preferences]);
  const summary = useMemo(
    () => buildPersonalSummary(preferences.governorate),
    [preferences.governorate],
  );
  const visibleCategories = useMemo(
    () => ['الكل', ...new Set(feed.map((item) => item.category))],
    [feed],
  );
  const resolvedCategory = visibleCategories.includes(activeCategory) ? activeCategory : 'الكل';
  const visibleFeed = resolvedCategory === 'الكل'
    ? feed
    : feed.filter((item) => item.category === resolvedCategory);
  const urgentItems = feed.filter((item) => item.urgent);

  const toggleInterest = (interest) => {
    setSaved(false);
    setPreferences((current) => {
      const isSelected = current.interests.includes(interest);
      if (isSelected && current.interests.length === 1) return current;

      return {
        ...current,
        interests: isSelected
          ? current.interests.filter((item) => item !== interest)
          : [...current.interests, interest],
      };
    });
  };

  const savePreferences = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    setSaved(true);
    setSettingsOpen(false);
    window.setTimeout(() => setSaved(false), 2500);
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
    window.localStorage.removeItem(STORAGE_KEY);
    setActiveCategory('الكل');
    setSaved(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden pt-[92px] font-cairo" dir="rtl" style={{ background: 'var(--bg)' }}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-primary/10 blur-[140px]" />
        <div className="absolute -left-40 top-[28%] h-[430px] w-[430px] rounded-full bg-blue-500/10 blur-[140px]" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[32px] border p-5 sm:p-7 lg:p-9"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', boxShadow: 'var(--shadow-xl)' }}
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-primary via-cyan-400 to-blue-500" />
          <div className="grid gap-7 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-2 text-sm font-black text-primary">
                <MapPinned size={16} /> فلسطين حولي
              </div>
              <h1 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl" style={{ color: 'var(--text-primary)' }}>
                كل ما يهمك في
                <span className="gradient-text mr-2">{preferences.governorate}</span>
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8" style={{ color: 'var(--text-secondary)' }}>
                موجز واحد يجمع الأخبار والطرق والفرص والخدمات حسب منطقتك واهتماماتك.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm font-bold" style={{ color: 'var(--text-muted)' }}>
                <span className="inline-flex items-center gap-1.5"><ShieldCheck size={15} className="text-primary" /> لا نطلب موقعك الدقيق</span>
                <span className="inline-flex items-center gap-1.5"><RefreshCw size={14} /> بيانات عرض غير حية</span>
              </div>
            </div>

            <div className="rounded-[26px] border p-4 sm:p-5" style={{ background: 'var(--bg-section)', borderColor: 'var(--border)' }}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-primary">منطقتك</p>
                  <p className="mt-1 text-xs font-bold" style={{ color: 'var(--text-muted)' }}>تُحفظ على هذا الجهاز فقط</p>
                </div>
                {saved ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-black text-primary">
                    <Check size={13} /> تم الحفظ
                  </span>
                ) : null}
              </div>

              <div className="relative mt-4">
                <MapPinned className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                <select
                  aria-label="اختر المحافظة"
                  value={preferences.governorate}
                  onChange={(event) => {
                    setSaved(false);
                    setPreferences((current) => ({ ...current, governorate: event.target.value }));
                  }}
                  className="h-14 w-full appearance-none rounded-2xl border bg-transparent pr-12 pl-11 text-base font-black outline-none focus:border-primary"
                  style={{ color: 'var(--text-primary)', borderColor: 'var(--border-strong)' }}
                >
                  {governorates.map((governorate) => <option key={governorate} value={governorate}>{governorate}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" size={18} style={{ color: 'var(--text-muted)' }} />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSettingsOpen((current) => !current)}
                  className="flex h-11 items-center justify-center gap-2 rounded-2xl border text-sm font-black transition-colors hover:border-primary/40"
                  style={{ color: 'var(--text-secondary)', borderColor: 'var(--border)' }}
                  aria-expanded={settingsOpen}
                >
                  <Settings2 size={16} /> الاهتمامات
                </button>
                <button type="button" onClick={savePreferences} className="btn-primary h-11 px-3 text-sm">
                  <Check size={15} /> حفظ المنطقة
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {settingsOpen ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-7 border-t pt-6" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>شو بتحب يظهر في موجزك؟</h2>
                      <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>اختر قسمًا واحدًا على الأقل.</p>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" onClick={resetPreferences} className="btn-secondary h-11 px-4 text-sm">إعادة الضبط</button>
                      <button type="button" onClick={savePreferences} className="btn-primary h-11 px-5 text-sm"><Check size={15} /> حفظ</button>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {interestOptions.map((interest) => {
                      const selected = preferences.interests.includes(interest.id);
                      return (
                        <button
                          key={interest.id}
                          type="button"
                          onClick={() => toggleInterest(interest.id)}
                          aria-pressed={selected}
                          className="inline-flex h-11 items-center gap-2 rounded-full border px-4 text-sm font-black transition-all"
                          style={{
                            background: selected ? 'var(--primary-dim)' : 'transparent',
                            borderColor: selected ? 'rgba(0,230,118,0.28)' : 'var(--border)',
                            color: selected ? 'var(--primary)' : 'var(--text-secondary)',
                          }}
                        >
                          <span className="grid h-5 w-5 place-items-center rounded-full border" style={{ borderColor: 'currentColor' }}>
                            {selected ? <Check size={12} /> : null}
                          </span>
                          {interest.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.section>

        <section aria-label="ملخص منطقتك" className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {summaryCards.map((item) => <SummaryCard key={item.key} item={item} value={summary[item.key]} />)}
        </section>

        {urgentItems.length > 0 ? (
          <section className="mt-5 flex flex-col gap-4 rounded-[24px] border border-red-400/20 bg-red-400/[0.07] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-red-400/10 text-red-400"><BellRing size={20} /></div>
              <div>
                <p className="font-black text-red-300">{urgentItems.length} عناصر مهمة في موجزك</p>
                <p className="mt-1 text-sm leading-6" style={{ color: 'var(--text-secondary)' }}>اعتمد على المصدر الرسمي ووقت التحديث قبل التحرك أو اتخاذ أي قرار.</p>
              </div>
            </div>
            <Link to="/emergency" className="btn-secondary h-11 shrink-0 px-5 text-sm"><AlertTriangle size={15} /> مركز الطوارئ</Link>
          </section>
        ) : null}

        <div className="mt-8 grid gap-7 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section>
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-black text-primary"><Sparkles size={15} /> موجزك الشخصي</div>
                <h2 className="mt-2 text-3xl font-black" style={{ color: 'var(--text-primary)' }}>الأهم أولًا</h2>
              </div>
              <div className="flex max-w-full gap-2 overflow-x-auto pb-1">
                {visibleCategories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className="h-10 shrink-0 rounded-full border px-4 text-sm font-black transition-all"
                    style={{
                      background: resolvedCategory === category ? 'var(--primary)' : 'var(--bg-card)',
                      color: resolvedCategory === category ? '#06110b' : 'var(--text-secondary)',
                      borderColor: resolvedCategory === category ? 'var(--primary)' : 'var(--border)',
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <motion.div layout className="grid gap-4 md:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {visibleFeed.map((item, index) => <FeedCard key={item.id} item={item} index={index} />)}
              </AnimatePresence>
            </motion.div>
          </section>

          <aside className="space-y-4 lg:sticky lg:top-[112px] lg:self-start">
            <div className="rounded-[26px] border p-5" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-red-400/10 text-red-400"><PhoneCall size={20} /></div>
                <div>
                  <p className="text-sm font-black text-red-300">اتصال سريع</p>
                  <h3 className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>الإسعاف والطوارئ</h3>
                </div>
              </div>
              <a href="tel:101" className="mt-5 flex h-14 items-center justify-center gap-3 rounded-2xl bg-red-500 text-lg font-black text-white transition-transform hover:scale-[1.02]">
                <PhoneCall size={19} /> 101
              </a>
              <p className="mt-3 text-center text-xs leading-6" style={{ color: 'var(--text-muted)' }}>اتصل فقط عند وجود حالة طارئة حقيقية.</p>
            </div>

            <div className="rounded-[26px] border p-5" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-black text-primary">حالة التخصيص</p>
                  <h3 className="mt-1 text-xl font-black" style={{ color: 'var(--text-primary)' }}>{preferences.governorate}</h3>
                </div>
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary"><MapPinned size={20} /></div>
              </div>
              <div className="mt-5 space-y-3 text-sm font-bold" style={{ color: 'var(--text-secondary)' }}>
                <div className="flex items-center justify-between"><span>الأقسام المختارة</span><strong className="text-primary">{preferences.interests.length}</strong></div>
                <div className="flex items-center justify-between"><span>عناصر الموجز</span><strong style={{ color: 'var(--text-primary)' }}>{feed.length}</strong></div>
                <div className="flex items-center justify-between"><span>حفظ البيانات</span><strong style={{ color: 'var(--text-primary)' }}>على جهازك</strong></div>
              </div>
              <button type="button" onClick={() => setSettingsOpen(true)} className="btn-secondary mt-5 h-11 w-full text-sm"><Settings2 size={15} /> تعديل التخصيص</button>
            </div>

            <div className="rounded-[26px] border border-amber-400/20 bg-amber-400/[0.06] p-5">
              <div className="flex items-center gap-2 font-black text-amber-300"><AlertTriangle size={17} /> تنبيه مهم</div>
              <p className="mt-3 text-sm leading-7" style={{ color: 'var(--text-secondary)' }}>
                هذه النسخة تعرض بيانات نموذجية لتجربة المنتج. لا تستخدمها لاتخاذ قرار سفر أو قرار طبي أو مالي.
              </p>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

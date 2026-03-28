import { useDeferredValue, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  BellRing,
  CheckCircle2,
  Clock3,
  Eye,
  Flame,
  MapPin,
  Newspaper,
  Radio,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import { liveUpdates, newsItems, newsMetrics, newsroomHighlights } from '../data/news';

const categories = ['الكل', ...new Set(newsItems.map((item) => item.category))];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(newsItems[0].id);
  const deferredQuery = useDeferredValue(query);

  const normalizedQuery = deferredQuery.trim().toLowerCase();
  const filteredItems = newsItems.filter((item) => {
    const matchesCategory = activeCategory === 'الكل' || item.category === activeCategory;
    const matchesQuery =
      normalizedQuery === '' ||
      [item.title, item.excerpt, item.category, item.location, item.author]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery);

    return matchesCategory && matchesQuery;
  });

  useEffect(() => {
    if (!filteredItems.some((item) => item.id === selectedId)) {
      setSelectedId(filteredItems[0]?.id ?? newsItems[0].id);
    }
  }, [filteredItems, selectedId]);

  const featuredArticle =
    filteredItems.length > 0
      ? filteredItems.find((item) => item.id === selectedId) ?? filteredItems[0]
      : null;
  const breakingItems = newsItems.filter((item) => item.isBreaking);

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg pt-[88px] font-cairo" dir="rtl">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0], opacity: [0.22, 0.38, 0.22] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-16 top-0 h-[430px] w-[430px] rounded-full bg-primary/20 blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -35, 0], y: [0, 45, 0], opacity: [0.18, 0.28, 0.18] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
          className="absolute left-[-8%] top-1/3 h-[360px] w-[360px] rounded-full bg-pal-red/10 blur-[120px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(212,160,23,0.08),transparent_28%)]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-20 sm:px-6 lg:px-8">
        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-[34px] border border-subtle bg-surface/85 p-6 shadow-2xl shadow-black/20 sm:p-8 lg:p-10"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(42,138,80,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(231,76,60,0.12),transparent_34%)]" />
            <div className="relative">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-bold text-primary-light">
                <Sparkles size={14} />
                غرفة الأخبار
              </div>

              <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-t1 sm:text-5xl lg:text-[58px]">
                أخبار مصممة
                <span className="gradient-text block pt-2">لتُقرأ بسرعة وتُفهم بثقة</span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-t2 sm:text-lg">
                صممت الصفحة لتقدم الخبر المهم أولاً، مع فلاتر سريعة، بطاقات واضحة، ولوحة رئيسية
                تركز على ما يحتاجه المواطن فعلياً: أين؟ متى؟ وما الإجراء التالي؟
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/search"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-primary px-7 text-sm font-extrabold text-white transition-all hover:scale-[1.02] hover:bg-primary-light"
                >
                  اسأل المساعد الذكي
                  <ArrowLeft size={18} />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-subtle bg-white/[0.03] px-7 text-sm font-bold text-t1 transition-all hover:border-subtle-hover hover:bg-surface-2"
                >
                  فعّل التنبيهات
                  <BellRing size={18} />
                </Link>
              </div>

              <div className="mt-8 rounded-[28px] border border-subtle bg-black/10 p-2">
                <div className="flex items-center gap-3 rounded-[22px] border border-white/5 bg-surface-2/80 px-4 py-3">
                  <Search size={18} className="shrink-0 text-t3" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="ابحث داخل الأخبار حسب العنوان أو المحافظة أو الفئة..."
                    className="w-full bg-transparent text-sm font-medium text-t1 outline-none placeholder:text-t3"
                  />
                  {query ? (
                    <button
                      type="button"
                      onClick={() => setQuery('')}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.04] text-t3 transition-colors hover:text-t1"
                      aria-label="مسح البحث"
                    >
                      <X size={15} />
                    </button>
                  ) : null}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {categories.map((category) => {
                  const isActive = activeCategory === category;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={`rounded-full border px-4 py-2 text-sm font-bold transition-all ${
                        isActive
                          ? 'border-primary/30 bg-primary text-white shadow-[0_12px_30px_rgba(26,107,60,0.24)]'
                          : 'border-subtle bg-white/[0.03] text-t2 hover:border-subtle-hover hover:text-t1'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {newsMetrics.map((metric) => (
                  <div
                    key={metric.id}
                    className="rounded-2xl border border-subtle bg-white/[0.03] px-5 py-4"
                  >
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-bold ${metric.tone}`}
                    >
                      {metric.label}
                    </span>
                    <p className="mt-3 text-3xl font-extrabold text-t1">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.55, ease: 'easeOut' }}
            className="rounded-[34px] border border-subtle bg-surface-2/80 p-6 shadow-2xl shadow-black/20 sm:p-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-primary-light">نبض مباشر</p>
                <h2 className="mt-2 text-3xl font-extrabold text-t1">آخر ما تغيّر الآن</h2>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-pal-red/20 bg-pal-red/10 text-pal-red">
                <Radio size={22} />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {liveUpdates.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[24px] border border-white/8 bg-black/10 p-4 transition-all hover:border-subtle-hover"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className={`rounded-full border px-2.5 py-1 text-[11px] font-bold ${item.tone}`}>
                      {item.label}
                    </span>
                    <span className="text-xs font-bold text-t3">{item.time}</span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-t1">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[28px] border border-white/8 bg-black/15 p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary-light">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-t1">لماذا التجربة أوضح؟</p>
                  <p className="mt-1 text-xs font-bold text-t3">ترتيب بصري يختصر وقت المستخدم</p>
                </div>
              </div>

              <div className="space-y-3">
                {newsroomHighlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3"
                  >
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary-light" />
                    <span className="text-sm leading-7 text-t1">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.45 }}
          className="overflow-hidden rounded-[28px] border border-subtle bg-surface/80"
        >
          <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:px-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-pal-red/20 bg-pal-red/10 px-3 py-1.5 text-xs font-bold text-pal-red">
              <Flame size={13} />
              عاجل الآن
            </div>
            <div className="flex-1 overflow-x-auto">
              <div className="flex min-w-max items-center gap-3 pb-1">
                {breakingItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveCategory('الكل');
                      setSelectedId(item.id);
                    }}
                    className="inline-flex items-center gap-3 whitespace-nowrap rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-t1 transition-all hover:border-pal-red/20 hover:text-pal-red"
                  >
                    <span className="h-2 w-2 rounded-full bg-pal-red" />
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <section className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
          <div className="xl:sticky xl:top-[104px] xl:self-start">
            <AnimatePresence mode="wait">
              {featuredArticle ? (
                <motion.article
                  key={featuredArticle.id}
                  initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden rounded-[34px] border border-subtle bg-surface/85 p-6 shadow-2xl shadow-black/20 sm:p-8"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${featuredArticle.accentClassName}`} />
                  <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/[0.04] to-transparent" />

                  <div className="relative">
                    <div className="mb-5 flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-bold ${featuredArticle.badgeClassName}`}
                      >
                        {featuredArticle.badge}
                      </span>
                      <span
                        className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${featuredArticle.categoryClassName}`}
                      >
                        {featuredArticle.category}
                      </span>
                      {featuredArticle.isBreaking ? (
                        <span className="inline-flex items-center gap-2 rounded-full border border-pal-red/20 bg-pal-red/10 px-3 py-1.5 text-xs font-bold text-pal-red">
                          <span className="h-2 w-2 animate-pulse rounded-full bg-pal-red" />
                          جارٍ التحديث
                        </span>
                      ) : null}
                    </div>

                    <h2 className="text-3xl font-extrabold leading-tight text-t1 sm:text-4xl">
                      {featuredArticle.title}
                    </h2>

                    <p className="mt-4 text-sm leading-8 text-t2 sm:text-base">{featuredArticle.excerpt}</p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-[28px] border border-white/8 bg-black/15 p-5">
                        <p className="text-xs font-bold text-t3">{featuredArticle.statLabel}</p>
                        <p className="mt-2 text-3xl font-extrabold text-t1">{featuredArticle.statValue}</p>
                      </div>
                      <div className="rounded-[28px] border border-white/8 bg-black/15 p-5">
                        <p className="text-xs font-bold text-t3">قراءة سريعة</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-2 rounded-full border border-white/8 px-3 py-1.5 text-xs font-bold text-t2">
                            <Clock3 size={13} />
                            {featuredArticle.time}
                          </span>
                          <span className="inline-flex items-center gap-2 rounded-full border border-white/8 px-3 py-1.5 text-xs font-bold text-t2">
                            <Eye size={13} />
                            {featuredArticle.readTime}
                          </span>
                          <span className="inline-flex items-center gap-2 rounded-full border border-white/8 px-3 py-1.5 text-xs font-bold text-t2">
                            <MapPin size={13} />
                            {featuredArticle.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 rounded-[28px] border border-white/8 bg-black/15 p-5">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary-light">
                          <Newspaper size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-extrabold text-t1">لماذا هذا الخبر مهم؟</p>
                          <p className="mt-1 text-xs font-bold text-t3">تلخيص تنفيذي بدلاً من ازدحام النص</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {featuredArticle.bullets.map((bullet) => (
                          <div
                            key={bullet}
                            className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3"
                          >
                            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary-light" />
                            <span className="text-sm leading-7 text-t1">{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <Link
                        to="/search"
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-primary px-5 text-sm font-extrabold text-white transition-all hover:scale-[1.02] hover:bg-primary-light"
                      >
                        افهم الخبر أكثر
                        <ArrowLeft size={16} />
                      </Link>
                      <Link
                        to="/login"
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-subtle bg-white/[0.03] px-5 text-sm font-bold text-t1 transition-all hover:border-subtle-hover hover:bg-surface-2"
                      >
                        استلم تنبيه مشابه
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ) : (
                <motion.div
                  key="empty-featured"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="rounded-[34px] border border-subtle bg-surface/85 p-8 text-center shadow-2xl shadow-black/20"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-subtle bg-surface-2 text-t2">
                    <Newspaper size={24} />
                  </div>
                  <h3 className="mt-5 text-2xl font-extrabold text-t1">لا يوجد خبر مطابق حالياً</h3>
                  <p className="mt-3 text-sm leading-7 text-t2">
                    جرّب تبديل الفئة أو استخدام كلمة بحث مختلفة، وسنحدّث اللوحة الرئيسية مباشرة.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold text-primary-light">القصص المتاحة</p>
                <h2 className="mt-2 text-3xl font-extrabold text-t1">مكتبة الأخبار السريعة</h2>
              </div>
              <div className="rounded-full border border-subtle bg-white/[0.03] px-4 py-2 text-sm font-bold text-t2">
                {filteredItems.length} خبر ظاهر الآن
              </div>
            </div>

            {filteredItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[30px] border border-subtle bg-surface/80 p-8 text-center shadow-2xl shadow-black/20"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-subtle bg-surface-2 text-t2">
                  <Search size={24} />
                </div>
                <h3 className="mt-5 text-2xl font-extrabold text-t1">لا توجد نتائج حالياً</h3>
                <p className="mt-3 text-sm leading-7 text-t2">
                  غيّر الفئة أو امسح كلمة البحث لنُظهر لك الأخبار المتاحة في غرفة الأخبار.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setActiveCategory('الكل');
                  }}
                  className="mt-6 inline-flex h-12 items-center justify-center rounded-2xl bg-primary px-6 text-sm font-extrabold text-white transition-all hover:bg-primary-light"
                >
                  إعادة الضبط
                </button>
              </motion.div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {filteredItems.map((item, index) => {
                  const isActive = item.id === featuredArticle?.id;

                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ delay: index * 0.05, duration: 0.35 }}
                      whileHover={{ y: -4 }}
                      onClick={() => setSelectedId(item.id)}
                      className={`group relative overflow-hidden rounded-[30px] border p-5 text-right transition-all duration-300 ${
                        isActive
                          ? 'border-primary/35 bg-surface-2 shadow-[0_24px_70px_rgba(26,107,60,0.16)]'
                          : 'border-subtle bg-surface/80 hover:border-subtle-hover'
                      }`}
                    >
                      <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${item.accentClassName}`} />
                      <div className="relative">
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <span
                            className={`inline-flex rounded-full px-3 py-1.5 text-[11px] font-bold ${item.categoryClassName}`}
                          >
                            {item.category}
                          </span>
                          <span className="text-xs font-bold text-t3">{item.time}</span>
                        </div>

                        <h3 className="text-xl font-extrabold leading-8 text-t1 transition-colors group-hover:text-primary-light">
                          {item.title}
                        </h3>

                        <p
                          className="mt-3 text-sm leading-7 text-t2"
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {item.excerpt}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-2 rounded-full border border-white/8 px-3 py-1.5 text-[11px] font-bold text-t2">
                            <MapPin size={12} />
                            {item.location}
                          </span>
                          <span className="inline-flex items-center gap-2 rounded-full border border-white/8 px-3 py-1.5 text-[11px] font-bold text-t2">
                            <Clock3 size={12} />
                            {item.readTime}
                          </span>
                          {item.isBreaking ? (
                            <span className="inline-flex items-center gap-2 rounded-full border border-pal-red/20 px-3 py-1.5 text-[11px] font-bold text-pal-red">
                              <span className="h-2 w-2 animate-pulse rounded-full bg-pal-red" />
                              عاجل
                            </span>
                          ) : null}
                        </div>

                        <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-4">
                          <span className="text-xs font-bold text-t3">{item.author}</span>
                          <span className="inline-flex items-center gap-2 text-sm font-bold text-primary-light">
                            عرض الخبر
                            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}
          </div>
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
              <p className="text-sm font-bold text-primary-light">تجربة تحرير أوضح</p>
              <h2 className="mt-2 text-3xl font-extrabold text-t1">
                الصفحة الآن أقرب لغرفة أخبار فعلية وليست مجرد قائمة عناوين
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-8 text-t2 sm:text-base">
                رتبنا المحتوى بهرمية بصرية واضحة: شريط عاجل، خبر رئيسي غني بالتفاصيل، وبطاقات سريعة
                قابلة للتصفية والبحث. هذا يخلي الوصول للمعلومة أسرع كثيراً ويعطي انطباعاً احترافياً
                من أول ثانية.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                to="/login"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-sm font-extrabold text-white transition-all hover:scale-[1.02] hover:bg-primary-light"
              >
                فعّل حساب الأخبار
                <BellRing size={18} />
              </Link>
              <Link
                to="/search"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-subtle bg-white/[0.03] px-6 text-sm font-bold text-t1 transition-all hover:border-subtle-hover hover:bg-surface-2"
              >
                اسأل عن خبر أو خدمة
                <ArrowLeft size={18} />
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

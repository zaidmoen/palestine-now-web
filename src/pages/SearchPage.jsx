import { useMemo, useState } from 'react';
import { Link, useSearchParams } from '../lib/router';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowLeft,
  BriefcaseBusiness,
  CircleDollarSign,
  HeartHandshake,
  MapPinned,
  Newspaper,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { searchCategories, searchContent } from '../data/searchIndex';

const categoryIcons = {
  أخبار: Newspaper,
  وظائف: BriefcaseBusiness,
  طرق: MapPinned,
  طوارئ: AlertTriangle,
  تكافل: HeartHandshake,
  اقتصاد: CircleDollarSign,
};

const quickSearches = ['حاجز قلنديا', 'مطور React', 'رقم الإسعاف', 'الدولار', 'منحة دراسية'];

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const [input, setInput] = useState(params.get('q') || '');
  const query = params.get('q') || '';
  const category = params.get('category') || 'الكل';

  const results = useMemo(() => searchContent(query, category), [query, category]);

  const submitSearch = (event) => {
    event.preventDefault();
    const next = new URLSearchParams();
    if (input.trim()) next.set('q', input.trim());
    if (category !== 'الكل') next.set('category', category);
    setParams(next);
  };

  const selectCategory = (nextCategory) => {
    const next = new URLSearchParams(params);
    if (nextCategory === 'الكل') next.delete('category');
    else next.set('category', nextCategory);
    setParams(next);
  };

  const runQuickSearch = (value) => {
    setInput(value);
    setParams({ q: value });
  };

  return (
    <main className="min-h-screen bg-bg pt-32 pb-20" dir="rtl">
      <section className="relative overflow-hidden px-4 sm:px-6">
        <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[520px] max-w-6xl bg-[radial-gradient(circle_at_50%_10%,rgba(0,230,118,0.12),transparent_65%)]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <div className="badge-primary mx-auto mb-5 w-fit">
              <Sparkles size={13} />
              بحث موحّد وآمن
            </div>
            <h1 className="text-fluid-h2 mb-4 font-black text-text-primary">
              معلومتك أقرب مما تتوقع
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-8 text-text-secondary md:text-lg">
              ابحث مرة واحدة داخل الأخبار والوظائف والطرق والطوارئ والاقتصاد وحملات التكافل.
            </p>
          </div>

          <form onSubmit={submitSearch} className="mx-auto mb-7 max-w-4xl">
            <div className="search-shell flex items-center gap-3 rounded-[26px] border border-border-strong bg-bg-card/90 p-2 shadow-2xl shadow-black/30 backdrop-blur-xl focus-within:border-primary/50 focus-within:shadow-primary/10">
              <Search className="mr-3 shrink-0 text-primary" size={22} aria-hidden="true" />
              <label htmlFor="global-search" className="sr-only">ابحث في المنصة</label>
              <input
                id="global-search"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="مثال: حاجز قلنديا، وظيفة React، رقم الإسعاف..."
                className="h-14 min-w-0 flex-1 bg-transparent text-base font-semibold text-text-primary outline-none placeholder:text-text-muted md:text-lg"
                autoComplete="off"
              />
              <button type="submit" className="btn-primary h-12 px-6 md:px-9">
                بحث
              </button>
            </div>
          </form>

          <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
            <span className="ml-1 text-xs font-bold text-text-muted">جرّب:</span>
            {quickSearches.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => runQuickSearch(item)}
                className="rounded-full border border-border bg-white/[0.03] px-3.5 py-2 text-xs font-bold text-text-secondary transition hover:border-primary/30 hover:text-primary"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mb-8 overflow-x-auto pb-2">
            <div className="mx-auto flex w-max min-w-full items-center justify-center gap-2">
              {searchCategories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => selectCategory(item)}
                  aria-pressed={category === item}
                  className={`rounded-full border px-4 py-2.5 text-sm font-extrabold transition ${
                    category === item
                      ? 'border-primary/30 bg-primary/10 text-primary shadow-lg shadow-primary/5'
                      : 'border-border bg-bg-surface text-text-secondary hover:border-border-strong hover:text-text-primary'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
            <div>
              <h2 className="text-lg font-black text-text-primary">
                {query ? `نتائج “${query}”` : 'كل محتوى المنصة'}
              </h2>
              <p className="mt-1 text-sm font-medium text-text-muted">
                {results.length} نتيجة {category !== 'الكل' && `في ${category}`}
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-2 text-xs font-bold text-text-secondary">
              <ShieldCheck size={14} className="text-primary" />
              لا يتم إرسال بحثك إلى طرف خارجي
            </div>
          </div>

          {results.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {results.slice(0, 24).map((result, index) => {
                const Icon = categoryIcons[result.category] || Search;
                return (
                  <motion.article
                    key={result.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.025, 0.25) }}
                    className="group relative overflow-hidden rounded-[22px] border border-border bg-bg-card p-5 transition hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl hover:shadow-black/20"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary">
                        <Icon size={21} aria-hidden="true" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-white/[0.04] px-2.5 py-1 text-[11px] font-black text-primary">
                            {result.category}
                          </span>
                          <span className="text-xs font-semibold text-text-muted">{result.meta}</span>
                        </div>
                        <h3 className="mb-2 text-lg font-black leading-7 text-text-primary transition group-hover:text-primary">
                          {result.title}
                        </h3>
                        <p className="line-clamp-2 text-sm leading-7 text-text-secondary">
                          {result.description}
                        </p>
                        <Link to={result.to} className="mt-4 inline-flex items-center gap-1.5 text-sm font-extrabold text-primary">
                          فتح القسم
                          <ArrowLeft size={14} className="transition group-hover:-translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[28px] border border-dashed border-border-strong bg-bg-card px-6 py-16 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-bg-surface text-text-muted">
                <Search size={28} />
              </div>
              <h2 className="mb-2 text-xl font-black text-text-primary">لم نجد نتيجة مطابقة</h2>
              <p className="mx-auto max-w-lg text-sm leading-7 text-text-secondary">
                جرّب كلمة أقصر، أو اختر “الكل”، أو ابحث باسم المدينة أو الخدمة بدل جملة طويلة.
              </p>
            </div>
          )}

          <aside className="mt-8 rounded-2xl border border-amber-400/15 bg-amber-400/[0.06] px-5 py-4 text-sm leading-7 text-text-secondary">
            <strong className="text-amber-300">تنبيه مهني:</strong> المحتوى الحالي بيانات نموذجية لعرض تجربة المنتج، وليس تحديثًا حيًا. تحقق من الجهة الرسمية قبل السفر أو التقديم أو اتخاذ قرار مالي أو طبي.
          </aside>
        </div>
      </section>
    </main>
  );
}

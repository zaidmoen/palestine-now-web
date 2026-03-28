import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock3, MapPin, Newspaper, Radio, Sparkles } from 'lucide-react';
import { newsItems } from '../data/news';

const previewNews = newsItems.slice(0, 5);

export default function NewsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = previewNews[activeIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((previous) => (previous + 1) % previewNews.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 md:py-28" id="news">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-pal-red/20 bg-pal-red/10 px-4 py-1.5 text-xs font-bold text-pal-red">
              <Newspaper size={12} />
              غرفة الأخبار
            </span>
            <h2 className="mt-4 text-3xl font-bold text-t1 md:text-4xl lg:text-5xl">
              صفحة أخبار محسّنة
              <span className="gradient-text block pt-2">بأسلوب احترافي وسريع الفهم</span>
            </h2>
            <p className="mt-4 text-base text-t2 md:text-lg">
              عرضنا أهم القصص بشكل أوضح: خبر رئيسي، نبض مباشر، وانتقال سريع إلى الصفحة الكاملة.
            </p>
          </div>

          <Link
            to="/news"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-primary px-5 text-sm font-extrabold text-white transition-all hover:scale-[1.02] hover:bg-primary-light"
          >
            افتح صفحة الأخبار
            <ArrowLeft size={16} />
          </Link>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[30px] border border-subtle bg-surface/85 p-6 shadow-2xl shadow-black/20 md:p-8"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${activeItem.accentClassName}`} />
            <div className="relative">
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-bold ${activeItem.badgeClassName}`}
                >
                  {activeItem.badge}
                </span>
                <span
                  className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${activeItem.categoryClassName}`}
                >
                  {activeItem.category}
                </span>
                {activeItem.isBreaking ? (
                  <span className="inline-flex items-center gap-2 rounded-full border border-pal-red/20 bg-pal-red/10 px-3 py-1.5 text-xs font-bold text-pal-red">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-pal-red" />
                    تحديث حي
                  </span>
                ) : null}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                  transition={{ duration: 0.28 }}
                >
                  <h3 className="text-2xl font-extrabold leading-tight text-t1 md:text-3xl">
                    {activeItem.title}
                  </h3>

                  <p className="mt-4 max-w-2xl text-sm leading-8 text-t2 md:text-base">
                    {activeItem.excerpt}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/8 px-3 py-1.5 text-xs font-bold text-t2">
                      <Clock3 size={13} />
                      {activeItem.time}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/8 px-3 py-1.5 text-xs font-bold text-t2">
                      <MapPin size={13} />
                      {activeItem.location}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/8 px-3 py-1.5 text-xs font-bold text-t2">
                      <Sparkles size={13} />
                      {activeItem.statLabel}: {activeItem.statValue}
                    </span>
                  </div>

                  <div className="mt-6 space-y-3">
                    {activeItem.bullets.slice(0, 2).map((bullet) => (
                      <div
                        key={bullet}
                        className="rounded-2xl border border-white/8 bg-black/15 px-4 py-3 text-sm leading-7 text-t1"
                      >
                        {bullet}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5">
                  {previewNews.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeIndex === index ? 'w-8 bg-primary-light' : 'w-1.5 bg-surface-3 hover:bg-t3'
                      }`}
                      aria-label={`عرض ${item.title}`}
                    />
                  ))}
                </div>

                <Link
                  to="/news"
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary-light transition-colors hover:text-accent-light"
                >
                  الانتقال للصفحة الكاملة
                  <ArrowLeft size={15} />
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-3"
          >
            {previewNews.map((item, index) => (
              <motion.button
                key={item.id}
                type="button"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                onClick={() => setActiveIndex(index)}
                className={`group w-full rounded-[24px] border p-4 text-right transition-all duration-300 ${
                  index === activeIndex
                    ? 'border-primary/35 bg-primary/5 shadow-[0_24px_60px_rgba(26,107,60,0.12)]'
                    : 'border-subtle bg-surface/60 hover:border-subtle-hover hover:bg-surface'
                }`}
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${item.categoryClassName}`}
                  >
                    {item.category}
                  </span>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-t3">
                    {item.isBreaking ? <Radio size={13} className="text-pal-red" /> : null}
                    <span>{item.time}</span>
                  </div>
                </div>

                <h3 className="text-lg font-extrabold leading-8 text-t1 transition-colors group-hover:text-primary-light">
                  {item.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm leading-7 text-t2">{item.excerpt}</p>

                <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-4">
                  <span className="inline-flex items-center gap-2 text-xs font-bold text-t3">
                    <MapPin size={12} />
                    {item.location}
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-primary-light">
                    قراءة الخبر
                    <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

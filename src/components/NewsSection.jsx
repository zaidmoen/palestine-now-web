import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock3, MapPin, Newspaper, Radio } from 'lucide-react';
import { newsItems } from '../data/news';

const previewNews = newsItems.slice(0, 5);

export default function NewsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = previewNews[activeIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % previewNews.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative py-20 md:py-28"
      id="news"
      style={{ background: 'var(--bg)' }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4"
              style={{
                background: '#FDEDEC',
                color: 'var(--error)',
                border: '1px solid #F5B7B1',
              }}
            >
              <Newspaper size={12} />
              آخر الأخبار
            </div>
            <h2
              className="text-3xl font-black md:text-4xl lg:text-5xl mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              تابع أهم الأحداث
              <span className="gradient-text block pt-1">لحظة بلحظة</span>
            </h2>
            <p className="text-base md:text-lg" style={{ color: 'var(--text-secondary)' }}>
              أبرز القصص الفلسطينية بأسلوب واضح وسهل القراءة
            </p>
          </div>

          <Link
            to="/news"
            className="btn-primary"
          >
            صفحة الأخبار الكاملة
            <ArrowLeft size={16} />
          </Link>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">

          {/* Featured card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl p-7 md:p-9"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            {/* Subtle top color bar from news category */}
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ background: 'linear-gradient(90deg, var(--primary), var(--accent))' }}
            />

            <div className="relative">
              {/* Badges */}
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${activeItem.badgeClassName}`}>
                  {activeItem.badge}
                </span>
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${activeItem.categoryClassName}`}>
                  {activeItem.category}
                </span>
                {activeItem.isBreaking && (
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
                    style={{ background: '#FDEDEC', color: 'var(--error)', border: '1px solid #F5B7B1' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--error)' }} />
                    تحديث حي
                  </span>
                )}
              </div>

              {/* Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(3px)' }}
                  transition={{ duration: 0.26 }}
                >
                  <h3
                    className="text-2xl font-extrabold leading-snug md:text-3xl mb-4"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {activeItem.title}
                  </h3>
                  <p className="text-sm leading-8 md:text-base mb-5" style={{ color: 'var(--text-secondary)' }}>
                    {activeItem.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
                      style={{ background: 'var(--bg-section)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
                    >
                      <Clock3 size={12} />
                      {activeItem.time}
                    </span>
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
                      style={{ background: 'var(--bg-section)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
                    >
                      <MapPin size={12} />
                      {activeItem.location}
                    </span>
                  </div>

                  {/* Bullets */}
                  <div className="space-y-2.5">
                    {activeItem.bullets.slice(0, 2).map((bullet) => (
                      <div
                        key={bullet}
                        className="flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm leading-relaxed"
                        style={{ background: 'var(--bg-section)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                      >
                        <span
                          className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: 'var(--primary)' }}
                        />
                        {bullet}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress dots + link */}
              <div className="mt-7 flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5">
                  {previewNews.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: activeIndex === i ? 28 : 6,
                        background: activeIndex === i ? 'var(--primary)' : 'var(--border-strong)',
                      }}
                      aria-label={`عرض ${previewNews[i].title}`}
                    />
                  ))}
                </div>

                <Link
                  to="/news"
                  className="inline-flex items-center gap-1.5 text-sm font-bold transition-colors"
                  style={{ color: 'var(--primary)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--primary)'}
                >
                  الصفحة الكاملة
                  <ArrowLeft size={14} />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Sidebar list */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-3"
          >
            {previewNews.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="w-full rounded-xl text-right transition-all duration-250 p-4"
                style={{
                  background: index === activeIndex ? 'var(--primary-50)' : 'var(--bg-card)',
                  border: `1px solid ${index === activeIndex ? 'var(--primary-100)' : 'var(--border)'}`,
                  boxShadow: index === activeIndex ? '0 4px 16px rgba(27,107,58,0.1)' : 'var(--shadow-sm)',
                }}
                onMouseEnter={e => {
                  if (index !== activeIndex) {
                    e.currentTarget.style.background = 'var(--bg-section)';
                  }
                }}
                onMouseLeave={e => {
                  if (index !== activeIndex) {
                    e.currentTarget.style.background = 'var(--bg-card)';
                  }
                }}
              >
                {/* Category + time */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold ${item.categoryClassName}`}>
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: 'var(--text-light)' }}>
                    {item.isBreaking && <Radio size={12} style={{ color: 'var(--error)' }} />}
                    <span>{item.time}</span>
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="text-[15px] font-bold leading-snug mb-2"
                  style={{ color: index === activeIndex ? 'var(--primary)' : 'var(--text-primary)' }}
                >
                  {item.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs line-clamp-2 leading-relaxed mb-3" style={{ color: 'var(--text-muted)' }}>
                  {item.excerpt}
                </p>

                {/* Footer */}
                <div
                  className="flex items-center justify-between pt-3"
                  style={{ borderTop: '1px solid var(--border)' }}
                >
                  <span className="inline-flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-light)' }}>
                    <MapPin size={11} />
                    {item.location}
                  </span>
                  <span
                    className="inline-flex items-center gap-1 text-xs font-bold"
                    style={{ color: 'var(--primary)' }}
                  >
                    قراءة الخبر
                    <ArrowLeft size={12} />
                  </span>
                </div>
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

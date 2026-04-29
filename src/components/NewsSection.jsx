import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock3, MapPin, Newspaper, Radio, Zap } from 'lucide-react';
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
      className="relative section-padding"
      id="news"
      style={{ background: 'var(--bg-card)' }}
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 pattern-grid opacity-30 pointer-events-none" />

      {/* Ambient blob */}
      <div
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,71,87,0.06), transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-14 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-5"
              style={{
                background: 'rgba(255,71,87,0.1)',
                color: 'var(--red)',
                border: '1px solid rgba(255,71,87,0.25)',
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

          <Link to="/news" className="btn-primary shrink-0">
            صفحة الأخبار الكاملة
            <ArrowLeft size={16} />
          </Link>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">

          {/* ── Featured Card ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="relative overflow-hidden rounded-[28px] p-7 md:p-10"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
            }}
          >
            {/* Top neon line */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, var(--red), var(--primary), var(--accent))' }}
            />

            {/* Ambient glow from the color bar */}
            <div
              className="absolute top-0 left-0 right-0 h-20 pointer-events-none"
              style={{
                background: 'linear-gradient(180deg, rgba(255,71,87,0.04), transparent)',
              }}
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
                    style={{
                      background: 'rgba(255,71,87,0.12)',
                      color: 'var(--red)',
                      border: '1px solid rgba(255,71,87,0.25)',
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ background: 'var(--red)', boxShadow: '0 0 6px var(--red)' }}
                    />
                    تحديث حي
                  </span>
                )}
              </div>

              {/* Animated Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(3px)' }}
                  transition={{ duration: 0.3 }}
                >
                  <h3
                    className="text-2xl font-extrabold leading-snug md:text-3xl mb-4"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {activeItem.title}
                  </h3>
                  <p
                    className="text-sm leading-8 md:text-base mb-5"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {activeItem.excerpt}
                  </p>

                  {/* Meta tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        color: 'var(--text-muted)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <Clock3 size={12} />
                      {activeItem.time}
                    </span>
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        color: 'var(--text-muted)',
                        border: '1px solid var(--border)',
                      }}
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
                        className="flex items-start gap-3 rounded-xl px-4 py-3 text-sm leading-relaxed"
                        style={{
                          background: 'rgba(0,230,118,0.04)',
                          border: '1px solid rgba(0,230,118,0.1)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        <span
                          className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                          style={{
                            background: 'var(--primary)',
                            boxShadow: '0 0 6px var(--primary)',
                          }}
                        />
                        {bullet}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress dots + link */}
              <div className="mt-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5">
                  {previewNews.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: activeIndex === i ? 28 : 6,
                        background: activeIndex === i ? 'var(--primary)' : 'var(--border-strong)',
                        boxShadow: activeIndex === i ? '0 0 8px var(--primary)' : 'none',
                      }}
                      aria-label={`عرض الخبر ${i + 1}`}
                    />
                  ))}
                </div>

                <Link
                  to="/news"
                  className="inline-flex items-center gap-1.5 text-sm font-bold transition-all"
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

          {/* ── Sidebar List ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="space-y-3"
          >
            {previewNews.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="w-full rounded-[20px] text-right transition-all duration-250 p-4 group"
                style={{
                  background: index === activeIndex
                    ? 'rgba(0,230,118,0.07)'
                    : 'var(--bg-surface)',
                  border: `1px solid ${index === activeIndex ? 'rgba(0,230,118,0.2)' : 'var(--border)'}`,
                  boxShadow: index === activeIndex ? '0 0 20px rgba(0,230,118,0.1)' : 'none',
                }}
                onMouseEnter={e => {
                  if (index !== activeIndex) {
                    e.currentTarget.style.borderColor = 'var(--border-strong)';
                    e.currentTarget.style.transform = 'translateX(-3px)';
                  }
                }}
                onMouseLeave={e => {
                  if (index !== activeIndex) {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }
                }}
              >
                {/* Category + time */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold ${item.categoryClassName}`}>
                    {item.category}
                  </span>
                  <div
                    className="flex items-center gap-1.5 text-[11px] font-semibold"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {item.isBreaking && (
                      <Radio size={11} style={{ color: 'var(--red)' }} />
                    )}
                    <span>{item.time}</span>
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="text-[15px] font-bold leading-snug mb-2 transition-colors"
                  style={{ color: index === activeIndex ? 'var(--primary)' : 'var(--text-primary)' }}
                >
                  {item.title}
                </h3>

                {/* Excerpt */}
                <p
                  className="text-xs line-clamp-2 leading-relaxed mb-3"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {item.excerpt}
                </p>

                {/* Footer */}
                <div
                  className="flex items-center justify-between pt-3"
                  style={{ borderTop: '1px solid var(--border)' }}
                >
                  <span
                    className="inline-flex items-center gap-1.5 text-xs"
                    style={{ color: 'var(--text-muted)' }}
                  >
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

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'أحمد يوسف',
    role: 'طالب جامعي — نابلس',
    text: 'المنصة غيّرت حياتي! حصلت على منحة دراسية من خلال قسم الطلاب، والبحث الذكي يوفّر عليّ ساعات من البحث اليومي.',
    rating: 5,
    avatar: '👨‍🎓',
    color: '#A855F7',
    glow: 'rgba(168,85,247,0.3)',
  },
  {
    name: 'فاطمة خالد',
    role: 'معلمة — رام الله',
    text: 'أفضل منصة فلسطينية استخدمتها! كل يوم أتابع الأخبار وحالة الطرق قبل ما أروح الشغل. شكرًا لفريق العمل المتميز.',
    rating: 5,
    avatar: '👩‍🏫',
    color: '#F87171',
    glow: 'rgba(248,113,113,0.3)',
  },
  {
    name: 'محمد عمر',
    role: 'سائق تاكسي — الخليل',
    text: 'قسم الطرق ممتاز جدًا! بعرف حالة الحواجز والطرق لحظة بلحظة. وفّر عليّ وقت ومصاري كثير.',
    rating: 5,
    avatar: '🚕',
    color: '#00E676',
    glow: 'rgba(0,230,118,0.3)',
  },
  {
    name: 'نور الدين',
    role: 'خريج — بيت لحم',
    text: 'لقيت وظيفتي الأولى من خلال المنصة! قسم الوظائف يُحدَّث يوميًا وسهل الاستخدام. أنصح كل شخص فيه.',
    rating: 5,
    avatar: '💼',
    color: '#FFD700',
    glow: 'rgba(255,215,0,0.3)',
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [auto, setAuto] = useState(true);

  const next = () => setCurrent((p) => (p + 1) % testimonials.length);
  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [auto, current]);

  const item = testimonials[current];

  return (
    <section
      className="relative section-padding overflow-hidden"
      id="testimonials"
      style={{ background: 'var(--bg)' }}
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 pattern-dots opacity-25 pointer-events-none" />

      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at bottom, ${item.glow.replace('0.3', '0.06')}, transparent 70%)`,
          filter: 'blur(80px)',
          transition: 'background 0.6s ease',
        }}
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-5"
            style={{
              background: 'rgba(168,85,247,0.1)',
              color: '#A855F7',
              border: '1px solid rgba(168,85,247,0.25)',
            }}
          >
            <Star size={12} fill="#A855F7" />
            آراء المستخدمين
          </div>
          <h2 className="text-fluid-h2 font-black mb-4" style={{ color: 'var(--text-primary)' }}>
            ماذا يقول{' '}
            <span className="gradient-text">مستخدمونا</span>
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>
            آلاف المواطنين يعتمدون على المنصة يوميًا
          </p>
        </motion.div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 mb-0">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => { setCurrent(i); setAuto(false); }}
              className="rounded-[24px] p-6 cursor-pointer shimmer-card"
              style={{
                background: i === current ? `${t.color}0D` : 'var(--bg-card)',
                border: `1px solid ${i === current ? t.color + '40' : 'var(--border)'}`,
                boxShadow: i === current ? `0 0 30px ${t.glow}` : 'none',
                transition: 'all 0.4s ease',
                transform: i === current ? 'translateY(-4px)' : 'translateY(0)',
              }}
              onMouseEnter={e => {
                if (i !== current) {
                  e.currentTarget.style.borderColor = t.color + '30';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }
              }}
              onMouseLeave={e => {
                if (i !== current) {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              {/* Top accent line for active */}
              {i === current && (
                <div
                  className="absolute top-0 left-6 right-6 h-px rounded-b-full"
                  style={{ background: `linear-gradient(90deg, transparent, ${t.color}, transparent)` }}
                />
              )}

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star key={si} size={12} fill={t.color} style={{ color: t.color }} />
                ))}
              </div>

              {/* Quote icon */}
              <Quote size={18} className="mb-3 opacity-30" style={{ color: t.color }} />

              {/* Text */}
              <p className="text-sm leading-relaxed mb-5 line-clamp-3" style={{ color: 'var(--text-secondary)' }}>
                {t.text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-2.5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                  style={{
                    background: `${t.color}15`,
                    border: `1px solid ${t.color}25`,
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{t.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden max-w-sm mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
              className="relative rounded-[28px] p-7 text-center overflow-hidden"
              style={{
                background: `${item.color}08`,
                border: `1px solid ${item.color}30`,
                boxShadow: `0 0 40px ${item.glow}`,
              }}
            >
              <div
                className="absolute top-0 left-8 right-8 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }}
              />

              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5"
                style={{
                  background: `${item.color}15`,
                  border: `1px solid ${item.color}25`,
                }}
              >
                {item.avatar}
              </div>

              <div className="flex justify-center gap-0.5 mb-4">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} size={15} fill={item.color} style={{ color: item.color }} />
                ))}
              </div>

              <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                &ldquo;{item.text}&rdquo;
              </p>
              <p className="font-bold" style={{ color: 'var(--text-primary)' }}>{item.name}</p>
              <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>{item.role}</p>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => { prev(); setAuto(false); }}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
              }}
            >
              <ChevronRight size={17} />
            </button>

            <div className="flex gap-2 items-center">
              {testimonials.map((t, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrent(i); setAuto(false); }}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? 24 : 8,
                    background: i === current ? item.color : 'var(--border-strong)',
                    boxShadow: i === current ? `0 0 8px ${item.color}` : 'none',
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => { next(); setAuto(false); }}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
              }}
            >
              <ChevronLeft size={17} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

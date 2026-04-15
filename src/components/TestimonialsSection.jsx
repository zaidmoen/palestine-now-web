import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'أحمد يوسف',
    role: 'طالب جامعي — نابلس',
    text: 'المنصة غيّرت حياتي! حصلت على منحة دراسية من خلال قسم الطلاب، والبحث الذكي يوفّر عليّ ساعات من البحث اليومي.',
    rating: 5,
    avatar: '👨‍🎓',
    color: '#1A5276',
    bg:    '#EBF5FB',
  },
  {
    name: 'فاطمة خالد',
    role: 'معلمة — رام الله',
    text: 'أفضل منصة فلسطينية استخدمتها! كل يوم أتابع الأخبار وحالة الطرق قبل ما أروح الشغل. شكرًا لفريق العمل المتميز.',
    rating: 5,
    avatar: '👩‍🏫',
    color: '#7D3C98',
    bg:    '#F5EEF8',
  },
  {
    name: 'محمد عمر',
    role: 'سائق تاكسي — الخليل',
    text: 'قسم الطرق ممتاز جدًا! بعرف حالة الحواجز والطرق لحظة بلحظة. وفّر عليّ وقت ومصاري كثير.',
    rating: 5,
    avatar: '🚕',
    color: '#117A65',
    bg:    '#E8F8F5',
  },
  {
    name: 'نور الدين',
    role: 'خريج — بيت لحم',
    text: 'لقيت وظيفتي الأولى من خلال المنصة! قسم الوظائف يُحدَّث يوميًا وسهل الاستخدام. أنصح كل شخص فيه.',
    rating: 5,
    avatar: '💼',
    color: '#7D3C00',
    bg:    '#FEF3E6',
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const item = testimonials[current];

  const next = () => setCurrent((p) => (p + 1) % testimonials.length);
  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      id="testimonials"
      style={{ background: 'var(--bg-section)' }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4"
            style={{
              background: '#F5EEF8',
              color: '#7D3C98',
              border: '1px solid #E8D5F0',
            }}
          >
            آراء المستخدمين
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-black mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            ماذا يقول{' '}
            <span className="gradient-text">مستخدمونا</span>
          </h2>
          <p className="text-base md:text-lg max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>
            آلاف المواطنين يعتمدون على المنصة يوميًا
          </p>
        </motion.div>

        {/* All cards — desktop grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-5 mb-0">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl p-6 cursor-pointer transition-all duration-300"
              style={{
                background: 'var(--bg-card)',
                border: `1px solid ${i === current ? t.color + '44' : 'var(--border)'}`,
                boxShadow: i === current ? `0 8px 30px ${t.color}18` : 'var(--shadow-sm)',
              }}
              onClick={() => setCurrent(i)}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star key={si} size={13} fill={t.color} style={{ color: t.color }} />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm leading-relaxed mb-5 line-clamp-3" style={{ color: 'var(--text-secondary)' }}>
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
                  style={{ background: t.bg }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{t.name}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile slider */}
        <div className="md:hidden max-w-sm mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl p-7 text-center"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5"
                style={{ background: item.bg }}
              >
                {item.avatar}
              </div>
              <div className="flex justify-center gap-0.5 mb-4">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} size={15} fill={item.color} style={{ color: item.color }} />
                ))}
              </div>
              <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                "{item.text}"
              </p>
              <p className="font-bold" style={{ color: 'var(--text-primary)' }}>{item.name}</p>
              <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>{item.role}</p>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <ChevronRight size={17} />
            </button>
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? 24 : 8,
                    background: i === current ? 'var(--primary)' : 'var(--border-strong)',
                  }}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <ChevronLeft size={17} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

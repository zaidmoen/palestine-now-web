import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'أحمد يوسف',
    role: 'طالب جامعي — نابلس',
    text: 'المنصة غيرت حياتي! حصلت على منحة دراسية من خلال قسم الطلاب، والبحث الذكي يوفر عليّ ساعات من البحث اليومي.',
    rating: 5,
    avatar: '👨‍🎓',
  },
  {
    name: 'فاطمة خالد',
    role: 'معلمة — رام الله',
    text: 'أفضل منصة فلسطينية استخدمتها! كل يوم أتابع الأخبار وحالة الطرق قبل ما أروح الشغل. شكرًا لفريق العمل.',
    rating: 5,
    avatar: '👩‍🏫',
  },
  {
    name: 'محمد عمر',
    role: 'سائق تاكسي — الخليل',
    text: 'قسم الطرق ممتاز جدًا! بعرف حالة الحواجز والطرق لحظة بلحظة. وفّر عليّ وقت ومصاري كثير.',
    rating: 5,
    avatar: '🚕',
  },
  {
    name: 'نور الدين',
    role: 'خريج — بيت لحم',
    text: 'لقيت وظيفتي الأولى من خلال المنصة! قسم الوظائف يُحدَّث يوميًا وسهل الاستخدام. أنصح كل شخص فيه.',
    rating: 5,
    avatar: '💼',
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="relative py-20 md:py-28 overflow-hidden" id="testimonials">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/50 to-transparent" />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold mb-4 border border-purple-500/20">
            آراء المستخدمين
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-t1 mb-4">
            ماذا يقول <span className="gradient-text">مستخدمونا</span>
          </h2>
          <p className="text-t2 text-base md:text-lg max-w-lg mx-auto">
            آلاف المواطنين يعتمدون على المنصة يوميًا
          </p>
        </motion.div>

        {/* Testimonial Card */}
        <div className="max-w-2xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="p-8 md:p-10 rounded-2xl border border-subtle bg-surface/80 backdrop-blur-sm text-center"
            >
              {/* Quote Icon */}
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Quote size={22} className="text-primary-light" />
              </div>

              {/* Text */}
              <p className="text-lg md:text-xl text-t1 leading-relaxed mb-8 font-medium">
                "{testimonials[current].text}"
              </p>

              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mb-4">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} size={16} className="text-accent fill-accent" />
                ))}
              </div>

              {/* Avatar + Name */}
              <div className="flex flex-col items-center">
                <span className="text-3xl mb-2">{testimonials[current].avatar}</span>
                <span className="text-base font-bold text-t1">{testimonials[current].name}</span>
                <span className="text-sm text-t3">{testimonials[current].role}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-subtle flex items-center justify-center text-t2 hover:text-t1 hover:border-primary/30 hover:bg-primary/5 transition-all"
            >
              <ChevronRight size={18} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'w-6 bg-primary-light' : 'w-2 bg-surface-3 hover:bg-t3'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-subtle flex items-center justify-center text-t2 hover:text-t1 hover:border-primary/30 hover:bg-primary/5 transition-all"
            >
              <ChevronLeft size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

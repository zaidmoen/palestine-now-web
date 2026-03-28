import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowLeft, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

function useParticles(count = 40) {
  return useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 20,
      dx: (Math.random() - 0.5) * 250,
      dy: (Math.random() - 0.5) * 250,
    }));
  }, [count]);
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.18 * i, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  }),
};

const typewriterWords = ['وظائف', 'تعليم', 'أخبار', 'تكافل', 'طوارئ', 'طرق'];

function useTypewriter(words, typingSpeed = 120, deletingSpeed = 80, pauseDuration = 2000) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let timeout;

    if (!isDeleting && displayText === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentWord.substring(0, displayText.length - 1)
            : currentWord.substring(0, displayText.length + 1)
        );
      }, isDeleting ? deletingSpeed : typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return displayText;
}

export default function HeroSection() {
  const particles = useParticles(40);
  const typedWord = useTypewriter(typewriterWords);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="hero">
      {/* ━━━ Animated Gradient Orbs ━━━ */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
      </div>

      {/* ━━━ Mesh Gradient Background ━━━ */}
      <div className="absolute inset-0 mesh-gradient opacity-80" />

      {/* ━━━ Grid Pattern Overlay ━━━ */}
      <div className="absolute inset-0 hero-grid-pattern opacity-[0.03]" />

      {/* ━━━ Radial gradient overlays ━━━ */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 700px 700px at 20% 50%, rgba(26,107,60,0.3), transparent), radial-gradient(ellipse 500px 500px at 80% 30%, rgba(212,160,23,0.1), transparent)',
        }}
      />

      {/* ━━━ Floating Particles ━━━ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.left}%`,
              top: `${p.top}%`,
              background: p.id % 3 === 0
                ? 'rgba(42,138,80,0.5)'
                : p.id % 3 === 1
                  ? 'rgba(212,160,23,0.4)'
                  : 'rgba(240,244,241,0.2)',
            }}
            animate={{
              x: [0, p.dx, -p.dx / 2, 0],
              y: [0, p.dy, -p.dy / 2, 0],
              opacity: [0.2, 0.6, 0.3, 0.2],
              scale: [1, 1.3, 0.8, 1],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* ━━━ Content ━━━ */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center pt-24 pb-32">
        {/* ① Glowing Pill */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="glow-pill inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary/10 mb-8"
        >
          <Sparkles size={16} className="text-accent animate-pulse" />
          <span className="text-sm font-semibold text-primary-light">
            منصة فلسطينية 100% · مجانية
          </span>
        </motion.div>

        {/* ② H1 with accent */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-[42px] md:text-[60px] lg:text-[76px] font-bold text-t1 leading-[1.08] mb-3"
        >
          كل ما يحتاجه{' '}
          <span className="relative inline-block">
            <span className="gradient-text">المواطن</span>
            <motion.span
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-l from-primary-light to-accent rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
            />
          </span>
        </motion.h1>

        {/* ③ H2 Gradient with typewriter */}
        <motion.h2
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-[36px] md:text-[52px] lg:text-[64px] font-bold leading-[1.1] mb-6"
        >
          <span className="gradient-text">في مكان واحد</span>
        </motion.h2>

        {/* ④ Typewriter Feature Text */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center gap-2 text-xl md:text-2xl text-t2 mb-4 h-10"
        >
          <span className="text-t3">ابحث عن:</span>
          <span className="text-primary-light font-bold min-w-[80px]">
            {typedWord}
            <span className="typewriter-cursor">|</span>
          </span>
        </motion.div>

        {/* ⑤ Subtext */}
        <motion.p
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-t2 text-base md:text-lg max-w-xl leading-relaxed mb-10"
        >
          منصة رقمية شاملة تجمع كل الخدمات الفلسطينية في تطبيق واحد سهل وسريع
        </motion.p>

        {/* ⑥ CTA Buttons */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link to="/search" className="btn-primary text-base font-bold group">
            <span>ابدأ البحث</span>
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          </Link>
          <Link to="/login" className="btn-secondary text-base">
            تسجيل حساب مجاني
          </Link>
        </motion.div>

        {/* ⑦ Trust indicators */}
        <motion.div
          custom={6}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-10 flex items-center gap-6 text-t3 text-xs"
        >
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-bright animate-pulse" />
            <span>متاح الآن</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>🔒</span>
            <span>آمن ومشفر</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>⚡</span>
            <span>سريع وخفيف</span>
          </div>
        </motion.div>
      </div>

      {/* ⑧ Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-t3"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[10px] mb-1">اكتشف المزيد</span>
        <ChevronDown size={22} />
      </motion.div>

      {/* ⑨ Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent" />
    </section>
  );
}

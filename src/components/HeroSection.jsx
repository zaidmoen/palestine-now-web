import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Briefcase, Zap, ShieldCheck, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

/* ── Typewriter ── */
const typewriterWords = ['وظيفة شاغرة', 'منحة دراسية', 'صيدلية مناوبة', 'حالة معبر الكرامة', 'أخبار عاجلة'];

function useTypewriter(words, typingSpeed = 90, deletingSpeed = 50, pauseDuration = 2500) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];
    let t;
    if (!deleting && text === word) {
      t = setTimeout(() => setDeleting(true), pauseDuration);
    } else if (deleting && text === '') {
      setDeleting(false);
      setWordIndex((p) => (p + 1) % words.length);
    } else {
      t = setTimeout(() => {
        setText(deleting ? word.slice(0, -1) : word.slice(0, text.length + 1));
      }, deleting ? deletingSpeed : typingSpeed);
    }
    return () => clearTimeout(t);
  }, [text, deleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return text;
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.1 * i, duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function HeroSection() {
  const typed = useTypewriter(typewriterWords);
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const particlesRef = useRef(null);

  useEffect(() => {
    // Initialize tsParticles
    if (window.tsParticles) {
      window.tsParticles.load({
        id: 'tsparticles',
        options: {
          fullScreen: false,
          background: { color: { value: 'transparent' } },
          fpsLimit: 60,
          particles: {
            number: { value: 55, density: { enable: true, value_area: 900 } },
            color: { value: ['#00E676', '#FFD700', '#FFFFFF', '#00B4D8'] },
            shape: { type: 'circle' },
            opacity: {
              value: 0.4,
              random: true,
              animation: { enable: true, speed: 0.8, minimumValue: 0.1, sync: false },
            },
            size: {
              value: 2.5,
              random: true,
              animation: { enable: true, speed: 2, minimumValue: 0.5, sync: false },
            },
            links: {
              enable: true,
              distance: 140,
              color: '#00E676',
              opacity: 0.08,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.6,
              direction: 'none',
              random: true,
              straight: false,
              outMode: 'out',
            },
          },
          interactivity: {
            events: {
              onhover: { enable: true, mode: 'grab' },
              onclick: { enable: false },
            },
            modes: {
              grab: { distance: 160, links: { opacity: 0.25 } },
            },
          },
          detectRetina: true,
        },
      });
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-36">
      
      {/* ── tsParticles Canvas ── */}
      <div id="tsparticles" className="absolute inset-0 z-0" />

      {/* ── Grid Pattern ── */}
      <div className="absolute inset-0 pattern-grid opacity-30 pointer-events-none z-0" />

      {/* ── Ambient Blobs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="hero-blob-1" />
        <div className="hero-blob-2" />
        <div className="hero-blob-3" />
      </div>

      {/* ── Horizontal neon lines decoration ── */}
      <div className="absolute top-1/3 left-0 right-0 h-px pointer-events-none z-0"
        style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(0,230,118,0.06) 30%, rgba(0,230,118,0.06) 70%, transparent 95%)' }}
      />

      {/* ── Main Content ── */}
      <div className="relative z-10 w-full max-w-[1020px] mx-auto px-4 sm:px-6 flex flex-col items-center text-center">

        {/* Badge */}
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="mb-7">
          <div
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full font-bold text-sm"
            style={{
              background: 'rgba(0,230,118,0.08)',
              border: '1px solid rgba(0,230,118,0.2)',
              color: 'var(--primary)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 0 20px rgba(0,230,118,0.1)',
            }}
          >
            <Sparkles size={15} className="float-anim" style={{ animationDelay: '0s' }} />
            المنصة الموحدة للخدمات الفلسطينية
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: 'var(--primary)', boxShadow: '0 0 6px var(--primary)', animation: 'pulseDot 1.5s ease-in-out infinite' }}
            />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-fluid-h1 font-black text-center leading-[1.08] mb-6 tracking-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          اسأل عن{' '}
          <span className="gradient-text">أي شيء</span>
          <br className="hidden md:block" />
          <span style={{ color: 'rgba(240,246,252,0.7)' }}>وسنجيبك </span>
          <span style={{ color: 'var(--accent)', textShadow: '0 0 30px rgba(255,215,0,0.4)' }}>فوراً.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-fluid-body text-center max-w-2xl leading-relaxed mb-12"
          style={{ color: 'var(--text-secondary)' }}
        >
          مدعوم بالذكاء الاصطناعي لتقديم أدق الإجابات حول{' '}
          <span style={{ color: 'var(--primary)' }}>الأخبار</span>، الوظائف، والخدمات اليومية في جميع محافظات فلسطين.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="w-full max-w-[800px] relative mb-10"
        >
          <form
            onSubmit={handleSearch}
            className="flex items-center p-2 rounded-[2rem] transition-all duration-300"
            style={{
              background: 'rgba(13, 17, 23, 0.85)',
              border: '1px solid var(--border-strong)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 0 0 0 transparent',
            }}
            onFocus={() => {}}
          >
            <div className="pr-4 pl-3" style={{ color: 'var(--primary)' }}>
              <Search size={22} />
            </div>

            <div className="flex-1 relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-14 bg-transparent outline-none text-lg font-medium"
                style={{ color: 'var(--text-primary)' }}
                aria-label="حقل البحث"
              />
              <div
                className={`absolute inset-y-0 right-0 flex items-center pointer-events-none text-base transition-opacity duration-200 ${query ? 'opacity-0' : 'opacity-100'}`}
                style={{ color: 'var(--text-muted)' }}
              >
                جرب البحث عن &quot;{typed}<span className="typewriter-cursor">|</span>&quot;
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary h-14 px-8 md:px-12 text-lg shrink-0"
            >
              بحث
            </button>
          </form>

          {/* Glow effect under the search bar */}
          <div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0,230,118,0.2), transparent 70%)',
              filter: 'blur(12px)',
            }}
          />
        </motion.div>

        {/* Quick Suggestions */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center justify-center gap-3 w-full"
        >
          <span className="text-sm font-bold hidden md:inline-block" style={{ color: 'var(--text-muted)' }}>
            الأكثر بحثاً:
          </span>

          {[
            { to: '/search?q=وظائف', icon: Briefcase, label: 'وظائف البنك', color: 'var(--accent)' },
            { to: '/search?q=طرق', icon: MapPin, label: 'حاجز قلنديا', color: 'var(--blue)' },
            { to: '/search?q=عاجل', icon: Zap, label: 'أخبار عاجلة', color: 'var(--red)' },
          ].map(({ to, icon: Icon, label, color }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = color;
                e.currentTarget.style.color = color;
                e.currentTarget.style.background = `${color}15`;
                e.currentTarget.style.boxShadow = `0 0 12px ${color}30`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Icon size={13} />
              {label}
            </Link>
          ))}
        </motion.div>

        {/* Stats inline */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-16 flex flex-wrap items-center justify-center gap-6 md:gap-10"
        >
          {[
            { num: '+5000', label: 'مستخدم' },
            { num: '+320', label: 'وظيفة' },
            { num: '+150', label: 'عائلة أُعينت' },
          ].map(({ num, label }) => (
            <div key={label} className="flex flex-col items-center">
              <span
                className="text-2xl font-black"
                style={{ color: 'var(--primary)', textShadow: '0 0 20px rgba(0,230,118,0.4)' }}
              >
                {num}
              </span>
              <span className="text-xs font-semibold mt-0.5" style={{ color: 'var(--text-muted)' }}>
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-[1]"
        style={{ background: 'linear-gradient(to top, var(--bg), transparent)' }}
      />
    </section>
  );
}

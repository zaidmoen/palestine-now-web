import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Briefcase, Zap, ShieldCheck } from 'lucide-react';
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
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.1 * i, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function HeroSection() {
  const typed = useTypewriter(typewriterWords);
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32">
      {/* ── Background Mesh ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="hero-blob-1 opacity-70" />
        <div className="hero-blob-2 opacity-50" />
      </div>
      <div className="absolute inset-0 pattern-dots opacity-40 pointer-events-none" />

      {/* ── Main Content Container ── */}
      <div className="relative z-10 w-full max-w-[1000px] mx-auto px-4 sm:px-6 flex flex-col items-center">
        
        {/* Badge */}
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="mb-6 lg:mb-8">
          <div className="badge-primary inline-flex gap-2.5 px-5 py-2 shadow-sm">
            <ShieldCheck size={16} />
            المنصة الموحدة للخدمات الفلسطينية
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-fluid-h1 font-black text-center leading-[1.1] mb-6 tracking-tight text-text-primary"
        >
          اسأل عن <span className="gradient-text">أي شيء</span>, <br className="hidden md:block" />
          وسنجيبك فوراً.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-fluid-body text-center max-w-2xl text-text-secondary leading-relaxed mb-10 lg:mb-12"
        >
          مدعوم بالذكاء الاصطناعي لتقديم أدق الإجابات حول الأخبار، الوظائف، والخدمات اليومية في جميع محافظات فلسطين.
        </motion.p>

        {/* Interactive Search Bar */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="w-full max-w-[760px] relative mb-10"
        >
          <form 
            onSubmit={handleSearch}
            className="flex items-center bg-bg-card border-2 border-border p-2 rounded-[2rem] shadow-island focus-within:border-primary focus-within:ring-4 focus-within:ring-primary-50 transition-all duration-300"
          >
            <div className="pl-4 pr-3 text-text-muted">
              <Search size={24} />
            </div>
            <div className="flex-1 relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-14 bg-transparent outline-none text-lg text-text-primary placeholder:text-transparent"
              />
              <div
                className={`absolute inset-y-0 right-0 flex items-center pointer-events-none text-lg font-bold text-text-light transition-opacity duration-200 ${query ? 'opacity-0' : 'opacity-100'}`}
              >
                جرب البحث عن "{typed}<span className="typewriter-cursor">|</span>"
              </div>
            </div>
            <button
              type="submit"
              className="bg-primary hover:bg-primary-hover text-white px-8 md:px-10 h-14 rounded-[24px] font-black text-lg transition-transform hover:scale-105 active:scale-95 shadow-md"
            >
              بحث
            </button>
          </form>
        </motion.div>

        {/* Quick Suggestions */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center justify-center gap-3 lg:gap-4 w-full"
        >
          <span className="text-sm font-bold text-text-muted hidden md:inline-block ml-2">الأكثر بحثاً:</span>
          
          <Link to="/search?q=وظائف" className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-bg-card border border-border text-sm font-bold text-text-primary hover:border-primary hover:bg-primary-50 hover:text-primary transition-colors shadow-sm">
            <Briefcase size={14} /> وظائف البنك
          </Link>
          
          <Link to="/search?q=طرق" className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-bg-card border border-border text-sm font-bold text-text-primary hover:border-primary hover:bg-primary-50 hover:text-primary transition-colors shadow-sm">
            <MapPin size={14} /> حالة حاجز قلنديا
          </Link>
          
          <Link to="/search?q=عاجل" className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-bg-card border border-border text-sm font-bold text-text-primary hover:border-error hover:bg-[#FDEDEC] hover:text-error transition-colors shadow-sm">
            <Zap size={14} /> أخبار عاجلة
          </Link>
        </motion.div>

      </div>
      
      {/* ── Bottom fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
    </section>
  );
}

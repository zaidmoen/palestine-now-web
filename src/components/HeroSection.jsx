import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowLeft } from 'lucide-react';

// Generate 30 particles with random positions and timing
function useParticles(count = 30) {
  return useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 20,
      dx: (Math.random() - 0.5) * 200,
      dy: (Math.random() - 0.5) * 200,
    }));
  }, [count]);
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function HeroSection() {
  const particles = useParticles(30);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ━━━ Mesh Gradient Background ━━━ */}
      <div className="absolute inset-0 mesh-gradient" />

      {/* ━━━ Radial gradient overlays ━━━ */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse 600px 600px at 20% 50%, rgba(26,107,60,0.25), transparent), radial-gradient(ellipse 400px 400px at 80% 30%, rgba(212,160,23,0.08), transparent)',
        }}
      />

      {/* ━━━ Floating Particles ━━━ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-primary-light/40"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.left}%`,
              top: `${p.top}%`,
            }}
            animate={{
              x: [0, p.dx, -p.dx / 2, 0],
              y: [0, p.dy, -p.dy / 2, 0],
              opacity: [0.2, 0.5, 0.3, 0.2],
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
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center flex flex-col items-center pt-24 pb-32">
        {/* ① Glowing Pill */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="glow-pill inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 mb-8"
        >
          <span className="text-accent text-sm">✦</span>
          <span className="text-sm font-semibold text-primary-light">
            منصة فلسطينية 100%
          </span>
        </motion.div>

        {/* ② H1 */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-[44px] md:text-[64px] lg:text-[72px] font-bold text-t1 leading-[1.1] mb-3"
        >
          كل ما تحتاجه
        </motion.h1>

        {/* ③ H2 Gradient */}
        <motion.h2
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-[40px] md:text-[56px] lg:text-[64px] font-bold gradient-text leading-[1.1] mb-6"
        >
          في مكان واحد
        </motion.h2>

        {/* ④ Subtext */}
        <motion.p
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-t2 text-base md:text-lg max-w-xl leading-relaxed mb-10"
        >
          بحث ذكي · وظايف · طلاب · تاكسي · تكافل · طرق · أخبار · طوارئ
        </motion.p>

        {/* ⑤ CTA Buttons */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button className="btn-primary text-base font-bold">
            ابدأ الآن
            <ArrowLeft size={18} />
          </button>
          <button className="btn-secondary text-base">
            تعرف أكثر
          </button>
        </motion.div>
      </div>

      {/* ⑥ Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-t3"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
}

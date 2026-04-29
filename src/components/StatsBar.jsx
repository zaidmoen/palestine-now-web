import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import EmojiIcon from './EmojiIcon';

const stats = [
  { value: 5000, prefix: '+', label: 'مستخدم نشط',   icon: '👥', color: 'var(--primary)' },
  { value: 320,  prefix: '+', label: 'وظيفة متاحة',  icon: '💼', color: 'var(--accent)'  },
  { value: 200,  prefix: '+', label: 'سائق تاكسي',   icon: '🚕', color: 'var(--blue)'    },
  { value: 150,  prefix: '+', label: 'عائلة أُعينت', icon: '🤝', color: 'var(--red)'     },
];

function StatItem({ stat, inView, index }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTime = null;
    let raf;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / 2000, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * stat.value));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, stat.value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      className="flex flex-col items-center text-center py-8 px-4 w-full relative shimmer-card"
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
        style={{
          background: `${stat.color}18`,
          border: `1px solid ${stat.color}30`,
          boxShadow: `0 0 20px ${stat.color}15`,
        }}
      >
        <EmojiIcon
          emoji={stat.icon}
          label={stat.label}
          size={26}
          decorative={false}
          className="select-none"
        />
      </div>

      <div
        className="text-4xl md:text-5xl font-black tabular-nums mb-1"
        dir="ltr"
        style={{
          color: stat.color,
          textShadow: `0 0 30px ${stat.color}50`,
        }}
      >
        {stat.prefix}{count.toLocaleString('ar-EG')}
      </div>

      <div className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
        {stat.label}
      </div>
    </motion.div>
  );
}

export default function StatsBar() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Top neon gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px neon-line" />

      {/* Background pattern */}
      <div className="absolute inset-0 pattern-dots opacity-30 pointer-events-none" />

      <div className="max-w-[1100px] mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-x-reverse"
          style={{ '--tw-divide-opacity': 1 }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="relative"
              style={{
                borderLeft: i < stats.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              <StatItem stat={stat} inView={inView} index={i} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom neon gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px neon-line" />
    </section>
  );
}

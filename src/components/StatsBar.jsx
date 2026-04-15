import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import EmojiIcon from './EmojiIcon';

const stats = [
  { value: 5000, prefix: '+', label: 'مستخدم نشط',   icon: '👥' },
  { value: 320,  prefix: '+', label: 'وظيفة متاحة',  icon: '💼' },
  { value: 200,  prefix: '+', label: 'سائق تاكسي',   icon: '🚕' },
  { value: 150,  prefix: '+', label: 'عائلة أُعينت', icon: '🤝' },
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
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.14, duration: 0.55 }}
      className="flex flex-col items-center text-center py-6 px-4 w-full"
    >
      <EmojiIcon
        emoji={stat.icon}
        label={stat.label}
        size={28}
        decorative={false}
        className="mb-2 select-none"
      />
      <div className="text-3xl md:text-4xl font-black tabular-nums" dir="ltr" style={{ color: '#fff' }}>
        {stat.prefix}{count.toLocaleString('ar-EG')}
      </div>
      <div className="text-sm font-semibold mt-1" style={{ color: 'rgba(255,255,255,0.75)' }}>
        {stat.label}
      </div>
    </motion.div>
  );
}

export default function StatsBar() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} style={{ background: 'var(--primary)' }}>
      <div className="max-w-[1100px] mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center justify-center relative">
              <StatItem stat={stat} inView={inView} index={i} />
              {i < stats.length - 1 && (
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-14 w-px hidden md:block"
                  style={{ background: 'rgba(255,255,255,0.18)' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

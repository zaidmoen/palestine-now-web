import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: 5000, prefix: '+', suffix: '', label: 'مستخدم نشط' },
  { value: 320, prefix: '+', suffix: '', label: 'وظيفة متاحة' },
  { value: 200, prefix: '+', suffix: '', label: 'سائق تاكسي' },
  { value: 150, prefix: '+', suffix: '', label: 'عائلة أُعينت' },
];

// Format number to Arabic-style display
function formatArabicNumber(num) {
  return num.toLocaleString('ar-EG');
}

function useCounter(end, duration = 2000, start = false) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime = null;
    let animFrame;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.floor(eased * end));
      if (progress < 1) {
        animFrame = requestAnimationFrame(step);
      }
    };

    animFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrame);
  }, [end, duration, start]);

  return current;
}

function StatItem({ stat, inView, index }) {
  const count = useCounter(stat.value, 2000, inView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="flex flex-col items-center text-center px-4 sm:px-8 py-4"
    >
      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-t1 tabular-nums" dir="ltr">
        <span className="text-primary-light">{stat.prefix}</span>
        {formatArabicNumber(count)}
        {stat.suffix}
      </div>
      <div className="text-xs sm:text-sm text-t2 mt-1 font-semibold">
        {stat.label}
      </div>
    </motion.div>
  );
}

export default function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section
      ref={ref}
      className="relative bg-surface border-t border-b border-subtle"
    >
      <div className="max-w-[1200px] mx-auto px-4 py-6 flex flex-wrap items-center justify-center">
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex items-center">
            <StatItem stat={stat} inView={inView} index={i} />
            {i < stats.length - 1 && (
              <div className="hidden sm:block w-px h-12 bg-subtle mx-2 sm:mx-4" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

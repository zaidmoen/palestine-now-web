import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // loading → done

  useEffect(() => {
    const duration = 1800;
    const start = Date.now();
    let raf;
    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setPhase('done');
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {phase !== 'gone' && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={() => { if (phase === 'done') onFinish?.(); }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: 'var(--bg)' }}
        >
          {/* Animated gradient blobs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{ x: [0, 50, -30, 0], y: [0, -40, 30, 0], scale: [1, 1.2, 0.9, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(20, 90, 50, 0.12), transparent 70%)', filter: 'blur(60px)' }}
            />
            <motion.div
              animate={{ x: [0, -40, 20, 0], y: [0, 30, -20, 0], scale: [1, 0.9, 1.15, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-[-15%] left-[-10%] w-[400px] h-[400px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(192, 127, 0, 0.08), transparent 70%)', filter: 'blur(60px)' }}
            />
          </div>

          {/* Dot pattern */}
          <div className="absolute inset-0 pattern-dots opacity-30 pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-6 px-6">

            {/* Animated Flag SVG */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, rgba(20,90,50,0.2), transparent 70%)', filter: 'blur(30px)', transform: 'scale(2)' }} />
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-20 h-20 rounded-[28px] flex items-center justify-center"
                style={{ background: 'var(--bg-card)', border: '2px solid var(--border)', boxShadow: 'var(--shadow-xl)' }}
              >
                <span className="text-4xl select-none">🇵🇸</span>
              </motion.div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-2xl font-black tracking-tight" style={{ color: 'var(--primary)' }}>
                فلسطين الآن
              </h1>
              <p className="text-sm mt-1 font-semibold" style={{ color: 'var(--text-muted)' }}>
                المنصة الرقمية الفلسطينية
              </p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 200 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="relative h-1.5 rounded-full overflow-hidden"
              style={{ background: 'var(--bg-muted)' }}
            >
              <motion.div
                className="absolute inset-y-0 right-0 rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, var(--primary), var(--accent))',
                  boxShadow: '0 0 12px rgba(20,90,50,0.4)',
                }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>

            {/* Percentage */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xs font-bold tabular-nums"
              style={{ color: 'var(--text-light)' }}
              dir="ltr"
            >
              {progress}%
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

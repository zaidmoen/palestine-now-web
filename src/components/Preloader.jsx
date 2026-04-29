import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading');

  useEffect(() => {
    const duration = 2200;
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
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(12px)' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={() => { if (phase === 'done') onFinish?.(); }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: 'var(--bg)' }}
        >
          {/* Grid Pattern */}
          <div className="absolute inset-0 pattern-grid opacity-50 pointer-events-none" />

          {/* Animated Blobs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{ x: [0, 60, -40, 0], y: [0, -50, 40, 0], scale: [1, 1.3, 0.85, 1] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute"
              style={{
                top: '-20%', right: '-10%',
                width: 500, height: 500,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0,230,118,0.12), transparent 70%)',
                filter: 'blur(80px)',
              }}
            />
            <motion.div
              animate={{ x: [0, -50, 30, 0], y: [0, 40, -30, 0], scale: [1, 0.8, 1.2, 1] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              className="absolute"
              style={{
                bottom: '-15%', left: '-10%',
                width: 400, height: 400,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,215,0,0.08), transparent 70%)',
                filter: 'blur(80px)',
              }}
            />
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
            
            {/* Logo Container */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.1 }}
              className="relative"
            >
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full animate-ping"
                style={{ background: 'rgba(0,230,118,0.15)', transform: 'scale(2)', animationDuration: '2s' }}
              />
              {/* Spinning border */}
              <div className="preloader-ring absolute inset-0 scale-150" />
              
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-24 h-24 rounded-[28px] flex items-center justify-center"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-strong)',
                  boxShadow: 'var(--glow-primary)',
                }}
              >
                <span className="text-5xl select-none">🇵🇸</span>
              </motion.div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <h1
                className="text-3xl font-black tracking-tight mb-1"
                style={{
                  background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                فلسطين الآن
              </h1>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
                المنصة الرقمية الفلسطينية
              </p>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="w-64 relative"
            >
              <div
                className="h-1 rounded-full overflow-hidden"
                style={{ background: 'var(--bg-surface)' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, var(--primary), var(--accent))',
                    boxShadow: '0 0 12px var(--primary)',
                    transition: 'width 0.1s linear',
                  }}
                />
              </div>

              {/* Percentage */}
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
                  جارٍ التحميل...
                </span>
                <span
                  className="text-sm font-black tabular-nums"
                  style={{ color: 'var(--primary)' }}
                  dir="ltr"
                >
                  {progress}%
                </span>
              </div>
            </motion.div>

            {/* Loading dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-2"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -6, 0], opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: 'var(--primary)' }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

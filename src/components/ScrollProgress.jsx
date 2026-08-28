import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Neon Progress Bar */}
      <motion.div
        style={{ scaleX, transformOrigin: 'right' }}
        className="fixed top-0 left-0 right-0 h-[3px] z-[100]"
      >
        <div
          className="h-full w-full"
          style={{
            background: 'linear-gradient(90deg, var(--primary), var(--accent), var(--primary))',
            backgroundSize: '200% 100%',
            animation: 'gradientShift 3s ease infinite',
            boxShadow: '0 0 10px var(--primary), 0 0 20px rgba(0,230,118,0.4)',
          }}
        />
      </motion.div>

      {/* Glowing dot at the progress tip */}
      <motion.div
        style={{ scaleX, transformOrigin: 'right' }}
        className="fixed top-0 left-0 right-0 h-[3px] z-[101] pointer-events-none"
      >
        <motion.div
          style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--primary)',
            boxShadow: '0 0 12px var(--primary), 0 0 24px rgba(0,230,118,0.6)',
          }}
        />
      </motion.div>
    </>
  );
}

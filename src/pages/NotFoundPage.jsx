import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hero-blob-1 opacity-50" />
        <div className="hero-blob-2 opacity-40" />
        <div className="absolute inset-0 pattern-dots opacity-30" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-lg">
        {/* 404 */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <span className="text-[120px] md:text-[160px] font-black leading-none select-none gradient-text">404</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl md:text-4xl font-black mb-3" style={{ color: 'var(--text-primary)' }}>
            الصفحة غير موجودة
          </h1>
          <p className="text-base mb-8" style={{ color: 'var(--text-secondary)' }}>
            يبدو أن الرابط الذي تبحث عنه غير صحيح أو أن الصفحة نُقلت. لا تقلق، يمكنك العودة للرئيسية أو استخدام البحث الذكي.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/" className="btn-primary">
            <Home size={17} />
            العودة للرئيسية
          </Link>
          <Link to="/search" className="btn-secondary">
            <Search size={17} />
            البحث الذكي
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

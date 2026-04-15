import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Users } from 'lucide-react';

export default function CTASection() {
  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      id="cta"
      style={{ background: 'var(--bg-section)' }}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pattern-dots opacity-50 pointer-events-none" />

      {/* Green blob */}
      <div
        className="absolute -top-40 -left-40 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(27,107,58,0.07), transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      <div
        className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(196,123,43,0.06), transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="relative max-w-[860px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl p-8 md:p-14 text-center overflow-hidden"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-xl)',
          }}
        >
          {/* Top accent line */}
          <div
            className="absolute top-0 left-10 right-10 h-1 rounded-b-full"
            style={{ background: 'linear-gradient(90deg, var(--primary), var(--accent))' }}
          />

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="badge-primary mx-auto w-fit mb-8"
          >
            <Users size={14} />
            انضم لآلاف المستخدمين
          </motion.div>

          {/* Title */}
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-black mb-5 leading-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            جاهز تبدأ استخدام{' '}
            <span className="gradient-text">فلسطين الآن</span>؟
          </h2>

          {/* Description */}
          <p
            className="text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            سجّل حسابك المجاني اليوم واستفد من جميع الخدمات الفلسطينية في مكان واحد.
            المنصة متاحة على الويب وقريبًا على الهواتف الذكية.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login" className="btn-primary text-base">
              سجّل الآن مجانًا
              <ArrowLeft size={17} />
            </Link>
            <button className="btn-ghost text-base gap-2">
              <Download size={16} />
              حمّل التطبيق قريبًا
            </button>
          </div>

          {/* Trust line */}
          <p className="mt-8 text-xs" style={{ color: 'var(--text-light)' }}>
            لا حاجة لبطاقة ائتمان · مجاني بالكامل · يمكنك الإلغاء في أي وقت
          </p>
        </motion.div>
      </div>
    </section>
  );
}

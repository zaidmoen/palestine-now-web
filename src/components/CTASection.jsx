import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Users, Zap, Shield } from 'lucide-react';

export default function CTASection() {
  return (
    <section
      className="relative section-padding overflow-hidden"
      id="cta"
      style={{ background: 'var(--bg-card)' }}
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 pattern-grid opacity-40 pointer-events-none" />

      {/* Ambient blobs */}
      <div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,230,118,0.08), transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,215,0,0.06), transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative max-w-[900px] mx-auto px-4 sm:px-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[40px] p-8 md:p-16 text-center overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, rgba(13,17,23,0.95) 0%, rgba(22,30,42,0.95) 100%)',
            border: '1px solid rgba(0,230,118,0.15)',
            boxShadow: '0 0 80px rgba(0,230,118,0.08), inset 0 1px 0 rgba(0,230,118,0.1), var(--shadow-xl)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Top neon line */}
          <div
            className="absolute top-0 left-16 right-16 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, var(--primary), var(--accent), transparent)' }}
          />

          {/* Floating orb decorations */}
          <div
            className="absolute top-8 right-8 w-24 h-24 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(0,230,118,0.1), transparent)',
              filter: 'blur(20px)',
            }}
          />
          <div
            className="absolute bottom-8 left-8 w-20 h-20 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(255,215,0,0.08), transparent)',
              filter: 'blur(15px)',
            }}
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-5 leading-tight" style={{ color: 'var(--text-primary)' }}>
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

          {/* Feature pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {[
              { icon: Zap, label: 'سريع وذكي', color: 'var(--accent)' },
              { icon: Shield, label: 'آمن ومجاني', color: 'var(--primary)' },
              { icon: Users, label: '+5000 مستخدم', color: 'var(--blue)' },
            ].map(({ icon: Icon, label, color }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
                style={{
                  background: `${color}12`,
                  border: `1px solid ${color}25`,
                  color,
                }}
              >
                <Icon size={13} />
                {label}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login" className="btn-primary text-base">
              سجّل الآن مجانًا
              <ArrowLeft size={17} />
            </Link>
            <button className="btn-secondary text-base gap-2">
              <Download size={16} />
              حمّل التطبيق قريبًا
            </button>
          </div>

          {/* Trust line */}
          <p className="mt-8 text-xs" style={{ color: 'var(--text-muted)' }}>
            لا حاجة لبطاقة ائتمان · مجاني بالكامل · يمكنك الإلغاء في أي وقت
          </p>
        </motion.div>
      </div>
    </section>
  );
}

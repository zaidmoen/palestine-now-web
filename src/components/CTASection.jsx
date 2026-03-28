import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Download } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden" id="cta">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] -top-40 -right-40" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] -bottom-20 -left-40" />
      </div>

      <div className="relative max-w-[900px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="relative p-8 md:p-14 rounded-3xl border border-primary/20 bg-gradient-to-br from-surface via-primary/[0.04] to-surface overflow-hidden text-center"
        >
          {/* Decorative gradient ring */}
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full border border-primary/10 opacity-50" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full border border-accent/10 opacity-50" />

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <Sparkles size={14} className="text-accent" />
            <span className="text-sm font-bold text-primary-light">انضم لآلاف المستخدمين</span>
          </motion.div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-t1 mb-5 leading-tight">
            جاهز تبدأ استخدام{' '}
            <span className="gradient-text">فلسطين الآن</span>؟
          </h2>

          {/* Description */}
          <p className="text-t2 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            سجّل حسابك المجاني اليوم واستفد من جميع الخدمات الفلسطينية في 
            مكان واحد. المنصة متاحة على الويب وقريبًا على الهواتف الذكية.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/login"
              className="btn-primary text-base font-bold group"
            >
              <span>سجّل الآن مجانًا</span>
              <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            </Link>
            <button className="btn-secondary text-base gap-2">
              <Download size={16} />
              <span>حمّل التطبيق قريبًا</span>
            </button>
          </div>

          {/* Bottom trust text */}
          <p className="mt-8 text-xs text-t3">
            لا حاجة لبطاقة ائتمان · مجاني بالكامل · يمكنك الإلغاء في أي وقت
          </p>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { Shield, Zap, Globe, Smartphone, HeartHandshake, Brain } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'مساعد ذكي',
    description: 'ابحث بطبيعتك! الذكاء الاصطناعي يفهم الأسئلة المعقدة ويحللها ليعطيك إجابة دقيقة من مصادر فلسطينية بحتة.',
    color: '#A855F7',
    glow: 'rgba(168,85,247,0.3)',
    gradient: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(168,85,247,0.04))',
  },
  {
    icon: Zap,
    title: 'سرعة فائقة',
    description: 'تم تصميم الواجهة لتتحمل أضعف سرعات الإنترنت مع تحميل فوري للمحتوى دون انتظار.',
    color: '#FFD700',
    glow: 'rgba(255,215,0,0.3)',
    gradient: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,215,0,0.04))',
  },
  {
    icon: Shield,
    title: 'خصوصية مشفرة',
    description: 'لا نقوم بتتبع بياناتك الشخصية، تصفحك محمي ومعلوماتك مشفرة وفق أعلى المعايير.',
    color: '#00B4D8',
    glow: 'rgba(0,180,216,0.3)',
    gradient: 'linear-gradient(135deg, rgba(0,180,216,0.15), rgba(0,180,216,0.04))',
  },
  {
    icon: Globe,
    title: 'تغطية شاملة',
    description: 'من جنين إلى رفح، المنصة تغطي جميع المحافظات، القرى، والمخيمات الفلسطينية.',
    color: '#00E676',
    glow: 'rgba(0,230,118,0.3)',
    gradient: 'linear-gradient(135deg, rgba(0,230,118,0.15), rgba(0,230,118,0.04))',
  },
  {
    icon: Smartphone,
    title: 'تجربة سلسة',
    description: 'سواء كنت تستخدم الهاتف المحمول، التابلت، أو الحاسوب، الواجهة تتكيف بشكل مثالي.',
    color: '#38BDF8',
    glow: 'rgba(56,189,248,0.3)',
    gradient: 'linear-gradient(135deg, rgba(56,189,248,0.15), rgba(56,189,248,0.04))',
  },
  {
    icon: HeartHandshake,
    title: 'مجانية 100%',
    description: 'بنيت المنصة بأيدي فلسطينية لخدمة المجتمع، بلا اشتراكات، بلا إعلانات مزعجة.',
    color: '#F87171',
    glow: 'rgba(248,113,113,0.3)',
    gradient: 'linear-gradient(135deg, rgba(248,113,113,0.15), rgba(248,113,113,0.04))',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function FeaturesSection() {
  return (
    <section
      className="relative section-padding overflow-hidden"
      id="features"
      style={{ background: 'var(--bg-card)' }}
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 pattern-grid opacity-30 pointer-events-none" />

      {/* Ambient top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(168,85,247,0.06), transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="badge-accent mx-auto w-fit mb-5">
            لماذا فلسطين الآن؟
          </div>
          <h2 className="text-fluid-h2 font-black mb-5" style={{ color: 'var(--text-primary)' }}>
            معايير عالمية،{' '}
            <span className="gradient-text">بروح فلسطينية</span>
          </h2>
          <p className="text-fluid-body max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            لم نكتفِ بجمع الخدمات، بل أعدنا صياغة تجربة المستخدم بالكامل لتكون الأولى من نوعها في فلسطين.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group relative rounded-[24px] p-7 md:p-8 flex flex-col overflow-hidden shimmer-card cursor-default"
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = feature.color + '40';
                  e.currentTarget.style.boxShadow = `0 0 40px ${feature.glow}, 0 20px 40px rgba(0,0,0,0.4)`;
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.background = feature.gradient;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'var(--bg-surface)';
                }}
              >
                {/* Top accent line (hidden until hover via CSS group) */}
                <div
                  className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)` }}
                />

                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-[18px] flex items-center justify-center mb-6 transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-110"
                  style={{
                    background: `${feature.color}15`,
                    border: `1px solid ${feature.color}25`,
                    boxShadow: `0 0 20px ${feature.glow}`,
                  }}
                >
                  <Icon size={28} style={{ color: feature.color }} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-black mb-3" style={{ color: 'var(--text-primary)' }}>
                  {feature.title}
                </h3>
                <p className="text-sm leading-loose" style={{ color: 'var(--text-secondary)' }}>
                  {feature.description}
                </p>

                {/* Bottom corner neon dot */}
                <div
                  className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: feature.color,
                    boxShadow: `0 0 8px ${feature.color}`,
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

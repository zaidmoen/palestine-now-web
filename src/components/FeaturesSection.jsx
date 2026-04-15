import { motion } from 'framer-motion';
import { Shield, Zap, Globe, Smartphone, HeartHandshake, Brain } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'مساعد ذكي',
    description: 'ابحث بطبيعتك! الذكاء الاصطناعي يفهم الأسئلة المعقدة ويحللها ليعطيك إجابة دقيقة من مصادر فلسطينية بحتة.',
    color: '#7D3C98',
    bg: '#F5EEF8',
  },
  {
    icon: Zap,
    title: 'سرعة فائقة',
    description: 'تم تصميم الواجهة لتتحمل أضعف سرعات الإنترنت مع تحميل فوري للمحتوى دون انتظار.',
    color: '#D4AC0D',
    bg: '#FEFDE6',
  },
  {
    icon: Shield,
    title: 'خصوصية مشفرة',
    description: 'لا نقوم بتتبع بياناتك الشخصية، تصفحك محمي ومعلوماتك مشفرة وفق أعلى المعايير.',
    color: '#1A5276',
    bg: '#EBF5FB',
  },
  {
    icon: Globe,
    title: 'تغطية شاملة',
    description: 'من جنين إلى رفح، المنصة تغطي جميع المحافظات، القرى، والمخيمات الفلسطينية.',
    color: '#145A32',
    bg: '#E9F7EF',
  },
  {
    icon: Smartphone,
    title: 'تجربة سلسة',
    description: 'سواء كنت تستخدم الهاتف المحمول، التابلت، أو الحاسوب، الواجهة تتكيف بشكل مثالي.',
    color: '#117A65',
    bg: '#E8F8F5',
  },
  {
    icon: HeartHandshake,
    title: 'مجانية 100%',
    description: 'بنيت المنصة بأيدي فلسطينية لخدمة المجتمع، بلا اشتراكات، بلا إعلانات مزعجة.',
    color: '#A93226',
    bg: '#FDEDEC',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function FeaturesSection() {
  return (
    <section className="relative py-24 md:py-32" id="features" style={{ background: 'var(--bg)' }}>
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-20"
        >
          <div className="badge-accent mx-auto w-fit mb-6">
            لماذا فلسطين الآن؟
          </div>
          <h2 className="text-fluid-h2 font-black mb-6 text-text-primary">
            معايير عالمية،{' '}
            <span className="gradient-text">بروح فلسطينية</span>
          </h2>
          <p className="text-fluid-body text-text-secondary max-w-2xl mx-auto">
            لم نكتفِ بجمع الخدمات، بل أعدنا صياغة تجربة المستخدم بالكامل لتكون الأولى من نوعها في فلسطين.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div key={i} variants={itemVariants}>
                <div className="global-card h-full p-8 md:p-10 flex flex-col group">
                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-[20px] flex items-center justify-center mb-6 transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110 group-hover:rotate-3"
                    style={{ background: feature.bg }}
                  >
                    <Icon size={28} style={{ color: feature.color }} />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-4 text-text-primary">
                    {feature.title}
                  </h3>
                  <p className="text-base leading-loose text-text-muted">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

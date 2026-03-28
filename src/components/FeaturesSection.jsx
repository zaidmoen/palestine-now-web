import { motion } from 'framer-motion';
import { Shield, Zap, Globe, Smartphone, HeartHandshake, Brain } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'ذكاء اصطناعي',
    description: 'محرك بحث مدعوم بـ Gemini AI يفهم أسئلتك ويجيب بدقة عالية',
  },
  {
    icon: Zap,
    title: 'سرعة فائقة',
    description: 'تحميل فوري وأداء سلس على جميع الأجهزة حتى مع إنترنت بطيء',
  },
  {
    icon: Shield,
    title: 'أمان وخصوصية',
    description: 'بياناتك محمية بأعلى معايير الأمان والتشفير الحديث',
  },
  {
    icon: Globe,
    title: 'تغطية شاملة',
    description: 'نغطي جميع المدن والمناطق الفلسطينية بدون استثناء',
  },
  {
    icon: Smartphone,
    title: 'متوافق مع الجوال',
    description: 'تجربة مثالية على الهاتف المحمول والتابلت والكمبيوتر',
  },
  {
    icon: HeartHandshake,
    title: 'مجاني بالكامل',
    description: 'جميع الخدمات مجانية تمامًا بدون اشتراكات أو رسوم مخفية',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function FeaturesSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden" id="features">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent" />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold mb-4 border border-accent/20">
            لماذا فلسطين الآن؟
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-t1 mb-4">
            ميزات تجعلنا <span className="gradient-text">الخيار الأول</span>
          </h2>
          <p className="text-t2 text-base md:text-lg max-w-lg mx-auto">
            صُمّمت المنصة من الصفر لتقدم تجربة استثنائية للمواطن الفلسطيني
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="feature-card group relative p-6 md:p-8 rounded-2xl border border-subtle bg-surface/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:bg-surface"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary-dark/20 flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20">
                  <Icon size={26} className="text-primary-light" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-t1 mb-3">{feature.title}</h3>
                <p className="text-sm text-t2 leading-relaxed">{feature.description}</p>

                {/* Decorative corner gradient */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-transparent rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

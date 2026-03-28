import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Search, GraduationCap, Briefcase, Heart,
  MapPin, Newspaper, AlertTriangle, TrendingUp,
  ArrowLeft
} from 'lucide-react';

const services = [
  {
    icon: Search,
    title: 'بحث ذكي',
    description: 'محرك بحث ذكي بالذكاء الاصطناعي يجيب على جميع أسئلتك',
    to: '/search',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-400',
    borderColor: 'hover:border-emerald-500/30',
  },
  {
    icon: GraduationCap,
    title: 'طلاب',
    description: 'منح دراسية، نتائج، وموارد تعليمية للطلاب الفلسطينيين',
    to: '/students',
    gradient: 'from-blue-500/20 to-indigo-500/20',
    iconColor: 'text-blue-400',
    borderColor: 'hover:border-blue-500/30',
  },
  {
    icon: Briefcase,
    title: 'وظائف',
    description: 'فرص عمل يومية محدّثة في جميع المدن الفلسطينية',
    to: '/jobs',
    gradient: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-400',
    borderColor: 'hover:border-amber-500/30',
  },
  {
    icon: TrendingUp,
    title: 'اقتصاد',
    description: 'أسعار العملات والذهب والأسهم لحظة بلحظة',
    to: '/economy',
    gradient: 'from-green-500/20 to-lime-500/20',
    iconColor: 'text-green-400',
    borderColor: 'hover:border-green-500/30',
  },
  {
    icon: Heart,
    title: 'تكافل',
    description: 'حملات تبرع وتكافل لدعم العائلات المحتاجة',
    to: '/solidarity',
    gradient: 'from-rose-500/20 to-pink-500/20',
    iconColor: 'text-rose-400',
    borderColor: 'hover:border-rose-500/30',
  },
  {
    icon: MapPin,
    title: 'طرق',
    description: 'حالة الطرق والحواجز محدّثة لحظة بلحظة',
    to: '/roads',
    gradient: 'from-cyan-500/20 to-sky-500/20',
    iconColor: 'text-cyan-400',
    borderColor: 'hover:border-cyan-500/30',
  },
  {
    icon: Newspaper,
    title: 'أخبار',
    description: 'آخر الأخبار المحلية والعالمية المتعلقة بفلسطين',
    to: '/news',
    gradient: 'from-violet-500/20 to-purple-500/20',
    iconColor: 'text-violet-400',
    borderColor: 'hover:border-violet-500/30',
  },
  {
    icon: AlertTriangle,
    title: 'طوارئ',
    description: 'أرقام الطوارئ والخدمات العاجلة متاحة دائمًا',
    to: '/emergency',
    gradient: 'from-red-500/20 to-rose-500/20',
    iconColor: 'text-red-400',
    borderColor: 'hover:border-red-500/30',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ServicesGrid() {
  return (
    <section className="relative py-20 md:py-28" id="services">
      {/* Section Header */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary-light text-xs font-bold mb-4 border border-primary/20">
            خدماتنا
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-t1 mb-4">
            كل ما تحتاجه في <span className="gradient-text">مكان واحد</span>
          </h2>
          <p className="text-t2 text-base md:text-lg max-w-lg mx-auto">
            خدمات شاملة مصممة خصيصًا لتلبية احتياجات المواطن الفلسطيني اليومية
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.to} variants={cardVariants}>
                <Link
                  to={service.to}
                  className={`service-card group block p-5 md:p-6 rounded-2xl border border-subtle transition-all duration-300 ${service.borderColor}`}
                >
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                    <Icon size={22} className={service.iconColor} />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-t1 mb-2 flex items-center gap-2">
                    {service.title}
                    <ArrowLeft size={14} className="text-t3 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-t2 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`} />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

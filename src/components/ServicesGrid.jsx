import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Search, GraduationCap, Briefcase, Heart,
  MapPin, Newspaper, AlertTriangle, TrendingUp,
  ArrowUpRight, Sparkles
} from 'lucide-react';

const services = [
  {
    id: 'search',
    icon: Search,
    title: 'بحث فلسطيني ذكي',
    description: 'محرك بحث متطور مدعوم بالذكاء الاصطناعي لفهم أسئلتك اليومية وتحليلها لتقديم إجابات سريعة وموثوقة من مصادر فلسطينية.',
    to: '/search',
    color: '#00E676',
    glow: 'rgba(0,230,118,0.3)',
    colSpan: 'col-span-1 lg:col-span-2 row-span-2',
    highlight: true,
  },
  {
    id: 'news',
    icon: Newspaper,
    title: 'الأخبار العاجلة',
    description: 'تغطية مستمرة على مدار الساعة لأهم الأحداث.',
    to: '/news',
    color: '#A855F7',
    glow: 'rgba(168,85,247,0.3)',
    colSpan: 'col-span-1',
  },
  {
    id: 'jobs',
    icon: Briefcase,
    title: 'فرص العمل',
    description: 'أحدث الوظائف الشاغرة في جميع المحافظات.',
    to: '/jobs',
    color: '#FFD700',
    glow: 'rgba(255,215,0,0.3)',
    colSpan: 'col-span-1',
  },
  {
    id: 'roads',
    icon: MapPin,
    title: 'حالة الطرق',
    description: 'تحديثات حية لحالة الحواجز والمعابر.',
    to: '/roads',
    color: '#00B4D8',
    glow: 'rgba(0,180,216,0.3)',
    colSpan: 'col-span-1 lg:col-span-2',
  },
  {
    id: 'students',
    icon: GraduationCap,
    title: 'شؤون الطلاب',
    description: 'منح وقروض ونتائج امتحانات.',
    to: '/students',
    color: '#38BDF8',
    glow: 'rgba(56,189,248,0.3)',
    colSpan: 'col-span-1',
  },
  {
    id: 'economy',
    icon: TrendingUp,
    title: 'الاقتصاد اليومي',
    description: 'أسعار العملات والذهب مباشر.',
    to: '/economy',
    color: '#4ADE80',
    glow: 'rgba(74,222,128,0.3)',
    colSpan: 'col-span-1',
  },
  {
    id: 'solidarity',
    icon: Heart,
    title: 'تكافل المجتمع',
    description: 'حملات التبرع والمساعدات.',
    to: '/solidarity',
    color: '#F87171',
    glow: 'rgba(248,113,113,0.3)',
    colSpan: 'col-span-1',
  },
  {
    id: 'emergency',
    icon: AlertTriangle,
    title: 'دليل الطوارئ',
    description: 'أرقام سريعة للإسعاف والدفاع المدني.',
    to: '/emergency',
    color: '#FF4757',
    glow: 'rgba(255,71,87,0.3)',
    colSpan: 'col-span-1 lg:col-span-2',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 280, damping: 22 },
  },
};

export default function ServicesGrid() {
  return (
    <section
      className="relative section-padding overflow-hidden"
      id="services"
      style={{ background: 'var(--bg)' }}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 pattern-grid opacity-40 pointer-events-none" />

      {/* Ambient blob */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(0,230,118,0.05), transparent 70%)',
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
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          data-aos="fade-up"
        >
          <div className="max-w-2xl">
            {/* Section badge */}
            <div className="badge-primary inline-flex mb-5">
              <Sparkles size={14} />
              خدماتنا الرئيسية
            </div>
            <h2 className="text-fluid-h2 font-black mb-4 leading-tight" style={{ color: 'var(--text-primary)' }}>
              جميع خدماتك{' '}
              <span className="gradient-text">في واجهة واحدة</span>
            </h2>
            <p className="text-fluid-body" style={{ color: 'var(--text-secondary)' }}>
              تصميم منظم وسريع يضع أهم احتياجات المواطن الفلسطيني بين يديه دون تعقيد.
            </p>
          </div>

          <Link
            to="/services"
            className="btn-secondary h-12 px-7 w-fit shrink-0"
          >
            استعراض كل الخدمات
          </Link>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(190px,auto)]"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.id} variants={cardVariants} className={service.colSpan}>
                <Link
                  to={service.to}
                  className={`group relative flex flex-col h-full rounded-[28px] p-7 overflow-hidden transition-all duration-400 shimmer-card`}
                  style={service.highlight
                    ? {
                        background: 'linear-gradient(145deg, rgba(0,230,118,0.12) 0%, rgba(0,200,83,0.06) 100%)',
                        border: '1px solid rgba(0,230,118,0.25)',
                        boxShadow: `0 0 40px rgba(0,230,118,0.15), inset 0 1px 0 rgba(0,230,118,0.15)`,
                      }
                    : {
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border)',
                      }
                  }
                  onMouseEnter={e => {
                    if (!service.highlight) {
                      e.currentTarget.style.borderColor = service.color + '50';
                      e.currentTarget.style.boxShadow = `0 0 30px ${service.glow}, 0 20px 40px rgba(0,0,0,0.3)`;
                      e.currentTarget.style.transform = 'translateY(-6px)';
                    } else {
                      e.currentTarget.style.boxShadow = `0 0 60px rgba(0,230,118,0.3), 0 20px 40px rgba(0,0,0,0.4)`;
                      e.currentTarget.style.transform = 'translateY(-6px)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!service.highlight) {
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.boxShadow = 'none';
                    } else {
                      e.currentTarget.style.boxShadow = `0 0 40px rgba(0,230,118,0.15), inset 0 1px 0 rgba(0,230,118,0.15)`;
                    }
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Highlight card top neon border */}
                  {service.highlight && (
                    <div
                      className="absolute top-0 left-8 right-8 h-px"
                      style={{ background: 'linear-gradient(90deg, transparent, var(--primary), transparent)' }}
                    />
                  )}

                  {/* Decorative background blob for highlight */}
                  {service.highlight && (
                    <div
                      className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle, rgba(0,230,118,0.12), transparent 70%)',
                        filter: 'blur(40px)',
                      }}
                    />
                  )}

                  {/* Header: Icon + Arrow */}
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div
                      className="service-icon-wrap group-hover:scale-110"
                      style={{
                        background: service.highlight
                          ? 'rgba(0,230,118,0.15)'
                          : `${service.color}15`,
                        border: `1px solid ${service.highlight ? 'rgba(0,230,118,0.25)' : service.color + '30'}`,
                        boxShadow: `0 0 20px ${service.highlight ? 'rgba(0,230,118,0.2)' : service.glow}`,
                      }}
                    >
                      <Icon size={26} style={{ color: service.color }} />
                    </div>

                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-muted)',
                      }}
                    >
                      <ArrowUpRight
                        size={18}
                        className="group-hover:rotate-45 transition-transform duration-300"
                        style={{ color: service.color }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mt-auto relative z-10">
                    {service.highlight && (
                      <div
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-3"
                        style={{
                          background: 'rgba(0,230,118,0.12)',
                          border: '1px solid rgba(0,230,118,0.2)',
                          color: 'var(--primary)',
                        }}
                      >
                        <Sparkles size={11} />
                        الخدمة الأبرز
                      </div>
                    )}
                    <h3
                      className="text-xl font-black mb-2"
                      style={{ color: service.highlight ? '#fff' : 'var(--text-primary)' }}
                    >
                      {service.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: service.highlight ? 'rgba(255,255,255,0.65)' : 'var(--text-secondary)' }}
                    >
                      {service.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

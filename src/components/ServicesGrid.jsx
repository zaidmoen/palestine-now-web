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
    color: '#145A32',
    bg: '#E9F7EF',
    colSpan: 'col-span-1 lg:col-span-2 row-span-2', // Large feature card
    highlight: true,
  },
  {
    id: 'news',
    icon: Newspaper,
    title: 'الأخبار العاجلة',
    description: 'تغطية مستمرة على مدار الساعة لأهم الأحداث.',
    to: '/news',
    color: '#4A235A',
    bg: '#F5EEF8',
    colSpan: 'col-span-1',
  },
  {
    id: 'jobs',
    icon: Briefcase,
    title: 'فرص العمل',
    description: 'أحدث الوظائف الشاغرة في جميع المحافظات.',
    to: '/jobs',
    color: '#935116',
    bg: '#FEF5E7',
    colSpan: 'col-span-1',
  },
  {
    id: 'roads',
    icon: MapPin,
    title: 'حالة الطرق',
    description: 'تحديثات حية لحالة الحواجز والمعابر.',
    to: '/roads',
    color: '#0E6251',
    bg: '#E8F8F5',
    colSpan: 'col-span-1 lg:col-span-2', // Wide card
  },
  {
    id: 'students',
    icon: GraduationCap,
    title: 'شؤون الطلاب',
    description: 'منح وقروض ونتائج امتحانات.',
    to: '/students',
    color: '#154360',
    bg: '#EAF2F8',
    colSpan: 'col-span-1',
  },
  {
    id: 'economy',
    icon: TrendingUp,
    title: 'الاقتصاد اليومي',
    description: 'أسعار العملات والذهب مباشر.',
    to: '/economy',
    color: '#186A3B',
    bg: '#EAFBEE',
    colSpan: 'col-span-1',
  },
  {
    id: 'solidarity',
    icon: Heart,
    title: 'تكافل المجتمع',
    description: 'حملات التبرع والمساعدات.',
    to: '/solidarity',
    color: '#78281F',
    bg: '#FDEDEC',
    colSpan: 'col-span-1',
  },
  {
    id: 'emergency',
    icon: AlertTriangle,
    title: 'دليل الطوارئ',
    description: 'أرقام سريعة للإسعاف والدفاع المدني.',
    to: '/emergency',
    color: '#922B21',
    bg: '#FADBD8',
    colSpan: 'col-span-1 lg:col-span-2', // Wide card
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } },
};

export default function ServicesGrid() {
  return (
    <section className="relative py-24 md:py-32" id="services" style={{ background: 'var(--bg-section)' }}>
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div className="max-w-2xl">
            <h2 className="text-fluid-h2 font-black mb-4 text-text-primary leading-tight">
              جميع خدماتك <br/>
              <span className="gradient-text">في واجهة واحدة</span>
            </h2>
            <p className="text-fluid-body text-text-secondary">
              تصميم منظم وسريع يضع أهم احتياجات المواطن الفلسطيني بين يديه دون تعقيد.
            </p>
          </div>
          
          <Link to="/services" className="btn-secondary h-12 px-6 w-fit md:mb-2">
            استعراض كل الخدمات
          </Link>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-[minmax(180px,auto)]"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.id} variants={cardVariants} className={service.colSpan}>
                <Link
                  to={service.to}
                  className={`group relative flex flex-col h-full rounded-[32px] p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                    service.highlight ? 'bg-primary border-transparent' : 'bg-bg-card border border-border shadow-sm hover:shadow-lg'
                  }`}
                  style={service.highlight ? { boxShadow: '0 20px 40px -10px rgba(20,90,50,0.3)' } : {}}
                >
                  {/* Decorative background for highlight card */}
                  {service.highlight && (
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                  )}

                  {/* Header: Icon + Arrow */}
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ background: service.highlight ? 'rgba(255,255,255,0.1)' : service.bg }}
                    >
                      <Icon size={26} style={{ color: service.highlight ? '#FFF' : service.color }} />
                    </div>
                    
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      service.highlight ? 'bg-white/10 text-white group-hover:bg-white group-hover:text-primary' : 'bg-bg-muted text-text-muted group-hover:bg-primary group-hover:text-white'
                    }`}>
                      <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mt-auto relative z-10">
                    {service.highlight && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold mb-4 backdrop-blur-md">
                        <Sparkles size={12} /> الخدمة الأبرز
                      </div>
                    )}
                    <h3 className={`text-2xl font-black mb-3 ${service.highlight ? 'text-white' : 'text-text-primary'}`}>
                      {service.title}
                    </h3>
                    <p className={`text-base leading-relaxed ${service.highlight ? 'text-white/80' : 'text-text-secondary'}`}>
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

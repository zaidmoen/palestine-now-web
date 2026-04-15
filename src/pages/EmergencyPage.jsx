import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowLeft,
  Clock3,
  HeartPulse,
  Hospital,
  Phone,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import {
  emergencyMetrics,
  emergencyNumbers,
  emergencyTips,
  hospitals,
} from '../data/emergency';
import EmojiIcon from '../components/EmojiIcon';
import Footer from '../components/Footer';

const cityFilters = ['الكل', ...new Set(hospitals.map((hospital) => hospital.city))];

export default function EmergencyPage() {
  const [activeCity, setActiveCity] = useState('الكل');
  const [activeTipId, setActiveTipId] = useState(emergencyTips[0]?.id ?? null);

  const filteredHospitals = useMemo(() => {
    if (activeCity === 'الكل') return hospitals;
    return hospitals.filter((hospital) => hospital.city === activeCity);
  }, [activeCity]);

  const activeTip = emergencyTips.find((tip) => tip.id === activeTipId) ?? emergencyTips[0];

  return (
    <div className="relative min-h-screen overflow-hidden pt-[88px] font-cairo" dir="rtl" style={{ background: 'var(--bg)' }}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 48, 0], y: [0, -32, 0], opacity: [0.18, 0.34, 0.18] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-16 top-0 h-[440px] w-[440px] rounded-full blur-[120px]"
          style={{ background: 'rgba(239,68,68,0.16)' }}
        />
        <motion.div
          animate={{ x: [0, -36, 0], y: [0, 42, 0], opacity: [0.14, 0.28, 0.14] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          className="absolute -left-24 top-1/3 h-[360px] w-[360px] rounded-full blur-[120px]"
          style={{ background: 'rgba(20,90,50,0.12)' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-[34px] p-6 sm:p-8 lg:p-10 mb-6"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-xl)' }}
        >
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #EF4444, var(--primary))' }} />
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="max-w-3xl">
              <div className="badge-primary w-fit mb-5" style={{ background: 'rgba(239,68,68,0.08)', color: '#DC2626', borderColor: 'rgba(239,68,68,0.18)' }}>
                <Sparkles size={14} />
                دليل الطوارئ السريع
              </div>
              <h1 className="text-4xl font-black leading-tight lg:text-5xl mb-4" style={{ color: 'var(--text-primary)' }}>
                اتصل بسرعة
                <span className="gradient-text block pt-2">واتخذ القرار الصحيح</span>
              </h1>
              <p className="text-base lg:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                صفحة عملية تجمع أرقام الاستجابة الفورية، أهم المستشفيات، وخطوات أولية مختصرة حتى يصل الدعم المختص.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {emergencyMetrics.map((metric) => (
                <div
                  key={metric.id}
                  className="rounded-2xl px-5 py-4"
                  style={{ background: 'var(--bg-section)', border: '1px solid var(--border)' }}
                >
                  <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-bold ${metric.tone}`}>
                    {metric.label}
                  </span>
                  <p className="mt-2 text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto]">
            <div className="rounded-[28px] p-5" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.16)' }}>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: 'rgba(239,68,68,0.12)', color: '#DC2626' }}>
                  <ShieldAlert size={20} />
                </div>
                <div>
                  <p className="text-sm font-extrabold mb-2" style={{ color: 'var(--text-primary)' }}>في الخطر الفوري</p>
                  <p className="text-sm leading-7" style={{ color: 'var(--text-secondary)' }}>
                    إذا كانت الحالة تهدد الحياة أو تتفاقم بسرعة، اتصل مباشرة بخدمة الطوارئ المناسبة ولا تعتمد على الرسائل أو البحث فقط.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href="tel:101"
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold text-white"
                      style={{ background: '#DC2626' }}
                    >
                      الإسعاف 101
                      <Phone size={15} />
                    </a>
                    <a
                      href="tel:100"
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold"
                      style={{ background: '#fff', color: '#DC2626', border: '1px solid rgba(239,68,68,0.2)' }}
                    >
                      الشرطة 100
                      <Phone size={15} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link to="/search" className="btn-primary">
                اسأل عن خدمة عاجلة
                <ArrowLeft size={16} />
              </Link>
              <Link to="/news" className="btn-secondary">
                أحدث التنبيهات
              </Link>
            </div>
          </div>
        </motion.section>

        <section className="mb-6">
          <div className="mb-5">
            <p className="text-sm font-bold" style={{ color: '#DC2626' }}>اتصال مباشر</p>
            <h2 className="mt-2 text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>أرقام لا تحتاج بحثاً إضافياً</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {emergencyNumbers.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.05, duration: 0.35 }}
                className="rounded-[28px] p-6"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${item.bg} ${item.border}`}>
                    <EmojiIcon emoji={item.icon} label={item.name} size={30} decorative={false} />
                  </div>
                  <a
                    href={`tel:${item.number}`}
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-extrabold"
                    style={{ color: item.color, background: `${item.color}12`, border: `1px solid ${item.color}24` }}
                  >
                    <Phone size={14} />
                    {item.number}
                  </a>
                </div>

                <h3 className="text-xl font-black mb-2" style={{ color: 'var(--text-primary)' }}>{item.name}</h3>
                <p className="text-sm leading-7 mb-5" style={{ color: 'var(--text-secondary)' }}>{item.description}</p>

                <a
                  href={`tel:${item.number}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-extrabold text-white"
                  style={{ background: item.color }}
                >
                  اتصل الآن
                  <ArrowLeft size={15} />
                </a>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-bold" style={{ color: 'var(--primary)' }}>المستشفيات</p>
              <h2 className="mt-2 text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>وجهتك الأقرب عند الحاجة</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {cityFilters.map((city) => {
                const isActive = activeCity === city;
                return (
                  <button
                    key={city}
                    type="button"
                    onClick={() => setActiveCity(city)}
                    className="rounded-full px-4 py-2 text-sm font-bold transition-all"
                    style={{
                      background: isActive ? 'var(--primary)' : 'var(--bg-card)',
                      color: isActive ? '#fff' : 'var(--text-secondary)',
                      border: isActive ? '1px solid var(--primary)' : '1px solid var(--border)',
                    }}
                  >
                    {city}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {filteredHospitals.map((hospital, index) => (
              <motion.article
                key={hospital.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.05, duration: 0.35 }}
                className="rounded-[28px] p-6"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>{hospital.name}</h3>
                    <p className="mt-1 text-sm font-bold" style={{ color: 'var(--text-muted)' }}>{hospital.city}</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: 'rgba(20,90,50,0.08)', color: 'var(--primary)' }}>
                    <Hospital size={20} />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 mb-5">
                  <div className="rounded-2xl p-4" style={{ background: 'var(--bg-section)', border: '1px solid var(--border)' }}>
                    <p className="text-xs font-bold mb-1" style={{ color: 'var(--text-light)' }}>الهاتف</p>
                    <a href={`tel:${hospital.phone}`} className="text-lg font-extrabold" dir="ltr" style={{ color: 'var(--text-primary)' }}>
                      {hospital.phone}
                    </a>
                  </div>
                  <div className="rounded-2xl p-4" style={{ background: 'var(--bg-section)', border: '1px solid var(--border)' }}>
                    <p className="text-xs font-bold mb-1" style={{ color: 'var(--text-light)' }}>الدوام</p>
                    <p className="text-lg font-extrabold" style={{ color: 'var(--text-primary)' }}>{hospital.hours}</p>
                  </div>
                </div>

                <div className="mb-5">
                  <p className="text-sm font-extrabold mb-3" style={{ color: 'var(--text-primary)' }}>الأقسام المتاحة</p>
                  <div className="flex flex-wrap gap-2">
                    {hospital.departments.map((department) => (
                      <span
                        key={department}
                        className="rounded-full px-3 py-1.5 text-xs font-bold"
                        style={{ background: 'var(--primary-50)', color: 'var(--primary)', border: '1px solid var(--primary-100)' }}
                      >
                        {department}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={`tel:${hospital.phone}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-extrabold text-white"
                  style={{ background: 'var(--primary)' }}
                >
                  اتصل بالمستشفى
                  <ArrowLeft size={15} />
                </a>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.aside
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-[30px] p-6"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: 'rgba(20,90,50,0.08)', color: 'var(--primary)' }}>
                <HeartPulse size={20} />
              </div>
              <div>
                <p className="text-sm font-extrabold" style={{ color: 'var(--text-primary)' }}>إسعافات أولية</p>
                <p className="text-xs font-bold" style={{ color: 'var(--text-muted)' }}>إرشادات مختصرة لا تغني عن الطبيب</p>
              </div>
            </div>

            <div className="space-y-3">
              {emergencyTips.map((tip) => {
                const isActive = tip.id === activeTip.id;
                return (
                  <button
                    key={tip.id}
                    type="button"
                    onClick={() => setActiveTipId(tip.id)}
                    className="w-full rounded-[24px] p-4 text-right transition-all"
                    style={{
                      background: isActive ? 'var(--primary-50)' : 'var(--bg-section)',
                      border: isActive ? '1px solid var(--primary-100)' : '1px solid var(--border)',
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white">
                        <EmojiIcon emoji={tip.icon} label={tip.title} size={28} decorative={false} />
                      </div>
                      <div>
                        <p className="text-sm font-extrabold" style={{ color: isActive ? 'var(--primary)' : 'var(--text-primary)' }}>{tip.title}</p>
                        <p className="text-xs font-bold" style={{ color: 'var(--text-muted)' }}>{tip.steps.length} خطوات مختصرة</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.aside>

          <motion.section
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.08 }}
            className="rounded-[30px] p-6"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl" style={{ background: 'var(--bg-section)' }}>
                  <EmojiIcon emoji={activeTip.icon} label={activeTip.title} size={34} decorative={false} />
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: 'var(--primary)' }}>الدليل النشط</p>
                  <h2 className="mt-1 text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>{activeTip.title}</h2>
                </div>
              </div>
              <div className="rounded-full px-4 py-2 text-sm font-bold" style={{ background: 'rgba(239,68,68,0.08)', color: '#DC2626', border: '1px solid rgba(239,68,68,0.14)' }}>
                اطلب المساعدة الطبية فوراً عند الاشتباه بالخطر
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {activeTip.steps.map((step, index) => (
                <div
                  key={step}
                  className="flex items-start gap-4 rounded-[24px] px-5 py-4"
                  style={{ background: 'var(--bg-section)', border: '1px solid var(--border)' }}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-black text-white" style={{ background: 'var(--primary)' }}>
                    {index + 1}
                  </div>
                  <span className="text-sm leading-7" style={{ color: 'var(--text-primary)' }}>{step}</span>
                </div>
              ))}
            </div>

            <div className="rounded-[26px] p-5" style={{ background: 'rgba(192,127,0,0.08)', border: '1px solid rgba(192,127,0,0.16)' }}>
              <div className="flex items-start gap-3">
                <AlertTriangle size={18} style={{ color: 'var(--accent)', marginTop: 2 }} />
                <div>
                  <p className="text-sm font-extrabold mb-1" style={{ color: 'var(--text-primary)' }}>تنبيه مهم</p>
                  <p className="text-sm leading-7" style={{ color: 'var(--text-secondary)' }}>
                    هذه الخطوات للإسناد الأولي فقط. في الحالات الخطيرة أو غير الواضحة، الأولوية دائماً للاتصال بخدمة الطوارئ أو التوجه لأقرب مستشفى.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        </section>
      </div>

      <Footer />
    </div>
  );
}

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowLeft,
  Clock3,
  MapPin,
  Route,
  ShieldAlert,
  Sparkles,
  TimerReset,
  TrafficCone,
} from 'lucide-react';
import {
  checkpoints,
  crossings,
  mainRoutes,
  roadMetrics,
  roadStatuses,
} from '../data/roads';
import Footer from '../components/Footer';

const statusFilters = [
  { id: 'all', label: 'الكل' },
  ...Object.entries(roadStatuses).map(([id, config]) => ({ id, label: config.label })),
];

function StatusBadge({ status }) {
  const config = roadStatuses[status];

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${config.bg} ${config.border}`}
      style={{ color: config.color }}
    >
      {config.label}
    </span>
  );
}

export default function RoadsPage() {
  const [activeStatus, setActiveStatus] = useState('all');

  const filteredCheckpoints = useMemo(() => {
    if (activeStatus === 'all') return checkpoints;
    return checkpoints.filter((checkpoint) => checkpoint.status === activeStatus);
  }, [activeStatus]);

  const highlightedAlerts = checkpoints.filter((checkpoint) => checkpoint.status !== 'open').slice(0, 3);

  return (
    <div className="relative min-h-screen overflow-hidden pt-[88px] font-cairo" dir="rtl" style={{ background: 'var(--bg)' }}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 45, 0], y: [0, -28, 0], opacity: [0.18, 0.34, 0.18] }}
          transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-20 top-0 h-[440px] w-[440px] rounded-full blur-[120px]"
          style={{ background: 'rgba(59,130,246,0.14)' }}
        />
        <motion.div
          animate={{ x: [0, -32, 0], y: [0, 42, 0], opacity: [0.14, 0.3, 0.14] }}
          transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute -left-24 top-1/3 h-[360px] w-[360px] rounded-full blur-[120px]"
          style={{ background: 'rgba(192,127,0,0.12)' }}
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
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #3B82F6, var(--accent))' }} />
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="max-w-3xl">
              <div className="badge-primary w-fit mb-5" style={{ background: 'rgba(59,130,246,0.08)', color: '#2563EB', borderColor: 'rgba(59,130,246,0.18)' }}>
                <Sparkles size={14} />
                لوحة الطرق والمعابر
              </div>
              <h1 className="text-4xl font-black leading-tight lg:text-5xl mb-4" style={{ color: 'var(--text-primary)' }}>
                حركة الطريق
                <span className="gradient-text block pt-2">بشكل واضح وسريع</span>
              </h1>
              <p className="text-base lg:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                متابعة مركزة للحواجز، المعابر، والمحاور الرئيسية حتى يعرف المستخدم أين يذهب وما البديل الأسرع قبل أن يتحرك.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {roadMetrics.map((metric) => (
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

          <div className="mt-8 grid gap-3 lg:grid-cols-[1fr_auto]">
            <div className="rounded-[28px] p-4" style={{ background: 'rgba(192,127,0,0.08)', border: '1px solid rgba(192,127,0,0.14)' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ background: 'rgba(192,127,0,0.12)', color: 'var(--accent)' }}>
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <p className="text-sm font-extrabold" style={{ color: 'var(--text-primary)' }}>تنبيهات فورية</p>
                  <p className="text-xs font-bold" style={{ color: 'var(--text-muted)' }}>أهم الحالات التي تحتاج قراراً سريعاً</p>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {highlightedAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="rounded-2xl p-4"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-extrabold" style={{ color: 'var(--text-primary)' }}>{alert.name}</p>
                      <StatusBadge status={alert.status} />
                    </div>
                    <p className="mt-3 text-sm leading-7" style={{ color: 'var(--text-secondary)' }}>{alert.note}</p>
                    <p className="mt-3 text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
                      آخر تحديث: {alert.lastUpdate}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link to="/news" className="btn-primary">
                أحدث الأخبار
                <ArrowLeft size={16} />
              </Link>
              <Link to="/search" className="btn-secondary">
                اسأل عن طريق أو حاجز
              </Link>
            </div>
          </div>
        </motion.section>

        <section className="mb-6">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold" style={{ color: 'var(--primary)' }}>المحاور الرئيسية</p>
              <h2 className="mt-2 text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>نظرة سريعة قبل الانطلاق</h2>
            </div>
            <div className="rounded-full px-4 py-2 text-sm font-bold" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
              تحديثات حية من أكثر المسارات استخداماً
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {mainRoutes.map((route, index) => {
              const status = roadStatuses[route.status];
              return (
                <motion.article
                  key={route.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.05, duration: 0.35 }}
                  className="rounded-[28px] p-6"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>{route.name}</h3>
                      <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>{route.distance} • {route.estimatedTime}</p>
                    </div>
                    <StatusBadge status={route.status} />
                  </div>

                  <div className="mb-3 flex items-center justify-between text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
                    <span>مستوى الازدحام</span>
                    <span>{route.congestionLevel}%</span>
                  </div>
                  <div className="h-2.5 rounded-full overflow-hidden mb-5" style={{ background: 'var(--bg-section)' }}>
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${route.congestionLevel}%`, background: status.color }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl p-4" style={{ background: 'var(--bg-section)', border: '1px solid var(--border)' }}>
                      <p className="text-xs font-bold mb-1" style={{ color: 'var(--text-light)' }}>المدة المتوقعة</p>
                      <p className="text-lg font-extrabold" style={{ color: 'var(--text-primary)' }}>{route.estimatedTime}</p>
                    </div>
                    <div className="rounded-2xl p-4" style={{ background: 'var(--bg-section)', border: '1px solid var(--border)' }}>
                      <p className="text-xs font-bold mb-1" style={{ color: 'var(--text-light)' }}>الحالة الحالية</p>
                      <p className="text-lg font-extrabold" style={{ color: status.color }}>{status.label}</p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="mb-6">
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-bold" style={{ color: '#2563EB' }}>الحواجز</p>
              <h2 className="mt-2 text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>فلتر سريع لحالة المرور</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {statusFilters.map((filter) => {
                const isActive = activeStatus === filter.id;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setActiveStatus(filter.id)}
                    className="rounded-full px-4 py-2 text-sm font-bold transition-all"
                    style={{
                      background: isActive ? 'var(--primary)' : 'var(--bg-card)',
                      color: isActive ? '#fff' : 'var(--text-secondary)',
                      border: isActive ? '1px solid var(--primary)' : '1px solid var(--border)',
                    }}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {filteredCheckpoints.map((checkpoint, index) => {
              const status = roadStatuses[checkpoint.status];
              return (
                <motion.article
                  key={checkpoint.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.05, duration: 0.35 }}
                  className="rounded-[28px] p-6"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>{checkpoint.name}</h3>
                      <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>{checkpoint.location}</p>
                    </div>
                    <StatusBadge status={checkpoint.status} />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 mb-5">
                    <div className="rounded-2xl p-4" style={{ background: 'var(--bg-section)', border: '1px solid var(--border)' }}>
                      <p className="text-xs font-bold mb-1" style={{ color: 'var(--text-light)' }}>زمن الانتظار</p>
                      <p className="text-lg font-extrabold" style={{ color: status.color }}>{checkpoint.waitTime}</p>
                    </div>
                    <div className="rounded-2xl p-4" style={{ background: 'var(--bg-section)', border: '1px solid var(--border)' }}>
                      <p className="text-xs font-bold mb-1" style={{ color: 'var(--text-light)' }}>آخر تحديث</p>
                      <p className="text-lg font-extrabold" style={{ color: 'var(--text-primary)' }}>{checkpoint.lastUpdate}</p>
                    </div>
                  </div>

                  <div className="rounded-[24px] p-4 mb-4" style={{ background: `${status.color}10`, border: `1px solid ${status.color}22` }}>
                    <div className="flex items-start gap-3">
                      <TrafficCone size={18} style={{ color: status.color, marginTop: 2 }} />
                      <div>
                        <p className="text-sm font-extrabold mb-1" style={{ color: 'var(--text-primary)' }}>الوضع الحالي</p>
                        <p className="text-sm leading-7" style={{ color: 'var(--text-secondary)' }}>{checkpoint.note}</p>
                      </div>
                    </div>
                  </div>

                  {checkpoint.alternative ? (
                    <div className="flex items-start gap-3 rounded-[24px] p-4" style={{ background: 'var(--primary-50)', border: '1px solid var(--primary-100)' }}>
                      <Route size={18} style={{ color: 'var(--primary)', marginTop: 2 }} />
                      <div>
                        <p className="text-sm font-extrabold mb-1" style={{ color: 'var(--primary)' }}>المسار البديل</p>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{checkpoint.alternative}</p>
                      </div>
                    </div>
                  ) : null}
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] mb-6">
          <motion.aside
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-[30px] p-6"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: 'rgba(239,68,68,0.08)', color: '#EF4444' }}>
                <ShieldAlert size={20} />
              </div>
              <div>
                <p className="text-sm font-extrabold" style={{ color: 'var(--text-primary)' }}>قبل السفر</p>
                <p className="text-xs font-bold" style={{ color: 'var(--text-muted)' }}>خطوات صغيرة تقلل المفاجآت</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                'راجع حالة الحاجز أو المعبر قبل التحرك مباشرة وليس قبلها بساعات.',
                'احتفظ دائماً بمسار بديل واحد على الأقل خصوصاً في ساعات الذروة.',
                'عند وجود إغلاق كامل، لا تعتمد على التقدير الشخصي وارجع لآخر تحديث موثوق.',
              ].map((tip) => (
                <div
                  key={tip}
                  className="flex items-start gap-3 rounded-2xl px-4 py-3"
                  style={{ background: 'var(--bg-section)', border: '1px solid var(--border)' }}
                >
                  <TimerReset size={18} style={{ color: 'var(--primary)', marginTop: 2 }} />
                  <span className="text-sm leading-7" style={{ color: 'var(--text-primary)' }}>{tip}</span>
                </div>
              ))}
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
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold" style={{ color: 'var(--accent)' }}>المعابر</p>
                <h2 className="mt-2 text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>حالة العبور الآن</h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: 'rgba(20,90,50,0.08)', color: 'var(--primary)' }}>
                <MapPin size={20} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {crossings.map((crossing) => {
                const status = roadStatuses[crossing.status];
                return (
                  <article
                    key={crossing.id}
                    className="rounded-[24px] p-5"
                    style={{ background: 'var(--bg-section)', border: '1px solid var(--border)' }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <p className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>{crossing.name}</p>
                      <StatusBadge status={crossing.status} />
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                        <Clock3 size={15} />
                        <span>الانتظار: {crossing.waitTime}</span>
                      </div>
                      <div className="flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                        <Route size={15} />
                        <span>{crossing.hours}</span>
                      </div>
                      <p className="text-xs font-bold pt-2" style={{ color: 'var(--text-muted)' }}>
                        آخر تحديث: {crossing.lastUpdate}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </motion.section>
        </section>
      </div>

      <Footer />
    </div>
  );
}

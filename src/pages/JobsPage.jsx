import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Briefcase, Building, Clock, MapPin, Search,
  Filter, Sparkles, CheckCircle2, X, DollarSign, Star,
  ChevronDown
} from 'lucide-react';
import { jobItems, jobCategories, cities, jobTypes, jobMetrics } from '../data/jobs';
import Footer from '../components/Footer';

export default function JobsPage() {
  const [category, setCategory] = useState('الكل');
  const [city, setCity] = useState('الكل');
  const [type, setType] = useState('الكل');
  const [query, setQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);

  const filtered = useMemo(() => {
    return jobItems.filter(job => {
      const matchCat = category === 'الكل' || job.category === category;
      const matchCity = city === 'الكل' || job.city === city;
      const matchType = type === 'الكل' || job.type === type;
      const matchQuery = !query.trim() || [job.title, job.company, job.description].join(' ').toLowerCase().includes(query.toLowerCase());
      return matchCat && matchCity && matchType && matchQuery;
    });
  }, [category, city, type, query]);

  return (
    <div className="relative min-h-screen overflow-hidden pt-[88px] font-cairo" dir="rtl" style={{ background: 'var(--bg)' }}>
      {/* BG */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div animate={{ x: [0, 40, 0], y: [0, -30, 0], opacity: [0.2, 0.35, 0.2] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} className="absolute -right-16 top-0 h-[420px] w-[420px] rounded-full blur-[120px]" style={{ background: 'rgba(20,90,50,0.15)' }} />
        <motion.div animate={{ x: [0, -30, 0], y: [0, 40, 0], opacity: [0.15, 0.28, 0.15] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="absolute -left-24 top-1/3 h-[360px] w-[360px] rounded-full blur-[120px]" style={{ background: 'rgba(192,127,0,0.1)' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="relative overflow-hidden rounded-[34px] p-6 sm:p-8 lg:p-10 mb-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-xl)' }}>
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, var(--primary), var(--accent))' }} />
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="badge-primary w-fit mb-5"><Sparkles size={14} /> فرص العمل</div>
              <h1 className="text-4xl font-black leading-tight lg:text-5xl mb-4" style={{ color: 'var(--text-primary)' }}>
                وظائف فلسطينية<br /><span className="gradient-text">تناسب طموحك</span>
              </h1>
              <p className="text-base lg:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                أكثر من 320 وظيفة محدّثة يوميًا في جميع المحافظات والقطاعات. ابحث، قارن، وتقدّم بخطوات بسيطة.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {jobMetrics.map(m => (
                <div key={m.id} className="rounded-2xl px-5 py-4" style={{ background: 'var(--bg-section)', border: '1px solid var(--border)' }}>
                  <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-bold ${m.tone}`}>{m.label}</span>
                  <p className="mt-2 text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>{m.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Search & Filters */}
          <div className="mt-8 grid gap-3 md:grid-cols-[1fr_auto_auto_auto]">
            <div className="flex items-center gap-3 rounded-2xl px-4 py-3" style={{ background: 'var(--bg-section)', border: '1px solid var(--border)' }}>
              <Search size={18} style={{ color: 'var(--text-muted)' }} />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="ابحث عن وظيفة..." className="w-full bg-transparent text-sm font-medium outline-none placeholder:opacity-50" style={{ color: 'var(--text-primary)' }} />
              {query && <button onClick={() => setQuery('')}><X size={15} style={{ color: 'var(--text-muted)' }} /></button>}
            </div>
            <select value={category} onChange={e => setCategory(e.target.value)} className="rounded-2xl px-4 py-3 text-sm font-bold cursor-pointer outline-none" style={{ background: 'var(--bg-section)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
              {jobCategories.map(c => <option key={c} value={c}>{c === 'الكل' ? '📂 كل القطاعات' : c}</option>)}
            </select>
            <select value={city} onChange={e => setCity(e.target.value)} className="rounded-2xl px-4 py-3 text-sm font-bold cursor-pointer outline-none" style={{ background: 'var(--bg-section)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
              {cities.map(c => <option key={c} value={c}>{c === 'الكل' ? '📍 كل المدن' : c}</option>)}
            </select>
            <select value={type} onChange={e => setType(e.target.value)} className="rounded-2xl px-4 py-3 text-sm font-bold cursor-pointer outline-none" style={{ background: 'var(--bg-section)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
              {jobTypes.map(t => <option key={t} value={t}>{t === 'الكل' ? '⏰ نوع الدوام' : t}</option>)}
            </select>
          </div>
        </motion.section>

        {/* Results */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm font-bold" style={{ color: 'var(--text-muted)' }}>{filtered.length} وظيفة متاحة</p>
        </div>

        {filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-[30px] p-12 text-center" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>
            <Briefcase size={48} style={{ color: 'var(--text-light)', margin: '0 auto 16px' }} />
            <h3 className="text-2xl font-extrabold mb-3" style={{ color: 'var(--text-primary)' }}>لا توجد نتائج</h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>جرّب تغيير الفلاتر أو كلمة البحث</p>
            <button onClick={() => { setCategory('الكل'); setCity('الكل'); setType('الكل'); setQuery(''); }} className="btn-primary mt-6 text-sm">إعادة الضبط</button>
          </motion.div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((job, index) => (
              <motion.button
                key={job.id}
                type="button"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.05, duration: 0.35 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedJob(selectedJob?.id === job.id ? null : job)}
                className="group relative overflow-hidden rounded-[28px] p-6 text-right transition-all duration-300"
                style={{
                  background: 'var(--bg-card)',
                  border: selectedJob?.id === job.id ? '2px solid var(--primary)' : '1px solid var(--border)',
                  boxShadow: selectedJob?.id === job.id ? '0 20px 50px rgba(20,90,50,0.12)' : 'var(--shadow-sm)',
                }}
              >
                {job.isHot && (
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold" style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)' }}>
                    <Star size={10} fill="currentColor" /> مميزة
                  </span>
                )}

                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${job.iconBg}`} style={{ border: `1px solid ${job.iconColor}22` }}>
                    <Briefcase size={22} style={{ color: job.iconColor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold leading-snug mb-1 group-hover:text-primary transition-colors line-clamp-2" style={{ color: 'var(--text-primary)' }}>{job.title}</h3>
                    <p className="text-sm flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                      <Building size={13} />{job.company}
                    </p>
                  </div>
                </div>

                <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>{job.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-bold" style={{ background: 'var(--bg-section)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                    <MapPin size={11} />{job.city}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-bold" style={{ background: 'var(--bg-section)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                    <Clock size={11} />{job.type}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-bold" style={{ background: 'var(--primary-50)', color: 'var(--primary)', border: '1px solid var(--primary-100)' }}>
                    <DollarSign size={11} />{job.salary}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                  <span className="text-xs font-bold" style={{ color: 'var(--text-light)' }}>{job.posted}</span>
                  <span className="inline-flex items-center gap-1 text-sm font-bold transition-colors" style={{ color: 'var(--primary)' }}>
                    التفاصيل <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {/* Job Detail Modal */}
        <AnimatePresence>
          {selectedJob && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 backdrop-blur-sm" style={{ background: 'rgba(0,0,0,0.4)' }} onClick={() => setSelectedJob(null)} />
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.95 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed inset-x-4 top-[10%] bottom-[10%] z-50 max-w-2xl mx-auto rounded-[32px] overflow-y-auto"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-xl)' }}
              >
                <div className="sticky top-0 z-10 flex items-center justify-between p-5" style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border)' }}>
                  <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>تفاصيل الوظيفة</h3>
                  <button onClick={() => setSelectedJob(null)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'var(--bg-muted)', color: 'var(--text-muted)' }}><X size={18} /></button>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <h2 className="text-2xl font-extrabold mb-2" style={{ color: 'var(--text-primary)' }}>{selectedJob.title}</h2>
                    <p className="text-base font-semibold mb-1" style={{ color: 'var(--primary)' }}>{selectedJob.company}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="badge-primary text-xs py-1 px-3"><MapPin size={12} />{selectedJob.city}</span>
                      <span className="badge-accent text-xs py-1 px-3"><Clock size={12} />{selectedJob.type}</span>
                    </div>
                  </div>
                  <div className="rounded-2xl p-5" style={{ background: 'var(--bg-section)', border: '1px solid var(--border)' }}>
                    <p className="text-sm font-bold mb-2" style={{ color: 'var(--text-muted)' }}>الراتب</p>
                    <p className="text-2xl font-extrabold" style={{ color: 'var(--primary)' }}>{selectedJob.salary}</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-light)' }}>خبرة: {selectedJob.experience} | آخر موعد: {selectedJob.deadline}</p>
                  </div>
                  <div>
                    <h4 className="text-base font-bold mb-3" style={{ color: 'var(--text-primary)' }}>الوصف</h4>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{selectedJob.description}</p>
                  </div>
                  <div>
                    <h4 className="text-base font-bold mb-3" style={{ color: 'var(--text-primary)' }}>المتطلبات</h4>
                    <div className="space-y-2">
                      {selectedJob.requirements.map(r => (
                        <div key={r} className="flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm" style={{ background: 'var(--bg-section)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
                          <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--primary)' }} />{r}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base font-bold mb-3" style={{ color: 'var(--text-primary)' }}>المزايا</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.benefits.map(b => (
                        <span key={b} className="rounded-full px-3 py-1.5 text-xs font-bold" style={{ background: 'var(--primary-50)', color: 'var(--primary)', border: '1px solid var(--primary-100)' }}>{b}</span>
                      ))}
                    </div>
                  </div>
                  <button className="btn-primary w-full justify-center text-base">
                    تقدّم لهذه الوظيفة <ArrowLeft size={17} />
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}

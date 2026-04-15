import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, HandHelping, Users, Sparkles, Target, Calendar,
  ArrowLeft, CheckCircle2, ChevronRight, Share2, Filter
} from 'lucide-react';
import { campaigns, solidarityCategories, solidarityMetrics, impactStories } from '../data/solidarity';
import Footer from '../components/Footer';
import EmojiIcon from '../components/EmojiIcon';

export default function SolidarityPage() {
  const [activeCategory, setActiveCategory] = useState('الكل');

  const filteredCampaigns = useMemo(() => {
    if (activeCategory === 'الكل') return campaigns;
    return campaigns.filter(c => c.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="relative min-h-screen overflow-hidden pt-[88px] font-cairo" dir="rtl" style={{ background: 'var(--bg)' }}>
      {/* Background Decor */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{ x: [0, 60, 0], y: [0, -40, 0], opacity: [0.15, 0.3, 0.15] }} 
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }} 
          className="absolute -right-24 top-0 h-[500px] w-[500px] rounded-full blur-[120px]" 
          style={{ background: 'rgba(239,68,68,0.1)' }} 
        />
        <motion.div 
          animate={{ x: [0, -50, 0], y: [0, 50, 0], opacity: [0.1, 0.2, 0.1] }} 
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }} 
          className="absolute -left-32 top-1/2 h-[400px] w-[400px] rounded-full blur-[100px]" 
          style={{ background: 'rgba(20,90,50,0.08)' }} 
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.section 
          initial={{ opacity: 0, y: 24 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[34px] p-8 sm:p-12 mb-10 text-center"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-xl)' }}
        >
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #EF4444, var(--primary))' }} />
          <div className="badge-primary mx-auto mb-6"><Heart size={14} className="text-red-500" /> التكافل الاجتماعي</div>
          <h1 className="text-4xl font-black leading-tight lg:text-6xl mb-6" style={{ color: 'var(--text-primary)' }}>
            يداً بيد...<br /><span className="gradient-text">نبني الأمل</span>
          </h1>
          <p className="text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto mb-10" style={{ color: 'var(--text-secondary)' }}>
            منصتكم الموثوقة لدعم المبادرات الإنسانية والحملات الإغاثية في فلسطين. تبرع، شارك، واصنع فرقاً في حياة الآخرين.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-12">
            {solidarityMetrics.map(m => (
              <div key={m.id} className="text-center">
                <p className="text-3xl font-black mb-1" style={{ color: 'var(--text-primary)' }}>{m.value}</p>
                <p className="text-sm font-bold opacity-60" style={{ color: 'var(--text-muted)' }}>{m.label}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Filter Section */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap gap-2">
            {solidarityCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-6 py-2.5 text-sm font-black transition-all ${
                  activeCategory === cat 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' 
                  : 'bg-white/5 border border-border text-text-secondary hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm font-bold opacity-60" style={{ color: 'var(--text-muted)' }}>
            <Filter size={16} /> تصفية حسب المجال
          </div>
        </div>

        {/* Campaigns Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredCampaigns.map((campaign, idx) => (
              <motion.div
                layout
                key={campaign.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative overflow-hidden rounded-[30px] p-6 transition-all hover:shadow-2xl"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${campaign.bg} ${campaign.border} border`}>
                    <EmojiIcon emoji={campaign.icon} label={campaign.title} size={30} decorative={false} />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[11px] font-black tracking-wider uppercase opacity-40 mb-1">الهدف</span>
                    <span className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>{campaign.goal.toLocaleString()} ₪</span>
                  </div>
                </div>

                <h3 className="text-xl font-black mb-3 group-hover:text-primary transition-colors" style={{ color: 'var(--text-primary)' }}>{campaign.title}</h3>
                <p className="text-sm leading-relaxed mb-6 opacity-70" style={{ color: 'var(--text-secondary)' }}>{campaign.description}</p>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs font-black mb-2 opacity-60">
                    <span>جمعنا {campaign.raised.toLocaleString()} ₪</span>
                    <span>{Math.round((campaign.raised / campaign.goal) * 100)}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-section)' }}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full rounded-full" 
                      style={{ background: campaign.color }} 
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mb-8 opacity-60">
                  <div className="flex items-center gap-1.5 text-xs font-bold">
                    <Users size={14} /> {campaign.donors.toLocaleString()} متبرع
                  </div>
                  {campaign.daysLeft !== null && (
                    <div className="flex items-center gap-1.5 text-xs font-bold">
                      <Calendar size={14} /> تبقّ {campaign.daysLeft} يوم
                    </div>
                  )}
                </div>

                <button 
                  className="w-full h-12 rounded-2xl flex items-center justify-center gap-2 text-sm font-black text-white transition-all scale-100 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: campaign.color, boxShadow: `0 8px 20px -6px ${campaign.color}66` }}
                >
                  {campaign.completed ? 'تمت الحملة بنجاح' : 'تبرع الآن'}
                  {!campaign.completed && <ArrowLeft size={16} />}
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Stories Section */}
        <section className="mt-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black mb-4" style={{ color: 'var(--text-primary)' }}>قصص من الأثر</h2>
            <p className="text-base opacity-60 max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              كل تبرع يحمل معه حكاية تغيير. شاهد كيف ساهم دعمكم في تحسين حياة العائلات الفلسطينية.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {impactStories.map((story, idx) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative p-8 rounded-[30px] border border-border italic flex flex-col items-center text-center"
                style={{ background: 'var(--bg-section)' }}
              >
                <div className="w-16 h-16 rounded-full bg-surface-2 border border-border flex items-center justify-center text-3xl mb-6">
                  <EmojiIcon emoji={story.avatar} label={story.name} size={34} decorative={false} />
                </div>
                <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>"{story.text}"</p>
                <div className="mt-auto">
                  <p className="font-black text-sm" style={{ color: 'var(--text-primary)' }}>{story.name}</p>
                  <p className="text-xs font-bold opacity-40 uppercase tracking-widest mt-1">{story.location} • {story.campaign}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-24 rounded-[40px] p-10 lg:p-16 text-center text-white relative overflow-hidden"
          style={{ background: 'var(--primary)' }}
        >
          <div className="absolute inset-0 pattern-dots opacity-20" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-black mb-6">هل لديكم مبادرة اجتماعية؟</h2>
            <p className="text-lg opacity-80 mb-10 leading-relaxed">
              تساعدك منصة فلسطين الآن على إيصال صوتك وتنظيم حملتك التكافلية للوصول لأكبر عدد من الداعمين.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button className="h-14 px-8 rounded-2xl bg-white text-primary font-black flex items-center gap-2 hover:bg-opacity-90 transition-all">
                ابدأ حملة جديدة <HandHelping size={20} />
              </button>
              <button className="h-14 px-8 rounded-2xl bg-white/10 text-white font-black flex items-center gap-2 hover:bg-white/20 transition-all">
                تصفح المشاريع <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </motion.section>
      </div>
      <Footer />
    </div>
  );
}

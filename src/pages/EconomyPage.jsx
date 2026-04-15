import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  TrendingUp, TrendingDown, Minus, ArrowLeft, Sparkles,
  DollarSign, Fuel, CircleDot
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { currencies, gold, fuel, economyMetrics, priceHistory } from '../data/economy';
import Footer from '../components/Footer';
import EmojiIcon from '../components/EmojiIcon';

function TrendIcon({ isUp }) {
  if (isUp === null) return <Minus size={14} style={{ color: 'var(--text-muted)' }} />;
  return isUp ? <TrendingUp size={14} style={{ color: '#22C55E' }} /> : <TrendingDown size={14} style={{ color: '#EF4444' }} />;
}

function TrendColor(isUp) {
  if (isUp === null) return 'var(--text-muted)';
  return isUp ? '#22C55E' : '#EF4444';
}

export default function EconomyPage() {
  const [chartKey, setChartKey] = useState('usd');
  const chartOptions = [
    { key: 'usd', label: 'دولار', color: '#3B82F6' },
    { key: 'jod', label: 'دينار', color: '#8B5CF6' },
    { key: 'gold21', label: 'ذهب 21', color: '#F59E0B' },
  ];
  const activeChart = chartOptions.find(c => c.key === chartKey);

  return (
    <div className="relative min-h-screen overflow-hidden pt-[88px] font-cairo" dir="rtl" style={{ background: 'var(--bg)' }}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div animate={{ x: [0, 40, 0], y: [0, -30, 0], opacity: [0.2, 0.35, 0.2] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} className="absolute -right-16 top-0 h-[420px] w-[420px] rounded-full blur-[120px]" style={{ background: 'rgba(20,90,50,0.15)' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="relative overflow-hidden rounded-[34px] p-6 sm:p-8 lg:p-10 mb-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-xl)' }}>
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, var(--primary), var(--accent))' }} />
          <div className="badge-accent w-fit mb-5"><Sparkles size={14} /> الاقتصاد اليومي</div>
          <h1 className="text-4xl font-black leading-tight lg:text-5xl mb-4" style={{ color: 'var(--text-primary)' }}>
            أسعار السوق<br /><span className="gradient-text">لحظة بلحظة</span>
          </h1>
          <p className="text-base lg:text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            تابع أسعار العملات والذهب والمحروقات بتحديثات مستمرة وبتصميم واضح يساعدك في قراراتك اليومية.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {economyMetrics.map(m => (
              <div key={m.id} className="rounded-2xl px-5 py-4" style={{ background: 'var(--bg-section)', border: '1px solid var(--border)' }}>
                <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-bold ${m.tone}`}>{m.label}</span>
                <p className="mt-2 text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>{m.value}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Currencies */}
        <section className="mb-6">
          <h2 className="text-2xl font-extrabold mb-5 flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
            <DollarSign size={22} style={{ color: 'var(--primary)' }} /> أسعار العملات
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {currencies.map((c, i) => (
              <motion.div key={c.id} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} whileHover={{ y: -3 }} className="rounded-[24px] p-5 transition-all" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <EmojiIcon emoji={c.flag} label={c.name} size={28} decorative={false} />
                    <div>
                      <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{c.name}</p>
                      <p className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>{c.symbol}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 rounded-full px-2.5 py-1" style={{ background: c.isUp ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)' }}>
                    <TrendIcon isUp={c.isUp} />
                    <span className="text-xs font-bold" style={{ color: TrendColor(c.isUp) }}>{c.changePercent}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl p-3 text-center" style={{ background: 'var(--bg-section)', border: '1px solid var(--border)' }}>
                    <p className="text-[10px] font-bold mb-1" style={{ color: 'var(--text-light)' }}>شراء</p>
                    <p className="text-lg font-extrabold" dir="ltr" style={{ color: 'var(--text-primary)' }}>{c.buy}</p>
                  </div>
                  <div className="rounded-xl p-3 text-center" style={{ background: 'var(--bg-section)', border: '1px solid var(--border)' }}>
                    <p className="text-[10px] font-bold mb-1" style={{ color: 'var(--text-light)' }}>بيع</p>
                    <p className="text-lg font-extrabold" dir="ltr" style={{ color: 'var(--text-primary)' }}>{c.sell}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Chart + Gold */}
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] mb-6">
          {/* Chart */}
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[28px] p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>حركة الأسعار الأسبوعية</h3>
              <div className="flex gap-1 rounded-full p-1" style={{ background: 'var(--bg-muted)' }}>
                {chartOptions.map(o => (
                  <button key={o.key} onClick={() => setChartKey(o.key)} className="rounded-full px-3 py-1.5 text-xs font-bold transition-all" style={{ background: chartKey === o.key ? 'var(--bg-card)' : 'transparent', color: chartKey === o.key ? 'var(--text-primary)' : 'var(--text-muted)', boxShadow: chartKey === o.key ? 'var(--shadow-sm)' : 'none' }}>{o.label}</button>
                ))}
              </div>
            </div>
            <div style={{ height: 260 }} dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
                  <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)' }} domain={['auto', 'auto']} />
                  <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, fontSize: 13, fontFamily: 'Cairo' }} />
                  <Line type="monotone" dataKey={chartKey} stroke={activeChart.color} strokeWidth={3} dot={{ r: 5, fill: activeChart.color }} activeDot={{ r: 7 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Gold */}
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="rounded-[28px] p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>
            <h3 className="text-lg font-bold mb-5 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <EmojiIcon emoji="🪙" label="ذهب" size={22} decorative={false} /> أسعار الذهب
            </h3>
            <div className="space-y-3">
              {gold.map(g => (
                <div key={g.id} className="rounded-xl p-4 flex items-center justify-between" style={{ background: 'var(--bg-section)', border: '1px solid var(--border)' }}>
                  <div>
                    <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{g.name}</p>
                    <p className="text-[11px]" style={{ color: 'var(--text-light)' }}>{g.unit}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-lg font-extrabold" dir="ltr" style={{ color: 'var(--text-primary)' }}>{g.price} ₪</p>
                    <div className="flex items-center gap-1 justify-end">
                      <TrendIcon isUp={g.isUp} />
                      <span className="text-xs font-bold" style={{ color: TrendColor(g.isUp) }}>{g.changePercent}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Fuel */}
        <section className="mb-6">
          <h2 className="text-2xl font-extrabold mb-5 flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
            <Fuel size={22} style={{ color: 'var(--accent)' }} /> أسعار المحروقات
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {fuel.map((f, i) => (
              <motion.div key={f.id} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="rounded-[24px] p-5 text-center" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                <p className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{f.name}</p>
                <p className="text-3xl font-extrabold mb-1" dir="ltr" style={{ color: 'var(--text-primary)' }}>{f.price} <span className="text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>₪</span></p>
                <p className="text-xs" style={{ color: 'var(--text-light)' }}>{f.unit}</p>
                {f.isUp !== null && <div className="mt-2 flex items-center justify-center gap-1"><TrendIcon isUp={f.isUp} /><span className="text-xs font-bold" style={{ color: TrendColor(f.isUp) }}>{f.change}</span></div>}
              </motion.div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

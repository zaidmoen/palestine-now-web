import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Smartphone, MessageCircle, Mail, KeyRound,
  Fingerprint, AlertCircle, Eye, EyeOff,
  Users, GraduationCap, ShoppingBag, Wheat, ShieldAlert,
  Car, ChevronLeft, ArrowLeft, Lock, Sparkles, CheckCircle2,
} from 'lucide-react';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Data
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const roles = [
  { id: 'citizen',   label: 'مواطن',         icon: Users,       color: '#2A8A50', lightColor: '#4ade80', desc: 'استخدام عام للمنصة' },
  { id: 'driver',    label: 'سائق تاكسي',    icon: Car,         color: '#F0C040', lightColor: '#fde047', desc: 'سجّل كسائق واستقبل رحلات', featured: true },
  { id: 'student',   label: 'طالب جامعي',    icon: GraduationCap, color: '#2980B9', lightColor: '#60a5fa', desc: 'خدمات وأخبار الجامعات' },
  { id: 'merchant',  label: 'تاجر / أعمال',  icon: ShoppingBag, color: '#D4A017', lightColor: '#fb923c', desc: 'إدارة متجر أو شركة' },
  { id: 'farmer',    label: 'مزارع',         icon: Wheat,       color: '#27AE60', lightColor: '#86efac', desc: 'سوق زراعي ودعم فلاحي' },
  { id: 'emergency', label: 'طوارئ / إسعاف', icon: ShieldAlert,  color: '#E74C3C', lightColor: '#f87171', desc: 'خدمات الإسعاف والطوارئ' },
];

const methods = [
  { id: 'phone',    label: 'هاتف OTP',   icon: Smartphone },
  { id: 'whatsapp', label: 'واتساب',    icon: MessageCircle },
  { id: 'email',    label: 'إيميل',     icon: Mail },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Floating orb particles
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function useParticles(n = 18) {
  return useMemo(() =>
    Array.from({ length: n }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      dur: 12 + Math.random() * 14,
      delay: Math.random() * 6,
      dx: (Math.random() - 0.5) * 100,
      dy: (Math.random() - 0.5) * 100,
    })),
  [n]);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// OTP Box Input
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function OtpInput({ value, onChange, error }) {
  const len = 6;
  const refs = useRef([]);
  const digits = (value + '      ').slice(0, len).split('');

  const handleKey = (e, i) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const arr = value.split('');
      if (arr[i]) {
        arr[i] = '';
        onChange(arr.join('').trimEnd());
      } else if (i > 0) {
        arr[i - 1] = '';
        onChange(arr.join('').trimEnd());
        refs.current[i - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft') {
      refs.current[Math.min(i + 1, len - 1)]?.focus();
    } else if (e.key === 'ArrowRight') {
      refs.current[Math.max(i - 1, 0)]?.focus();
    }
  };

  const handleInput = (e, i) => {
    const char = e.target.value.replace(/\D/g, '').slice(-1);
    if (!char) return;
    const arr = value.padEnd(len, ' ').split('');
    arr[i] = char;
    const next = arr.join('').trimEnd();
    onChange(next);
    if (i < len - 1) refs.current[i + 1]?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, len);
    onChange(pasted);
    refs.current[Math.min(pasted.length, len - 1)]?.focus();
  };

  return (
    <div>
      <label className="block text-xs font-bold text-t2 mb-3 uppercase tracking-widest">رمز التحقق OTP</label>
      <div className="flex gap-2 justify-center" dir="ltr">
        {Array.from({ length: len }).map((_, i) => {
          const filled = digits[i]?.trim();
          return (
            <motion.div
              key={i}
              animate={filled ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.15 }}
              className="flex-1"
            >
              <input
                ref={el => (refs.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digits[i]?.trim() || ''}
                onChange={e => handleInput(e, i)}
                onKeyDown={e => handleKey(e, i)}
                onPaste={i === 0 ? handlePaste : undefined}
                className={`w-full aspect-square text-center text-xl font-bold rounded-xl border-2 bg-surface-2 text-t1
                  focus:outline-none transition-all duration-200 caret-primary-light
                  ${filled ? 'border-primary-light bg-primary/10 shadow-[0_0_12px_rgba(42,138,80,0.35)]' : 'border-subtle focus:border-primary-light/60'}
                  ${error ? 'border-pal-red' : ''}`}
              />
            </motion.div>
          );
        })}
      </div>
      {error && (
        <p className="mt-2 flex items-center justify-center gap-1 text-xs text-pal-red">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Field Component
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function Field({ label, name, type = 'text', placeholder, value, onChange, error, icon: Icon, suffix, dir, autoFocus }) {
  const [focused, setFocused] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const inputType = type === 'password' ? (showPwd ? 'text' : 'password') : type;

  return (
    <div>
      <label className="block text-xs font-bold text-t2 mb-2 uppercase tracking-widest">{label}</label>
      <motion.div animate={error ? { x: [0, -7, 7, -7, 7, 0] } : {}} transition={{ duration: 0.35 }}>
        <div className={`flex items-center rounded-xl border-2 transition-all duration-200 bg-surface-2
          ${error ? 'border-pal-red' : focused ? 'border-primary-light shadow-[0_0_18px_rgba(42,138,80,0.25)]' : 'border-subtle'}
        `}>
          {Icon && (
            <span className={`pr-3 pl-2 shrink-0 transition-colors duration-200 ${focused ? 'text-primary-light' : 'text-t3'}`}>
              <Icon size={17} />
            </span>
          )}
          {suffix && (
            <span className="px-3 py-3.5 text-t3 text-sm border-l border-subtle shrink-0 font-mono" dir="ltr">
              {suffix}
            </span>
          )}
          <input
            name={name}
            type={inputType}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            dir={dir}
            autoFocus={autoFocus}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="flex-1 bg-transparent py-3.5 px-3 text-t1 text-sm placeholder:text-t3/60 focus:outline-none min-w-0"
          />
          {type === 'password' && (
            <button type="button" onClick={() => setShowPwd(v => !v)} className="px-3 text-t3 hover:text-t1 transition-colors">
              {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        </div>
        {error && (
          <p className="mt-1.5 flex items-center gap-1 text-xs text-pal-red">
            <AlertCircle size={12} /> {error}
          </p>
        )}
      </motion.div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Visual Panel
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function VisualPanel({ selectedRole }) {
  const particles = useParticles(24);
  const role = roles.find(r => r.id === selectedRole);

  return (
    <div className="hidden lg:flex relative flex-col justify-between p-14 overflow-hidden" style={{ background: '#080d0b' }}>

      {/* Animated mesh base */}
      <div className="absolute inset-0 mesh-gradient opacity-60" />

      {/* Radial gradient per role */}
      <AnimatePresence>
        <motion.div
          key={selectedRole}
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            background: `radial-gradient(ellipse 65% 65% at 30% 55%, ${role?.color}28, transparent)`,
          }}
        />
      </AnimatePresence>

      {/* Second accent blob */}
      <div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(42,138,80,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute -bottom-10 -left-10 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(240,192,64,0.07) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map(p => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              background: role?.lightColor || '#4ade80',
              opacity: 0.18,
            }}
            animate={{ x: [0, p.dx, -p.dx / 2, 0], y: [0, p.dy, -p.dy / 2, 0], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-xl">
          🇵🇸
        </div>
        <div>
          <p className="text-base font-extrabold text-primary-light leading-none tracking-tight">فلسطين الآن</p>
          <p className="text-[10px] text-t3 mt-0.5 tracking-widest uppercase">منصتك الرقمية</p>
        </div>
      </div>

      {/* Main visual content */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedRole}
            initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-right"
          >
            {/* Role icon */}
            {role && (
              <div className="relative w-24 h-24 mb-8">
                <div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: `${role.color}18`,
                    border: `1px solid ${role.color}35`,
                    boxShadow: `0 0 40px ${role.color}25`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <role.icon size={40} style={{ color: role.color }} />
                </div>
              </div>
            )}

            <p className="text-xs font-bold text-t3 uppercase tracking-[0.2em] mb-3">مرحباً بك في</p>
            <h2 className="text-5xl font-extrabold text-t1 leading-tight mb-4">
              فلسطين{' '}
              <span
                style={{
                  background: `linear-gradient(135deg, ${role?.color || '#2A8A50'}, ${role?.lightColor || '#4ade80'})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                الآن
              </span>
            </h2>
            <p className="text-t2 text-base leading-relaxed max-w-xs">
              {selectedRole === 'driver'
                ? 'انضم لأفضل شبكة تاكسي فلسطينية — استقبل رحلات، تتبع مسارك، وزِد دخلك.'
                : selectedRole === 'emergency'
                ? 'خدمات طوارئ فورية وآمنة. اتصل، راقب، أبلغ — في ثوانٍ.'
                : 'منصة واحدة لكل خدماتك الرقمية — بحث، وظايف، طلاب، تكافل وأكثر.'}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Stats row */}
      <div className="relative z-10">
        <div className="flex gap-5 mb-8">
          {[
            { num: '+٥٠٠٠', sub: 'مستخدم نشط' },
            { num: '+٢٠٠',  sub: 'سائق مسجل' },
            { num: '٢٤/٧', sub: 'دعم مستمر' },
          ].map(s => (
            <div key={s.num} className="text-center">
              <p className="text-xl font-extrabold text-t1">{s.num}</p>
              <p className="text-[10px] text-t3 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap gap-2">
          {['🔒 اتصال آمن', '⚡ دخول فوري', '🇵🇸 فلسطيني 100%'].map(badge => (
            <span
              key={badge}
              className="text-[11px] text-t3 border border-subtle/60 rounded-full px-3 py-1.5 bg-white/[0.03] backdrop-blur-sm"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Step Indicator
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function StepDots({ step }) {
  return (
    <div className="flex items-center gap-2">
      {['role', 'form'].map((s, i) => (
        <motion.div
          key={s}
          animate={{
            width: step === s ? 24 : 8,
            backgroundColor: step === s ? '#2A8A50' : 'rgba(255,255,255,0.12)',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="h-2 rounded-full"
        />
      ))}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Main Login Page
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function LoginPage() {
  const navigate = useNavigate();
  const [step, setStep]         = useState('role');
  const [selectedRole, setRole] = useState('citizen');
  const [method, setMethod]     = useState('phone');
  const [creds, setCreds]       = useState({ phone: '', email: '', password: '', otp: '' });
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const [otpSent, setOtpSent]   = useState(false);
  const [success, setSuccess]   = useState(false);
  const formRef = useRef(null);

  const handleChange = useCallback(e => {
    const { name, value } = e.target;
    setCreds(c => ({ ...c, [name]: value }));
    setErrors(ev => ({ ...ev, [name]: null }));
  }, []);

  const handleMethodChange = m => {
    setMethod(m);
    setOtpSent(false);
    setErrors({});
    setCreds({ phone: '', email: '', password: '', otp: '' });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const newErrors = {};

    if (method === 'phone') {
      if (!creds.phone || creds.phone.replace(/\D/g, '').length < 9)
        newErrors.phone = 'يرجى إدخال رقم هاتف صحيح';
      if (Object.keys(newErrors).length) { setErrors(newErrors); return; }
      setLoading(true);
      await new Promise(r => setTimeout(r, 1400));
      setLoading(false);
      if (!otpSent) { setOtpSent(true); return; }
      const clean = creds.otp.replace(/\s/g, '');
      if (clean.length < 6) { setErrors({ otp: 'أكمل رمز التحقق' }); return; }
    }

    if (method === 'email') {
      if (!creds.email.includes('@')) newErrors.email = 'بريد إلكتروني غير صالح';
      if (creds.password.length < 6) newErrors.password = 'كلمة المرور قصيرة جداً';
      if (Object.keys(newErrors).length) { setErrors(newErrors); return; }
      setLoading(true);
      await new Promise(r => setTimeout(r, 1800));
      setLoading(false);
    }

    setSuccess(true);
    await new Promise(r => setTimeout(r, 1000));
    navigate('/');
  };

  const activeRole = roles.find(r => r.id === selectedRole);

  const slide = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit:    { opacity: 0, x: -30 },
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-[1fr_520px] font-cairo" dir="rtl" style={{ background: '#0a0f0d' }}>

      {/* ── Visual Panel ── */}
      <VisualPanel selectedRole={selectedRole} />

      {/* ── Form Panel ── */}
      <div className="relative flex flex-col min-h-screen overflow-hidden" style={{ background: '#111a14' }}>

        {/* Top shimmer line */}
        <div
          className="absolute top-0 inset-x-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(42,138,80,0.6), transparent)' }}
        />

        {/* Corner glow */}
        <div
          className="absolute -top-24 -left-24 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(42,138,80,0.1) 0%, transparent 70%)' }}
        />

        {/* Top bar */}
        <div className="relative z-10 px-7 py-5 flex items-center justify-between shrink-0">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-t3 hover:text-t1 text-sm font-semibold transition-all duration-200 group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            العودة للرئيسية
          </Link>

          <div className="flex lg:hidden items-center gap-2">
            <span className="text-lg">🇵🇸</span>
            <span className="font-extrabold text-primary-light text-sm tracking-tight">فلسطين الآن</span>
          </div>

          <StepDots step={step} />
        </div>

        {/* Scrollable content */}
        <div ref={formRef} className="relative z-10 flex-1 flex flex-col justify-center px-7 sm:px-12 py-6 overflow-y-auto">
          <AnimatePresence mode="wait">

            {/* ════ STEP 1: Role Selection ════ */}
            {step === 'role' && (
              <motion.div key="role" {...slide}>

                {/* Header */}
                <div className="mb-7">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-primary-light uppercase tracking-[0.18em] mb-3 bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
                    <Sparkles size={10} /> الخطوة الأولى
                  </span>
                  <h1 className="text-[2rem] font-extrabold text-t1 leading-tight mb-1.5">من أنت؟</h1>
                  <p className="text-t3 text-sm">اختر صفتك للحصول على تجربة مخصصة لك</p>
                </div>

                {/* Driver card - Featured */}
                {(() => {
                  const driver = roles.find(r => r.id === 'driver');
                  const sel = selectedRole === 'driver';
                  return (
                    <motion.button
                      onClick={() => setRole('driver')}
                      whileHover={{ scale: 1.01, y: -1 }}
                      whileTap={{ scale: 0.99 }}
                      className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 transition-all duration-250 text-right mb-3 relative overflow-hidden group
                        ${sel ? 'border-accent-light/80' : 'border-accent/25 hover:border-accent/55'}`}
                      style={{ background: sel ? 'rgba(240,192,64,0.08)' : 'rgba(240,192,64,0.04)' }}
                    >
                      <div
                        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: 'linear-gradient(135deg, rgba(240,192,64,0.05) 0%, transparent 60%)' }}
                      />
                      {/* "Featured" badge */}
                      <span className="absolute top-2 left-3 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-accent/20 text-accent-light border border-accent/35 tracking-wide">
                        🚖 للسائقين
                      </span>
                      {/* Icon */}
                      <div
                        className="relative w-[52px] h-[52px] rounded-xl shrink-0 flex items-center justify-center mt-1"
                        style={{
                          background: sel ? 'rgba(240,192,64,0.2)' : 'rgba(240,192,64,0.1)',
                          border: `1px solid ${sel ? 'rgba(240,192,64,0.5)' : 'rgba(240,192,64,0.2)'}`,
                          boxShadow: sel ? '0 0 16px rgba(240,192,64,0.2)' : 'none',
                        }}
                      >
                        <Car size={26} style={{ color: '#F0C040' }} />
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="font-extrabold text-sm text-t1">{driver.label}</p>
                        <p className="text-xs text-t2 mt-0.5">{driver.desc}</p>
                        <p className="text-[11px] text-accent-light mt-1.5 font-bold">+٢٠٠ سائق · ابدأ الاستقبال فوراً</p>
                      </div>
                      {sel && (
                        <motion.div
                          layoutId="check"
                          className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 bg-accent-light"
                        >
                          <svg viewBox="0 0 12 12" fill="none" className="w-3.5 h-3.5">
                            <path d="M2 6l3 3 5-5" stroke="#0A0F0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })()}

                {/* Other roles */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {roles.filter(r => r.id !== 'driver').map(role => {
                    const Icon = role.icon;
                    const sel = selectedRole === role.id;
                    return (
                      <motion.button
                        key={role.id}
                        onClick={() => setRole(role.id)}
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex flex-col items-start gap-2.5 px-4 py-3.5 rounded-xl border-2 transition-all duration-200 text-right relative
                          ${sel ? 'border-primary-light/70' : 'border-subtle hover:border-subtle-hover'}`}
                        style={{ background: sel ? `${role.color}10` : 'rgba(255,255,255,0.025)' }}
                      >
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                          style={{
                            background: sel ? `${role.color}22` : 'rgba(255,255,255,0.05)',
                            border: `1px solid ${sel ? role.color + '45' : 'rgba(255,255,255,0.07)'}`,
                          }}
                        >
                          <Icon size={18} style={{ color: sel ? role.color : '#566B5C' }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-bold text-xs leading-tight ${sel ? 'text-t1' : 'text-t2'}`}>{role.label}</p>
                          <p className="text-[10px] text-t3 mt-0.5 truncate">{role.desc}</p>
                        </div>
                        {sel && (
                          <motion.div
                            layoutId="check"
                            className="absolute top-2 left-2 w-5 h-5 rounded-full bg-primary-light flex items-center justify-center"
                          >
                            <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5">
                              <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Next button */}
                <motion.button
                  onClick={() => setStep('form')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary w-full justify-center text-base font-bold"
                >
                  التالي
                  <ArrowLeft size={18} />
                </motion.button>

                <p className="text-center text-xs text-t3 mt-5">
                  ليس لديك حساب؟{' '}
                  <Link to="/register" className="text-primary-light hover:underline font-bold">أنشئ حساباً</Link>
                </p>
              </motion.div>
            )}

            {/* ════ STEP 2: Auth Form ════ */}
            {step === 'form' && (
              <motion.div key="form" {...slide}>

                {/* Back + Header */}
                <div className="mb-6">
                  <button
                    onClick={() => { setStep('role'); setOtpSent(false); setErrors({}); }}
                    className="flex items-center gap-1.5 text-t3 hover:text-primary-light text-xs font-bold mb-4 transition-colors group"
                  >
                    <ArrowLeft size={13} className="rotate-180 group-hover:translate-x-0.5 transition-transform" />
                    تغيير الصفة
                  </button>

                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-primary-light uppercase tracking-[0.18em] mb-3 bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
                    <Lock size={9} /> الخطوة الثانية
                  </span>

                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h1 className="text-[2rem] font-extrabold text-t1 leading-tight mb-1">تسجيل الدخول</h1>
                      <p className="text-t3 text-sm">أدخل بياناتك للوصول إلى حسابك</p>
                    </div>
                    {/* Role badge */}
                    <div
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl border shrink-0 mt-1"
                      style={{
                        background: `${activeRole?.color}12`,
                        borderColor: `${activeRole?.color}35`,
                      }}
                    >
                      {activeRole && <activeRole.icon size={14} style={{ color: activeRole.color }} />}
                      <span className="text-xs font-bold" style={{ color: activeRole?.color }}>{activeRole?.label}</span>
                    </div>
                  </div>
                </div>

                {/* Method Tabs */}
                <div className="flex gap-1 p-1 bg-bg rounded-2xl mb-5 border border-subtle">
                  {methods.map(m => {
                    const Icon = m.icon;
                    const active = method === m.id;
                    return (
                      <motion.button
                        key={m.id}
                        onClick={() => handleMethodChange(m.id)}
                        className={`relative flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-colors duration-200
                          ${active ? 'text-t1' : 'text-t3 hover:text-t2'}`}
                      >
                        {active && (
                          <motion.div
                            layoutId="tab-bg"
                            className="absolute inset-0 rounded-xl"
                            style={{ background: '#1A2B1E', boxShadow: '0 1px 8px rgba(0,0,0,0.4)' }}
                            transition={{ type: 'spring', stiffness: 450, damping: 38 }}
                          />
                        )}
                        <span className="relative z-10"><Icon size={14} /></span>
                        <span className="relative z-10">{m.label}</span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <AnimatePresence mode="wait">

                    {/* Phone/OTP */}
                    {method === 'phone' && (
                      <motion.div key="phone" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                        <Field
                          label="رقم الهاتف" name="phone" type="tel"
                          placeholder="59xxxxxxx" dir="ltr" suffix="+970"
                          icon={Smartphone} value={creds.phone}
                          onChange={handleChange} error={errors.phone}
                          autoFocus
                        />
                        <AnimatePresence>
                          {otpSent && (
                            <motion.div
                              initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                              animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
                              exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                              className="space-y-3"
                            >
                              <OtpInput
                                value={creds.otp}
                                onChange={val => { setCreds(c => ({ ...c, otp: val })); setErrors(e => ({ ...e, otp: null })); }}
                                error={errors.otp}
                              />
                              <p className="text-xs text-t3 text-center">
                                لم يصلك الرمز؟{' '}
                                <button type="button" onClick={() => { setOtpSent(false); setCreds(c => ({ ...c, otp: '' })); }} className="text-primary-light hover:underline font-bold">
                                  إعادة الإرسال
                                </button>
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )}

                    {/* Email */}
                    {method === 'email' && (
                      <motion.div key="email" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                        <Field label="البريد الإلكتروني" name="email" type="email" placeholder="you@example.com" dir="ltr" icon={Mail} value={creds.email} onChange={handleChange} error={errors.email} autoFocus />
                        <Field label="كلمة المرور" name="password" type="password" placeholder="••••••••" dir="ltr" icon={KeyRound} value={creds.password} onChange={handleChange} error={errors.password} />
                        <div className="flex justify-end">
                          <button type="button" className="text-xs text-t3 hover:text-primary-light transition-colors font-semibold">نسيت كلمة المرور؟</button>
                        </div>
                      </motion.div>
                    )}

                    {/* WhatsApp */}
                    {method === 'whatsapp' && (
                      <motion.div key="wa" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="py-3">
                        <div
                          className="w-[72px] h-[72px] mx-auto rounded-2xl flex items-center justify-center mb-5"
                          style={{ background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.3)', boxShadow: '0 0 24px rgba(37,211,102,0.15)' }}
                        >
                          <MessageCircle size={34} style={{ color: '#25D366' }} />
                        </div>
                        <p className="text-t2 text-sm text-center leading-relaxed mb-6">
                          سيتم توجيهك إلى تطبيق واتساب لإرسال رسالة تحقق<br />فورية وآمنة.
                        </p>
                        <a
                          href="https://wa.me/970"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-extrabold text-sm transition-all duration-200 hover:scale-[1.02]"
                          style={{
                            background: 'linear-gradient(135deg, #25D366, #128C7E)',
                            boxShadow: '0 4px 24px rgba(37,211,102,0.25)',
                            color: 'white',
                          }}
                        >
                          <MessageCircle size={18} />
                          المتابعة عبر واتساب
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit button */}
                  {method !== 'whatsapp' && (
                    <motion.button
                      type="submit"
                      disabled={loading || success}
                      whileHover={!loading && !success ? { scale: 1.02 } : {}}
                      whileTap={!loading && !success ? { scale: 0.97 } : {}}
                      className="w-full mt-2 h-14 rounded-2xl font-extrabold text-base flex items-center justify-center gap-2 transition-all duration-300 disabled:cursor-not-allowed"
                      style={{
                        background: success
                          ? 'linear-gradient(135deg, #27AE60, #1A6B3C)'
                          : 'linear-gradient(135deg, #1A6B3C, #2A8A50)',
                        boxShadow: success
                          ? '0 0 30px rgba(39,174,96,0.5)'
                          : '0 4px 24px rgba(26,107,60,0.35)',
                        color: 'white',
                        opacity: loading ? 0.8 : 1,
                      }}
                    >
                      <AnimatePresence mode="wait">
                        {success ? (
                          <motion.span key="ok" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                            <CheckCircle2 size={20} /> تم الدخول بنجاح
                          </motion.span>
                        ) : loading ? (
                          <motion.span key="spin">
                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                          </motion.span>
                        ) : (
                          <motion.span key="label" className="flex items-center gap-2">
                            {otpSent ? 'تحقق والدخول' : 'المتابعة'}
                            <ArrowLeft size={18} />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  )}
                </form>

                {/* Social proof */}
                <div className="mt-7">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07))' }} />
                    <span className="text-[11px] text-t3 shrink-0 px-2">يثق بنا أكثر من ٥٠٠٠ فلسطيني</span>
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.07), transparent)' }} />
                  </div>
                  <div className="flex justify-center items-center gap-1">
                    {['🏠', '🚖', '👨‍🎓', '🛍️', '🚑'].map((em, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-surface-2 border border-subtle flex items-center justify-center text-sm -ml-1 first:ml-0"
                        style={{ zIndex: 5 - i }}
                      >
                        {em}
                      </div>
                    ))}
                    <span className="text-xs text-t3 mr-2">+٤٩٩٥</span>
                  </div>
                </div>

                <p className="text-center text-xs text-t3 mt-5">
                  ليس لديك حساب؟{' '}
                  <Link to="/register" className="text-primary-light hover:underline font-bold">سجل الآن مجاناً</Link>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="relative z-10 px-7 py-4 border-t shrink-0" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <p className="text-center text-[11px] text-t3">© ٢٠٢٦ فلسطين الآن · جميع الحقوق محفوظة · <span className="text-primary-light">منصة آمنة 🔒</span></p>
        </div>
      </div>
    </div>
  );
}

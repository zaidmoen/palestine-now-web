import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Smartphone, MessageCircle, Mail, KeyRound,
  Fingerprint, AlertCircle, ArrowLeft, Eye, EyeOff,
  Users, GraduationCap, ShoppingBag, Wheat, ShieldAlert,
  Car, ChevronLeft
} from 'lucide-react';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Roles — سائق التاكسي is 2nd, visually distinct
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const roles = [
  {
    id: 'citizen',
    label: 'مواطن',
    icon: Users,
    color: '#2A8A50',
    desc: 'استخدام عام للمنصة',
    badge: null,
  },
  {
    id: 'driver',
    label: 'سائق تاكسي',
    icon: Car,
    color: '#F0C040',
    desc: 'سجّل كسائق واستقبل رحلات',
    badge: 'سائق 🚖',        // prominent badge
    featured: true,           // highlighted card
  },
  {
    id: 'student',
    label: 'طالب جامعي',
    icon: GraduationCap,
    color: '#2980B9',
    desc: 'خدمات وأخبار الجامعات',
    badge: null,
  },
  {
    id: 'merchant',
    label: 'تاجر / أعمال',
    icon: ShoppingBag,
    color: '#D4A017',
    desc: 'إدارة متجر أو شركة',
    badge: null,
  },
  {
    id: 'farmer',
    label: 'مزارع',
    icon: Wheat,
    color: '#27AE60',
    desc: 'سوق زراعي ودعم فلاحي',
    badge: null,
  },
  {
    id: 'emergency',
    label: 'طوارئ / إسعاف',
    icon: ShieldAlert,
    color: '#E74C3C',
    desc: 'خدمات الإسعاف والطوارئ',
    badge: null,
  },
];

const methods = [
  { id: 'phone',    label: 'OTP',      longLabel: 'رقم الهاتف',       icon: Smartphone },
  { id: 'whatsapp', label: 'واتساب',   longLabel: 'دخول سريع',        icon: MessageCircle },
  { id: 'email',    label: 'إيميل',    longLabel: 'بريد إلكتروني',    icon: Mail },
];

// Floating Particles for visual panel
function useParticles(n = 20) {
  return useMemo(() => Array.from({ length: n }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: 10 + Math.random() * 15,
    delay: Math.random() * 8,
    dx: (Math.random() - 0.5) * 120,
    dy: (Math.random() - 0.5) * 120,
  })), [n]);
}

// ━━━ Input Field Component ━━━
function Field({ label, name, type = 'text', placeholder, value, onChange, error, icon: Icon, suffix, dir }) {
  const [showPwd, setShowPwd] = useState(false);
  const inputType = type === 'password' ? (showPwd ? 'text' : 'password') : type;

  return (
    <div>
      <label className="block text-xs font-semibold text-t2 mb-1.5 tracking-wide uppercase">{label}</label>
      <motion.div animate={error ? { x: [0, -8, 8, -8, 8, 0] } : {}} transition={{ duration: 0.4 }}>
        <div className={`flex items-center rounded-xl border transition-all duration-200 ${
          error ? 'border-pal-red' : 'border-subtle focus-within:border-primary-light'
        } bg-surface-2`}>
          {Icon && <span className="pr-3 pl-2 text-t3 shrink-0"><Icon size={17} /></span>}
          {suffix && (
            <span className="px-3 py-3 text-t3 text-sm border-l border-subtle shrink-0 font-mono" dir="ltr">
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
            className="flex-1 bg-transparent py-3 px-3 text-t1 text-sm placeholder:text-t3 focus:outline-none min-w-0"
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

// ━━━ Visual Panel (left side on desktop) ━━━
function VisualPanel({ selectedRole }) {
  const particles = useParticles(20);
  const role = roles.find(r => r.id === selectedRole);

  return (
    <div className="hidden lg:flex relative flex-col justify-between p-12 overflow-hidden bg-bg">
      <div className="absolute inset-0 mesh-gradient opacity-80" />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 500px 500px at 40% 60%, rgba(26,107,60,0.2), transparent)' }}
      />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map(p => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-primary-light/30"
            style={{ width: p.size, height: p.size, left: `${p.left}%`, top: `${p.top}%` }}
            animate={{ x: [0, p.dx, -p.dx / 2, 0], y: [0, p.dy, -p.dy / 2, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-2">
        <span className="text-2xl">🇵🇸</span>
        <div>
          <p className="text-lg font-bold text-primary-light leading-none">فلسطين الآن</p>
          <p className="text-[11px] text-t3 mt-0.5">منصتك الرقمية</p>
        </div>
      </div>

      {/* Dynamic content per role */}
      <div className="relative z-10 text-right">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedRole}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {role && (
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: `${role.color}20`, border: `1px solid ${role.color}40` }}
              >
                <role.icon size={36} style={{ color: role.color }} />
              </div>
            )}
            <h2 className="text-4xl font-bold text-t1 mb-3 leading-tight">
              مرحباً بك،<br />
              <span className="gradient-text">{role?.label ?? 'فلسطيني'}</span>
            </h2>
            {/* Driver-specific message */}
            {selectedRole === 'driver' ? (
              <p className="text-t2 text-base leading-relaxed max-w-xs text-right">
                انضم لأفضل شبكة تاكسي فلسطينية. استقبل رحلات، تتبع مسارك، وزِد دخلك.
              </p>
            ) : (
              <p className="text-t2 text-base leading-relaxed max-w-xs text-right">
                منصة واحدة لكل خدماتك الرقمية — بحث، وظايف، طلاب، تكافل، طوارئ وأكثر.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Trust badges */}
      <div className="relative z-10 flex flex-wrap items-center gap-3">
        {['🔒 اتصال آمن', '⚡ دخول فوري', '🇵🇸 فلسطيني 100%'].map(badge => (
          <span key={badge} className="text-xs text-t3 border border-subtle rounded-full px-3 py-1.5 bg-surface/50">
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
}

// ━━━ Main Login Page ━━━
export default function LoginPage() {
  const navigate = useNavigate();
  const [step, setStep]           = useState('role');
  const [selectedRole, setRole]   = useState('citizen');
  const [method, setMethod]       = useState('phone');
  const [creds, setCreds]         = useState({ phone: '', email: '', password: '', otp: '' });
  const [errors, setErrors]       = useState({});
  const [loading, setLoading]     = useState(false);
  const [otpSent, setOtpSent]     = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setCreds(c => ({ ...c, [name]: value }));
    if (errors[name]) setErrors(ev => ({ ...ev, [name]: null }));
  };

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
      await new Promise(r => setTimeout(r, 1500));
      setLoading(false);
      if (!otpSent) { setOtpSent(true); return; }
      if (!creds.otp || creds.otp.length < 4) { setErrors({ otp: 'أدخل رمز التحقق' }); return; }
    }

    if (method === 'email') {
      if (!creds.email.includes('@')) newErrors.email = 'بريد إلكتروني غير صالح';
      if (creds.password.length < 6) newErrors.password = 'كلمة المرور قصيرة جداً';
      if (Object.keys(newErrors).length) { setErrors(newErrors); return; }
      setLoading(true);
      await new Promise(r => setTimeout(r, 2000));
      setLoading(false);
    }

    navigate('/');
  };

  const activeRole = roles.find(r => r.id === selectedRole);

  const fadeSlide = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit:    { opacity: 0, x: -20 },
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-[1fr_500px] bg-bg font-cairo" dir="rtl">

      {/* ━━━ LEFT: Visual Panel ━━━ */}
      <VisualPanel selectedRole={selectedRole} />

      {/* ━━━ RIGHT: Form Panel ━━━ */}
      <div className="flex flex-col min-h-screen bg-surface relative overflow-hidden">
        {/* Top glow */}
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(26,107,60,0.5), transparent)' }}
        />

        {/* Top bar */}
        <div className="p-6 flex items-center justify-between shrink-0">
          <Link to="/" className="flex items-center gap-1.5 text-t3 hover:text-t1 text-sm font-semibold transition-colors group">
            <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            الرئيسية
          </Link>
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-1.5">
            <span className="text-lg">🇵🇸</span>
            <span className="font-bold text-primary-light text-sm">فلسطين الآن</span>
          </div>
          <div className="w-20 hidden lg:block" />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 py-6 overflow-y-auto">
          <AnimatePresence mode="wait">

            {/* ── STEP 1: Role Selection ── */}
            {step === 'role' && (
              <motion.div key="role" {...fadeSlide}>
                <div className="mb-6">
                  <p className="text-xs text-t3 font-semibold uppercase tracking-widest mb-2">الخطوة 1 من 2</p>
                  <h1 className="text-3xl font-bold text-t1 mb-1">من أنت؟</h1>
                  <p className="text-t2 text-sm">اختر صفتك للحصول على تجربة مخصصة</p>
                </div>

                {/* ━━━ Taxi Driver — Featured Card (first & biggest) ━━━ */}
                {(() => {
                  const driver = roles.find(r => r.id === 'driver');
                  const isSelected = selectedRole === 'driver';
                  return (
                    <motion.button
                      onClick={() => setRole('driver')}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 transition-all duration-200 text-right mb-3 relative overflow-hidden ${
                        isSelected
                          ? 'border-accent-light bg-accent/10'
                          : 'border-accent/30 bg-accent/5 hover:border-accent/60'
                      }`}
                    >
                      {/* Shimmer bg */}
                      <div
                        className="absolute inset-0 opacity-5"
                        style={{ background: 'linear-gradient(135deg, #F0C040 0%, transparent 60%)' }}
                      />
                      {/* Featured badge */}
                      <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent/20 text-accent-light border border-accent/30">
                        🚖 للسائقين
                      </span>
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-all"
                        style={{
                          background: isSelected ? '#F0C04030' : '#F0C04015',
                          border: `1px solid ${isSelected ? '#F0C04060' : '#F0C04030'}`,
                        }}
                      >
                        <Car size={28} style={{ color: '#F0C040' }} />
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="font-bold text-base text-t1">{driver.label}</p>
                        <p className="text-xs text-t2 mt-0.5">{driver.desc}</p>
                        <p className="text-[11px] text-accent-light mt-1 font-semibold">
                          +٢٠٠ سائق مسجل · ابدأ الاستقبال فوراً
                        </p>
                      </div>
                      {isSelected && (
                        <motion.div
                          layoutId="role-check"
                          className="w-6 h-6 rounded-full bg-accent-light flex items-center justify-center shrink-0"
                        >
                          <svg viewBox="0 0 12 12" fill="none" className="w-3.5 h-3.5">
                            <path d="M2 6l3 3 5-5" stroke="#0A0F0D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })()}

                {/* ━━━ Other Roles ━━━ */}
                <div className="space-y-2">
                  {roles.filter(r => r.id !== 'driver').map(role => {
                    const Icon = role.icon;
                    const isSelected = selectedRole === role.id;
                    return (
                      <motion.button
                        key={role.id}
                        onClick={() => setRole(role.id)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border transition-all duration-200 text-right ${
                          isSelected
                            ? 'border-primary-light bg-primary/10'
                            : 'border-subtle hover:border-subtle-hover bg-surface-2/50'
                        }`}
                      >
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                          style={{
                            background: isSelected ? `${role.color}25` : 'rgba(255,255,255,0.04)',
                            border: `1px solid ${isSelected ? role.color + '50' : 'rgba(255,255,255,0.07)'}`,
                          }}
                        >
                          <Icon size={20} style={{ color: isSelected ? role.color : '#566B5C' }} />
                        </div>
                        <div className="flex-1">
                          <p className={`font-bold text-sm ${isSelected ? 'text-t1' : 'text-t2'}`}>{role.label}</p>
                          <p className="text-xs text-t3 mt-0.5">{role.desc}</p>
                        </div>
                        {isSelected && (
                          <motion.div
                            layoutId="role-check"
                            className="w-5 h-5 rounded-full bg-primary-light flex items-center justify-center shrink-0"
                          >
                            <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                              <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                <motion.button
                  onClick={() => setStep('form')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full mt-6 justify-center text-base"
                >
                  التالي
                  <ArrowLeft size={18} />
                </motion.button>

                <p className="text-center text-xs text-t3 mt-5">
                  ليس لديك حساب؟{' '}
                  <Link to="/register" className="text-primary-light hover:underline font-semibold">أنشئ حساباً</Link>
                </p>
              </motion.div>
            )}

            {/* ── STEP 2: Auth Form ── */}
            {step === 'form' && (
              <motion.div key="form" {...fadeSlide}>
                <div className="mb-6">
                  <button
                    onClick={() => { setStep('role'); setOtpSent(false); setErrors({}); }}
                    className="flex items-center gap-1 text-t3 hover:text-t1 text-xs font-semibold mb-4 transition-colors group"
                  >
                    <ArrowLeft size={13} className="rotate-180 group-hover:translate-x-0.5 transition-transform" />
                    تغيير الصفة
                  </button>
                  <p className="text-xs text-t3 font-semibold uppercase tracking-widest mb-2">الخطوة 2 من 2</p>
                  <h1 className="text-3xl font-bold text-t1 mb-1">تسجيل الدخول</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-t2 text-sm">كـ</span>
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full"
                      style={{
                        background: `${activeRole?.color}20`,
                        color: activeRole?.color,
                        border: `1px solid ${activeRole?.color}40`,
                      }}
                    >
                      {activeRole?.label}
                    </span>
                  </div>
                </div>

                {/* Method Tabs */}
                <div className="flex gap-1 p-1 bg-surface-2 rounded-xl mb-5">
                  {methods.map(m => {
                    const Icon = m.icon;
                    const isActive = method === m.id;
                    return (
                      <button
                        key={m.id}
                        onClick={() => handleMethodChange(m.id)}
                        className={`relative flex-1 flex flex-col items-center gap-1 py-2.5 px-2 rounded-lg text-xs font-bold transition-all ${
                          isActive ? 'text-t1' : 'text-t3 hover:text-t2'
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="method-bg"
                            className="absolute inset-0 bg-surface rounded-lg border border-subtle"
                            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                          />
                        )}
                        <span className="relative z-10"><Icon size={16} /></span>
                        <span className="relative z-10 hidden sm:block">{m.longLabel}</span>
                        <span className="relative z-10 sm:hidden">{m.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <AnimatePresence mode="wait">

                    {method === 'phone' && (
                      <motion.div key="phone" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
                        <Field
                          label="رقم الهاتف" name="phone" type="tel"
                          placeholder="59xxxxxxx" dir="ltr" suffix="+970"
                          icon={Smartphone} value={creds.phone}
                          onChange={handleChange} error={errors.phone}
                        />
                        <AnimatePresence>
                          {otpSent && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                              <Field
                                label="رمز التحقق OTP" name="otp" type="text"
                                placeholder="• • • • • •" dir="ltr"
                                icon={Fingerprint} value={creds.otp}
                                onChange={handleChange} error={errors.otp}
                              />
                              <p className="text-xs text-t3 mt-1.5">
                                لم يصلك الرمز؟{' '}
                                <button type="button" className="text-primary-light hover:underline font-semibold">إعادة الإرسال</button>
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )}

                    {method === 'email' && (
                      <motion.div key="email" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
                        <Field label="البريد الإلكتروني" name="email" type="email" placeholder="you@example.com" dir="ltr" icon={Mail} value={creds.email} onChange={handleChange} error={errors.email} />
                        <Field label="كلمة المرور" name="password" type="password" placeholder="••••••••" dir="ltr" icon={KeyRound} value={creds.password} onChange={handleChange} error={errors.password} />
                        <button type="button" className="text-xs text-t3 hover:text-primary-light transition-colors">نسيت كلمة المرور؟</button>
                      </motion.div>
                    )}

                    {method === 'whatsapp' && (
                      <motion.div key="wa" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} className="text-center py-4">
                        <div
                          className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-5"
                          style={{ background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.3)' }}
                        >
                          <MessageCircle size={36} className="text-green-bright" />
                        </div>
                        <p className="text-t2 text-sm leading-relaxed mb-6">
                          سيتم توجيهك إلى تطبيق واتساب لإرسال رسالة تحقق فورية وآمنة.
                        </p>
                        <a
                          href="https://wa.me/970"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-green-bright hover:bg-green-bright/90 text-white font-bold text-sm transition-all hover:scale-[1.02] shadow-lg shadow-green-bright/20"
                        >
                          <MessageCircle size={18} />
                          المتابعة عبر واتساب
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {method !== 'whatsapp' && (
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={!loading ? { scale: 1.02 } : {}}
                      whileTap={!loading ? { scale: 0.98 } : {}}
                      className="btn-primary w-full mt-2 justify-center text-base disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      ) : otpSent ? 'تحقق والدخول' : 'المتابعة'}
                    </motion.button>
                  )}
                </form>

                {/* Social proof */}
                <div className="mt-7">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-xs text-t3 shrink-0">يثق بنا أكثر من ٥٠٠٠ مستخدم</span>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                  <div className="flex justify-center items-center gap-1">
                    {['🏠', '🚖', '👨‍🎓', '🛍️', '🚑'].map((emoji, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-surface-2 border border-subtle flex items-center justify-center text-sm -ml-1 first:ml-0"
                        style={{ zIndex: 5 - i }}
                      >
                        {emoji}
                      </div>
                    ))}
                    <span className="text-xs text-t3 flex items-center mr-2">+٤٩٩٥</span>
                  </div>
                </div>

                <p className="text-center text-xs text-t3 mt-5">
                  ليس لديك حساب؟{' '}
                  <Link to="/register" className="text-primary-light hover:underline font-semibold">سجل الآن مجاناً</Link>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-5 text-center shrink-0 border-t border-subtle/50">
          <p className="text-xs text-t3">© ٢٠٢٦ فلسطين الآن · جميع الحقوق محفوظة</p>
        </div>
      </div>
    </div>
  );
}

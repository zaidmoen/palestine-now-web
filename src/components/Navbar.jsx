import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Bell, MessageCircle,
  Home, Search, GraduationCap, Briefcase, TrendingUp,
  Heart, MapPin, Newspaper, AlertTriangle, LogIn
} from 'lucide-react';
import EmojiIcon from './EmojiIcon';

const navLinks = [
  { to: '/',          label: 'الرئيسية',  icon: Home },
  { to: '/search',    label: 'بحث ذكي',   icon: Search },
  { to: '/students',  label: 'طلاب',      icon: GraduationCap },
  { to: '/jobs',      label: 'وظائف',     icon: Briefcase },
  { to: '/economy',   label: 'اقتصاد',    icon: TrendingUp },
  { to: '/solidarity',label: 'تكافل',     icon: Heart },
  { to: '/roads',     label: 'طرق',       icon: MapPin },
  { to: '/news',      label: 'أخبار',     icon: Newspaper },
  { to: '/emergency', label: 'طوارئ',     icon: AlertTriangle },
];

const notifications = [
  { id: 1, text: 'تم نشر 15 وظيفة جديدة في رام الله', time: 'منذ 5 دقائق',  unread: true  },
  { id: 2, text: 'تحديث: طريق نابلس مفتوح',           time: 'منذ 12 دقيقة', unread: true  },
  { id: 3, text: 'حملة تكافل جديدة: دعم عائلات غزة',  time: 'منذ ساعة',     unread: false },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [showNotif,   setShowNotif]   = useState(false);
  const notifRef  = useRef(null);
  const location  = useLocation();
  const isLogin   = ['/login', '/register'].includes(location.pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotif(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const unreadCount = notifications.filter(n => n.unread).length;

  if (isLogin) return null;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pb-2 pointer-events-none">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 22 }}
          className={`pointer-events-auto rounded-[28px] transition-all duration-500 w-full max-w-[1340px] ${
            scrolled
              ? 'nav-glass shadow-2xl py-2 px-4'
              : 'py-3 px-5 lg:px-6'
          }`}
          style={scrolled ? {} : {
            background: 'rgba(8, 12, 16, 0.6)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {/* Top neon line on scroll */}
          {scrolled && (
            <div
              className="absolute top-0 left-10 right-10 h-px rounded-b-full pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, var(--primary), var(--accent), transparent)', opacity: 0.5 }}
            />
          )}

          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0 group rounded-xl focus-visible:outline-none">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 group-hover:shadow-lg"
                style={{
                  background: 'var(--primary-dim)',
                  border: '1px solid rgba(0,230,118,0.2)',
                  boxShadow: 'inset 0 0 10px rgba(0,230,118,0.1)',
                }}
              >
                <EmojiIcon emoji="🇵🇸" label="علم فلسطين" size={22} priority decorative={false} />
              </div>
              <div className="flex flex-col leading-[1.15]">
                <span
                  className="text-base font-black tracking-tight transition-all"
                  style={{
                    background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  فلسطين الآن
                </span>
                <span className="text-[10px] font-bold tracking-widest" style={{ color: 'var(--text-muted)' }}>
                  المواطن أولاً
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden xl:flex items-center gap-1 flex-1 justify-center">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="relative px-4 py-2 rounded-full text-[14px] font-bold transition-all duration-200 focus-visible:outline-none"
                    style={{ color: isActive ? 'var(--primary)' : 'var(--text-secondary)' }}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full z-0"
                        style={{
                          background: 'var(--primary-dim)',
                          border: '1px solid rgba(0,230,118,0.2)',
                          boxShadow: '0 0 12px rgba(0,230,118,0.15)',
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    {!isActive && (
                      <div
                        className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity z-0"
                        style={{ background: 'rgba(255,255,255,0.04)' }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2.5 shrink-0">
              {/* Notification Bell */}
              <div className="relative hidden sm:block" ref={notifRef}>
                <button
                  onClick={() => setShowNotif(!showNotif)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 ${
                    showNotif ? '' : 'hover:scale-105'
                  }`}
                  style={{
                    background: showNotif ? 'var(--primary-dim)' : 'rgba(255,255,255,0.05)',
                    color: showNotif ? 'var(--primary)' : 'var(--text-secondary)',
                    border: `1px solid ${showNotif ? 'rgba(0,230,118,0.3)' : 'var(--border)'}`,
                  }}
                  aria-label="الإشعارات"
                >
                  <Bell size={17} />
                  {unreadCount > 0 && (
                    <span
                      className="absolute top-2 right-2.5 w-2 h-2 rounded-full"
                      style={{
                        background: 'var(--red)',
                        boxShadow: '0 0 6px var(--red)',
                      }}
                    />
                  )}
                </button>

                <AnimatePresence>
                  {showNotif && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute left-0 top-14 w-80 overflow-hidden z-50 p-2"
                      style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-strong)',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: 'var(--shadow-xl)',
                        direction: 'rtl',
                      }}
                    >
                      <div className="px-3 py-2 flex items-center justify-between mb-1">
                        <span className="font-extrabold text-sm" style={{ color: 'var(--text-primary)' }}>الإشعارات</span>
                        <span className="text-xs font-bold cursor-pointer hover:underline" style={{ color: 'var(--primary)' }}>قراءة الكل</span>
                      </div>
                      <div className="max-h-72 overflow-y-auto space-y-1">
                        {notifications.map((n) => (
                          <div
                            key={n.id}
                            className="p-3 rounded-xl flex gap-3 cursor-pointer transition-colors"
                            style={{
                              background: n.unread ? 'var(--primary-dim)' : 'transparent',
                              border: `1px solid ${n.unread ? 'rgba(0,230,118,0.15)' : 'transparent'}`,
                            }}
                          >
                            {n.unread && (
                              <span className="mt-1.5 w-2 h-2 rounded-full shrink-0 neon-dot" />
                            )}
                            <div className={!n.unread ? 'mr-5' : ''}>
                              <p className="text-[13px] font-semibold leading-relaxed" style={{ color: 'var(--text-primary)' }}>{n.text}</p>
                              <span className="text-[11px] font-bold mt-1 block" style={{ color: 'var(--text-muted)' }}>{n.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Login Button */}
              <Link
                to="/login"
                className="hidden md:inline-flex items-center justify-center h-9 px-5 rounded-full text-sm font-bold transition-all"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--primary)';
                  e.currentTarget.style.borderColor = 'rgba(0,230,118,0.3)';
                  e.currentTarget.style.background = 'var(--primary-dim)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                }}
              >
                دخول
              </Link>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/970"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-black text-sm font-extrabold px-5 h-9 rounded-full transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #25D366, #128C7E)',
                  boxShadow: '0 0 15px rgba(37,211,102,0.3)',
                }}
              >
                <MessageCircle size={15} />
                واتساب
              </a>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="xl:hidden w-10 h-10 flex items-center justify-center rounded-full transition-all"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border)',
                }}
                aria-label="القائمة"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* ━━━ Mobile Drawer ━━━ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] backdrop-blur-sm"
              style={{ background: 'rgba(8, 12, 16, 0.8)' }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm z-[70] flex flex-col shadow-2xl"
              style={{
                background: 'var(--bg-card)',
                borderLeft: '1px solid var(--border)',
              }}
            >
              {/* Top gradient line */}
              <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, var(--accent), var(--primary))' }} />

              <div className="h-20 px-6 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: 'var(--primary-dim)', border: '1px solid rgba(0,230,118,0.2)' }}
                  >
                    <EmojiIcon emoji="🇵🇸" label="علم فلسطين" size={20} decorative={false} />
                  </div>
                  <span
                    className="text-xl font-black"
                    style={{
                      background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    فلسطين الآن
                  </span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-full transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                {navLinks.map((link, i) => {
                  const isActive = location.pathname === link.to;
                  const Icon = link.icon;
                  return (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link
                        to={link.to}
                        className="flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-base font-bold transition-all"
                        style={{
                          background: isActive ? 'var(--primary-dim)' : 'transparent',
                          color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                          border: `1px solid ${isActive ? 'rgba(0,230,118,0.2)' : 'transparent'}`,
                        }}
                      >
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                          style={{
                            background: isActive ? 'rgba(0,230,118,0.15)' : 'rgba(255,255,255,0.05)',
                          }}
                        >
                          <Icon size={18} style={{ color: isActive ? 'var(--primary)' : 'var(--text-muted)' }} />
                        </div>
                        {link.label}
                        {isActive && (
                          <span
                            className="mr-auto w-1.5 h-1.5 rounded-full"
                            style={{ background: 'var(--primary)', boxShadow: '0 0 6px var(--primary)' }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.04 }}
                  className="pt-2"
                >
                  <div className="h-px mb-3" style={{ background: 'var(--border)' }} />
                  <Link
                    to="/login"
                    className="flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-base font-bold transition-all"
                    style={{ color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.03)' }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(255,255,255,0.05)' }}
                    >
                      <LogIn size={18} style={{ color: 'var(--text-muted)' }} />
                    </div>
                    تسجيل الدخول / إنشاء حساب
                  </Link>
                </motion.div>
              </div>

              {/* Bottom Branding */}
              <div className="px-6 py-4" style={{ borderTop: '1px solid var(--border)' }}>
                <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
                  فلسطين الآن © {new Date().getFullYear()}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

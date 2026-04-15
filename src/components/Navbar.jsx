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
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className={`pointer-events-auto rounded-[32px] transition-all duration-500 w-full max-w-[1300px] ${
            scrolled
              ? 'nav-glass shadow-island py-2 px-4'
              : 'bg-bg-card/70 backdrop-blur-xl border border-border shadow-md py-3 px-5 lg:px-6'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            {/* RIGHT — Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light">
              <EmojiIcon
                emoji="🇵🇸"
                label="علم فلسطين"
                size={28}
                priority
                decorative={false}
                className="transition-transform group-hover:scale-110"
              />
              <div className="flex flex-col leading-[1.1]">
                <span className="text-base font-black text-primary tracking-tight transition-colors group-hover:text-primary-light">
                  فلسطين الآن
                </span>
                <span className="text-[10px] text-text-muted font-bold tracking-widest">المواطن أولاً</span>
              </div>
            </Link>

            {/* CENTER — Desktop Nav (Classic 2025 Pill links) */}
            <div className="hidden xl:flex items-center gap-1.5 flex-1 justify-center">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="relative px-4 py-2 rounded-full text-[14px] font-bold transition-colors focus-visible:outline-none"
                    style={{ color: isActive ? 'var(--primary)' : 'var(--text-secondary)' }}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-primary-50 rounded-full border border-primary-100 z-0"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    {!isActive && (
                      <div className="absolute inset-0 bg-bg-muted rounded-full opacity-0 hover:opacity-100 transition-opacity z-0" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* LEFT — Actions */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Notification Bell */}
              <div className="relative hidden sm:block" ref={notifRef}>
                <button
                  onClick={() => setShowNotif(!showNotif)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                    showNotif ? 'bg-primary-50 text-primary' : 'bg-transparent text-text-secondary hover:bg-bg-muted'
                  }`}
                  aria-label="الإشعارات"
                >
                  <Bell size={18} />
                  {unreadCount > 0 && (
                    <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-error ring-2 ring-bg-card" />
                  )}
                </button>

                <AnimatePresence>
                  {showNotif && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="absolute left-0 top-14 w-80 global-card overflow-hidden z-50 p-2"
                      style={{ direction: 'rtl' }}
                    >
                      <div className="px-3 py-2 flex items-center justify-between mb-1">
                        <span className="font-extrabold text-sm text-text-primary">الإشعارات</span>
                        <span className="text-xs font-bold text-primary cursor-pointer hover:underline">قراءة الكل</span>
                      </div>
                      <div className="max-h-72 overflow-y-auto space-y-1">
                        {notifications.map((n) => (
                          <div
                            key={n.id}
                            className={`p-3 rounded-xl flex gap-3 cursor-pointer transition-colors ${
                              n.unread ? 'bg-primary-50 hover:bg-primary-100' : 'hover:bg-bg-muted'
                            }`}
                          >
                            {n.unread && (
                              <span className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />
                            )}
                            <div className={!n.unread ? 'mr-5' : ''}>
                              <p className="text-[13px] font-semibold leading-relaxed text-text-primary">{n.text}</p>
                              <span className="text-[11px] font-bold text-text-light mt-1 block">{n.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Login Button Minimal */}
              <Link
                to="/login"
                className="hidden md:inline-flex items-center justify-center h-10 px-5 rounded-full text-sm font-extrabold transition-all text-text-primary bg-bg-muted hover:bg-border-strong"
              >
                دخول
              </Link>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/970"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-white text-sm font-extrabold px-5 h-10 rounded-full transition-transform hover:scale-105 shadow-md shadow-green-500/20"
                style={{ background: '#25D366' }}
              >
                <MessageCircle size={15} />
                واتساب
              </a>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="xl:hidden w-10 h-10 flex items-center justify-center rounded-full text-text-primary bg-bg-muted hover:bg-border-strong transition-colors"
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
              className="fixed inset-0 z-[60] bg-text-primary/30 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm z-[70] flex flex-col shadow-2xl bg-bg-card"
            >
              <div className="h-20 px-6 flex items-center justify-between border-b border-border">
                <div className="flex items-center gap-2">
                  <EmojiIcon emoji="🇵🇸" label="علم فلسطين" size={28} decorative={false} />
                  <span className="text-xl font-black text-primary">فلسطين الآن</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-bg-muted text-text-secondary hover:bg-border-strong transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                {navLinks.map((link, i) => {
                  const isActive = location.pathname === link.to;
                  const Icon = link.icon;
                  return (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link
                        to={link.to}
                        className={`flex items-center gap-3.5 px-5 py-4 rounded-2xl text-base font-extrabold transition-all ${
                          isActive
                            ? 'bg-primary-50 text-primary shadow-sm border border-primary-100'
                            : 'text-text-secondary hover:bg-bg-muted'
                        }`}
                      >
                        <Icon size={20} className={isActive ? 'text-primary' : 'text-text-muted'} />
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: navLinks.length * 0.04 }}>
                  <Link
                    to="/login"
                    className="flex items-center gap-3.5 px-5 py-4 rounded-2xl text-base font-extrabold transition-all text-text-primary bg-bg-muted hover:bg-border-strong mt-4"
                  >
                    <LogIn size={20} className="text-text-muted" />
                    تسجيل الدخول / إنشاء حساب
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

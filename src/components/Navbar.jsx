import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Moon, Sun, Bell, MessageCircle,
  Home, Search, GraduationCap, Briefcase, TrendingUp,
  Heart, MapPin, Newspaper, AlertTriangle, LogIn
} from 'lucide-react';

const navLinks = [
  { to: '/',          label: 'الرئيسية', icon: Home },
  { to: '/search',    label: 'بحث',      icon: Search },
  { to: '/students',  label: 'طلاب',     icon: GraduationCap },
  { to: '/jobs',      label: 'وظايف',    icon: Briefcase },
  { to: '/economy',   label: 'اقتصاد',   icon: TrendingUp },
  { to: '/solidarity',label: 'تكافل',    icon: Heart },
  { to: '/roads',     label: 'طرق',      icon: MapPin },
  { to: '/news',      label: 'أخبار',    icon: Newspaper },
  { to: '/emergency', label: 'طوارئ',    icon: AlertTriangle },
];

const notifications = [
  { id: 1, text: 'تم نشر 15 وظيفة جديدة في رام الله', time: 'منذ 5 دقائق',   unread: true  },
  { id: 2, text: 'تحديث حالة الطرق: طريق نابلس مفتوح',  time: 'منذ 12 دقيقة', unread: true  },
  { id: 3, text: 'حملة تكافل جديدة: دعم عائلات غزة',    time: 'منذ ساعة',     unread: false },
  { id: 4, text: 'نتائج الثانوية العامة متاحة الآن',     time: 'منذ 3 ساعات',  unread: false },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode]     = useState(true);
  const [showNotif, setShowNotif]   = useState(false);
  const notifRef  = useRef(null);
  const location  = useLocation();
  const isLogin   = location.pathname === '/login';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
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

  // Close mobile menu on navigation
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const unreadCount = notifications.filter(n => n.unread).length;

  // Don't render navbar on login page (it has its own header)
  if (isLogin) return null;

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 lg:h-[72px] flex items-center justify-between">

          {/* RIGHT — Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">🇵🇸</span>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold text-primary-light tracking-tight">فلسطين الآن</span>
              <span className="text-[10px] text-t3 -mt-0.5">منصتك الرقمية</span>
            </div>
          </Link>

          {/* CENTER — Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative px-3 py-2 text-sm font-semibold transition-colors duration-200 group"
                >
                  <span className={isActive ? 'text-primary-light' : 'text-t2 group-hover:text-t1'}>
                    {link.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-light rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* LEFT — Actions */}
          <div className="flex items-center gap-2">

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="hidden sm:flex w-9 h-9 items-center justify-center rounded-xl text-t2 hover:text-t1 hover:bg-surface-2 transition-all"
              aria-label="تبديل المظهر"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Notification Bell */}
            <div className="relative hidden sm:block" ref={notifRef}>
              <button
                onClick={() => setShowNotif(!showNotif)}
                className="w-9 h-9 flex items-center justify-center rounded-xl text-t2 hover:text-t1 hover:bg-surface-2 transition-all relative"
                aria-label="الإشعارات"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-pal-red rounded-full ring-2 ring-bg" />
                )}
              </button>

              <AnimatePresence>
                {showNotif && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-12 w-80 card p-0 overflow-hidden"
                    style={{ direction: 'rtl' }}
                  >
                    <div className="p-4 border-b border-subtle flex items-center justify-between">
                      <span className="font-bold text-t1 text-sm">الإشعارات</span>
                      <span className="text-xs text-primary-light cursor-pointer hover:underline">قراءة الكل</span>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`px-4 py-3 flex gap-3 border-b border-subtle hover:bg-surface-2 transition-colors cursor-pointer ${n.unread ? 'bg-surface-2/50' : ''}`}
                        >
                          {n.unread && <span className="mt-2 w-2 h-2 bg-primary-light rounded-full shrink-0" />}
                          <div className={!n.unread ? 'mr-5' : ''}>
                            <p className="text-sm text-t1 leading-relaxed">{n.text}</p>
                            <span className="text-xs text-t3 mt-1 block">{n.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ━━━ LOGIN BUTTON ━━━ */}
            <Link
              to="/login"
              className="hidden sm:inline-flex items-center gap-1.5 border border-subtle hover:border-primary-light text-t1 text-xs font-bold px-4 h-9 rounded-full transition-all hover:bg-primary/10 hover:text-primary-light"
            >
              <LogIn size={14} />
              دخول
            </Link>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/970"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 bg-green-bright hover:bg-green-bright/90 text-white text-xs font-bold px-4 h-9 rounded-full transition-all hover:scale-105 shadow-lg shadow-green-bright/20"
            >
              <MessageCircle size={14} />
              واتساب
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl text-t2 hover:text-t1 hover:bg-surface-2 transition-all"
              aria-label="القائمة"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* ━━━ Mobile Drawer ━━━ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[60]"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-surface z-[70] shadow-2xl flex flex-col"
            >
              <div className="h-16 px-5 flex items-center justify-between border-b border-subtle">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🇵🇸</span>
                  <span className="text-base font-bold text-primary-light">فلسطين الآن</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-t2 hover:text-t1 hover:bg-surface-2 transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-3 px-3">
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
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all mb-1 ${
                          isActive ? 'bg-primary/10 text-primary-light' : 'text-t2 hover:text-t1 hover:bg-surface-2'
                        }`}
                      >
                        <Icon size={18} />
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Login link in mobile menu */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: navLinks.length * 0.04 }}>
                  <Link
                    to="/login"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all mb-1 text-primary-light hover:bg-primary/10"
                  >
                    <LogIn size={18} />
                    تسجيل الدخول
                  </Link>
                </motion.div>
              </div>

              <div className="p-4 border-t border-subtle space-y-3">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-surface-2 text-t2 hover:text-t1 text-sm font-semibold transition-all"
                >
                  {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                  {darkMode ? 'الوضع الفاتح' : 'الوضع الداكن'}
                </button>
                <a
                  href="https://wa.me/970"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-bright text-white text-sm font-bold transition-all hover:bg-green-bright/90"
                >
                  <MessageCircle size={16} />
                  واتساب
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

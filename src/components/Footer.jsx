import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MessageCircle, Mail, Phone, MapPin,
  Heart, ExternalLink, ArrowUp,
  Github, Send
} from 'lucide-react';

const quickLinks = [
  { label: 'الرئيسية', to: '/' },
  { label: 'بحث ذكي', to: '/search' },
  { label: 'طلاب', to: '/students' },
  { label: 'وظائف', to: '/jobs' },
];

const moreLinks = [
  { label: 'اقتصاد', to: '/economy' },
  { label: 'تكافل', to: '/solidarity' },
  { label: 'طرق', to: '/roads' },
  { label: 'أخبار', to: '/news' },
];

const socialLinks = [
  { icon: MessageCircle, label: 'واتساب', href: 'https://wa.me/970', color: 'hover:text-green-400' },
  { icon: Send, label: 'تيليغرام', href: '#', color: 'hover:text-blue-400' },
  { icon: Github, label: 'جيتهب', href: '#', color: 'hover:text-t1' },
  { icon: Mail, label: 'البريد', href: 'mailto:info@palestine-now.ps', color: 'hover:text-amber-400' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-subtle bg-surface/50" id="footer">
      {/* Main Footer */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🇵🇸</span>
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-bold text-primary-light tracking-tight">فلسطين الآن</span>
                <span className="text-[10px] text-t3">منصتك الرقمية الشاملة</span>
              </div>
            </Link>
            <p className="text-sm text-t2 leading-relaxed mb-6 max-w-xs">
              منصة رقمية فلسطينية شاملة تهدف لخدمة المواطن الفلسطيني وتوفير جميع
              الخدمات والمعلومات في مكان واحد.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-9 h-9 rounded-xl bg-surface-2 flex items-center justify-center text-t3 transition-all duration-300 hover:bg-surface-3 hover:scale-110 ${social.color}`}
                    aria-label={social.label}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-t1 mb-5 flex items-center gap-2">
              <div className="w-1 h-4 rounded-full bg-primary-light" />
              روابط سريعة
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-t2 hover:text-primary-light transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="text-sm font-bold text-t1 mb-5 flex items-center gap-2">
              <div className="w-1 h-4 rounded-full bg-accent" />
              المزيد
            </h4>
            <ul className="space-y-3">
              {moreLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-t2 hover:text-primary-light transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-t1 mb-5 flex items-center gap-2">
              <div className="w-1 h-4 rounded-full bg-pal-red" />
              تواصل معنا
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-t3 mt-0.5 shrink-0" />
                <span className="text-sm text-t2">فلسطين — رام الله</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-t3 mt-0.5 shrink-0" />
                <span className="text-sm text-t2" dir="ltr">+970 XX XXX XXXX</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-t3 mt-0.5 shrink-0" />
                <span className="text-sm text-t2">info@palestine-now.ps</span>
              </li>
            </ul>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/970"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-bright hover:bg-green-bright/90 text-white text-xs font-bold transition-all hover:scale-105 shadow-lg shadow-green-bright/20"
            >
              <MessageCircle size={14} />
              تواصل عبر واتساب
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-subtle">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-t3 flex items-center gap-1">
            صُنع بـ <Heart size={12} className="text-pal-red fill-pal-red" /> في فلسطين · {new Date().getFullYear()}
          </p>
          <p className="text-xs text-t3">
            جميع الحقوق محفوظة © فلسطين الآن
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-xl bg-surface-2 flex items-center justify-center text-t3 hover:text-primary-light hover:bg-surface-3 transition-all"
            aria-label="العودة للأعلى"
          >
            <ArrowUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

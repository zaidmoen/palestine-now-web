import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MessageCircle, Mail, Phone, MapPin,
  Heart, ExternalLink, ArrowUp, Github, Send
} from 'lucide-react';
import EmojiIcon from './EmojiIcon';

const quickLinks = [
  { label: 'الرئيسية',  to: '/' },
  { label: 'بحث ذكي',  to: '/search' },
  { label: 'طلاب',     to: '/students' },
  { label: 'وظائف',    to: '/jobs' },
];

const moreLinks = [
  { label: 'اقتصاد',   to: '/economy' },
  { label: 'تكافل',    to: '/solidarity' },
  { label: 'طرق',      to: '/roads' },
  { label: 'أخبار',    to: '/news' },
];

const socialLinks = [
  { icon: MessageCircle, label: 'واتساب',  href: 'https://wa.me/970',               hoverColor: '#25D366' },
  { icon: Send,          label: 'تيليغرام', href: '#',                               hoverColor: '#229ED9' },
  { icon: Github,        label: 'جيتهب',   href: '#',                               hoverColor: '#333' },
  { icon: Mail,          label: 'البريد',   href: 'mailto:info@palestine-now.ps',    hoverColor: '#C47B2B' },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      id="footer"
      style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)' }}
    >
      {/* Main */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <EmojiIcon emoji="🇵🇸" label="علم فلسطين" size={32} decorative={false} priority />
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-bold" style={{ color: 'var(--primary)' }}>فلسطين الآن</span>
                <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>منصتك الرقمية الشاملة</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)', maxWidth: 270 }}>
              منصة رقمية فلسطينية شاملة تهدف لخدمة المواطن الفلسطيني وتوفير جميع الخدمات والمعلومات في مكان واحد.
            </p>
            {/* Social */}
            <div className="flex items-center gap-2.5">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                    style={{
                      background: 'var(--bg-section)',
                      color: 'var(--text-muted)',
                      border: '1px solid var(--border)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = social.hoverColor;
                      e.currentTarget.style.borderColor = social.hoverColor + '55';
                      e.currentTarget.style.background = social.hoverColor + '15';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'var(--text-muted)';
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.background = 'var(--bg-section)';
                    }}
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
            <h4
              className="text-sm font-bold mb-5 flex items-center gap-2"
              style={{ color: 'var(--text-primary)' }}
            >
              <span
                className="w-1 h-4 rounded-full"
                style={{ background: 'var(--primary)' }}
              />
              روابط سريعة
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm flex items-center gap-1.5 group transition-colors duration-200"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
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
            <h4
              className="text-sm font-bold mb-5 flex items-center gap-2"
              style={{ color: 'var(--text-primary)' }}
            >
              <span
                className="w-1 h-4 rounded-full"
                style={{ background: 'var(--accent)' }}
              />
              المزيد
            </h4>
            <ul className="space-y-3">
              {moreLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm flex items-center gap-1.5 group transition-colors duration-200"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
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
            <h4
              className="text-sm font-bold mb-5 flex items-center gap-2"
              style={{ color: 'var(--text-primary)' }}
            >
              <span
                className="w-1 h-4 rounded-full"
                style={{ background: 'var(--error)' }}
              />
              تواصل معنا
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} style={{ color: 'var(--text-light)', marginTop: 2 }} className="shrink-0" />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>فلسطين — رام الله</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={15} style={{ color: 'var(--text-light)', marginTop: 2 }} className="shrink-0" />
                <span className="text-sm" dir="ltr" style={{ color: 'var(--text-secondary)' }}>+970 XX XXX XXXX</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={15} style={{ color: 'var(--text-light)', marginTop: 2 }} className="shrink-0" />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>info@palestine-now.ps</span>
              </li>
            </ul>

            <a
              href="https://wa.me/970"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-xs font-bold transition-all hover:scale-105"
              style={{
                background: '#25D366',
                boxShadow: '0 2px 8px rgba(37,211,102,0.25)',
              }}
            >
              <MessageCircle size={14} />
              تواصل عبر واتساب
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs flex items-center gap-1.5" style={{ color: 'var(--text-light)' }}>
            صُنع بـ <Heart size={11} fill="var(--error)" style={{ color: 'var(--error)' }} /> في فلسطين · {new Date().getFullYear()}
          </p>
          <p className="text-xs" style={{ color: 'var(--text-light)' }}>
            جميع الحقوق محفوظة © فلسطين الآن
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
            style={{
              background: 'var(--bg-section)',
              color: 'var(--text-muted)',
              border: '1px solid var(--border)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--primary-50)';
              e.currentTarget.style.color = 'var(--primary)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--bg-section)';
              e.currentTarget.style.color = 'var(--text-muted)';
            }}
            aria-label="العودة للأعلى"
          >
            <ArrowUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

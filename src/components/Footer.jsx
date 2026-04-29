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
  { icon: MessageCircle, label: 'واتساب',   href: 'https://wa.me/970', color: '#25D366' },
  { icon: Send,          label: 'تيليغرام', href: '#',                 color: '#229ED9' },
  { icon: Github,        label: 'جيتهب',   href: '#',                 color: '#F0F6FC' },
  { icon: Mail,          label: 'البريد',   href: 'mailto:info@palestine-now.ps', color: '#FFD700' },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      id="footer"
      style={{
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top neon line */}
      <div className="absolute top-0 left-0 right-0 h-px neon-line" />

      {/* Background pattern */}
      <div className="absolute inset-0 pattern-grid opacity-20 pointer-events-none" />

      {/* Ambient blobs */}
      <div
        className="absolute bottom-0 right-0 w-80 h-80 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,230,118,0.04), transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute top-0 left-0 w-64 h-64 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,215,0,0.03), transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Main Content */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* ── Brand ── */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6 group w-fit">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all group-hover:scale-110"
                style={{
                  background: 'var(--primary-dim)',
                  border: '1px solid rgba(0,230,118,0.2)',
                  boxShadow: '0 0 20px rgba(0,230,118,0.1)',
                }}
              >
                <EmojiIcon emoji="🇵🇸" label="علم فلسطين" size={28} decorative={false} priority />
              </div>
              <div className="flex flex-col leading-tight">
                <span
                  className="text-lg font-black"
                  style={{
                    background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  فلسطين الآن
                </span>
                <span className="text-[11px] font-semibold" style={{ color: 'var(--text-muted)' }}>
                  منصتك الرقمية الشاملة
                </span>
              </div>
            </Link>

            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: 'var(--text-secondary)', maxWidth: 260 }}
            >
              منصة رقمية فلسطينية شاملة تهدف لخدمة المواطن الفلسطيني وتوفير جميع الخدمات والمعلومات في مكان واحد.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      color: 'var(--text-muted)',
                      border: '1px solid var(--border)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = social.color;
                      e.currentTarget.style.borderColor = social.color + '50';
                      e.currentTarget.style.background = social.color + '15';
                      e.currentTarget.style.boxShadow = `0 0 15px ${social.color}30`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'var(--text-muted)';
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    aria-label={social.label}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h4
              className="text-sm font-bold mb-5 flex items-center gap-2"
              style={{ color: 'var(--text-primary)' }}
            >
              <span
                className="w-1 h-4 rounded-full"
                style={{ background: 'var(--primary)', boxShadow: '0 0 8px var(--primary)' }}
              />
              روابط سريعة
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm flex items-center gap-2 group transition-all duration-200"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = 'var(--primary)';
                      e.currentTarget.style.paddingRight = '4px';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.paddingRight = '0';
                    }}
                  >
                    <ExternalLink
                      size={11}
                      className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                      style={{ color: 'var(--primary)' }}
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── More Links ── */}
          <div>
            <h4
              className="text-sm font-bold mb-5 flex items-center gap-2"
              style={{ color: 'var(--text-primary)' }}
            >
              <span
                className="w-1 h-4 rounded-full"
                style={{ background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }}
              />
              المزيد
            </h4>
            <ul className="space-y-3">
              {moreLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm flex items-center gap-2 group transition-all duration-200"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = 'var(--accent)';
                      e.currentTarget.style.paddingRight = '4px';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.paddingRight = '0';
                    }}
                  >
                    <ExternalLink
                      size={11}
                      className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                      style={{ color: 'var(--accent)' }}
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div>
            <h4
              className="text-sm font-bold mb-5 flex items-center gap-2"
              style={{ color: 'var(--text-primary)' }}
            >
              <span
                className="w-1 h-4 rounded-full"
                style={{ background: 'var(--red)', boxShadow: '0 0 8px var(--red)' }}
              />
              تواصل معنا
            </h4>
            <ul className="space-y-4">
              {[
                { icon: MapPin, text: 'فلسطين — رام الله' },
                { icon: Phone, text: '+970 XX XXX XXXX', dir: 'ltr' },
                { icon: Mail,  text: 'info@palestine-now.ps' },
              ].map(({ icon: Icon, text, dir }) => (
                <li key={text} className="flex items-start gap-3">
                  <Icon
                    size={15}
                    className="shrink-0 mt-0.5"
                    style={{ color: 'var(--text-muted)' }}
                  />
                  <span
                    className="text-sm"
                    dir={dir}
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {text}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="https://wa.me/970"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-black text-xs font-bold transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                boxShadow: '0 0 20px rgba(37,211,102,0.25)',
              }}
            >
              <MessageCircle size={14} />
              تواصل عبر واتساب
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          <p
            className="text-xs flex items-center gap-1.5"
            style={{ color: 'var(--text-muted)' }}
          >
            صُنع بـ
            <Heart size={11} fill="var(--red)" style={{ color: 'var(--red)' }} />
            في فلسطين · {new Date().getFullYear()}
          </p>

          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            جميع الحقوق محفوظة © فلسطين الآن
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
            style={{
              background: 'rgba(255,255,255,0.05)',
              color: 'var(--text-muted)',
              border: '1px solid var(--border)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--primary-dim)';
              e.currentTarget.style.color = 'var(--primary)';
              e.currentTarget.style.borderColor = 'rgba(0,230,118,0.3)';
              e.currentTarget.style.boxShadow = '0 0 12px rgba(0,230,118,0.2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.color = 'var(--text-muted)';
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.boxShadow = 'none';
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

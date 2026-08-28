import { Link } from '../lib/router';
import { ArrowUp, Heart, Info, Search } from 'lucide-react';
import EmojiIcon from './EmojiIcon';

const sections = [
  { label: 'البحث', to: '/search' },
  { label: 'الأخبار', to: '/news' },
  { label: 'الطرق', to: '/roads' },
  { label: 'الطوارئ', to: '/emergency' },
  { label: 'الوظائف', to: '/jobs' },
  { label: 'الطلاب', to: '/students' },
  { label: 'الاقتصاد', to: '/economy' },
  { label: 'التكافل', to: '/solidarity' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-bg-card">
      <div className="absolute inset-x-0 top-0 h-px neon-line" />
      <div className="absolute inset-0 pattern-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1240px] px-4 py-14 sm:px-6 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Link to="/" className="mb-5 flex w-fit items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-primary/20 bg-primary/10">
                <EmojiIcon emoji="🇵🇸" label="علم فلسطين" size={27} decorative={false} priority />
              </div>
              <div>
                <span className="block text-lg font-black gradient-text">فلسطين الآن</span>
                <span className="text-[11px] font-bold text-text-muted">المعلومة أقرب</span>
              </div>
            </Link>
            <p className="max-w-md text-sm leading-8 text-text-secondary">
              نموذج منتج لمنصّة فلسطينية موحّدة، مصمّم لتجميع المعلومات والخدمات في تجربة سريعة وواضحة وقابلة للربط بمصادر حية.
            </p>
          </div>

          <div>
            <h2 className="mb-5 text-sm font-black text-text-primary">استكشف الأقسام</h2>
            <nav aria-label="روابط التذييل" className="grid grid-cols-2 gap-x-5 gap-y-3">
              {sections.map((item) => (
                <Link key={item.to} to={item.to} className="text-sm font-semibold text-text-secondary transition hover:text-primary">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="mb-5 text-sm font-black text-text-primary">حالة المنتج</h2>
            <div className="rounded-2xl border border-amber-400/15 bg-amber-400/[0.05] p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-black text-amber-200">
                <Info size={15} />
                نسخة عرض احترافية
              </div>
              <p className="text-xs leading-6 text-text-secondary">
                البيانات الحالية نموذجية. يحتاج الإطلاق العام إلى مصادر رسمية، لوحة إدارة، مصادقة حقيقية، وسياسة تحرير واضحة.
              </p>
            </div>
            <Link to="/search" className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-primary">
              <Search size={14} /> ابدأ البحث
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-border">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row sm:px-6">
          <p className="flex items-center gap-1.5 text-xs text-text-muted">
            صُمّم بـ <Heart size={11} fill="var(--red)" className="text-red" /> لفلسطين · {new Date().getFullYear()}
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-white/[0.04] text-text-muted transition hover:border-primary/25 hover:text-primary"
            aria-label="العودة للأعلى"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}

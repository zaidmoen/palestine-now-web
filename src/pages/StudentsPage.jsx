import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  BookOpenCheck,
  CalendarDays,
  Check,
  FileText,
  GraduationCap,
  Search,
  Sparkles,
} from 'lucide-react';
import { Link } from '../lib/router';
import Footer from '../components/Footer';

const opportunities = [
  {
    id: 'scholarship-1',
    type: 'منحة',
    title: 'منحة تفوق جامعية',
    provider: 'نموذج جهة مانحة',
    deadline: '30 سبتمبر',
    description: 'مثال على فرصة قابلة للربط بجهة رسمية مع المتطلبات والموعد والرابط الموثّق.',
  },
  {
    id: 'training-1',
    type: 'تدريب',
    title: 'مسار مهارات رقمية',
    provider: 'نموذج شريك تدريبي',
    deadline: '15 أكتوبر',
    description: 'بطاقة نموذجية لبرنامج تدريبي تشمل الفئة المستهدفة والمدة وطريقة التقديم.',
  },
  {
    id: 'loan-1',
    type: 'تمويل',
    title: 'قرض دراسي حسن',
    provider: 'نموذج صندوق طلابي',
    deadline: 'مفتوح دوريًا',
    description: 'مكان موحّد لعرض شروط التمويل والوثائق وسياسة السداد بعد التحقق من المصدر.',
  },
];

const checklistItems = [
  'تجهيز صورة الهوية وكشف العلامات',
  'كتابة رسالة الدافع ومراجعتها',
  'طلب رسالة توصية من المدرّس',
  'مراجعة الموعد النهائي والرابط الرسمي',
];

export default function StudentsPage() {
  const [completed, setCompleted] = useState([]);
  const progress = useMemo(
    () => Math.round((completed.length / checklistItems.length) * 100),
    [completed],
  );

  const toggleItem = (index) => {
    setCompleted((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  };

  return (
    <div className="min-h-screen bg-bg pt-[96px] font-cairo" dir="rtl">
      <main>
        <section className="relative overflow-hidden px-4 pb-16 pt-10 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(56,189,248,0.13),transparent_34%),radial-gradient(circle_at_15%_80%,rgba(0,230,118,0.08),transparent_30%)]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue/20 bg-blue/10 px-4 py-2 text-sm font-extrabold text-blue">
                <Sparkles size={14} /> مركز الطالب
              </div>
              <h1 className="max-w-3xl text-4xl font-black leading-tight text-text-primary sm:text-5xl lg:text-6xl">
                خطتك الأكاديمية
                <span className="gradient-text block pt-2">واضحة من أول خطوة</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-text-secondary sm:text-lg">
                نموذج عملي لتجميع المنح والتدريب والتمويل، مع قائمة تجهيز تساعد الطالب قبل فتح باب التقديم الحقيقي.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#opportunities" className="btn-primary">
                  استكشف الفرص <ArrowLeft size={16} />
                </a>
                <a href="#checklist" className="btn-secondary">جهّز ملفك</a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative overflow-hidden rounded-[30px] border border-border bg-bg-card p-6 shadow-2xl shadow-black/30"
            >
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-l from-transparent via-blue to-transparent" />
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-black text-blue">ملف التقديم</p>
                  <h2 className="mt-1 text-2xl font-black text-text-primary">جاهزية الطالب</h2>
                </div>
                <div className="grid h-14 w-14 place-items-center rounded-2xl border border-blue/20 bg-blue/10 text-blue">
                  <GraduationCap size={26} />
                </div>
              </div>
              <div className="mb-3 flex items-center justify-between text-sm font-bold">
                <span className="text-text-secondary">نسبة الإنجاز</span>
                <span className="text-blue">{progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                <div className="h-full rounded-full bg-gradient-to-l from-blue to-primary transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-5 rounded-2xl border border-border bg-white/[0.025] p-4 text-sm leading-7 text-text-secondary">
                فعّل عناصر القائمة أدناه لترى تقدّمك. تُحفظ الحالة داخل الجلسة فقط في نسخة العرض.
              </p>
            </motion.div>
          </div>
        </section>

        <section id="opportunities" className="border-y border-border bg-bg-card px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-black text-primary">فرص نموذجية</p>
                <h2 className="mt-2 text-3xl font-black text-text-primary md:text-4xl">كل فرصة بمعلومات قابلة للتحقق</h2>
              </div>
              <Link to="/search?q=منحة" className="btn-secondary h-11 px-5">
                <Search size={15} /> ابحث عن منحة
              </Link>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {opportunities.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-[24px] border border-border bg-bg-surface p-6"
                >
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <span className="rounded-full border border-blue/20 bg-blue/10 px-3 py-1 text-xs font-black text-blue">{item.type}</span>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-text-muted"><CalendarDays size={13} /> {item.deadline}</span>
                  </div>
                  <h3 className="text-xl font-black text-text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm font-bold text-primary">{item.provider}</p>
                  <p className="mt-4 text-sm leading-7 text-text-secondary">{item.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="checklist" className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                <BookOpenCheck size={25} />
              </div>
              <h2 className="text-3xl font-black text-text-primary md:text-4xl">قائمة تجهيز ملف المنحة</h2>
              <p className="mt-4 text-base leading-8 text-text-secondary">
                وظيفة صغيرة لكنها مفيدة فعلًا: تساعد الطالب على معرفة ما أنجزه وما تبقى قبل الموعد النهائي.
              </p>
            </div>

            <div className="rounded-[28px] border border-border bg-bg-card p-5 sm:p-7">
              <div className="space-y-3">
                {checklistItems.map((item, index) => {
                  const isDone = completed.includes(index);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleItem(index)}
                      aria-pressed={isDone}
                      className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-right transition ${isDone ? 'border-primary/25 bg-primary/[0.07]' : 'border-border bg-white/[0.02] hover:border-border-strong'}`}
                    >
                      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border ${isDone ? 'border-primary bg-primary text-black' : 'border-border-strong text-text-muted'}`}>
                        {isDone ? <Check size={17} /> : <FileText size={16} />}
                      </span>
                      <span className={`text-sm font-extrabold ${isDone ? 'text-primary line-through' : 'text-text-primary'}`}>{item}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <aside className="mx-auto mb-16 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-amber-400/15 bg-amber-400/[0.05] px-5 py-4 text-sm leading-7 text-text-secondary">
            الفرص والمواعيد هنا نموذجية. لا ترسل وثائق شخصية إلا عبر رابط رسمي موثّق بعد ربط مصادر حقيقية بالمنصة.
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  );
}

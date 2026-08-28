import { Info } from 'lucide-react';

export default function ProductStatus() {
  return (
    <div
      className="fixed bottom-4 right-4 z-40 hidden items-center gap-2 rounded-full border border-amber-400/20 bg-[#111820]/95 px-3.5 py-2 text-xs font-extrabold text-amber-200 shadow-xl shadow-black/30 backdrop-blur-xl sm:flex"
      title="المحتوى الحالي مخصص لعرض تجربة المنتج ولا يمثل بيانات حية"
      role="status"
    >
      <Info size={13} aria-hidden="true" />
      نسخة عرض · بيانات نموذجية
    </div>
  );
}


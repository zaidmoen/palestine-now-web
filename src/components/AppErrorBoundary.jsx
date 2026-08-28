import { Component } from 'react';
import { Link } from '../lib/router';

export default class AppErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="grid min-h-screen place-items-center bg-bg px-6 text-center" dir="rtl">
          <div className="max-w-lg rounded-[28px] border border-border bg-bg-card p-8 shadow-2xl">
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-red/10 text-2xl">!</div>
            <h1 className="mb-3 text-2xl font-black text-text-primary">تعذّر عرض الصفحة</h1>
            <p className="mb-6 text-sm leading-7 text-text-secondary">
              حدث خطأ غير متوقع. أعد المحاولة أو ارجع إلى الصفحة الرئيسية.
            </p>
            <Link to="/" className="btn-primary">العودة للرئيسية</Link>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

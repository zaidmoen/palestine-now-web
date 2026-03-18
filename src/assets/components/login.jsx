import React, { useState } from 'react';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      alert('تم تسجيل الدخول بنجاح (محاكاة)');
    }, 2000);
  };

  return (
    <div className="login-wrapper">
      <div className="login-split branding-section">
        <div className="branding-overlay"></div>
        <div className="branding-content">
          <div className="glass-badge">منصة إخبارية متكاملة</div>
          <h1>فلسطين الآن</h1>
          <p>نبض الحدث في كل لحظة، انضم إلينا لتكون في قلب الصورة وتتابع آخر المستجدات أولاً بأول.</p>
          
          <div className="branding-stats">
            <div className="stat-item">
              <h4>+10k</h4>
              <span>مستخدم نشط</span>
            </div>
            <div className="stat-item">
              <h4>24/7</h4>
              <span>تغطية مستمرة</span>
            </div>
          </div>
        </div>
      </div>

      <div className="login-split form-section">
        <div className="login-card-container">
          <div className="login-blob"></div>
          <div className="login-card">
            <div className="login-header">
            <div className="login-logo">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="var(--login-accent)" />
                <path d="M2 17L12 22L22 17" stroke="var(--login-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="var(--login-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2>أهلاً بك مجدداً</h2>
            <p>سجل دخولك للمتابعة في فلسطين الآن</p>
          </div>
          
          <button type="button" className="social-login-btn">
            <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg" style={{marginLeft: '10px'}}>
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            تسجيل الدخول باستخدام جوجل
          </button>

          <div className="divider">
            <span>أو استخدام البريد</span>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">البريد الإلكتروني</label>
              <div className="input-wrapper">
                <input 
                  type="email" 
                  id="email" 
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                <span className="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password">كلمة المرور</label>
              <div className="input-wrapper">
                <input 
                  type="password" 
                  id="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <span className="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
              </div>
            </div>

            <div className="login-options">
              <label className="checkbox-container">
                <input type="checkbox" />
                <span className="checkmark"></span>
                تذكرني
              </label>
              <a href="#" className="forgot-password">نسيت كلمة المرور؟</a>
            </div>

            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? (
                <span className="loader-inner">جاري التحميل...</span>
              ) : (
                'تسجيل الدخول'
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>ليس لديك حساب؟ <a href="#">أنشئ حساباً جديداً</a></p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

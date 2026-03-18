import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, MessageCircle, Mail, KeyRound, Smartphone, AlertCircle, ArrowRight } from 'lucide-react';

const authMethods = [
  { id: 'phone', label: 'رقم الهاتف (OTP)', icon: Smartphone },
  { id: 'whatsapp', label: 'دخول سريع (WhatsApp)', icon: MessageCircle },
  { id: 'email', label: 'البريد الإلكتروني', icon: Mail },
];

const LoginForm = ({ role, onBack }) => {
  const [method, setMethod] = useState('phone');
  
  // Supabase ready states
  const [credentials, setCredentials] = useState({
    phone: '',
    email: '',
    password: '',
    otp: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    // Clear error when typing
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  const validatePhone = (phone) => {
    // Basic validation: must be empty or start with 05 and have exactly 10 digits total if we consider leading 0, 
    // but here we just check length for demo purposes.
    if (!phone || phone.length < 9) return 'يرجى إدخال رقم هاتف صحيح';
    return null;
  };

  const supabaseHandleLogin = async (e) => {
    e.preventDefault();
    setErrors({});
    let currentErrors = {};

    if (method === 'phone') {
      const phoneError = validatePhone(credentials.phone);
      if (phoneError) {
        currentErrors.phone = phoneError;
        setErrors(currentErrors);
        return;
      }
      setIsLoading(true);
      // Simulate sending OTP
      setTimeout(() => {
        setIsLoading(false);
        if (!showOtpInput) setShowOtpInput(true);
        else alert('جار التحقق من الرمز...');
      }, 1500);
      return;
    }

    if (method === 'email') {
      if (!credentials.email.includes('@')) currentErrors.email = 'بريد إلكتروني غير صالح';
      if (credentials.password.length < 6) currentErrors.password = 'كلمة المرور قصيرة جداً';
      
      if (Object.keys(currentErrors).length > 0) {
        setErrors(currentErrors);
        return;
      }
      
      setIsLoading(true);
      // Simulate email login
      setTimeout(() => setIsLoading(false), 2000);
    }
  };

  // Micro-interaction presets
  const shakeAnimation = {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 }
  };

  const getRoleTitle = () => {
    const roleNames = {
      citizen: 'مواطن', student: 'طالب جامعي', merchant: 'تاجر / أعمال',
      farmer: 'مزارع', emergency: 'طوارئ / أمن'
    };
    return roleNames[role] || '';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      className="w-full max-w-md mx-auto"
    >
      <button 
        onClick={onBack} 
        className="flex items-center text-sm font-medium text-pal-green mb-8 hover:underline group"
      >
         <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
         عودة لاختيار الصفة
      </button>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
          تسجيل الدخول <span className="mx-2 text-gray-300 dark:text-gray-600">|</span> <span className="text-pal-green">{getRoleTitle()}</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          اختر طريقة الدخول الأنسب والأكثر أماناً لك.
        </p>
      </div>

      {/* Methods Selector */}
      <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl mb-8">
        {authMethods.map((m) => {
          const Icon = m.icon;
          const isActive = method === m.id;
          return (
            <button
              key={m.id}
              onClick={() => { setMethod(m.id); setShowOtpInput(false); setErrors({}); }}
              className={`flex-1 flex flex-col items-center justify-center p-3 rounded-lg text-sm transition-all duration-300 relative ${
                isActive ? 'text-pal-green shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeMethod"
                  className="absolute inset-0 bg-white dark:bg-pal-darkGray rounded-lg"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex flex-col items-center gap-1">
                <Icon className="w-5 h-5" />
                <span className="text-[10px] sm:text-xs font-semibold">{m.label}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Form Area */}
      <form onSubmit={supabaseHandleLogin} className="space-y-5">
        <AnimatePresence mode="popLayout">
          
          {/* Phone Form */}
          {method === 'phone' && (
            <motion.div
              key="phone-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-5"
            >
              <motion.div animate={errors.phone ? shakeAnimation : {}}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">رقم الهاتف المحمول</label>
                <div className="relative flex items-center border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-pal-green focus-within:border-pal-green transition-all pb-1 pt-1">
                  <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800 border-l border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 font-semibold flex items-center gap-1" dir="ltr">
                    +970 <span className="text-xs text-gray-400">|</span> 972
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={credentials.phone}
                    onChange={handleChange}
                    className="flex-1 w-full py-2 px-3 focus:outline-none bg-transparent dark:text-white"
                    placeholder="59xxxxxxx"
                    dir="ltr"
                    disabled={showOtpInput}
                  />
                  <Smartphone className="absolute right-3 w-5 h-5 text-gray-400" />
                </div>
                {errors.phone && (
                  <p className="mt-1 flex items-center text-sm text-red-500">
                    <AlertCircle className="w-4 h-4 mr-1" /> {errors.phone}
                  </p>
                )}
              </motion.div>

              <AnimatePresence>
                {showOtpInput && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="overflow-hidden"
                  >
                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">رمز التحقق (OTP)</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="otp"
                          value={credentials.otp}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-pal-green focus:border-pal-green bg-transparent dark:text-white tracking-widest text-center text-xl font-bold"
                          placeholder="••••"
                          maxLength={6}
                        />
                        <Fingerprint className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Email Form */}
          {method === 'email' && (
            <motion.div
              key="email-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-5"
            >
              <motion.div animate={errors.email ? shakeAnimation : {}}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">البريد الإلكتروني</label>
                <div className="relative flex items-center">
                  <input
                    type="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-pal-green focus:border-pal-green bg-transparent dark:text-white"
                    placeholder="name@example.com"
                    dir="ltr"
                  />
                  <Mail className="absolute left-3 w-5 h-5 text-gray-400" />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </motion.div>

              <motion.div animate={errors.password ? shakeAnimation : {}}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">كلمة المرور</label>
                <div className="relative flex items-center">
                  <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-pal-green focus:border-pal-green bg-transparent dark:text-white"
                    placeholder="••••••••"
                    dir="ltr"
                  />
                  <KeyRound className="absolute left-3 w-5 h-5 text-gray-400" />
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
              </motion.div>
            </motion.div>
          )}

          {/* WhatsApp Form (Placebo/Link) */}
          {method === 'whatsapp' && (
            <motion.div
              key="wa-form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-6"
            >
              <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="w-10 h-10 text-green-500" />
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                سيتم توجيهك إلى تطبيق WhatsApp لإرسال رسالة تحقق سريعة وآمنة.
              </p>
              <button
                type="button"
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-3.5 px-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                المتابعة عبر WhatsApp
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button (Hidden for WhatsApp as it has its own button) */}
        {method !== 'whatsapp' && (
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-pal-green hover:bg-green-600 text-white py-3.5 px-4 rounded-xl font-bold transition-all flex justify-center items-center mt-6 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-pal-green/30"
          >
            {isLoading ? (
               <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : showOtpInput ? 'تحقق للدخول' : 'المتابعة'}
          </button>
        )}
      </form>
    </motion.div>
  );
};

export default LoginForm;

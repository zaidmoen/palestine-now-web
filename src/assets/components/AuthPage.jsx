import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import RoleSelection from './RoleSelection';
import LoginForm from './LoginForm';
import { Moon, Sun } from 'lucide-react';

const AuthPage = () => {
  const [step, setStep] = useState('role'); // 'role' | 'login'
  const [selectedRole, setSelectedRole] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize dark mode from system preference or local storage (omitted for brevity, defaulting to false/light but toggleable)
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setStep('login');
  };

  const handleBackToRoles = () => {
    setStep('role');
    setSelectedRole(null);
  };

  return (
    <div className={`min-h-screen flex flex-col md:flex-row w-full ${isDarkMode ? 'dark' : ''} bg-gray-50 dark:bg-pal-dark transition-colors duration-500`}>
      
      {/* Dark Mode Toggle - Floating */}
      <button 
        onClick={toggleDarkMode}
        className="fixed top-6 left-6 z-50 p-3 rounded-full glass-card hover:scale-110 transition-transform"
        aria-label="Toggle Dark Mode"
      >
        {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-700" />}
      </button>

      {/* Left Panel - Creative Banner (Abstract Palestinian Flag Colors & Stats) */}
      <div className="hidden md:flex md:w-5/12 lg:w-1/2 relative overflow-hidden bg-pal-dark">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-pal-black/90"></div>
          <div className="absolute top-1/3 left-0 w-full h-1/3 bg-white/95"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-pal-green/90"></div>
          {/* Abstract Red Triangle representation */}
          <div className="absolute top-0 right-0 w-[40%] h-full bg-pal-red/90" style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }}></div>
          
          {/* Overlay gradient for modern feel */}
          <div className="absolute inset-0 bg-gradient-to-r from-pal-dark/80 to-transparent backdrop-blur-[2px]"></div>
        </div>

        {/* Content over banner */}
        <div className="relative z-10 flex flex-col justify-center p-12 lg:p-20 text-white h-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              البنية التحتية الرقمية <br/> لفلسطين
            </h1>
            <p className="text-xl text-gray-200 mb-12 max-w-md">
              بوابتك الموحدة للخدمات الحكومية والتجارية والتعليمية. آمنة، سريعة، وعصرية.
            </p>

            {/* Live Stats Simulation */}
            <div className="space-y-6">
              <div className="glass p-6 rounded-2xl border-l-4 border-l-pal-green">
                <div className="text-3xl font-bold mb-1">2.5M+</div>
                <div className="text-sm text-gray-300">مواطن مسجل بنجاح</div>
              </div>
              <div className="flex gap-4">
                <div className="glass p-4 rounded-xl flex-1 border-l-4 border-l-pal-red">
                  <div className="text-2xl font-bold mb-1">0.3s</div>
                  <div className="text-sm text-gray-300">استجابة طوارئ</div>
                </div>
                <div className="glass p-4 rounded-xl flex-1 border-l-4 border-l-blue-400">
                  <div className="text-2xl font-bold mb-1">50K+</div>
                  <div className="text-sm text-gray-300">طالب نشط</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Auth Forms */}
      <div className="w-full md:w-7/12 lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-y-auto">
        <div className="w-full max-w-md relative z-10">
          <AnimatePresence mode="wait">
            {step === 'role' ? (
              <RoleSelection key="role" onSelectRole={handleRoleSelect} />
            ) : (
              <div key="login" className="w-full">
                <LoginForm role={selectedRole} onBack={handleBackToRoles} />
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

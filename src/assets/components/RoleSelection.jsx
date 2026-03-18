import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, BookOpen, Briefcase, Tractor, User } from 'lucide-react';

const roles = [
  { id: 'citizen', title: 'مواطن', description: 'الوصول للخدمات العامة', icon: User, hoverColor: 'hover:border-blue-500 hover:shadow-blue-500/20' },
  { id: 'student', title: 'طالب جامعي', description: 'خدمات التعليم المستمر', icon: BookOpen, hoverColor: 'hover:border-purple-500 hover:shadow-purple-500/20' },
  { id: 'merchant', title: 'تاجر / أعمال', description: 'الخدمات التجارية والضريبية', icon: Briefcase, hoverColor: 'hover:border-amber-500 hover:shadow-amber-500/20' },
  { id: 'farmer', title: 'مزارع', description: 'الخدمات الزراعية والدعم', icon: Tractor, hoverColor: 'hover:border-pal-green hover:shadow-pal-green/20' },
  { id: 'emergency', title: 'طوارئ / أمن', description: 'بوابة الطوارئ السريعة', icon: ShieldAlert, hoverColor: 'hover:border-pal-red hover:shadow-pal-red/20' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

const RoleSelection = ({ onSelectRole }) => {
  return (
    <motion.div 
      className="w-full max-w-2xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold bg-gradient-to-l from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent mb-3">
          حدد صفتك للمتابعة
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          اختر هويتك للوصول إلى الخدمات المخصصة لك في البنية التحتية الرقمية
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <motion.button
              key={role.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectRole(role.id)}
              className={`
                flex flex-col items-center justify-center p-6 
                glass-card rounded-2xl text-center
                transition-all duration-300 border-2 border-transparent
                hover:shadow-xl ${role.hoverColor}
                group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 dark:focus:ring-offset-pal-dark
              `}
            >
              <div className="w-16 h-16 mb-4 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-8 h-8 text-gray-700 dark:text-gray-300 group-hover:text-current transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {role.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {role.description}
              </p>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default RoleSelection;

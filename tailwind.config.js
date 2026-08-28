/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00E676',
          hover:   '#00C853',
          dim:     'rgba(0,230,118,0.15)',
          glow:    'rgba(0,230,118,0.35)',
        },
        accent: {
          DEFAULT: '#FFD700',
          dim:     'rgba(255,215,0,0.12)',
        },
        bg: {
          DEFAULT: '#080C10',
          card:    '#0D1117',
          surface: '#111820',
          'surface-2': '#161E2A',
        },
        text: {
          primary:   '#F0F6FC',
          secondary: '#8B949E',
          muted:     '#484F58',
          light:     '#30363D',
        },
        border: {
          DEFAULT: 'rgba(255,255,255,0.06)',
          strong:  'rgba(255,255,255,0.12)',
          neon:    'rgba(0,230,118,0.3)',
        },
        red:    '#FF4757',
        blue:   '#00B4D8',
        purple: '#A855F7',
      },
      fontFamily: {
        tajawal: ['Tajawal', 'sans-serif'],
        cairo:   ['Cairo', 'sans-serif'],
      },
      boxShadow: {
        'glow-primary': '0 0 30px rgba(0,230,118,0.3), 0 0 60px rgba(0,230,118,0.1)',
        'glow-accent':  '0 0 30px rgba(255,215,0,0.3), 0 0 60px rgba(255,215,0,0.1)',
        'dark-lg':      '0 10px 40px rgba(0,0,0,0.6)',
        'dark-xl':      '0 20px 60px rgba(0,0,0,0.7)',
        island:         '0 12px 32px rgba(0,0,0,0.5), 0 2px 6px rgba(0,0,0,0.4)',
      },
      borderRadius: {
        sm:    '8px',
        md:    '16px',
        lg:    '24px',
        xl:    '32px',
        '2xl': '40px',
        '3xl': '48px',
      },
      animation: {
        'float':      'float 4s ease-in-out infinite',
        'spin-slow':  'spin 3s linear infinite',
        'fade-in':    'fadeIn 0.4s ease both',
        'slide-up':   'slideUp 0.5s ease both',
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        pulseNeon: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0,230,118,0.3)' },
          '50%':      { boxShadow: '0 0 30px rgba(0,230,118,0.7)' },
        },
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

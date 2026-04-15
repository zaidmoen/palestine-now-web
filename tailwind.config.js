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
          DEFAULT: '#145A32', // Deepened for better contrast
          hover:   '#0E4424',
          light:   '#1E8449',
          50:      '#E9F7EF',
          100:     '#D4EFDF',
        },
        accent: {
          DEFAULT: '#C07F00',
          light:   '#E59800',
          50:      '#FFF8EE',
        },
        bg: {
          DEFAULT: '#F9F8F6', // Warmer, premium Alabaster
          card:    '#FFFFFF',
          section: '#F2EFE9',
          muted:   '#EBEDEC',
        },
        text: {
          primary:   '#171717', // Neutral off-black
          secondary: '#4F4F4F',
          muted:     '#737373',
          light:     '#A3A3A3',
        },
        border: {
          DEFAULT: '#E5E5E5',
          strong:  '#D4D4D4',
        },
        success: '#145A32',
        error:   '#C0392B',
        warning: '#C07F00',
        info:    '#1A5276',
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      },
      boxShadow: {
        // Layered smooth shadows (2025 standard)
        xs:      '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        sm:      '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md:      '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg:      '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
        xl:      '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl':   '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
        card:    '0 4px 24px -4px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
        island:  '0 12px 32px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.04)',
      },
      borderRadius: {
        sm:  '8px',
        md:  '12px',
        lg:  '20px',
        xl:  '24px',
        '2xl': '32px',
        '3xl': '40px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'fade-in': 'fadeIn 0.4s ease both',
        'slide-up': 'slideUp 0.5s ease both',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      }
    },
  },
  plugins: [],
}

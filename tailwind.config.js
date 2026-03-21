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
          DEFAULT: '#1A6B3C',
          light: '#2A8A50',
          dark: '#0F4A28',
        },
        accent: {
          DEFAULT: '#D4A017',
          light: '#F0C040',
        },
        bg: '#0A0F0D',
        surface: {
          DEFAULT: '#111A14',
          2: '#1A2B1E',
          3: '#243320',
        },
        't1': '#F0F4F1',
        't2': '#8FA893',
        't3': '#566B5C',
        'pal-red': '#E74C3C',
        'pal-amber': '#E67E22',
        'pal-blue': '#2980B9',
        'pal-purple': '#8E44AD',
        'green-bright': '#27AE60',
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      },
      borderColor: {
        subtle: 'rgba(255,255,255,0.07)',
        'subtle-hover': 'rgba(255,255,255,0.14)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'mesh': 'mesh 20s ease-in-out infinite',
        'particle': 'particle-drift 15s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(26,107,60,0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(26,107,60,0.8), 0 0 40px rgba(26,107,60,0.4)' },
        },
        mesh: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'particle-drift': {
          '0%': { transform: 'translate(0, 0)', opacity: '0.3' },
          '25%': { transform: 'translate(30px, -50px)', opacity: '0.5' },
          '50%': { transform: 'translate(-20px, -100px)', opacity: '0.3' },
          '75%': { transform: 'translate(40px, -50px)', opacity: '0.5' },
          '100%': { transform: 'translate(0, 0)', opacity: '0.3' },
        },
      },
    },
  },
  plugins: [],
}

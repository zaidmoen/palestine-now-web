/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Palestinian Flag inspired abstract colors
        pal: {
          red: '#E4312b',
          green: '#149954',
          black: '#000000',
          white: '#FFFFFF',
          dark: '#121212',
          gray: '#F3F4F6',
          darkGray: '#1F2937'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

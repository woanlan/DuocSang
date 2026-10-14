/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '420px',
      },
      colors: {
        heritage: {
          red: '#991B1B',
          redDark: '#7F1D1D',
          redLight: '#DC2626',
          gold: '#D97706',
          goldLight: '#FBBF24',
          goldDark: '#B45309',
          cream: '#FDFBF7',
          creamDark: '#F7F2E9',
          parchment: '#F3E8D0',
          dark: '#1C1917',
          lotus: '#E11D48'
        }
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'heritage': '0 10px 25px -5px rgba(180, 83, 9, 0.1), 0 8px 10px -6px rgba(180, 83, 9, 0.1)',
        'heritage-lg': '0 20px 30px -10px rgba(153, 27, 27, 0.15)',
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        rose: {
          950: '#14070d',
          900: '#2a0d17',
          800: '#431224',
          700: '#67253d',
          600: '#8a394d',
          500: '#b8556d',
          400: '#d98da6',
          300: '#f0b5c4',
          200: '#f9d8e3',
          100: '#fdeaf4',
        },
        cream: '#fef9f6',
        gold: '#d8b77a',
      },
      boxShadow: {
        glow: '0 0 30px rgba(255, 182, 206, 0.25)',
      },
      backgroundImage: {
        grain: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}


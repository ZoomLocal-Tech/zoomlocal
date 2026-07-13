/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ZoomLocal brand azure blue (matches the logo's bright blue)
        brand: {
          50: '#eff8ff',
          100: '#daeeff',
          200: '#bce1ff',
          300: '#8eccff',
          400: '#59b0ff',
          500: '#1e90ff', // logo blue
          600: '#1476e6', // primary (buttons)
          700: '#125fbf',
          800: '#154f9b',
          900: '#17447f',
          950: '#0f2b52',
        },
        // ZoomLocal accent green (matches the logo's emerald arrow)
        accent: {
          50: '#e9fbf3',
          100: '#c9f6e2',
          200: '#95edc7',
          300: '#5bddaa',
          400: '#2ecb8e', // logo green
          500: '#16b67c',
          600: '#0b9566',
          700: '#0d7754',
          800: '#105e44',
          900: '#0f4d3a',
        },
        ink: {
          DEFAULT: '#0f172a', // slate-900 headings
          soft: '#334155', // slate-700 body
          mute: '#64748b', // slate-500 muted
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        brand: '0 20px 45px -15px rgba(37, 99, 235, 0.35)',
        'brand-lg': '0 30px 70px -20px rgba(37, 99, 235, 0.45)',
        card: '0 10px 30px -12px rgba(15, 23, 42, 0.12)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)', opacity: '0.35' },
          '50%': { transform: 'translateY(-22px) translateX(10px)', opacity: '0.9' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -30px) scale(1.08)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.94)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.85)', opacity: '0.6' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
        blob: 'blob 18s ease-in-out infinite',
        shimmer: 'shimmer 2.2s infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}

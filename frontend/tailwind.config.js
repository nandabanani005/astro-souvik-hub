/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          dark: '#0B0813',
          deep: '#130F26',
          purple: '#341B54',
          gold: '#D4AF37',
          accentGold: '#F3E5AB'
        }
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #0B0813 0%, #1A0F33 50%, #05020A 100%)',
      }
    },
  },
  plugins: [],
}
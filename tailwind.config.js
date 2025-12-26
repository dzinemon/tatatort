// const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: true,
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/templates/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./gatsby-browser.js"
  ],
  safelist: [
    'is-active',
    'dr-dwn',
    'max-h-screen',
    'opacity-100',
    'max-h-0',
    'opacity-0'
  ],
  theme: {
    extend: {
      container: {
        padding: '1rem',
        center: true
      },
      fontFamily: {
        poiret: "'Poiret One', sans-serif",
        roboto: "'Roboto', sans-serif",
      },
      colors: {
        primary: {
          50: '#ecfeff', // cyan-50
          100: '#cffafe', // cyan-100
          200: '#a5f3fc', // cyan-200
          300: '#67e8f9', // cyan-300
          400: '#22d3ee', // cyan-400
          500: '#06b6d4', // cyan-500
          600: '#0891b2', // cyan-600
          700: '#0e7490', // cyan-700
          800: '#155e75', // cyan-800
          900: '#164e63', // cyan-900
        },
        secondary: {
          50: '#fff1f2', // rose-50
          100: '#ffe4e6', // rose-100
          200: '#fecdd3', // rose-200
          300: '#fda4af', // rose-300
          400: '#fb7185', // rose-400
          500: '#f43f5e', // rose-500
          600: '#e11d48', // rose-600
          700: '#be123c', // rose-700
          800: '#9f1239', // rose-800
          900: '#881337', // rose-900
        },
        neutral: {
          50: '#f8fafc', // slate-50
          100: '#f1f5f9', // slate-100
          200: '#e2e8f0', // slate-200
          300: '#cbd5e1', // slate-300
          400: '#94a3b8', // slate-400
          500: '#64748b', // slate-500
          600: '#475569', // slate-600
          700: '#334155', // slate-700
          800: '#1e293b', // slate-800
          900: '#0f172a', // slate-900
        }
      }
    },
  },
  plugins: [],
}


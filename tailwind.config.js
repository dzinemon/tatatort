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
      }
    },
  },
  plugins: [],
}


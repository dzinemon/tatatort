// const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: true,
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/templates/**/*.{js,jsx,ts,tsx}",
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


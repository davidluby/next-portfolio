/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [

    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      'res': '950px',
      'app': '1000px',
      'fhd': '1800px'
    },
    fontFamily: {
      'base': ["Segoe UI Variable", "Trebuchet MS", "Arial", "Helvetica", "sans-serif", "Times New Roman"]
    },
    extend: {
      transitionProperty: {
        'spacing': 'margin'
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#9333ea',
        'primary-light': '#a855f7',
        'gray-bg': '#f9fafb',
      }
    },
  },
  plugins: [],
}


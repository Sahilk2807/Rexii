/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './main.ts',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // A nice modern font
      },
    },
  },
  plugins: [],
}
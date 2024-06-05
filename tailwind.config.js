/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black-gold': '#1d1d1d',
        'gold': '#FFD700',
      },
      backgroundImage: {
        'black-cardboard':  "url('./asset/black-bg.jpg')",
      }
    },
  },
  plugins: [],
}
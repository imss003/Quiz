/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'lavishly': "'Lavishly Yours', serif",
        'langar': '"Langar", serif'
      }
    },
  },
  plugins: [],
}
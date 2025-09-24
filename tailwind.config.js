/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        club: {
          black: '#000000',
          silver: '#C0C0C0',
          'silver-dark': '#A8A8A8',
          'silver-light': '#E8E8E8',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

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
          red: '#DC2626',
          'red-light': '#FEE2E2',
          'red-dark': '#991B1B',
          'red-glow': '#F87171',
          'red-accent': '#EF4444',
          'red-subtle': '#FCA5A5',
          'red-neon': '#FF0000',
          'red-fire': '#FF4500',
          'red-crimson': '#DC143C',
          'red-electric': '#FF073A',
        }
      },
      boxShadow: {
        'red-glow': '0 0 20px rgba(220, 38, 38, 0.3)',
        'red-glow-lg': '0 0 30px rgba(220, 38, 38, 0.4)',
        'red-neon': '0 0 40px rgba(255, 0, 0, 0.6), 0 0 80px rgba(255, 0, 0, 0.4), 0 0 120px rgba(255, 0, 0, 0.2)',
        'red-fire': '0 0 30px rgba(255, 69, 0, 0.5), 0 0 60px rgba(255, 69, 0, 0.3)',
        'red-electric': '0 0 25px rgba(255, 7, 58, 0.7), 0 0 50px rgba(255, 7, 58, 0.5), 0 0 75px rgba(255, 7, 58, 0.3)',
        'red-pulse': '0 0 0 0 rgba(220, 38, 38, 0.7)',
      },
      animation: {
        'red-pulse': 'red-pulse 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite',
        'red-glow-pulse': 'red-glow-pulse 3s ease-in-out infinite',
        'red-breathe': 'red-breathe 4s ease-in-out infinite',
        'red-shimmer': 'red-shimmer 2s linear infinite',
        'red-float': 'red-float 6s ease-in-out infinite',
        'progress-bar': 'progress-bar 2s ease-in-out',
        'fade-in': 'fade-in 1s ease-in-out',
      },
      keyframes: {
        'red-pulse': {
          '0%': { boxShadow: '0 0 0 0 rgba(220, 38, 38, 0.7)' },
          '70%': { boxShadow: '0 0 0 20px rgba(220, 38, 38, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(220, 38, 38, 0)' },
        },
        'red-glow-pulse': {
          '0%, 100%': { filter: 'brightness(1) drop-shadow(0 0 20px rgba(220, 38, 38, 0.3))' },
          '50%': { filter: 'brightness(1.2) drop-shadow(0 0 40px rgba(220, 38, 38, 0.6))' },
        },
        'red-breathe': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
        'red-shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'red-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'progress-bar': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

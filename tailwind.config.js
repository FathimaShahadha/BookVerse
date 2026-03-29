
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        navy: '#1a1a2e',
        amber: {
          DEFAULT: '#d4a574',
          light: '#e8c8a5',
          dark: '#b88a5a',
        },
        cream: {
          DEFAULT: '#faf7f2',
          dark: '#f0eade',
        },
        burgundy: '#8b2252',
        forest: '#2d5016',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'warm': '0 4px 20px -2px rgba(212, 165, 116, 0.15), 0 0 3px rgba(26, 26, 46, 0.05)',
        'warm-lg': '0 10px 30px -3px rgba(212, 165, 116, 0.2), 0 4px 6px -2px rgba(26, 26, 46, 0.05)',
        'inner-warm': 'inset 0 2px 4px 0 rgba(212, 165, 116, 0.06)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'book-cover-1': 'linear-gradient(135deg, #1a1a2e 0%, #2a2a4a 100%)',
        'book-cover-2': 'linear-gradient(135deg, #8b2252 0%, #a33266 100%)',
        'book-cover-3': 'linear-gradient(135deg, #2d5016 0%, #3e6b20 100%)',
        'book-cover-4': 'linear-gradient(135deg, #d4a574 0%, #e8c8a5 100%)',
      }
    },
  },
  plugins: [],
}

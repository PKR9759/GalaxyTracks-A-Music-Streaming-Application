/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        
        blue: {
          DEFAULT: '#000000', // black
          50: '#ffffff',      // white
          100: '#000000',
          200: '#000000',
          300: '#000000',
          400: '#000000',
          500: '#000000',
          600: '#000000',
          700: '#000000',
          800: '#000000',
          900: '#000000',
        },
        
        red: {
          DEFAULT: '#ff0000',
          500: '#ff0000',
        },
      },
    },
  },
  variants: {},
  plugins: [],
}


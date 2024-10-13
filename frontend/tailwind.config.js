/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          500: '#ffffff', // Override default blue with white or another color you prefer
        },
      },
    },
  },
  variants: {},
  plugins: [],
}


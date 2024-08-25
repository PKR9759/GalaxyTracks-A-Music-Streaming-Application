/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'white-glow': '0 0 10px rgba(255, 255, 255, 0.5)',
        'white-hover': '0 0 15px rgba(255, 255, 255, 0.8)',
        'white-click': '0 0 20px rgba(255, 255, 255, 1), inset 0 0 10px rgba(255, 255, 255, 0.7)',
      },
    },
  },
  plugins: [],
}

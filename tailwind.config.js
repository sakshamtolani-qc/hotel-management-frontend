/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#FFFFFF',
          100: '#EFF0F2', 
          500: '#484848',
          900: '#212121',
        }
      }
    },
  },
  plugins: [],
}
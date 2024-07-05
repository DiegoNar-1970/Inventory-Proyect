/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'text-menu':'#c4c7c5',
        'fondo-menu':'#1b1b1b',
  
      }
    },
  },
  plugins: [],
}


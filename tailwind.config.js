/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        "bg": "#312e2b",
        "greenSquare":"#739552",
        "whiteSquare":"#ebecd0"
      }
    },
  },
  plugins: [],
};

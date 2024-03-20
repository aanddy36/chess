/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#312e2b",
        greenSquare: "#739552",
        whiteSquare: "#ebecd0",
        selectedSquare: "#FFFF33",
        whiteSelected: "#F5F682",
        greenSelected: "#B9CA43",
        blackBtn: "#141413",
        greenBorder: "#9BC95D",
        greenHover: "#bfe294",
        timerBtn: "#454441",
        timerHover: "#706e6a",
        bulletLogo: "#E3AA24",
        blitzLogo: "#FAC22E",
      },
      screens: {
        full: "970px",
        semi: "850px",
        laptop: "750px",
        tablet: "490px",
      },
    },
  },
  plugins: [],
};

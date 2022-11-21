/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "moon-blue": "#0B3B8E",
        "moon-orange": "#D7594F",
        "moon-gold": "#F9B95C",
        "moon-deepblue": "#132456",
        "moon-pink": "#ff03f8",
        "moon-salmon": "#e76e6b",
        "moon-lightblue": "#69e9f1",
        "calendar-deepblue":"#101829",
        "calendar-deepblue-hover":"#182133"
      },
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
        GoodTimes: ["Good Times", "sans-serif"],
      },
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      'treasury': '1396px'
    },
  },
  darkMode: "class",
  plugins: [],
};

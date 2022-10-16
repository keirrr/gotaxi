/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat"],
      },
      animation: {
        slide: "slide 3s ease-in-out 1",
      },
      keyframes: {
        slide: {
          "0%, 100%": { opacity: "0" },
          "10%, 90%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
  variants: {
    scrollbar: ["rounded"],
  },
};

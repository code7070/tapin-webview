/** @type {import('tailwindcss').Config} */

// const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{html,js}", "./src/**/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        ottoGrey: {
          100: "#4f4f4f",
          200: "#778892",
          300: "#828282",
          400: "#EBEFF0",
          500: "#E1E1E1",
          600: "#F2F2F2",
          700: "#CAD6DA",
        },
        ottoBlue: {
          100: "#002E59",
          150: "#0E72B0",
          200: "#138DD7",
          300: "#2D3944",
          400: "#0F3B63",
          500: "#5B97B8",
          700: "#E5FAFE",
          900: "#F6F9FA",
        },
      },
    },
  },
  plugins: [require("daisyui")],
  safelist: [
    // {pattern:/(bg|text|border)-ottoBlue(Purple|Pink|Orange|Yellow|Lime|Mint|Test|Test2)/}
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: "#2D3944",
        },
      },
    ],
  },
};

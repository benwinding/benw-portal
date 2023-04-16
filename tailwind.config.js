const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      "xs": "450px",
      ...defaultTheme.screens,
    },
    extend: {
      fontSize: {
        "10xl": "5rem",
        "12xl": "6.5rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    // ...
  ],
};

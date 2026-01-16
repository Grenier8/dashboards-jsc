// tailwind.config.js
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        poetsen: ["Poetsen One", "sans-serif"],
        spectral: ["Spectral", "serif"],
        inter: [
          "Inter",
          "Segoe UI",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        libre: ["Libre Franklin", "sans-serif"],
      },
    },
  },
  plugins: [],
};

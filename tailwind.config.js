// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "custom-dark": "#1f1f1f", // not pure black
        "custom-light": "#ffffff",
      },
    },
  },
  plugins: [],
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        wide: { raw: "(min-aspect-ratio: 10/5)" },
      },
    },
  },
  plugins: [],
};

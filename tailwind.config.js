module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        wide: { raw: "(min-aspect-ratio: 7/5)" },
      },
      colors: {
        slate: {
          350: "#AEBCCD",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: "680px",
      md: "968px",
      lg: "1076px",
      xl: "1440px",
    },
    plugins: [],
  },
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1F4E79",
          dark: "#132F49",
        },
        secondary: "#F5F5F5",
        accent: {
          DEFAULT: "#404040",
          dark: "#202020",
        },
      },
    },
  },
  plugins: [],
};

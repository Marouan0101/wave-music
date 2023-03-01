/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#46C0FF",
        secondary: "#C042D4",
        green: "#5AFD0A",
        "grey-light": "#B4B4B4",
        "grey-dark": "#3D3C40",
        "background-light": "#161825",
        background: "#0F111A",
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",           // Include the main HTML file (if using Vite)
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all JS/TSX files in src
    "./src/components/**/*.{js,jsx,ts,tsx}" // Include components directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


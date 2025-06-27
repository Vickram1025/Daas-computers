


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}", // Ensure this includes all component and page files
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue-dark': '#1e3a8a', // Dark blue from gradient
        'custom-blue-light': '#3b82f6', // Light blue from gradient
        'custom-gray': '#f0f0f0', // Sidebar text color
      },
      boxShadow: {
        'custom-lg': '0 10px 30px rgba(0, 0, 0, 0.3)', // Container shadow
        'custom-md': '0 4px 20px rgba(59, 130, 246, 0.3)', // Title shadow
        'custom-sm': '0 4px 12px rgba(0, 0, 0, 0.1)', // Sidebar shadow
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'], // Add Roboto font family
      },
      animation: {
        'shimmer': 'shimmer 2.5s infinite', // Custom shimmer animation
        'blink': 'blink 1s infinite', // Custom blink animation
      },
    },
  },
  plugins: [],
  // Note: Ensure Webpack is configured to handle assets (e.g., images in src/assets/)
  // Example Webpack rule: { test: /\.(png|jpe?g|gif|svg)$/, type: 'asset/resource', generator: { filename: 'assets/[name][ext]' } }
};
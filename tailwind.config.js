/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E90FF',
        secondary: '#F5F5F5',
        textDark: '#333333',
        textBody: '#666666',
        accent: '#FF6347'
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
}

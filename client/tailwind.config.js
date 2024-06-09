/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e3e4e8', // Variación muy clara
          100: '#c2c4cf', // Variación clara
          200: '#9ea0b3', // Variación más clara
          300: '#7a7c96', // Variación moderadamente clara
          400: '#5d607f', // Variación media
          500: '#06163A', // Color primario base
          600: '#040e2d', // Variación moderadamente oscura
          700: '#030921', // Variación oscura
          800: '#020615', // Variación muy oscura
          900: '#01030a', // La variación más oscura
        },
        secondary: {
          50: '#ffeae6', // Variación muy clara
          100: '#ffc8bf', // Variación clara
          200: '#ffa295', // Variación más clara
          300: '#ff7c6a', // Variación moderadamente clara
          400: '#ff5d4a', // Variación media
          500: '#FF3514', // Color secundario base
          600: '#e63012', // Variación moderadamente oscura
          700: '#cc2a0f', // Variación oscura
          800: '#b3240d', // Variación muy oscura
          900: '#80180a', // La variación más oscura
        },
      }
    },
  },
  plugins: [],
}


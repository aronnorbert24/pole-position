/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        header: ['Neue Haas Grotesk Display Pro', 'sans-serif'],
        priority: ['Inter', 'sans-serif'],
        title: ['SF Pro Text', 'sans-serif'],
        zIndex: {
          9999: '9999',
        },
      },
    },
    screens: {
      phone: { max: '800px' },
      computer: '801px',
    },
  },
  plugins: [],
}

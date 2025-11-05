/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    container: { center: true, padding: '1rem' },
    extend: {
      colors: { crema: '#F2EBD8', carbón: '#2B2521', tinta: '#3C3A37' },
      fontFamily: { serif: ['"Cormorant Garamond"', 'serif'], sans: ['Inter','ui-sans-serif','system-ui'] },
      letterSpacing: { tightish: '-0.01em' },
    },
  },
  plugins: [],
};

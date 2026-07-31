/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        oxblood: '#3A0017',
        burgundy: '#600024',
        berry: '#801A40',
        crimson: '#B8405E',
        ivory: '#F4EFE3',
        champagne: '#E9DDD6',
        taupe: '#C8B7AD',
        stone: '#8D8D8D',
        charcoal: '#2B2B2B',
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'serif'],
        subheading: ['"Playfair Display"', 'serif'],
        handwritingPrimary: ['"Caveat"', 'cursive'],
        bodySecondary: ['"Inter"', 'sans-serif'],
      },
      fontSize: {
        'fluid-hero': 'clamp(2.5rem, 7vw, 5rem)',
        'fluid-h1': 'clamp(1.5rem, 5vw, 3rem)',
        'fluid-body': 'clamp(1rem, 2.8vw, 1.15rem)',
        'fluid-handwriting': 'clamp(1.2rem, 3.5vw, 1.8rem)',
      },
      boxShadow: {
        'page': '-5px 0 15px rgba(0,0,0,0.1), inset -2px 0 5px rgba(0,0,0,0.05)',
      }
    },
  },
  plugins: [],
}

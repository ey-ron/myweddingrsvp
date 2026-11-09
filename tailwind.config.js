/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs': '380px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      'tall': { 'raw': '(min-height: 820px)' },
    },
    extend: {
      colors: {
        champagne: {
          50: '#FDFBF7',
          100: '#F7F3EB',
          200: '#EDE4D4',
          300: '#DFD0B7',
          400: '#CEB894',
          500: '#B89B6D',
          600: '#9E8052',
          700: '#7E633C',
          800: '#604A2C',
          900: '#42331E',
        },
        ivory: {
          50: '#FCFBF9',
          100: '#F9F6F0',
          200: '#F3EDE2',
          300: '#EDE4D5',
        },
        sage: {
          50: '#F4F6F4',
          100: '#E6ECE6',
          200: '#CFDBCF',
          500: '#6F8471',
          700: '#4A5B4C',
        },
        charcoal: {
          800: '#2A2725',
          900: '#1A1817',
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', '"Playfair Display"', 'Georgia', 'serif'],
        script: ['var(--font-alex-brush)', '"Alex Brush"', 'cursive'],
        sans: ['var(--font-jakarta)', '"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(184, 155, 109, 0.12), 0 0 1px 1px rgba(184, 155, 109, 0.1)',
        'card': '0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 0 1px 1px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
};

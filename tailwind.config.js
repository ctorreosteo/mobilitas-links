/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          'blue-dark': '#002552',
          'green': '#72fa93',
          'cream': '#F4F4F4',
        },
        primary: {
          50: '#e6f0ff',
          100: '#cce0ff',
          200: '#99c2ff',
          300: '#66a3ff',
          400: '#3385ff',
          500: '#002552', // brand blue-dark
          600: '#002147',
          700: '#001d3c',
          800: '#001931',
          900: '#001526',
        },
        secondary: {
          50: '#f0fef4',
          100: '#e1fde9',
          200: '#c3fbd3',
          300: '#a5f9bd',
          400: '#87f7a7',
          500: '#72fa93', // brand green
          600: '#5ef885',
          700: '#4af677',
          800: '#36f469',
          900: '#22f25b',
        },
        cream: {
          50: '#fefefe',
          100: '#fdfdfd',
          200: '#fbfbfb',
          300: '#f9f9f9',
          400: '#f7f7f7',
          500: '#F4F4F4', // brand cream
          600: '#e6e6e6',
          700: '#d8d8d8',
          800: '#cacaca',
          900: '#bcbcbc',
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      backgroundColor: {
        'brand-blue': 'var(--color-blue-dark)',
        'brand-green': 'var(--color-green)',
        'brand-cream': 'var(--color-cream)',
      },
      textColor: {
        'brand-blue': 'var(--color-blue-dark)',
        'brand-green': 'var(--color-green)',
        'brand-cream': 'var(--color-cream)',
      },
      borderColor: {
        'brand-blue': 'var(--color-blue-dark)',
        'brand-green': 'var(--color-green)',
        'brand-cream': 'var(--color-cream)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

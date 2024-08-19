/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        deepSkyBlue: '#0080FF',
        easterPurple: '#CA6CF4',
        denimBlue: '#67C2EA',
        darkBlue: '#07589B',
        text: '#222222',
      },
      backgroundImage: {
        "gradient": "linear-gradient(90deg, #0080FF 0%, #CB6CF4 100%)",
      }
    },
    screens: {
      '2xl': { max: '1450px' },
      xl: { max: '1280px' },
      lg: { max: '1024px' },
      md: { max: '768px' },
      sm: { max: '660px' },
      xs: { max: '480px' }
    }
  },
  plugins: [],
}


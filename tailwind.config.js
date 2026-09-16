/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F2E8D9',
        surface: '#FBF5EB',
        'surface-2': '#EFE3CF',
        green: {
          DEFAULT: '#7B956A',
          dark: '#5C7249',
          light: '#A8BF97',
        },
        brown: {
          DEFAULT: '#2D1E14',
          light: '#5C3D2E',
        },
        gold: '#C9A84C',
        terracotta: '#C4703C',
        text: {
          DEFAULT: '#3D2B1F',
          muted: '#7D6358',
          light: '#A89185',
        },
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        lato: ['Lato', 'sans-serif'],
        cairo: ['Cairo', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

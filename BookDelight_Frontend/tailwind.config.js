/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        dancing: ['"Dancing Script"', 'cursive'],
      },
      colors: {
        'custom-light-blue':'#6b7aa1',
        'custom-hover-light-blue':'#4b5c93',
        'custom-dark-blue':'#11324D',
        'custom-hover-dark-blue':'#082840',

        'custom-new-dark': '#495464',
        'custom-new-light-dark': '#BBBFCA',
        'custom-new-light': '#E8E8E8',
        'custom-new-white': '#F4F4F2',
        'custom-new-dark-hover': '#262c37',
      },
      keyframes: {
        spinOnce: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        spinOnce: 'spinOnce 1s ease-in-out',
      },
    },
  },
  plugins: [],
}

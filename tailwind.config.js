/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', // 이거 안 적으면 index.html 안 읽힘!!
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
      extend: {},
      screens: {
        'xs': '480px',       // 직접 추가
        'sm': '640px',
        'md': '768px',
        'lg': '1024px', //태블릿
        'xl': '1280px', //PC
        '2xl': '1536px',
      },
  },
  plugins: [
    require('@tailwindcss/scrollbar'),
  ],
  darkMode: 'class',
}
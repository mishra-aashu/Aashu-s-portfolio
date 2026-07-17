/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  safelist: [
    {
      pattern: /(bg|text|border|from|to|shadow|ring)-(cyan|blue|purple|green|red|amber|emerald|orange|rose|pink|yellow|slate)-(50|100|200|300|400|500|600|700|800|900)(\/(5|10|20|30|40|50))?/,
      variants: ['hover', 'dark', 'group-hover', 'dark:hover', 'dark:group-hover', 'dark:hover:group-hover'],
    },
  ],
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}',"./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}"],
  theme: {
    colors: {
      'rose100' : '#ffe4e6',
      'rose200' : '#fecdd3',
      'rose300' : '#fda4af',
      'rose400' : '#fb7185',
      'gray100' : '#f3f4f6'
    },
    fontFamily:{
      'climate-crisis' : 'Climate Crisis',
      'concert-one' : 'Concert One',
      'pacifico' : 'Pacifico',
      'rokkitt' : 'Rokkitt',
      'shantell-sans' : 'Shantell Sans',
      'titan-one' : 'Titan One'
    },
    extend: {},
  },
  plugins: [require('flowbite/plugin'), require("daisyui")],
  daisyui: {
    themes: false,
  },
}

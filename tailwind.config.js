const {default: flattenColorPalette} = require('tailwindcss/lib/util/flattenColorPalette');
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'default': '#0f0e1a',
        'primary-light': '#e0e3f2',
        'secondary-light': '#c2c5d7',
        'primary-dark': '#65697d',
        'secondary-dark': '#4b5061',
        'nav': 'rgba(3,7,18,0.5)',
        'btnhover': 'rgba(71,85,105,0.3)',
      },
      fontFamily: {
        'space': ['"Space Grotesk Variable"', '"Space Grotesk"', 'system-ui', 'sans-serif'],
        'karla': ['"Karla Variable"', '"Karla"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '10xl': '10rem',
        '11xl': '12.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl':'2.5rem',
      },
      spacing: {
        '88': '22rem',
      },
    },
  },
  plugins: [{
    handler: tw => {
      tw.matchUtilities({
        'text-glow': value => ({
          'text-shadow': `0 0 5px ${value}, 0 0 150px ${value}`,
        }),
        'glow': value => ({
          filter: `drop-shadow(0px 0px 8px ${value})`,
        }),
      },
      {
        values: flattenColorPalette(tw.theme('colors')),
        type: 'color',
      });
    }
  }],
}

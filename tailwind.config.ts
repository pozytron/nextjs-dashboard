import type { Config } from 'tailwindcss';
import plugin from "tailwindcss/plugin";

const config: Config = {
  safelist: [
    {
      pattern: /bg-*/,
    },
    {
      pattern: /border-*/,
    },
  ],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
    },
    colors: {
      transparent: "transparent",
      current: "current",
      white: "#f4f4f4",
      accent: "#75ff75",
      grey: {
        200: "#FCFCFC",
        300: "#F7F7F7",
        400: "#EBEBEB",
        500: "#ABABAB",
        600: "#999999",
        700: "#666666",
        800: "#333333",
      },
      red: {
        '50': '#ffeeee',
        '100': '#ffdada',
        '200': '#ffbbbb',
        '300': '#ff8b8b',
        '400': '#ff4949',
        '500': '#ff1111',
        '600': '#ff0000',
        '700': '#e70000',
        '800': '#be0000',
        '900': '#a40000',
        '950': '#560000',
      },
      green: {
        '50': '#f4ffe6',
        '100': '#e8fec9',
        '200': '#d0fd99',
        '300': '#b1f85e',
        '400': '#92ee2d',
        '500': '#72d40e',
        '600': '#4e9a06',
        '700': '#42810a',
        '800': '#36650f',
        '900': '#2f5611',
        '950': '#153003',
      },
      gold: {
        '50': '#fef8ee',
        '100': '#fef0d6',
        '200': '#fcddac',
        '300': '#f9c478',
        '400': '#f6a141',
        '500': '#f38823',
        '600': '#e46a12',
        '700': '#bd5011',
        '800': '#964016',
        '900': '#793615',
        '950': '#411909',
      },

      creme: {
        100: "#fdedde",
        300: "#fddebf",
        500: "#fbdbac",
        600: "#FFCB70"
      },
      peach: {
        400: "#f38823",
        500: "#f27d6b",
        DEFAULT: "#f27d6b",
      },
      leo: {
        300: "#9D78A2",
        500: "#7F3F80",
        800: '#513073'
      },
      tosia: {
        500: "#c867a8",
        800: "#B01E44"
      },
      plazmus: {
        500: "#f8a31a",
        800: "#913026"
      },
      aloszka: {
        500: "#fc3065"
      }
    },
    fontFamily: {
      sans: ["Lexend", "sans"],
      serif: ["Titan One", "Corben", "serif"],
      mono: ["VT323", "monospace"],
    },
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
            'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        "planet": {
          "0%": {transform: "rotateZ(0deg)"},
          "100%": {transform: "rotateZ(360deg)"},
        },
        "ball": {
          "0%": {transform: "rotateZ(0deg)"},
          "20%": {opacity: '0.5'},
          "40%": {opacity: '1'},
          "50%": {opacity: '0.3'},
          "60%": {opacity: '1'},
          "100%": {transform: "rotateZ(360deg)"},
        },
        "motion": {
          '0%': {transform: 'translateY(0%) '},
          '10%': {transform: 'translateY(-15%) '},
          '20%': {transform: 'translateY(0%) '},
          '30%': {transform: 'translateY(-7%) '},
          '40%': {transform: 'translateY(0%) '},
          '50%': {transform: 'translateY(-3%) '},
          '70%': {transform: 'translateY(0%) '},
          '80%': {transform: 'translateY(-15%) '},
          '90%': {transform: 'translateY(0%) '},
          '95%': {transform: 'translateY(-7%) '},
          '97%': {transform: 'translateY(0%) '},
          '99%': {transform: 'translateY(-3%) '},
          '100%': {transform: 'translateY(0)'}
        },
        'cardspin': {
          '0%': {transform: 'rotateY(0deg) '},
          '100%': {transform: 'rotateY(1350deg) '},
        },
        'explode': {
          '0%': {transform: 'scale(0)', opacity: '0'},
          '60%': {transform: 'scale(2)', opacity: '0.7'},
          '100%': {transform: 'scale(3.2)', opacity: '0'},
        }
      },
      animation: {
        "planet": "planet 30s linear infinite",
        "ball": "ball 10s linear infinite",
        "motion": "motion 12s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite",
        "cardspin": "cardspin 4s ease-out forwards",
        "explode": "explode 1s linear infinite",
      },
      colors: {
        blue: {
          400: '#2589FE',
          500: '#0070F3',
          600: '#2F6FEB',
        },
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [
      require('@tailwindcss/forms'),
    plugin(function ({addVariant}) {
      addVariant("child", "& > *");
    }),
    // @ts-ignore
    function ({addUtilities}: { addUtilities: (newUtilities: {}, strings: string[]) => void }) {
      const newUtilities = {};
      const remBase = 16;
      const fontSizeLimit = 60;
      const fontSizeIncrement = 4;
      const fontSizeCustomAddons = [10, 14];
      const fontSizeAmount =
          (fontSizeLimit + fontSizeIncrement) / fontSizeIncrement;
      for (let index = 0; index < fontSizeAmount; index++) {
        // @ts-ignore
        newUtilities[`.text-${index * fontSizeIncrement}`] = {
          fontSize: `${(index * fontSizeIncrement) / remBase}rem`,
        };
      }
      fontSizeCustomAddons.forEach((size) => {
        // @ts-ignore
        newUtilities[`.text-${size}`] = {
          fontSize: `${size / remBase}rem`,
        };
      });

      addUtilities(newUtilities, ['responsive', 'hover']);
    },

  ],
};
export default config;

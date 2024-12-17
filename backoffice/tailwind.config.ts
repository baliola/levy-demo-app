import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "rgba(3, 48, 147, 1)",
        "primary-blur": "rgba(3, 48, 147, 0.5)",
        "primary-border": "rgba(105, 148, 242, 1)",
        "skeleton": "#CDCED1",
        "auth-card": "rgba(245, 245, 245, 0.5)",
      },
      backgroundImage: {
        "auth-input": "linear-gradient(98.31deg, #D7E1F8 11.27%, #C1D2F8 103.64%)",
        "auth-hero": "url('/images/auth/auth-hero.svg')",
        "auth-bg": "linear-gradient(241.15deg, #FFFFFF 1.34%, #BFC9FF 98.4%)",
        "gradient-active-sidebar": "linear-gradient(90deg, #FFFFFF 0%, rgba(202, 231, 253, 0.24) 0%, #CAD5FF 100%)",
        "gradient-active-sidebar-grayscale": "linear-gradient(90deg, #FFFFFF 0%, #C5C5C5 0%, #F5F5F5 100%)",
      },
      gridTemplateColumns: {
        '20': 'repeat(20, minmax(0, 1fr))',
      },
      dropShadow: {
        "action-column": "drop-shadow(-8px 0px 10px #000000);"
      }
    },
  },
  plugins: [],
};

export default config;

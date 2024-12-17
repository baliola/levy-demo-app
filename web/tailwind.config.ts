import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "loading-spin": "spin 2.5s linear infinite",
        "skeleton-card": "skeletonCard 1.2s linear infinite alternate",
        "skeleton-card-dark": "skeletonCardDark 1.2s linear infinite alternate",
        "skeleton-item": "skeletonItem 1.2s linear infinite alternate",
        "skeleton-item-dark": "skeletonItemDark 1.2s linear infinite alternate",
        "stat-pulse": "statPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;"
      },
      colors: {
        "primary": "#033093",
        "dark-primary": "rgba(16, 17, 18, 1)",
        "dark-active-sidebar": "rgba(26, 32, 44, 1)",
        "dark-border": "rgba(43, 53, 69, 1)",
        "dark-card": "rgba(30, 31, 32, 1)",
        "blue-address-wallet": "rgb(47, 125, 254)",
        "sky-blue-address-wallet": "rgb(50, 195, 254)",
        "hover-language": "#1AD5FF"
      },
      backgroundImage: {
        "none": "none",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-active-sidebar": "linear-gradient(90deg, #FFFFFF 0%, rgba(202, 231, 253, 0.24) 0%, #CAD5FF 100%)",
        "gradient-network": "linear-gradient(270deg, #0047FF 0%, #00D4FF 100%)",
        "gradient-button": "linear-gradient(91.22deg, #0085FF 0%, #0297FB 51%, #0070EB 100%)",
        "wallet": "url('/images/wallet-bg.svg')",
        "gradient-wallet": "linear-gradient(90deg, #FFFFFF 0%, rgba(202, 213, 255, 0.2) 50%, rgba(102, 184, 255, 0.4) 100%)",
        "dark-wallet": "url('/images/dark-wallet-bg.svg')",
        "gradient-active-language": "linear-gradient(90deg, #FFFFFF 0%, rgba(202, 231, 253, 0.24) 30%, #CAD5FF 70%, #FFFFFF 100%)"
      },
      boxShadow: {
        "network-option": "0px 2px 8px 0px rgba(0, 0, 0, 0.08)",
        "news": "0px 8px 4px -4px rgba(0, 0, 0, 0.25)",
        "drawer": "-6px 0px 6px 0px rgba(0, 0, 0, 0.1)"
      },
      dropShadow: {
        'project-card': "0px 2px 4px #b6afaf"
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        skeletonCard: {
          '0%': { backgroundColor: 'hsl(200, 20%, 80%)'},
          '100%': { backgroundColor: 'hsl(200, 20%, 95%)'}
        },
        skeletonCardDark: {
          '0%': { backgroundColor: 'rgb(24 24 27)'},
          '100%': { backgroundColor: 'rgb(39 39 42)'}
        },
        skeletonItem: {
          '0%': { backgroundColor: 'rgb(148 163 184)'},
          '100%': { backgroundColor: 'rgb(203 213 225)'}
        },
        skeletonItemDark: {
          '0%': { backgroundColor: 'rgb(113 113 122)' },
          '100%': { backgroundColor: 'rgb(82 82 91)'}
        },
        statPulse: {
          '0%': { opacity: '0.3' },
          '50%': { opacity: '1'},
          '55%': { opacity: '0.3' },
          '100%': { opacity: '0.3' }
        }
      }
    },
  },
  darkMode: "class",
  plugins: [
    require('tailwind-scrollbar') // Add this line
  ]
};

export default config;

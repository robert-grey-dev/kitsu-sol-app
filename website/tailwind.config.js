/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          gold: '#FFD700',
          lightGold: '#FFF4CC',
          darkGold: '#B8860B',
        },
        premium: {
          black: '#0A0A0A',
          gray: '#1A1A1A',
          lightGray: '#2A2A2A',
          white: '#F5F5F5',
          accent: '#4A90E2',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}



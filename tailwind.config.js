/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        rotate: 'rotate 2s linear infinite',
        sparkle: 'sparklePath 1.5s linear infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
      },
      keyframes: {
        rotate: {
          to: { transform: 'rotate(360deg)' },
        },
        sparklePath: {
          '0%, 34%, 71%, 100%': { transform: 'scale(1)' },
          '17%': { transform: 'scale(1.2)' },
          '49%': { transform: 'scale(1.2)' },
          '83%': { transform: 'scale(1.2)' },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} 
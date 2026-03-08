/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  safelist: [
    'fill-current',
    'stroke-current',                // ✅ для SVG icons
    'text-white',
    'text-sm',
    'text-lg',
    'text-[#D80032]',
    'hover:text-[#D80032]',
    'opacity-60',
    'group-hover:opacity-100',
  ],
  theme: {
    extend: {
      colors: {
        primaryLink: '#D80032',
        primaryLinkHover: '#b60029',
      },
      animation: {
        slideUp: 'slideUp 0.3s ease-out',
        slideDown: 'slideDown 0.3s ease-in',
        fadeIn: 'fadeIn 0.3s ease-in-out',
        fadeOut: 'fadeOut 0.3s ease-in-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0%)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(0%)', opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0%)' },
        },
        fadeOut: {
          '0%': { opacity: '1', transform: 'translateY(0%)' },
          '100%': { opacity: '0', transform: 'translateY(100%)' },
        },
      },
      maskImage: {
        gradient: 'linear-gradient(to right, white 80%, transparent 100%)',
      },
      typography(theme) {
        return {
          DEFAULT: {
            css: {
              a: {
                color: theme('colors.primaryLink'),
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'color 0.2s ease-in-out',
                '&:hover': {
                  color: theme('colors.primaryLinkHover'),
                },
              },
            },
          },
          invert: {
            css: {
              a: {
                color: theme('colors.primaryLink'),
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'color 0.2s ease-in-out',
                '&:hover': {
                  color: theme('colors.primaryLinkHover'),
                },
              },
            },
          },
        }
      },
    },
    screens: {
      xs: '480px',        // ✅ рекомендовано добавить для мелких экранов
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
      '2xl': '1920px',
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/typography'),
  ],
}
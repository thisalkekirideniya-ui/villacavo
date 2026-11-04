/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Pulled from the Villa Cavo logo
        terra: {
          50: '#FBF4EF',
          100: '#F5E4D8',
          200: '#EAC6AF',
          300: '#DC9F7E',
          400: '#C9704A',
          500: '#B4491F', // logo terracotta
          600: '#9A3D19',
          700: '#7C3115',
          800: '#5E2511',
          900: '#3F190B',
        },
        ink: {
          DEFAULT: '#141210',
          soft: '#3A3532',
          mute: '#7A726C',
        },
        cream: '#FAF6F1',
        sand: '#F2EBE3',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        caps: ['Cinzel', '"Cormorant Garamond"', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
      // Slightly larger type scale across the whole site
      fontSize: {
        xs: ['0.8125rem', { lineHeight: '1.15rem' }],
        sm: ['0.9375rem', { lineHeight: '1.4rem' }],
        base: ['1.0625rem', { lineHeight: '1.65rem' }],
        lg: ['1.1875rem', { lineHeight: '1.8rem' }],
        xl: ['1.375rem', { lineHeight: '1.9rem' }],
        '2xl': ['1.625rem', { lineHeight: '2.1rem' }],
        '3xl': ['2rem', { lineHeight: '2.4rem' }],
        '4xl': ['2.5rem', { lineHeight: '2.75rem' }],
        '5xl': ['3.25rem', { lineHeight: '1' }],
        '6xl': ['4rem', { lineHeight: '1' }],
        '7xl': ['4.75rem', { lineHeight: '1' }],
        '8xl': ['6.25rem', { lineHeight: '1' }],
      },
      letterSpacing: {
        luxe: '0.35em',
      },
      borderRadius: {
        arch: '999px 999px 0 0',
      },
    },
  },
  plugins: [],
}

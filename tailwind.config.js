/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  darkMode: 'selector',
  content: [
    './resources/views/inertia_layout.edge',
    './inertia/pages/**/*.tsx',
    './inertia/components/**/*.tsx',
    './inertia/scripts/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      fontFamily: { sans: ['Poppins', ...defaultTheme.fontFamily.sans] },
      keyframes: {
        'fade-in': { from: { opacity: 0 }, to: { opacity: 1 } },
        'fade-out': { from: { opacity: 1 }, to: { opacity: 0 } },
      },
      animation: {
        'fade-in': 'fade-in 300ms ease-out both',
        'fade-out': 'fade-out 300ms ease-out both',
      },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('@ayato-san/tailwind-plugin'),
    require('@ayato-san/tailwind-plugin/grid'),
    require('@ayato-san/tailwind-plugin/arkui_variants'),
  ],
}

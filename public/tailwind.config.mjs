/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkBg: '#0f1115',
        darkCard: '#181b22',
        accentBlue: '#00f0ff',
        accentBlueHover: '#00c4d4',
        mutedText: '#9ca3af'
      },
      fontFamily: {
        dosis: ['Dosis', 'sans-serif'],
      }
    }
  },
  plugins: [],
}
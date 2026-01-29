/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'jaco-dark': '#0e0e10',
        'jaco-card': '#18181b',
        'jaco-muted': '#27272a',
        'jaco-hover': '#3f3f46',
        'jaco-primary': '#7c3aed',
        'jaco-accent': '#facc15',
        'jaco-pink': '#ec4899',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

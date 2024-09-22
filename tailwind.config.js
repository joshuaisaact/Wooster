/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        background: '#F0F7F4',
        window: '#FFFFFF',
        sidebar: '#4A9F76',
        text: '#2C3E50',
        accent: '#E9B44C',
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
}


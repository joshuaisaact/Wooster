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
      darkMode: "class",
      colors: {
        background: '#F0F7F4',
        window: '#FFFFFF',
        sidebar: '#4A9F76',
        text: '#2C3E50',
        accent: '#E9B44C',
        // Dark mode colors
        'background-dark': '#1E1E2F', // Dark background color
        'window-dark': '#2A2A37', // Dark window color
        'sidebar-dark': '#4A9F76', // Sidebar color can remain the same
        'text-dark': '#E0E0E0', // Light text color for dark mode
        'accent-dark': '#E9B44C', // Accent color can remain the same
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
}


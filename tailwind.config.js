/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: 'var(--clr-dark)',
        light: 'var(--clr-light)',
        primary: 'var(--clr-primary)',
        secondary: 'var(--clr-secondary)',
        brown: 'var(--clr-brown)',
      },
    },
  },
  plugins:[]
}


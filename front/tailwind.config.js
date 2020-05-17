module.exports = {
  purge: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      backgroundColor: {
        primary: 'var(--color-bg-primary)',
      },
      boxShadow: {
        focus: '0 0 0 3px rgba(164,202,254,.45)',
      },
    },
  },
  variants: {
    borderStyle: ['responsive', 'hover', 'focus', 'focus-within'],
    backgroundColor: ['responsive', 'hover', 'focus', 'focus-within'],
    maxWidth: ['responsive'],
  },
  plugins: [],
};

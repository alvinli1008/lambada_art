module.exports = {
  purge: {
    // eslint-disable-next-line no-undef
    enabled: process.env.NODE_ENV !== 'development',
    content: ['./src/*.js', './src/*.art', './src/*.html']
  },
  prefix: 'tw-',
  theme: {
    screens: {},
    extend: {
      colors: {
        gray: {
          500: '#30354D'
        }
      }
    }
  },
  variants: {},
  plugins: [],
  corePlugins: {
    preflight: false
  }
};

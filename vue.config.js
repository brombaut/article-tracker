module.exports = {
  publicPath: '/article-tracker/',
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/styles/variables.scss";',
      },
    },
  },
};

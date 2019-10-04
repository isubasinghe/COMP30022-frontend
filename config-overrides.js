// eslint-disable-next-line import/no-extraneous-dependencies
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const path = require('path');

module.exports = (config, env) => {
  if (env === 'production') {
    config.plugins = config.plugins.concat([
      new PrerenderSPAPlugin({
        routes: ['/'],
        staticDir: path.join(__dirname, 'build')
      }),
      new ImageminPlugin({
        disable: process.env.NODE_ENV !== 'production', // Disable during development
        pngquant: {
          quality: '95-100'
        }
      })
    ]);
  }

  return config;
};

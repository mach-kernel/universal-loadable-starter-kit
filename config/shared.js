const path = require('path');
const webpack = require('webpack');

module.exports = {
  webpackBabel: {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    options: {
      presets: ["env", "es2015", "es2017", "stage-2", "react"],
      plugins: [
        'react-loadable/babel',
        'transform-decorators-legacy',
        ["transform-runtime", {
          "polyfill": false,
          "regenerator": true
        }]
      ]
    },
  },
  webpackResolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'node_modules'
    ],
    alias: {
      'confRoot': path.resolve('config'),
      '#': path.resolve('src', 'client')
    }
  },
};
const path = require('path');
const webpack = require('webpack');

const sharedDefaults = require('../shared');
const loadableWebpack = require('react-loadable/webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  name: 'client',
  entry: [
    path.resolve('src', 'client', 'index.jsx')
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve('dist', 'client'),
    publicPath: '/static/',
    chunkFilename: '[id].chunk.js',
  },
  resolve: sharedDefaults.webpackResolve,
  module: {
    rules: [
      sharedDefaults.webpackBabel,
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      { test: /\.(jpe?g|png|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/, loader: 'url-loader?limit=100000' }
    ]
  },
  target: 'web',
  plugins: [
    new loadableWebpack.ReactLoadablePlugin({
      filename: './dist/client/react-loadable.json'
    }),
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
      'process.env.CLIENT': true
    })
  ],
  optimization: {
    splitChunks: {
      chunks: "async",
      minChunks: Infinity
    },
  },
}
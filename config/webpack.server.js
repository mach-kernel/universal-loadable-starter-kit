const path = require('path');
const webpack = require('webpack');

const nodeExternals = require('webpack-node-externals');
const dotenvWebpack = require('dotenv-webpack');
const sharedDefaults = require('./shared');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Server defaults
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
if (!process.env.PORT) process.env.PORT = 9000;

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

let config = {
  name: 'server',
  entry: path.resolve('src', 'server', 'render.js'),
  output: {
    filename: '[name].js',
    path: path.resolve('dist', 'server'),
    libraryTarget: 'commonjs2'
  },
  resolve: sharedDefaults.webpackResolve,
  module: {
    rules: [
      sharedDefaults.webpackBabel,
      {
        test: /\.css$/,
        use: "ignore-loader"
      },
    ]
  },
  target: 'node',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.CLIENT': false,
      'process.env.PORT': process.env.PORT
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ],
  externals: [
    nodeExternals()
  ],
  mode: process.env.NODE_ENV
}

if (process.env.NODE_ENV !== 'production') config.plugins.push(new dotenvWebpack());

module.exports = config;
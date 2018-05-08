const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const dotenv = require('dotenv-webpack');
const sharedDefaults = require('./shared');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
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
    new dotenv(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.CLIENT': false,
    })
  ],
  externals: [
    nodeExternals()
  ],
  mode: 'development'
}
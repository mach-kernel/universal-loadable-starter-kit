const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const base = require('./base');
const merge = require('webpack-merge');

const config = {
  entry: [
    'webpack-hot-middleware/client?reload=true'
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
  ],
  devtool: 'eval',
  mode: 'development'
}

module.exports = merge(base, config);
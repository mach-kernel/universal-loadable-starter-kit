const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const base = require('./base');

base.entry.unshift(
  'webpack-hot-middleware/client?reload=true'  
);

base.plugins.unshift(
  new webpack.HotModuleReplacementPlugin(),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: "[name].css",
    chunkFilename: "[id].css"
  }),
);

module.exports = {
  ...base,
  devtool: 'eval',
  mode: 'development'
};
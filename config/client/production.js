const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const base = require('./base');
const merge = require('webpack-merge');

const config = {
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
  ],
  optimization: {  
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  mode: 'production'
}

module.exports = merge(base, config);
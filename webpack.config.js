const merge = require('webpack-merge');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const baseConfig = require('./webpack.base.config.js');

module.exports = merge(baseConfig, {
  devtool: 'cheap-module-source-map',
  mode: 'production',
  /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
  /*cacheDirectory是用来缓存编译结果，下次编译加速*/
  module: {
    rules: [{
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
      // use: ExtractTextPlugin.extract({
      //   fallback: ["style-loader", "css-loader"],
      //   use: "sass-loader"
      // })
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ["css-loader?modules&localIdentName=[local]-[hash:base64:5]", "postcss-loader"]
      })
    }]
  },
  
  plugins: [
    new UglifyJSPlugin()
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin({
      filename: '[name].[contenthash:5].css',
      allChunks: true
    })
  ]
})
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-source-map',
  /*入口*/
  // entry: path.join(__dirname, 'src/index.js'),
  entry: {
    app: [
      'babel-polyfill',
      // 'react-hot-loader/patch',
      path.join(__dirname, 'src/index.js')
    ],
    vendor: [
      'react',
      'react-router-dom',
      'redux', 'react-dom',
      'react-redux',
      'immutable',
      'redux-immutable',
      'reselect',
      'whatwg-fetch',
      'redux-thunk'
    ]
  },
  
  output: {
    publicPath : '/',
    path: path.join(__dirname, './dist'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  
  /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
  /*cacheDirectory是用来缓存编译结果，下次编译加速*/
  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader?cacheDirectory=true'],
      // include: path.join(__dirname, 'src'),
      exclude: path.join(__dirname, 'node_modules'),
    }, {
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
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      }]
    }]
  },
  
  /*别名*/
  resolve: {
    alias: {
      pages: path.join(__dirname, 'src/pages'),
      component: path.join(__dirname, 'src/component'),
      router: path.join(__dirname, 'src/router'),
      actions: path.join(__dirname, 'src/myredux/actions'),
      reducers: path.join(__dirname, 'src/myredux/reducers'),
      myredux: path.join(__dirname, 'src/myredux')
    }
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'src/index.html')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    }),
    new webpack.HashedModuleIdsPlugin(),
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin({
      filename: '[name].[contenthash:5].css',
      allChunks: true
    })
  ]
}
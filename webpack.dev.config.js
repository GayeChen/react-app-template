const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  /*入口*/
  // entry: path.join(__dirname, 'src/index.js'),
  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
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
    path: path.join(__dirname, './dist'),
    filename: '[name].[hash].js',
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
      use: ['style-loader', 'css-loader?modules&localIdentName=[local]-[hash:base64:5]', 'sass-loader', 'postcss-loader']
    }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?modules&localIdentName=[local]-[hash:base64:5]', 'postcss-loader']
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
  
  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, './dist'),
    historyApiFallback: true,
    host: '0.0.0.0',
    proxy: {
      "/api/*": "http://localhost:8090/$1"
    }
  },
  
  devtool: 'inline-source-map',
  
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'src/index.html')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    })
  ]
}
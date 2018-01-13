const path = require('path');
const merge = require('webpack-merge')

const baseConfig = require('./webpack.base.config.js');

module.exports = merge({
  customizeArray(a, b, key) {
    /*entry.app不合并，全替换*/
    if (key === 'entry.app') {
      return b;
    }
    return undefined;
  }
})(baseConfig, {
  devtool: 'inline-source-map',
  /*入口*/
  // entry: path.join(__dirname, 'src/index.js'),
  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      path.join(__dirname, 'src/index.js')
    ]
  },
  
  output: {
    filename: '[name].[hash].js',
  },
  
  /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
  /*cacheDirectory是用来缓存编译结果，下次编译加速*/
  module: {
    rules: [{
      test: /\.scss$/,
      use: ['style-loader', 'css-loader?modules&localIdentName=[local]-[hash:base64:5]', 'sass-loader', 'postcss-loader']
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader?modules&localIdentName=[local]-[hash:base64:5]', 'postcss-loader']
    }]
  },
  
  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, './dist'),
    historyApiFallback: true,
    host: '0.0.0.0',
    proxy: {
      "/api/*": "http://localhost:8090/$1"
    }
  }
});

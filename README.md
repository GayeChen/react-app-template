# react-app-template

## 一、基础
    1. yarn add webpack --dev
    2. yarn add --dev babel-core babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-0
    3.yarn add react react-dom react-router-dom
    4.yarn add webpack-dev-server -g （全局安装）
    // HMR 不要删除bundle.js,删除该文件会使用内存中的，从而影响hot加载
    5.yarn add webpack-dev-server --save-dev
    
##### 10. HMR

    ```
        yarn add webpack-dev-server --dev
        yarn add react-hot-loader --dev
    ```
    
##### 12. react-hot-loader
```
import React from 'react';
import ReactDom from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import getRouter from './router/router';

/*初始化*/
renderWithHotReload(getRouter());

/*热更新*/
if (module.hot) {
    module.hot.accept('./router/router', () => {
        const getRouter = require('./router/router').default;
        renderWithHotReload(getRouter());
    });
}

function renderWithHotReload(RootElement) {
    ReactDom.render(
        <AppContainer>
            {RootElement}
        </AppContainer>,
        document.getElementById('app')
    )
}
```

##### 13. 文件路径优化


##### 14.异步action
```yarn add redux-thunk```


##### 15.devtool优化


##### 16.支持sass
```yarn add --dev css-loader style-loader sass-loader node-sass```

##### 17.编译图片
```yarn add --dev url-loader file-loader ```

    options limit 8192意思是，小于等于8K的图片会被转成base64编码，直接插入HTML中，减少HTTP请求。
    
#### ***18.按需加载

    1. yarn add --dev bundle-loader
    
    2. output: {
            path: path.join(__dirname, './dist'),
            filename: 'bundle.js',
            chunkFilename: '[name].js'
        }

##### 19.缓存

        output: {
            path: path.join(__dirname, './dist'),
            filename: '[name].[hash].js',
            chunkFilename: '[name].[chunkhash].js'
        }

##### 20.HtmlWebpackPlugin

    1. yarn add --dev html-webpack-plugin 
    
    2. 修改webpack.config
    
``` var HtmlWebpackPlugin = require('html-webpack-plugin');
        plugins: [new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        })],
```


##### 21.提取公共代码


## 二、生产坏境构建

    1.先删除webpack-dev-server相关的东西~
    2.devtool的值改成cheap-module-source-map
    3.刚才说的hash改成chunkhash
    
##### 1.文件压缩

    1. yarn add --dev uglifyjs-webpack-plugin     
    
    2. const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

        module.exports = {
          plugins: [
            new UglifyJSPlugin()
          ]
        }

    减少vendor的大小
##### 2.指定环境    
    module.exports = {
      plugins: [
           new webpack.DefinePlugin({
              'process.env': {
                  'NODE_ENV': JSON.stringify('production')
               }
           })
      ]
    }
    
    进一步减少vendor的大小
    
##### 3.优化缓存

    plugins: [
        new webpack.HashedModuleIdsPlugin()
    ]
    
    new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
    })

##### 4.public path

    output: {
        publicPath : '/'
    }
    
##### 5. 清理dist，打包优化  

    1. yarn add --dev clean-webpack-plugin
    
    2.const CleanWebpackPlugin=require('clean-webpack-plugin');
    plugins: [
        new CleanWebpackPlugin(['dist'])
    ]
    
##### 6. 抽取css  
    1. yarn add --dev extract-text-webpack-plugin 

#### ***7.使用axios和middleware优化API请求

##### 8.合并提取webpack公共配置
    1.yarn add --dev webpack-merge
    
##### 9.加入 babel-plugin-transform-runtime 和 babel-polyfill
    1. yarn add --dev babel-plugin-transform-runtime  
    2. yarn add --dev babel-polyfill

##### 10.集成PostCSS
    1. yarn add --dev postcss-loader postcss-cssnext

##### 11.使用 CSS Modules
    "css-loader?modules&localIdentName=[local]-[hash:base64:5]"

##### 12.使用 json-server 代替 Mock.js
     1. yarn add --dev mockjs json-server 
     
     3. devServer: {
        ...
        proxy: {
                    "/api/*": "http://localhost:8090/$1"
                }
    }
    
    

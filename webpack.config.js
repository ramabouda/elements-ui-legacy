'use strict'
var path = require('path');

var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')


var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false')),
});


module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    path.resolve(__dirname, 'app/main.js'),
  ],
  output: {
    path: 'dist',
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015',
      },
      { test: /\.css$/,  loaders: ['style', 'css'] },
      { test: /\.scss$/, loaders: ['style', 'css', 'sass?'] },
      { test: /\.sass$/, loaders: ['style', 'css', 'sass?indentedSyntax=true'] },
      { test: /\.jade$/, loaders: ['jade'] },
    ],
  },
  plugins: [
    devFlagPlugin,
    new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
    new HtmlWebpackPlugin(),
  ],
  sassLoader: {
    includePaths: [path.resolve(__dirname, './app/style')],
  },
};

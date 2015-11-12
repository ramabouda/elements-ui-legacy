'use strict'
var path = require('path');

var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')


var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false')),
});


module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    path.resolve(__dirname, 'elements/main.js'),
  ],
  output: {
    path: 'dist',
    publicPath: '/',
    filename: 'bundle.js',
  },
  resolve: {
    root: path.resolve(__dirname),
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015',
      },
      { test: /\.css$/,  loaders: ['style', 'css'] },
      { test: /\.scss$/, loaders: ['style', 'css?sourceMap', 'sass?sourceMap'] },
      { test: /\.sass$/, loaders: ['style', 'css?sourceMap', 'sass?sourceMap&indentedSyntax=true'] },
      { test: /\.jade$/, loaders: ['ngtemplate', 'html', 'jade-html'] },
    ],
  },
  plugins: [
    devFlagPlugin,
    new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
    new HtmlWebpackPlugin({
      template: 'elements/base.html',
      inject: true,
    }),
    new webpack.ProvidePlugin({
      '_': 'lodash',
      '$': 'jquery',
      // gotcha: have the global variable 'angular' in your code if you require a template
      // 'angular': 'angular',
    }),
  ],
  sassLoader: {
    includePaths: [path.resolve(__dirname, './elements/')],
  },
};

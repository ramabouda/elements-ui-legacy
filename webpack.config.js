var path = require('path');

var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')


var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});


module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    path.resolve(__dirname, 'app/main.js')
  ],
  output: {
    path: 'dist',
    publicPath: "/",
    filename: 'bundle.js'
  },
  module: {
    loaders:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015'
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ]
  },
  plugins: [
    new OpenBrowserPlugin({
      url: 'http://localhost:8080'
    }),
    devFlagPlugin,
    new HtmlWebpackPlugin(),
  ]
};

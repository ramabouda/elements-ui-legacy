var path = require('path');

var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var autoprefixer = require('autoprefixer');


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
    publicPath: '/',  // Prefix for all the statics urls
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
      { test: /\.css$/,  loaders: ['style', 'css', 'postcss-loader'] },
      // TODO fix css source maps (add 'css?sourceMaps') breaking url attribute
      { test: /\.scss$/, loaders: ['style', 'css', 'postcss-loader', 'sass?sourceMap'] },
      { test: /\.sass$/, loaders: ['style', 'css', 'postcss-loader', 'sass?sourceMap&indentedSyntax=true'] },
      { test: /\.jade$/, loaders: ['ngtemplate', 'html', 'jade-html'] },
      { test: /\.(png|gif|jp(e)?g)$/, loader: 'url-loader?limit=8192' },
      { test: /\.(ttf|eot|svg|woff(2))(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=50000' },
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
      // gotcha with the global, use the variable 'angular' in your code if you require a template
      // gotcha2: global angular does not even work!?
      // 'angular': 'angular',
    }),
  ],
  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
};

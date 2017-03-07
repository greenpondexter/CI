'use strict';

var path = require('path');
var webpack = require('webpack');
var WebpackNotifierPlugin = require('webpack-notifier');
var IgnorePlugin = require("webpack").IgnorePlugin;

module.exports = {
  devtool : 'eval',
  entry   : [path.resolve(__dirname, 'src', 'components', 'Entry.tsx')],
  output: {
    path       : path.join(__dirname, 'build'),
    filename   : 'bundle.js'
 },
  module: {
    loaders: [
    {
      test: /\.ts$/,
      enforce: 'pre',
      loader: 'tslint-loader'
     },
    {
      test: /\.tsx?$/, 
      loaders: ["react-hot-loader","awesome-typescript-loader"] 
    },
    {
      test     : /\.scss$/,
      loaders  : ['style', 'css', 'sass', 'resolve-url']
    },
    {
      test     : /\.css$/,
      loaders  : ['style', 'css']
    },
    
    {
        test: /\.(woff|woff2|ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'url-loader?limit=10000&name=[name].[ext]'
    },
    {
      test: /\.json$/,
      loader: 'json',
      include: [__dirname, '/node_modules']
    }
    
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.ts', '.tsx'],
    alias: {
      root : path.join(__dirname, 'node_modules'),
      js   : path.resolve(__dirname, 'client', 'js')
    }
  },
  plugins: [
    new WebpackNotifierPlugin({ excludeWarnings: true, alwaysNotify: true }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new IgnorePlugin(/(^fs$|cptable|jszip|net|tls|xlsx|xls|^es6-promise$|^net$|^tls$|^forever-agent$|^tough-cookie$|cpexcel|^path$)/)
  ]
};
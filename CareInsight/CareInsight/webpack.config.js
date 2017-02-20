'use strict';

var path = require('path');
var webpack = require('webpack');
var WebpackNotifierPlugin = require('webpack-notifier');
var IgnorePlugin = require("webpack").IgnorePlugin;

module.exports = {
  devtool : 'eval',
  entry   : [path.resolve(__dirname, 'js', 'Entry.tsx')],
  output: {
    path       : path.join(__dirname, 'build'),
    filename   : 'bundle.js'
 },
  module: {
    // preLoaders: [
    // // {
    // //   test     : /\.jsx$/,
    // //   exclude  : /node_modules/,
    // //   loader   : 'jshint-loader'
    // // },
    // {
    //     test: /\.jsx?$/,
    //     loaders: ['eslint'],
    //     exclude: /node_modules/
    // }
    
    // ],
    
    loaders: [
      {
      test     : /\.jsx$/,
      loaders  : ['babel?presets[]=react,presets[]=es2015'],
      exclude  : [path.join(__dirname, 'node_modules')]
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
  // jshint: {
  //   camelcase : true,
  //   esversion : 6,
  //   curly     : true, // requires braces around blocks in loops and conitionals
  //   eqeqeq    : true, // forces usage of === over ==
  //   undef     : true, // prohibits use of explicitly undeclared variables (value = undefined)
  //   unused    : true, // triggers warning about unused variables
  //   varstmt   : true, // disallows usage of 'var', forces 'let' and 'const'
  //   browser   : true, // able to use variables like 'alert' and 'console'
  //   devel     : true // able to use 'console' and 'alert'
  // },
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
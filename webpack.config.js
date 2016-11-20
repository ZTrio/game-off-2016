'use strict';
var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  
  context: __dirname + "/src",

  entry: [
    'babel-polyfill',
    './app'
  ],
  
  output: {
    path: __dirname + '/dist/',
    filename: 'app.js'
  },
  
  resolve: {
    extensions: ['', '.js', '.scss'],
  },
  
  module: {
    loaders: [
      { test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.png$/, loader: 'file' }
    ]
  },

  node: {
    fs: "empty",
    __dirname: true,
    __filename: true
  },
  
};

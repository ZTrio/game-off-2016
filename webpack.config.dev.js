'use strict';
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',

  context: __dirname + "/src",

  entry: [
    'babel-polyfill',
    './app'
  ],

  output: {
    path: __dirname + '/dist',
    publicpath: '/',
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['', '.js', '.scss'],
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
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

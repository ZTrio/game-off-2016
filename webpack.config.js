'use strict';
var webpack = require('webpack');

module.exports = {
  context: __dirname + "/src",

  entry: [
    'babel-polyfill',
    './app'
  ],
  
  output: {
    path: __dirname + '/dist/',
    filename: 'app.js'
  },

  target: 'web',

  alias:{
    root: __dirname + '/./',
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
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },

  plugins: [
    new webpack.NormalModuleReplacementPlugin(/inline\-worker/, 'webworkify-webpack'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        hoist_funs: false, // Turn this off to prevent errors with Ammo.js
        warnings: false
      },
      minimize: true
    }),
    new webpack.optimize.DedupePlugin()
  ],

  node: {
    fs: "empty",
    __dirname: true,
    __filename: true
  },
  
};

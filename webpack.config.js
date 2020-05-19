var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    './public/app': path.resolve(__dirname, 'client/index.jsx'),
  },
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, './public')
  },

  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx?$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }
    ]
  },
  externals: {
    'react/addons': true, // important!!
    'react/lib/ReactContext': true,
    'react/lib/ExecutionEnvironment': true
  }
};

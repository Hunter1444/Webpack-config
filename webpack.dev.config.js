const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  devServer: {
    contentBase: path.join(__dirname, "bundle"),
    overlay: true,
    port: 8080,
    publicPath: "/",
    historyApiFallback: true
  },
  plugins: [
    new ProgressBarPlugin(),
  ],
  devtool: 'eval-source-map',
  entry: './src/index.js',
  stats: "errors-only",
  cache: true,
  output: {
    path: '/',
    publicPath : '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }, {
            loader: "sass-loader"
        }]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
         'file-loader'
         ]
       }
    ]
  },
}

module.exports = env => config;

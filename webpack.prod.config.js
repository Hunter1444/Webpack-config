const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  devServer: {
    contentBase: path.join(__dirname, "./"),
    overlay: true,
    port: 8080,
    publicPath: "/bundle/",
    historyApiFallback: true
  },
  plugins: [
    new ProgressBarPlugin(),
    new ExtractTextPlugin('./css/[name].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new UglifyJsPlugin()
  ],
  devtool: 'source-map',
  entry: './src/index.js',
  stats: "errors-only",
  output: {
    path: path.resolve(__dirname, 'bundle'),
    publicPath : '',
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
            presets: [
              ['@babel/preset-env', {
                "targets": {
                    "browsers": ["last 2 versions", "ie >= 10"]
                  }
              }], '@babel/preset-react'],
          }
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true,
            }
          },
          {
            loader: 'sass-loader'
          }]
        })
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

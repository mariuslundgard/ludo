'use strict'

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')

module.exports = {
  devtool: 'eval-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    app: ['webpack-hot-middleware/client', './src/app/client']
  },
  output: {
    path: path.join(__dirname, '../build/static'),
    publicPath: '/',
    filename: '[name].js'
  },
  resolve: {
    modules: [path.resolve(__dirname, '../src/lib'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: /(src)/,
        options: {
          babelrc: false,
          presets: [
            [
              'env',
              {
                targets: {
                  browsers: ['last 2 Chrome versions']
                }
              }
            ],
            'stage-3'
          ],
          plugins: ['transform-flow-strip-types', ['transform-react-jsx', {pragma: 'h'}]]
        }
      },
      {
        test: /\.css$/,
        use: ['css-hot-loader'].concat(
          ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  importLoaders: 1,
                  localIdentName: 'prototype-ludo-state-[local]'
                }
              },
              {
                loader: 'postcss-loader'
              }
            ]
          })
        )
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new CaseSensitivePathsPlugin(),
    new ManifestPlugin(),
    new webpack.DefinePlugin({
      __HOT__: 'true',
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}

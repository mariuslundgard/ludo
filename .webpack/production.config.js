'use strict'

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const ManifestPlugin = require('webpack-manifest-plugin')
const webpack = require('webpack')

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    app: ['./src/app/client']
  },
  output: {
    path: path.join(__dirname, '../build/client'),
    publicPath: '/',
    filename: '[name]-[chunkhash].js'
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
                  browsers: ['last 2 versions', 'IE 10']
                }
              }
            ],
            'stage-3'
          ],
          plugins: [
            'transform-flow-strip-types',
            ['transform-react-jsx', {pragma: 'h'}],
            [
              'transform-runtime',
              {
                polyfill: false,
                regenerator: true
              }
            ]
          ]
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
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
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      __HOT__: 'false',
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new CaseSensitivePathsPlugin(),
    new ManifestPlugin(),
    new ExtractTextPlugin({
      filename: '[name]-[contenthash].css',
      allChunks: true
    })
  ]
}

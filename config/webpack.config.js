'use strict'

const webpack = require('webpack')
const validate = require('webpack-validator')
const merge = require('webpack-merge')
const config = require('./config')

// Common config
let common = {
  entry: {
    bundle: config.webpack.entry.app,
    vendor: config.webpack.entry.vendor
  },

  resolve: {
    extensions: ['', '.js']
  },

  output: {
    path: config.paths.dest,
    filename: 'scripts/[name].js',
    publicPath: '/'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          compact: true,
          presets: ['es2015', 'stage-1'],
          plugins: [
            [
              'transform-runtime',
              {
                'polyfill': false,
                'regenerator': true
              }
            ]
          ]
        },
        include: config.webpack.js.include
      },

      {
        test: /\.json$/,
        loader: 'json',
        exclude: /node_modules/
      },

      {
        test: /\.(glsl|vs|fs)$/,
        loader: 'shader'
      }
    ]
  }
}

// Production config
const prod = function () {
  return merge(
    common,
    {
      plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        })
      ]
    }
  )
}

// Development config
const dev = function () {
  return merge(
    common,
    {
      devtool: 'eval-source-map',

      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('development')
          }
        })
      ]
    }
  )
}

// Webpack config
const webpackConfig = function (NODE_ENV) {
  if (NODE_ENV === 'development') {
    return validate(dev())
  } else {
    return validate(prod())
  }
}

module.exports = webpackConfig

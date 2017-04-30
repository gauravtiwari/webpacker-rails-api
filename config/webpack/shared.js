// Note: You must restart bin/webpack-dev-server for changes to take effect

/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */

const webpack = require('webpack')
const { basename, dirname, join, relative, resolve } = require('path')
const { sync } = require('glob')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const InterpolateHtmlPlugin = require('interpolate-html-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const extname = require('path-complete-extname')
const { env, paths, publicPath, loadersDir } = require('./configuration.js')

const extensionGlob = `**/*{${paths.extensions.join(',')}}*`
const packPaths = sync(join(paths.source, paths.entry, extensionGlob))

module.exports = {
  entry: packPaths.reduce(
    (map, entry) => {
      const localMap = map
      const namespace = relative(join(paths.source, paths.entry), dirname(entry))
      localMap[join(namespace, basename(entry, extname(entry)))] = resolve(entry)
      return localMap
    }, {}
  ),

  output: {
    filename: '[name].js',
    path: resolve(paths.output, paths.entry),
    publicPath
  },

  module: {
    rules: sync(join(loadersDir, '*.js')).map(loader => require(loader))
  },

  plugins: [
    new webpack.EnvironmentPlugin(JSON.parse(JSON.stringify(env))),
    new InterpolateHtmlPlugin({
      ASSET_URL: env.ASSET_URL
    }),

    new ExtractTextPlugin(env.NODE_ENV === 'production' ? '[name]-[hash].css' : '[name].css'),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', // Vendor code
      minChunks: (module) => module.context && module.context.indexOf('node_modules') !== -1
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest' // Runtime code
    }),

    new webpack.optimize.CommonsChunkPlugin({
      async: true,
      children: true,
      minChunks: 4
    }),

    new ScriptExtHtmlWebpackPlugin({
      sync: ['vendor', 'manifest'],
      async: /\.js$/,
      defaultAttribute: 'async',
      prefetch: {
        test: /\.js$/,
        chunks: 'async'
      }
    }),

    new HtmlWebpackPlugin({
      inject: 'body',
      hash: true,
      alwaysWriteToDisk: true,
      template: resolve(paths.output, 'index.html')
    }),

    new HtmlWebpackHarddiskPlugin
  ],

  resolve: {
    extensions: paths.extensions,
    modules: [
      resolve(paths.source),
      resolve(paths.node_modules)
    ]
  },

  resolveLoader: {
    modules: [paths.node_modules]
  },

  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    global: true,
    process: true,
    Buffer: true,
    setImmediate: true
  }
}

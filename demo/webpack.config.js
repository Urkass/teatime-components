'use strict';

const { resolve } = require('path');
const { version } = require('../package');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const glob = require('glob').sync;

module.exports = {
  entry: glob('demo/*.json', {realpath: true}),

  output: {
    filename: '[name].js',
    path: resolve('preview'),
  },

  module: {
    loaders: [
      {
        test: /\.js/i,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.json/i,
        loader: './demo/demo-loader!json',
      },
      {
        test: /\.css$/i,
        loader: ExtractTextPlugin.extract('style',
          'css?modules&localIdentName=[name]--[local]&importLoaders=1!postcss'),
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      title: `teatime-components ${version}`,
      inject: 'body',
      hash: true,
      template: 'demo/template.ejs',
    }),
    new NpmInstallPlugin({
      cacheMin: 999999,
      save: true,
      saveDev: true,
    }),
  ],

  postcss: [
    require('postcss-url')({url: 'inline'}),
    require('autoprefixer')({browsers: ['last 2 versions']}),
  ],
};

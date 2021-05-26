/* eslint-env node */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const env = process.env.NODE_ENV || 'development'; // development production

const config = {
  mode: env,
  entry: {
    lambada_art: path.resolve(__dirname, 'src/index.js')
  },
  output: {
    filename: env === 'production' ? '[name].[hash:8].js' : '[name].js',
    publicPath: env === 'production' ? './' : '/',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: { alias: { '~': path.resolve(__dirname, 'src') } },
  externals: { jquery: 'window.jQuery||function(){}' },
  module: {
    rules: [
      {
        exclude: [/\.html$/, /\.(js|jsx)$/, /\.(css|less|scss)$/, /\.json$/, /\.svg$/, /\.art$/],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components)/,
        use: [
          // {
          //   loader: 'babel-loader',
          //   options: {
          //     cacheDirectory: true
          //   }
          // }
        ]
      },
      {
        test: /\.(scss|css)/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, `./postcss.config.js`)
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'raw-loader'
          }
        ]
      },
      {
        test: /\.art$/,
        loader: 'art-template-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),

    new HtmlWebpackPlugin({
      title: 'lambada_art',
      template: path.resolve(__dirname, 'src/index.html')
    }),

    // 自动加载模块
    new webpack.ProvidePlugin({
      $: 'jquery'
    })
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    liveReload: false,
    historyApiFallback: true
  }
};
if (process.env.ANALYSIS === '1') {
  config.plugins.push(new BundleAnalyzerPlugin());
}
if (env === 'development') {
  config.plugins.push(new webpack.HotModuleReplacementPlugin()); // 启用HMR,与[chunkhash].js 冲突
}

module.exports = config;

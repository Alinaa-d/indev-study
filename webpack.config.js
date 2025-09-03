const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: './src/script.js',
    booking: './src/booking.js', // Добавьте эту строку
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    alias: {
      images: path.resolve(__dirname, 'public/images'),
      fonts: path.resolve(__dirname, 'public/fonts'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass|css)$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          sources: {
            list: [
              { tag: 'img', attribute: 'src', type: 'src' },
              { tag: 'img', attribute: 'srcset', type: 'srcset' },
              { tag: 'source', attribute: 'srcset', type: 'srcset' },
              { tag: 'img', attribute: 'data-src', type: 'src' },
            ],
            urlFilter: (attribute, value, resourcePath) => {
              if (value.startsWith('~')) {
                return true;
              }
              if (value.startsWith('./') || value.startsWith('../')) {
                return true;
              }
              return false;
            },
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['main'], // Только main.js
    }),
    new HtmlWebpackPlugin({
      template: './src/booking.html',
      filename: 'booking.html',
      chunks: ['booking'], // Только booking.js
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css', // Генерирует отдельные CSS файлы
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public/images',
          to: 'images',
          noErrorOnMissing: true,
        },
        {
          from: 'public/fonts',
          to: 'fonts',
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    open: {
      target: ['index.html'],
    },
    historyApiFallback: {
      index: 'index.html',
    },
  },
  mode: 'development',
};

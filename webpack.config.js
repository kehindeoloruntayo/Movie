// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const ESLintPlugin = require('eslint-webpack-plugin');
// const Dotenv = require('dotenv-webpack');

// module.exports = {
//   entry: './src/main.js',
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist')
//   },

//   devtool: 'eval-source-map',
//   devServer: {
//     static: './dist'
//   },
  
//   plugins: [
//     new Dotenv(),
//     new CleanWebpackPlugin(),
//     new ESLintPlugin({
//       context: "compiler.context",
//       eslintPath: "eslint",
//       extensions: 'js',
//       exclude: 'node_modules',
//       fix: false,
//       formatter: 'stylish',
//       lintDirtyModulesOnly: false,
//       threads: false,
//       emitError: true,
//       emitWarning: true,
//       failOnError: true,
//       failOnWarning: false,
//       quiet: false,
//       outputReport: false
//     }),
//     new HtmlWebpackPlugin({
//       title: 'Movie App',
//       template: './src/index.html',
//       inject: 'body'
//     }),
//     new HtmlWebpackPlugin({
//       template: './src/search.html',
//       filename: 'search.html',
//       inject: 'body',
//       chunks : ['main']
//     }),
//     new HtmlWebpackPlugin({
//       template: './src/movie-details.html',
//       filename: 'movie-details.html',
//       inject: 'body',
//       chunks : ['main']
//     })
//   ],
//   module: {
//     rules: [
//       {
//         test: /\.css$/,
//         use: [
//           'style-loader',
//           'css-loader'
//         ]
//       },
//       {
//         test: /\.(png|svg|jpg|jpeg|gif)$/i,
//         type: "asset/resource",
//       },
//     ]
//   }
// };

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    app:   './src/main.js',
    search: {
      import: './src/js/search.js',
      dependOn: 'app'
    },
  },

  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  devtool: isProd ? false : 'eval-source-map',

  devServer: {
    static: './dist',
    hot: true,
    open: true,
  },

  plugins: [
    new Dotenv({
      systemvars: true,
    }),
    new CleanWebpackPlugin(),
    new ESLintPlugin({
      context: "compiler.context",
      eslintPath: "eslint",
      extensions: 'js',
      exclude: 'node_modules',
      fix: false,
      formatter: 'stylish',
      lintDirtyModulesOnly: false,
      threads: false,
      emitError: true,
      emitWarning: true,
      failOnError: true,
      failOnWarning: false,
      quiet: false,
      outputReport: false
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),

    new HtmlWebpackPlugin({
      title: 'Movie App',
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['app'],
    }),

    new HtmlWebpackPlugin({
      template: './src/search.html',
      filename: 'search.html',
      chunks: ['app', 'search'],  
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },

  optimization: {
    runtimeChunk: 'single',
  },
};
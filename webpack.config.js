const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
  entry: {
    // publicPath: '/',
    index: "./src/index.js",
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name].js"
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 1804,
    hot: false,
    open: true,
    client: {
      overlay: {
        errors: true
      },
    },
    devMiddleware: {
      writeToDisk: true,
    },
  },
  module: {
    rules: [
      // لتحزيم ملفات html
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      // لتحزيم ملفات التنسيقات
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      // لتحزيم ملفات الخطوط
      {
        test: /\.(svg|eot|woff|woff2|ttf)$/i,
        exclude: /images/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[ext]'
        }
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new MiniCssExtractPlugin({
      filename: "assets/css/index.css"
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html"
    })
  ]

}
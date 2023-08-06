const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
  entry: {
    // publicPath: '/',
    index: "./src/index.js",
    "assets/js/banner": "./src/assets/js/banner.js",
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
      // القاعدة الخاصة بمكتبة بابل 
      // لتحويل شيفرات جافا متقدمة الي قديمة تفهمها جميع المتصفحات
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
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
      template: "./src/index.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      filename: "components/button.html",
      template: "./src/components/button.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      filename: "components/textfield.html",
      template: "./src/components/textfield.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      filename: "components/card.html",
      template: "./src/components/card.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      filename: "components/banner.html",
      template: "./src/components/banner.html",
      chunks: ["index", "assets/js/banner"],
    }),
  ]

}
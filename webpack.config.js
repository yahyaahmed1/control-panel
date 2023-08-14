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
    "assets/js/tabs": "./src/assets/js/tabs.js",
    "assets/js/upload": "./src/assets/js/upload.js",
    "assets/js/chart": "./src/assets/js/chart.js",
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
          filename: 'assets/fonts/[name][ext]'
        }
      },
      // لتحزيم ملفات الصور
      {
        test: /\.(svg|png|jpe?g|gif)$/i,
        exclude: /fonts/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]'
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
    new HtmlWebpackPlugin({
      filename: "components/list.html",
      template: "./src/components/list.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      filename: "components/tabs.html",
      template: "./src/components/tabs.html",
      chunks: ["index", "assets/js/tabs"],
    }),
    new HtmlWebpackPlugin({
      filename: "components/upload.html",
      template: "./src/components/upload.html",
      chunks: ["index", "assets/js/upload"],
    }),
    new HtmlWebpackPlugin({
      filename: "components/help.html",
      template: "./src/components/help.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      filename: "components/summary.html",
      template: "./src/components/summary.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      filename: "components/actions.html",
      template: "./src/components/actions.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      filename: "components/sidebar.html",
      template: "./src/components/sidebar.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      filename: "components/table.html",
      template: "./src/components/table.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      filename: "components/chart.html",
      template: "./src/components/chart.html",
      chunks: ["index", "assets/js/chart"],
    }),
  ]

}
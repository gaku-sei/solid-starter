const path = require("path")
const webpack = require("webpack")
const Dotenv = require("dotenv-webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TSConfigPathsPlugin = require("tsconfig-paths-webpack-plugin")

const production = process.env.NODE_ENV === "production"

const output = production
  ? path.join(__dirname, "build", "prod")
  : path.join(__dirname, "build", "dev")

const config = {
  entry: "./src/client.tsx",
  output: {
    filename: "index.js",
    path: output,
  },
  devServer: {
    historyApiFallback: true,
    contentBase: output,
    publicPath: "/",
    port: 3000,
  },
  optimization: {
    minimize: production,
  },
  mode: production ? "production" : "development",
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
    plugins: [new TSConfigPathsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      base: "/",
      templateParameters: {
        lang: "en",
      },
      template: "./assets/index.html",
    }),
    new webpack.EnvironmentPlugin({ NODE_ENV: "development" }),
    new Dotenv(),
    new MiniCssExtractPlugin(),
  ],
}

module.exports = config

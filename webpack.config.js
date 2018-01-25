const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const path = require("path");

module.exports = {
  context: path.join(__dirname, "src"),
  resolve: {
    alias: { react: path.resolve("./node_modules/react") },
    extensions: [".js", ".sass"],
    modules: ["src", "node_modules"],
  },
  watch: true,
  devtool: "#eval-source-map",
  entry: [
    "./index.js",
  ],
  output: {
    filename: "index.js",
  },
  
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.sass$/,
        use: [
          {
            loader: "style-loader",
            options: {
              singleton: true,
            },
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  devServer: {
    host: '0.0.0.0',
    port: 9000,
    overlay: true,
    stats: 'normal',
    proxy: {
      '/api/**': {
        target: "http://universities.hipolabs.com",          
        secure: false,
        changeOrigin: true,
        pathRewrite: {"^/api" : ""}
      },
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    publicPath: "/",
  },
  plugins: [
    new Webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "template.html"),
    }),
  ],
};

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: "./source/ex_3d1.js",
  output:{
    path:path.resolve(__dirname, "public"),
    filename: "index_bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:'./source/index.html',
      filename:'./index.html'
  })],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]"
        }
      },
      {
          test: /\.glsl$/,
          loader: 'webpack-glsl'
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 9000,
  },
}
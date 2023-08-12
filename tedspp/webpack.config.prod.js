const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: "./source/index.js",
    output:{
        path:path.resolve(__dirname, "public"),
        filename: "index_bundle.js"
    },
    plugins: [new HtmlWebpackPlugin({
        template:'./source/index.html',
        filename:'./index.html'
    })],
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },
}
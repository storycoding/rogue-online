const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.jsx',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};
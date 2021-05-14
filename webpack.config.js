const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  watch: true,
  externalsPresets: { node: true },
  entry: './index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'server'),
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      { test: /\.graphql?$/, loader: 'webpack-graphql-loader' }
    ]
  },  
};
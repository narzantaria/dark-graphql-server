const path = require("path");
const nodeExternals = require("webpack-node-externals");
require("dotenv/config");

const OUTPUT_FOLDER = process.env.OUTPUT_FOLDER;

module.exports = {
  mode: "development",
  watch: true,
  node: {
    __dirname: false,
  },
  externalsPresets: { node: true },
  entry: "./index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, OUTPUT_FOLDER),
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      { test: /\.graphql?$/, loader: "webpack-graphql-loader" },
    ],
  },
};

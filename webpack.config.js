const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const { optimize } = require('webpack');

module.exports = {

  // The entry point files
  entry: {
    background: "./src/background.js",
    webscraper: "./src/webscraper.js"
  },

  // The location of the build folder
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // Clean the output directory before emit

  },
  

  devtool: false,
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "public", to: "." }, // Copy manifest.json
        { from: "public/images", to: "images" } // Copy images folder
      ]
    })
  ],
  optimization: {
    minimize: true,
  },
};

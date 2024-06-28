const { override, addWebpackPlugin } = require("customize-cra");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = override(
  addWebpackPlugin(
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "_redirects"),
          to: path.resolve(__dirname, "build"),
        },
      ],
    })
  )
);

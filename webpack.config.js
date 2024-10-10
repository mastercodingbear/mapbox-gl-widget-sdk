const path = require("path");

module.exports = {
  mode: "development", // or 'production'
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "mapbox-gl-widget-sdk.js",
    library: "MapboxGLWidgetSDK",
    libraryTarget: "umd",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
    ],
  },
};

var path = require('path');

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: './index.ts',
  output: {
    filename: 'wrp.js',
    path: path.resolve(__dirname, 'dist'),
    
    library: 'WRP',
    libraryTarget: 'umd',
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts"]
  },
  module: {
    rules: [
      { test: /\.ts?$/, loader: "awesome-typescript-loader" },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  }
};

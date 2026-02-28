const path = require('path');

module.exports = {
  entry: path.join(__dirname, "app.js"),
  // devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
    ]
  },
  output: {
    path: path.resolve(__dirname, "out"),
  },
};

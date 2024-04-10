// webpack.config.js
const path = require('path')
module.exports = {
  mode: 'development',
  entry: './src/app.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/dist')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [
      path.resolve(__dirname, 'node_modules')
    ]
  }
};

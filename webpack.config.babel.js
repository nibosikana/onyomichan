import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default {
  entry: {
    contentScripts: path.join(__dirname, 'src', 'scripts', 'contentScript.js'),
    background: path.join(__dirname, 'src', 'scripts', 'background.js'),
    options: path.join(__dirname, 'src', 'scripts', 'options.js'),
    popup: path.join(__dirname, 'src', 'scripts', 'popup.js'),

  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: 'scripts/[name].bundle.js',
  },
  mode: 'production',
  target: 'web',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: { loader: 'babel-loader' }
      },
    ]
  },
  plugins: [
    new CopyWebpackPlugin(
      [
        {
          from: path.join(__dirname, 'manifest.json'),
          to: path.join(__dirname, 'dist'),
        },
        {
          from: path.join(__dirname,'src', 'scripts', 'googleAnalytics.js'),
          to: path.join(__dirname, 'dist', 'scripts'),
        },
        {
          from: path.join(__dirname,'src', 'scripts', 'vue.min.js'),
          to: path.join(__dirname, 'dist', 'scripts'),
        },
        {
          from: path.join(__dirname,'src', 'views'),
          to: path.join(__dirname, 'dist', 'views'),
        },
        {
          from: path.join(__dirname,'src', 'styles'),
          to: path.join(__dirname, 'dist', 'styles'),
        },
        {
          from: path.join(__dirname,'src', 'images'),
          to: path.join(__dirname, 'dist', 'images'),
        },
        {
          from: path.join(__dirname,'src', 'fonts'),
          to: path.join(__dirname, 'dist', 'fonts'),
        }
      ]
    )
  ]
};
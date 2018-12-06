import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import VueLoaderPlugin from 'vue-loader/lib/plugin';

export default {
  entry: {
    contentScripts: path.join(__dirname, 'src', 'scripts', 'contentScript.js'),
    background: path.join(__dirname, 'src', 'scripts', 'background.js'),
    options: path.join(__dirname, 'src', 'scripts', 'options.js'),
    popup: path.join(__dirname, 'src', 'scripts', 'popup.js'),

  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: '[name].bundle.js',
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
      {
        test: /\.vue$/,
        use: { loader: 'vue-loader' },
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader?name=../dist/fonts/[name].[ext]'
      },
      {
        test: /\.(jpg|png)$/,
        loaders: 'url-loader'
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyWebpackPlugin(
      [
        {
          from: path.join(__dirname, 'manifest.json'),
          to: path.join(__dirname, 'dist'),
        },
        {
          from: path.join(__dirname,'src', 'scripts', 'googleAnalytics.js'),
          to: path.join(__dirname, 'dist'),
        },
        {
          from: path.join(__dirname,'src', 'views'),
          to: path.join(__dirname, 'dist'),
        },
        {
          from: path.join(__dirname,'src', 'styles'),
          to: path.join(__dirname, 'dist'),
        },
        {
          from: path.join(__dirname,'src', 'images'),
          to: path.join(__dirname, 'dist'),
        }
      ]
    )
  ]
};
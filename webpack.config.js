const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { resolve } = path

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html',
  inject: 'body'
})
module.exports = {
  context: `${__dirname}/src`,
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: ''
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '/atoms': resolve(__dirname, 'src', 'components', 'atoms'),
      '/molecules': resolve(__dirname, 'src', 'components', 'molecules'),
      '/organisms': resolve(__dirname, 'src', 'components', 'organisms'),
      pages: resolve(__dirname, 'src', 'components', 'pages')
    }
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  module: {
    loaders: [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        exclude: /node_modules/,
        loader: 'file-loader?publicPath=/'
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?modules&sourceMap&localIdentName=[name]_[local]_[hash:base64:5]',
          'sass-loader?sourceMap'
        ]
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  devtool: 'eval-source-map',

  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: `"${process.env.NODE_ENV || 'development'}"` }
    }),
    HtmlWebpackPluginConfig

  ]
}

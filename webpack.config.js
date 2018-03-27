const webpack = require('webpack')
const path = require('path')

module.exports = {
  context: `${__dirname}/client`,
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'

  },
  resolve: {
    extensions: ['.js', '.json']
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
    new UglifyJSPlugin()
  ]
}

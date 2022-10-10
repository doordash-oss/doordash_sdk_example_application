import path from 'path'
import Dotenv from 'dotenv-webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { getEnvironment } from './src/server/environment'

const { DEV_API_PORT, DEV_SERVER_PORT } = getEnvironment()

module.exports = {
  devServer: {
    historyApiFallback: true,
    hot: true,
    open: true,
    port: DEV_SERVER_PORT,
    proxy: {
      '/api': {
        pathRewrite: { '^/api': '' },
        target: 'http://localhost:' + DEV_API_PORT,
      },
    },
  },
  devtool: 'source-map',
  entry: './src/client/index.tsx',
  mode: 'development',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'ts-loader',
        test: /\.(ts|tsx)?$/,
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist', 'client'),
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      hash: true, // For cache busting
      template: 'public/index.html',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@mui/styled-engine': '@mui/styled-engine-sc',
      'react-dom': '@hot-loader/react-dom',
    },
    extensions: ['.ts', '.js', '.json', '.tsx'],
  },
}

const path = require('path')
const fs = require('fs')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const { DefinePlugin } = require('webpack')

const nodeModules = {}

fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })

const definePlugin = new DefinePlugin({
  'process.env.WEBPACK': JSON.stringify(true),
})

module.exports = {
  mode: 'none',
  entry: {
    web: './src/index.ts',
    cron: './src/cron.ts',
  },
  // entry: './src/index.ts',
  target: 'node',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
  },
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.build.json',
        },
      },
    ],
  },
  plugins: [
    definePlugin,
    new CopyWebpackPlugin([
      {
        from: 'src/utils/template/**',
        to: 'template',
        flatten: true,
      },
      {
        from: 'src/contracts/**',
        to: 'contracts',
        flatten: true,
      },
    ]),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: 'tsconfig.build.json',
      }),
    ],
  },
  externals: nodeModules,
}

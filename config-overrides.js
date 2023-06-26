const { alias, configPaths } = require('react-app-rewire-alias')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = function override(config) {
  config.plugins.push(
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  )

  return alias(configPaths('./tsconfig.paths.json'))(config)
}

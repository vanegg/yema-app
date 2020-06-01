const { parsed: localEnv } = require('dotenv').config()
const webpack = require('webpack')
const path = require('path')
const Dotenv = require('dotenv-webpack')

const withSass = require('@zeit/next-sass')
const withImages = require('next-images')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const nextSourceMaps = require('@zeit/next-source-maps')

const ENV = new Dotenv({ systemvars: true })

const isProd = process.env.NODE_ENV === 'production'
const CDN = isProd ? process.env.ASSETS_CDN : ''

module.exports = nextSourceMaps(withBundleAnalyzer(withSass(withImages({
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html'
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html'
    }
  },
  webpack (config, options) {
    config.plugins.push(ENV)
    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
    config.resolve.alias['components'] = path.join(__dirname, 'src/components')
    config.resolve.alias['features'] = path.join(__dirname, 'src/features')
    config.resolve.alias['utils'] = path.join(__dirname, 'src/utils')
    config.resolve.alias['vendor'] = path.join(__dirname, 'src/vendor')
    config.resolve.alias['assets'] = path.join(__dirname, 'src/assets')
    return config
  },
  assetPrefix: CDN
}))))

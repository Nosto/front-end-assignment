"use strict"
const fs = require("fs")
const path = require("path")
const utils = require("./utils")
const webpack = require("webpack")
const config = require("../config")
const merge = require("webpack-merge")
const baseWebpackConfig = require("./webpack.base.conf")
const MergeWebpackPlugin = require("webpack-merge-and-include-globally")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const MomentLocalesPlugin = require("moment-locales-webpack-plugin")
const WebpackNotifierPlugin = require("webpack-notifier")
const WebpackOnBuildPlugin = require("on-build-webpack")

const env = require("../config/prod.env")

baseWebpackConfig.entry = {
  system: ["./src/styles/reset.scss", "./src/system.js"],
  fonts: "./src/styles/fonts.scss"
}

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.system.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  performance: { hints: false },
  devtool: config.build.productionSourceMap ? config.system.devtool : false,
  output: {
    path: config.system.assetsRoot,
    filename: utils.assetsSystemPath("[name].min.js"),
    library: "[name]",
    libraryTarget: "umd"
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      "process.env": env
    }),
    new TerserPlugin({
      terserOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: utils.assetsSystemPath("[name].min.css")
    }),
    new CopyWebpackPlugin([
      {
        from: "./src/assets/tokens/tokens.scss",
        to: utils.assetsSystemPath("tokens.scss")
      }
    ]),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: { safe: true }
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // Copy and merge Sass tokens and system utilities as well
    new MergeWebpackPlugin({
      files: {
        [utils.assetsSystemPath("all.scss")]: [
          "./src/assets/tokens/tokens.scss",
          "./src/styles/_spacing.scss",
          "./src/styles/mixins/*.scss",
          "./src/styles/_functions.scss"
        ]
      }
    }),
    new MomentLocalesPlugin(),
    new WebpackNotifierPlugin({ title: "Design System", message: "Build ready", wait: 1 }),
    new WebpackOnBuildPlugin(() => {
      if (fs.existsSync("./dist/system/fonts.min.js")) {
        fs.unlinkSync(path.join("./dist/system", "fonts.min.js"))
      }
    })
  ]
})

if (config.system.productionGzip) {
  const CompressionWebpackPlugin = require("compression-webpack-plugin")

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: new RegExp("\\.(" + config.system.productionGzipExtensions.join("|") + ")$"),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.system.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig

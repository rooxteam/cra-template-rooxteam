const { override, useBabelRc, useEslintRc, addPostcssPlugins } = require('customize-cra')
const path = require('path')
const webpack = require('webpack') // eslint-disable-line
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin') // eslint-disable-line
const ManifestPlugin = require('webpack-manifest-plugin') // eslint-disable-line
const BrotliPlugin = require('brotli-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const GenerateJsonPlugin = require('generate-json-webpack-plugin')
const zopfli = require('@gfx/zopfli')
const autoprefixer = require('autoprefixer')
// const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const { BUILD_NUMBER, JOB_NAME, GIT_BRANCH, GIT_COMMIT } = process.env

const pluginsOptions = {
  manifest: {
    fileName: 'preload.conf',
    generate: (seed, files) =>
      files
        .filter(file => (file.isInitial || file.name.endsWith('.woff2')) && !file.name.endsWith('.map'))
        .map(file => file.path),
    serialize: manifest =>
      `http2_push_preload on;\n${manifest
        .map(p => {
          if (p.endsWith('.js')) {
            return `add_header Link "<${p}>; as=script; rel=preload";`
          }
          if (p.endsWith('.css')) {
            return `add_header Link "<${p}>; as=style; rel=preload";`
          }
          if (p.endsWith('.woff2')) {
            return `add_header Link "<${p}>; as=font; crossorigin; type=font/woff2; rel=preload";`
          }
          return null
        })
        .join('\n')}`,
  },
  brotli: {
    asset: '[path].br[query]',
    test: /\.(js|css|html|svg)$/,
    threshold: 1024,
    minRatio: 0.8,
  },
  compression: {
    cache: true,
    include: /(.js|.css|.svg|.html)$/,
    algorithm(input, compressionOptions, callback) {
      return zopfli.gzip(input, { numiterations: 15 }, callback)
    },
  },
  generateJson: {
    jobName: JOB_NAME,
    buildNumber: BUILD_NUMBER,
    gitBranch: GIT_BRANCH,
    gitCommit: GIT_COMMIT,
  },
}

const loaders = {
  svgo: {
    test: /\.svg$/,
    use: [
      {
        loader: require.resolve('svg-react-loader'),
      },
      {
        loader: 'svgo-loader',
        options: {
          plugins: [
            { mergePaths: false },
            { removeViewBox: false },
            { convertTransform: false },
            { removeTitle: true },
            { cleanupids: true },
            { removeAttrs: /id/gi },
            { convertColors: { shorthex: false } },
            { convertPathData: false },
          ],
        },
      },
    ],
  },
}

const addPlugins = config => {
  const isProduction = config.mode === 'production'
  const { manifest, brotli, compression, generateJson } = pluginsOptions

  const plugins = [
    { plugin: LodashModuleReplacementPlugin },
    { plugin: TerserPlugin, options: { chunkFilter: () => false }, condition: isProduction },
    { plugin: ManifestPlugin, options: manifest, condition: isProduction },
    { plugin: BrotliPlugin, options: brotli, condition: isProduction },
    { plugin: CompressionPlugin, options: compression, condition: isProduction },
    {
      plugin: GenerateJsonPlugin,
      additionalFirstOption: 'widget-ver.json',
      options: generateJson,
      condition: isProduction,
    },
  ]
  plugins.forEach(({ plugin: Plugin, options = null, condition = true, additionalFirstOption = null }) => {
    const isHaveAdditionalFirstOption = Boolean(additionalFirstOption)
    let addedPlugin = new Plugin()
    if (options) {
      addedPlugin = !isHaveAdditionalFirstOption ? new Plugin(options) : new Plugin(additionalFirstOption, options)
    }
    if (condition) config.plugins.push(addedPlugin)
  })
  return config
}

const addWebpackPlugins = config => {
  const isProduction = config.mode === 'production'
  const plugins = [
    { plugin: new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru/), condition: isProduction },
  ]
  plugins.forEach(({ plugin, condition = false }) => {
    if (condition) config.plugins.push(plugin)
  })
  return config
}

const addLoaders = config => {
  const rules = Object.keys(loaders).map(loader => loaders[loader])
  rules.forEach(rule => config.module.rules.push(rule))
  return config
}

// const disableModuleScope = function override(config, env) {
//   config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));
//   return config;
// };

const replacePluginOption = (plugins, nameMatcher, newOptions) => {
  const pluginIndex = plugins.findIndex(plugin => {
    return plugin.constructor && plugin.constructor.name && nameMatcher(plugin.constructor.name)
  })

  if (pluginIndex === -1) {
    return plugins
  }
  Object.assign(plugins[pluginIndex].options, newOptions)
  return null
}

const disableSSICommentsRemoving = config => {
  replacePluginOption(config.plugins, name => /HtmlWebpackPlugin/i.test(name), {
    minify: {
      removeComments: false,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
  })
  return config
}

const resolveReact = baseConfig => {
  const config = { ...baseConfig }
  config.resolve.alias.react = path.resolve('./node_modules/react')
  return config
}

module.exports = override(
  useBabelRc(),
  useEslintRc(),
  addPlugins,
  addLoaders,
  addWebpackPlugins,
  resolveReact,
  disableSSICommentsRemoving,
  addPostcssPlugins([autoprefixer({ grid: true })]),
  // disableModuleScope,
)

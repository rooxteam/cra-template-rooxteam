/* eslint-disable */
const {
  override,
  useBabelRc,
  useEslintRc,
} = require('customize-cra');
const path = require('path');
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const UglifyJsPlugin = require('terser-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const zopfli = require('@gfx/zopfli');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

const {
  BUILD_NUMBER,
  JOB_NAME,
  GIT_BRANCH,
  GIT_COMMIT,
} = process.env;

const pluginsOptions = {
  manifest: {
    fileName: 'preload.conf',
    generate: (seed, files) => files.filter(file => (file.isInitial || file.name.endsWith('.woff2')) && !file.name.endsWith('.map')).map(file => file.path),
    serialize: manifest => `http2_push_preload on;\n${manifest.map((path) => {
      if (path.endsWith('.js')) {
        return `add_header Link "<${path}>; as=script; rel=preload";`;
      } if (path.endsWith('.css')) {
        return `add_header Link "<${path}>; as=style; rel=preload";`;
      } if (path.endsWith('.woff2')) {
        return `add_header Link "<${path}>; as=font; crossorigin; type=font/woff2; rel=preload";`;
      }
    }).join('\n')}`,
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
      return zopfli.gzip(input, { numiterations: 15 }, callback);
    },
  },
  generateJson: {
    jobName: JOB_NAME,
    buildNumber: BUILD_NUMBER,
    gitBranch: GIT_BRANCH,
    gitCommit: GIT_COMMIT,
  },
};

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
};

const addPlugins = (config) => {
  const isProduction = config.mode === 'production';
  const {
    manifest,
    brotli,
    compression,
    generateJson,
  } = pluginsOptions;

  const plugins = [
    { plugin: LodashModuleReplacementPlugin },
    { plugin: UglifyJsPlugin, condition: isProduction },
    { plugin: ManifestPlugin, options: manifest, condition: isProduction },
    { plugin: BrotliPlugin, options: brotli, condition: isProduction },
    { plugin: CompressionPlugin, options: compression, condition: isProduction },
    {
      plugin: GenerateJsonPlugin,
      additionalFirstOption: 'widget-ver.json',
      options: generateJson,
      condition: isProduction,
    },
  ];
  plugins.forEach(({
    plugin, options = null, condition = true, additionalFirstOption = null,
  }) => {
    const isHaveAdditionalFirstOption = Boolean(additionalFirstOption);
    let addedPlugin = new plugin();
    if (options) {
      addedPlugin = !isHaveAdditionalFirstOption ? new plugin(options) : new plugin(additionalFirstOption, options);
    }
    if (condition) config.plugins.push(addedPlugin);
  });
  return config;
};

const addWebpackPlugins = (config) => {
  const isProduction = config.mode === 'production';
  const plugins = [
    { plugin: new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru/), condition: isProduction },
  ];
  plugins.forEach(({ plugin, condition = false }) => {
    if (condition) config.plugins.push(plugin);
  });
  return config;
};

const addLoaders = (config) => {
  const rules = Object.keys(loaders).map(loader => loaders[loader]);
  rules.forEach(rule => config.module.rules.push(rule));
  return config;
};

// const disableModuleScope = function override(config, env) {
//   config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));
//   return config;
// };

const resolveReact = (config) => {
  config.resolve.alias.react = path.resolve('./node_modules/react');
  return config;
};

module.exports = override(
  useBabelRc(),
  useEslintRc(),
  addPlugins,
  addLoaders,
  addWebpackPlugins,
  resolveReact,
  // disableModuleScope,
);

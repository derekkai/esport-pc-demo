// Important modules this config uses
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const OfflinePlugin = require('offline-plugin');
const { HashedModuleIdsPlugin } = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const getRepoInfo = require('git-repo-info')();
const moment = require('moment');
const { version } = require('../../package.json');
const buildTime = moment()
  .utcOffset('+0800')
  .format('MMMM Do YYYY, h:mm:ss a');

console.log('Version Info:');
console.log(`Branch: ${getRepoInfo.branch}`); // current branch
console.log(`Long Hash: ${getRepoInfo.sha}`); // current sha
console.log(`Short Hash: ${getRepoInfo.abbreviatedSha}`); // first 10 chars of the current sha
console.log(`Tag: ${version}`); // tag for the current sha (or `null` if no tag exists)
console.log(`Build Time: ${buildTime}`); // commit date for the current sha

module.exports = require('./webpack.base.babel')({
  mode: 'production',

  // In production, we skip all hot-reloading stuff
  entry: [
    require.resolve('react-app-polyfill/ie11'),
    path.join(process.cwd(), 'app/app.js'),
  ],

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: 'static-pc/[name].[chunkhash].js',
    chunkFilename: 'static-pc/[name].[chunkhash].chunk.js',
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            comparisons: false,
            drop_console: process.env.ENVIRONMENT === 'production',
          },
          parse: {},
          mangle: true,
          output: {
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
        cache: true,
        sourceMap: true,
      }),
    ],
    nodeEnv: 'production',
    sideEffects: true,
    concatenateModules: true,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 10,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const reg = /[\\/]node_modules[\\/](.*?)([\\/]|$)/;
            const packageName = module.context.match(reg)[1];
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },

  plugins: [
    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      minify: {
        removeComments: true,
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
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: 'app/version.template.ejs',
      filename: 'version.html',
      hash: false,
      gitInfo: {
        shortHash: getRepoInfo.abbreviatedSha,
        longHash: getRepoInfo.sha,
        branch: getRepoInfo.branch,
        tag: version,
        buildTime,
      },
    }),
    // Put it in the end to capture all the HtmlWebpackPlugin's
    // assets manipulations and do leak its manipulations to HtmlWebpackPlugin
    new OfflinePlugin({
      relativePaths: false,
      publicPath: '/',
      appShell: '/',

      // No need to cache .htaccess. See http://mxs.is/googmp,
      // this is applied before any match in `caches` section
      excludes: ['.htaccess'],

      caches: {
        main: [':rest:'],

        // All chunks marked as `additional`, loaded after main section
        // and do not prevent SW to install. Change to `optional` if
        // do not want them to be preloaded at all (cached only when first loaded)
        additional: ['static-pc/*.chunk.js'],
      },

      // Removes warning for about `additional` section usage
      safeToUseOptionalCaches: true,
    }),

    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),

    new WebpackPwaManifest({
      name: 'esport-pc',
      short_name: 'esport-pc',
      description: 'yaudian esport pc',
      background_color: '#ffffff',
      theme_color: '#006dd8',
      inject: true,
      ios: true,
      icons: [],
      publicPath: '/',
    }),

    new HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20,
    }),
  ],

  performance: {
    assetFilter: assetFilename =>
      !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },
});

/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs'); // to check if the file exists

// const localIdentName =
//   process.env.NODE_ENV === 'production'
//     ? '[hash:base64:5]'
//     : '[name]__[local]__[hash:base64:5]';

module.exports = options => {
  const currentPath = path.join('.');

  // Create the fallback path (the production .env)
  const basePath = `${currentPath}/.env`;
  const defaultPath = `${currentPath}/env.development`;
  // We're concatenating the environment name to our filename to specify the correct env file!
  const envPath = `${basePath}.${process.env.ENVIRONMENT}`;

  // Check if the file exists, otherwise fall back to the production .env
  const finalPath = fs.existsSync(envPath) ? envPath : defaultPath;

  // Set the path parameter in the dotenv config
  const fileEnv = dotenv.config({ path: finalPath }).parsed;

  console.log(`.env file =${finalPath}`);

  // reduce it to a nice object, the same as before (but with the variables from the file)
  const envKeys = Object.keys(fileEnv || {}).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]); // eslint-disable-line no-param-reassign
    return prev;
  }, {});

  console.log(`source domain: ${process.env.STATIC_CDN_DOMAIN || ''}`);

  return {
    mode: options.mode,
    entry: options.entry,
    output: Object.assign(
      {
        // Compile into js/build.js
        path: path.resolve(process.cwd(), 'build'),
        publicPath: process.env.STATIC_CDN_DOMAIN
          ? `${process.env.STATIC_CDN_DOMAIN}/`
          : '/',
      },
      options.output,
    ), // Merge with env dependent settings
    optimization: options.optimization,
    module: {
      rules: [
        {
          test: /\.jsx?$/, // Transform all .js and .jsx files required somewhere with Babel
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: options.babelQuery,
          },
        },
        {
          test: /\.(scss|sass)$/,
          exclude: /node_modules/,
          oneOf: [
            {
              resourceQuery: /global/,
              use: [
                {
                  loader: 'style-loader',
                },
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: true,
                  },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: true,
                    config: {
                      path: 'postcss.config.js',
                    },
                  },
                },
                {
                  loader: 'sass-loader',
                  options: { sourceMap: true },
                },
              ],
            },
            {
              use: [
                'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    modules: true,
                    camelCase: 'dashes',
                    sourceMap: true,
                    importLoaders: 1,
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                  },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: true,
                    config: {
                      path: 'postcss.config.js',
                    },
                  },
                },
                {
                  loader: 'sass-loader',
                  options: { sourceMap: true },
                },
              ],
            },
          ],
        },
        {
          // Preprocess 3rd party .css files located in node_modules
          test: /\.css$/,
          include: /node_modules/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(eot|otf|ttf|woff|woff2)$/,
          use: 'file-loader',
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
        {
          test: /\.(jpg|png|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 2 * 1024,
                name: 'static-pc/[name][hash].[ext]',
              },
            },
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  enabled: false,
                  // NOTE: mozjpeg is disabled as it causes errors in some Linux environments
                  // Try enabling it in your environment by switching the config to:
                  // enabled: true,
                  // progressive: true,
                },
                gifsicle: {
                  interlaced: false,
                },
                optipng: {
                  optimizationLevel: 7,
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4,
                },
              },
            },
          ],
        },
        {
          test: /\.html$/,
          use: 'html-loader',
        },
        {
          test: /\.(mp4|webm)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        },
      ],
    },
    plugins: options.plugins.concat([
      // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
      // inside your code for any environment checks; Terser will automatically
      // drop any unreachable code.
      // new webpack.EnvironmentPlugin({
      //   NODE_ENV: 'development',
      // }),
      new webpack.DefinePlugin(envKeys),
    ]),
    resolve: {
      modules: ['node_modules', 'app'],
      extensions: ['.js', '.jsx', '.react.js'],
      mainFields: ['browser', 'jsnext:main', 'main'],
    },
    devtool: options.devtool,
    target: 'web', // Make web variables accessible to webpack, e.g. window
    performance: options.performance || {},
  };
};

// Need replace in node_modules/webpack-dev-server/client/index.js

// var socketUrl = url.format({
//  protocol: protocol,
//  auth: urlParts.auth,
//  hostname: hostname,
//  port: (urlParts.port === "0") ? self.location.port : urlParts.port,
//  pathname: urlParts.path == null || urlParts.path === "/" ? "/sockjs-node" : urlParts.path
// });

// TO

// var socketUrl = url.format({
//   protocol: "http:",
//   auth: urlParts.auth,
//   hostname: "develop11",
//   port: "4000",
//   pathname: urlParts.path == null || urlParts.path === "/" ? "/sockjs-node" : urlParts.path
// });

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
const isDev = process.env.NODE_ENV === 'development';


var path = require('path');
var config = require('./config');
var eslintConfig = require('./.eslintrc');

console.log('path.join(__dirname, "public")', path.join(__dirname, "public"))
console.log('path.join(__dirname, ".eslintrc.json")', path.join(__dirname, ".eslintrc.json"))

const entryAppArray = [
    "babel-polyfill",
    "./src/index",
    ];

const pluginsArray = [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'public/index.html',
      }),
  ];

if (isDev) {
  entryAppArray.unshift("webpack-dev-server/client?" + (config.clientUrl || config.defaultClientUrl));
}

if (!isDev) {
  pluginsArray.unshift(new UglifyJSPlugin());
}

module.exports = {
  entry: {
    app: entryAppArray,
  },
  // entry: "./src/index",
  output: {
      path: __dirname + (isDev ? "/public" : "/build"),
      filename: "bundle.js",
  },
  module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "eslint-loader",
          // enforce: "pre",
          options: {
            quiet: true,
            failOnError: false,
            failOnWarning: false,
            emitError: false,
            emitWarning: false
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ["es2015", "react"],
              plugins: [require('babel-plugin-transform-object-rest-spread')]
            }
          }
        },
        {
          test: /\.css$/,
          use: [
           'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: function () {
                  return [
                    require('autoprefixer')
                  ];
                }
              }
            }
          ],
        },
      ]
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 4000,
    historyApiFallback: true,
    publicPath: config.rootPath,
    host: "0.0.0.0",
  },
  plugins: pluginsArray,
};
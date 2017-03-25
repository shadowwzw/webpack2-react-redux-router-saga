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

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
const isDev = process.env.NODE_ENV === 'DEVELOPMENT';


var path = require('path');
var config = require('./config');
var eslintConfig = require('./.eslintrc');

console.log('path.join(__dirname, "public")', path.join(__dirname, "public"))
console.log('path.join(__dirname, ".eslintrc.json")', path.join(__dirname, ".eslintrc.json"))

module.exports = {
  entry: {
    app: [
    "babel-polyfill",
    "webpack-dev-server/client?" + (config.clientUrl || config.defaultClientUrl),
    "./src/index",
    ]
  },
  // entry: "./src/index",
  output: {
      path: __dirname + (isDev ? "/public" : "/build"),
      filename: "bundle.js",
  },
  module: {
      rules: [
        // {
        //   test: /\.js$/,
        //   exclude: /node_modules/,
        //   loader: "eslint-loader",
        //   // enforce: "pre",
        //   options: {
        //     quiet: true,
        //     failOnError: false,
        //     failOnWarning: false,
        //     emitError: false,
        //     emitWarning: false
        //   }
        // },
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
  plugins: [
      new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(!isDev),
        DEVELOPMENT: JSON.stringify(isDev),
      })
  ]
};
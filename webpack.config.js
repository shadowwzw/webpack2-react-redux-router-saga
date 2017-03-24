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


var path = require('path');
var config = require('./config');

console.log('path.join(__dirname, "public")', path.join(__dirname, "public"))

module.exports = {
  entry: {
    app: [
    "webpack-dev-server/client?" + config.clientUrl || config.defaultClientUrl,
    "./src/index",
    ]
  },
  // entry: "./src/index",
  output: {
      path: __dirname + "/public",
      filename: "bundle.js",
  },
  module: {
      // loaders: [
      //     {
      //         test: /\.js$/,
      //         loader: "babel-loader",
      //         exclude: /node_modules/,
      //         query: {
      //             presets: ["es2015", "react"]
      //         }
      //     },
      //     {
      //         test: /\.css$/,
      //         loader: "style-loader!css-loader?modules=true",
      //     }
      // ],
      rules: [
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
          use: [ 'style-loader', 'css-loader' ],
        }
      ]
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 4000,
    historyApiFallback: true,
    publicPath: config.rootPath,
    host: "0.0.0.0",
  }
};
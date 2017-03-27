var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
const isDev = process.env.NODE_ENV === 'development';


var path = require('path');
var config = require('./config');
var defaultConfig = require('./defaultConfig');
var clientUrl = config.clientUrl || defaultConfig.clientUrl;
var rootPath = config.rootPath || defaultConfig.rootPath;
var devServerProtocol = config.devServerProtocol || defaultConfig.devServerProtocol;
var devServerHost = config.devServerHost || defaultConfig.devServerHost;
var devServerPort = config.devServerPort || defaultConfig.devServerPort;

console.log('path.join(__dirname, "public")', path.join(__dirname, "public"));
console.log('path.join(__dirname, ".eslintrc.json")', path.join(__dirname, ".eslintrc.json"));

const entryAppArray = [
    "babel-polyfill",
    "./src/index",
];

const pluginsArray = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new HtmlWebpackPlugin({
        favicon: 'public/favicon.ico',
        filename: 'index.html',
        template: 'public/index.html',
    }),
];

if (isDev) {
    entryAppArray.unshift("webpack-dev-server-fork/client?" + clientUrl);
}

if (!isDev) {
    pluginsArray.unshift(new UglifyJSPlugin());
}

module.exports = {
    entry: {
        app: entryAppArray,
    },
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
                enforce: "pre",
                options: {
                    quiet: true,
                    failOnError: !isDev,
                    failOnWarning: !isDev,
                    emitError: false,
                    emitWarning: true
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["es2015", "react"],
                        plugins: [
                            require('babel-plugin-transform-object-rest-spread'),
                            require('babel-plugin-transform-class-properties'),
                            require('babel-plugin-transform-async-to-generator'),
                        ]
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
        port: devServerPort,
        historyApiFallback: true,
        host: "0.0.0.0",
        proxy: !rootPath || rootPath === '/' ? {} : {
                [rootPath]: {
                    target: devServerProtocol + '://' + devServerHost + ':' + devServerPort,
                    pathRewrite: {["^" + rootPath]: ""},
                }
            }
    },
    plugins: pluginsArray,
    devtool: isDev ? "eval" : false,
};

var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: './frontend/static/frontend/components/App/App.jsx',
    },
    output: {
        publicPath: ""
    },
    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
        new CompressionPlugin({
            cache: true,
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.jsx$|\.scss$|\.css$|\.html$\.(mp3|png|jpe?g|gif|svg)$/,
            threshold: 10240,
            minRatio: 0.8,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(mp3|png|jpeg|gif|svg|mp4)$/,
                loader: 'file-loader'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    },
                },
            },
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }
        ],
    },
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    }
};
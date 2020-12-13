var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    mode: 'development',
    entry: {
        main: './frontend/static/frontend/components/App/App.jsx',
    },
    output: {
        publicPath: '',
        // path:'dist'
        // filename: "[name].js",
        // chunkFilename: "[id]-[chunkhash].js",

    },
    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
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
                test: /\.(mp3|png|jpg|gif|svg|mp4)$/,
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
                // query: {
                //     presets: ['@babel/preset-env', '@babel/preset-react']
                // }
            }
        ]
    },

    devServer: {
          writeToDisk: true, // Write files to disk in dev mode, so Django can serve the assets

        inline: false,
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    }
};
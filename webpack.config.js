module.exports = {
    mode: 'development',
    entry: './visualizer/static/visualizer/components/Root/Root.jsx',
    output: {
        publicPath: 'https://127.0.0.1:8080/'
    },
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
                test: /\.(mp3|png|jpe?g|gif)$/,
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
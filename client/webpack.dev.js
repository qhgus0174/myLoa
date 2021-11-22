const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const dotenv = require('dotenv');
dotenv.config();

module.exports = merge(common, {
    mode: 'development',

    devtool: 'inline-source-map',
    plugins: [
        new webpack.EnvironmentPlugin({
            ...process.env,
        }),
    ],

    devServer: {
        host: 'localhost',
        port: 9000,
        historyApiFallback: true,
        open: true,
        proxy: {
            '/api/*': {
                target: 'http://localhost:8080',
                pathRewrite: { '^/api': '/' },
            },
        },
    },
});

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',

    devtool: 'inline-source-map',

    devServer: {
        host: 'localhost',
        port: 9000,
        historyApiFallback: true,
        open: true,
        proxy: {
            '/*': {
                target: 'http://localhost:8080',
            },
        },
    },
});

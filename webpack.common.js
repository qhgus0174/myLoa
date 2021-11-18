const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: {
        app: path.join(__dirname, 'src', 'index.tsx'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        clean: true,
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
                options: {
                    plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
                },
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[ext]?[hash]',
                },
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true,
                        },
                    },
                ],
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack', 'url-loader'],
            },
        ],
    },

    plugins: [
        new webpack.DefinePlugin({}),
        new webpack.BannerPlugin({
            banner: `build time : ${new Date().toLocaleTimeString()}`,
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            showErrors: true,
        }),
        new ForkTsCheckerWebpackPlugin(),
        new webpack.DefinePlugin({
            FIREBASE_API_KEY: JSON.stringify('AIzaSyAN038KAbJ4nMorQGoN2oQAw4hy2PHhXLM'),
            FIREBASE_AUTH_DOMAIN: JSON.stringify('myloa-8edf5.firebaseapp.com'),
            FIREBASE_PROJECT_ID: JSON.stringify('myloa-8edf5'),
            FIREBASE_STORAGE_BUCKET: JSON.stringify('myloa-8edf5.appspot.com'),
            FIREBASE_MESSAGING_SENDER_ID: JSON.stringify('1056910728071'),
            FIREBASE_APP_ID: JSON.stringify('1:1056910728071:web:bbcea5717ec61322269122'),
            FIREBASE_MEASUREMENT_ID: JSON.stringify('G-GZXH39JBXV'),
        }),
    ].concat(isDevelopment ? [new ReactRefreshWebpackPlugin()] : []),

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        modules: [path.resolve(__dirname), 'node_modules'],
        alias: {
            '@routes': path.resolve(__dirname, 'src/routes'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@context': path.resolve(__dirname, 'src/context'),
            '@style': path.resolve(__dirname, 'src/style'),
            '@common': path.resolve(__dirname, 'src/common'),
            '@fonts': path.resolve(__dirname, 'src/fonts'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@storage': path.resolve(__dirname, 'src/storage'),
            '@firebaseStore': path.resolve(__dirname, 'src/firebase'),
        },
    },
};

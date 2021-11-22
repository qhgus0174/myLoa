const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const isDevelopment = process.env.NODE_ENV !== 'production';
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const DotEnv = require('dotenv-webpack');

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
        new DotEnv(),
    ].concat(isDevelopment ? [new ReactRefreshWebpackPlugin()] : []),

    resolve: {
        plugins: [new TsconfigPathsPlugin()],
        extensions: ['.ts', '.tsx', '.js', '.json'],
        modules: [path.resolve(__dirname), 'node_modules'],
        alias: {
            '@assets': path.resolve(__dirname, 'src/assets'),
        },
        fallback: {
            fs: false,
        },
    },
    performance: {
        hints: false,
    },
};

const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    // 개발환경 mode : "development|production" 개발 환경과 배포 환경을 정할 수 있음
    mode: 'development',

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
        },
    },

    // entry: 모듈의 의존성이 시작되는 부분. 빌드 작업을 시작할 부분을 명시한다.
    entry: {
        app: path.join(__dirname, 'src', 'index.tsx'),
    },

    //entry에서부터 시작하여 번들링된 파일을 어디에 저장할지(path), 어떤 파일이름으로 저장할지(filename) 명시
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true,
    },

    //module : 어떤 모듈을 사용할지 명시한다.  test 는 어떤 파일에 적용될지 그 확장자를 명시한 것이다.
    //로더가 1개라면 loader 로, 2개 이상이라면 use 배열로 설정할 수 있다.
    // exclude 로 로더를 제외할 대상을 적용할 수도 있다.
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
                    name: '[name].[ext]?[hash]',
                },
            },
            // html관련 plugin
            //minimize: true를 통해 html 코드를 최적화
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

    //plugins : 확장 기능을 넣을 수 있다.
    // DefinePlugin : 노드 환경정보인 process.env.NODE_ENV에 값을 넣어준다. webpack 설정파일의 mode값을 return함
    // CleanWebpackPlugin : 빌드 이전 결과물을 제거(output 경로에 있는거)
    // BannerPlugin : 결과물에 빌드 정보나 커밋 버전, 만든이 등과 같은 정보를 추가할 수 있다
    // HtmlWebpackPlugin : 번들이 완료된 파일을 <script/>를 이용해 로드한 html파일을 자동으로 생성해주는 플러그인
    // ForkTsCheckerWebpackPlugin : Speeds up TypeScript type checking and ESLint linting
    plugins: [
        new webpack.DefinePlugin({}),
        new webpack.BannerPlugin({
            banner: `build time : ${new Date().toLocaleTimeString()}`,
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new ForkTsCheckerWebpackPlugin(),
        isDevelopment && new ReactRefreshWebpackPlugin(),
    ],

    // webpack-dev-server의 개발 서버 설정
    devServer: {
        host: 'localhost',
        port: 9000,
        open: true, //개발 서버 실행 시 브라우저 오픈
    },
};

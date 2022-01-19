const withImages = require('next-images');
const isDevelopment = process.env.NODE_ENV !== 'production';
const CompressionPlugin = require('compression-webpack-plugin');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(
    withImages({
        compress: true,
        images: {
            disableStaticImages: true,
        },

        webpack: (config, options) => {
            const plugins = [
                ...config.plugins,
                new CompressionPlugin({
                    algorithm: 'gzip',
                    test: /\.(js|html)$/,
                    threshold: 10240, // 10kb
                    minRatio: 0.8,
                }),
            ];
            return {
                ...config,
                devtool: isDevelopment ? 'inline-source-map' : 'hidden-source-map',
                plugins: plugins,
            };
        },
    }),
);

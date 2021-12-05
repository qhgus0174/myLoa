const withImages = require('next-images');
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = withImages({
    productionBrowserSourceMaps: true,
    images: {
        disableStaticImages: true,
    },
    webpack: (config, options) => {
        return {
            ...config,
            devtool: isDevelopment ? 'inline-source-map' : 'hidden-source-map',
        };
    },
});

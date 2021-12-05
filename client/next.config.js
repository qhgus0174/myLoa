const withImages = require('next-images');
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = withImages({
    productionBrowserSourceMaps: true,
    images: {
        disableStaticImages: true,
    },
    async rewrites() {
        return isDevelopment
            ? [
                  {
                      source: '/api/:path*',
                      destination: 'http://localhost:8080/:path*',
                  },
              ]
            : [];
    },
    webpack: (config, options) => {
        return {
            ...config,
            devtool: isDevelopment ? 'inline-source-map' : 'hidden-source-map',
        };
    },
});

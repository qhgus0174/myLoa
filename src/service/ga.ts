import ReactGA from 'react-ga';

interface TrackPageViewParams {
    path: string;
}

class GAService {
    private env: string;

    constructor() {
        if (!GA_TRACKING_ID) {
            throw new Error('GA_TRACKING_ID must be provided.');
        }

        this.env = NODE_ENV;

        if (this.isProduction) {
            ReactGA.initialize(GA_TRACKING_ID);
        }
    }

    private get isProduction() {
        return this.env === 'production';
    }

    public trackPageView({ path }: TrackPageViewParams) {
        const decodedPath = decodeURIComponent(path);

        if (!this.isProduction) {
            console.log(`Page Viewed: ${decodedPath}`);
            return;
        }

        ReactGA.pageview(decodedPath);
    }
}

export const GA = new GAService();

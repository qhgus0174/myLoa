import ReactGA from 'react-ga';

interface TrackPageViewParams {
    path: string;
}

interface TrackEventParams {
    category: string;
    action: string;
    value?: number;
    label?: string;
}

interface TrackCharacter extends Omit<TrackEventParams, 'category'> {
    action: 'Add' | 'Edit';
}

class GAService {
    private env: 'development' | 'production';

    constructor() {
        if (!process.env.GA_TRACKING_ID) {
            throw new Error('GA_TRACKING_ID must be provided .');
        }

        this.env = process.env.NODE_ENV;

        if (this.isProduction) {
            ReactGA.initialize(process.env.GA_TRACKING_ID);
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

    private trackEvent(params: TrackEventParams) {
        if (!this.isProduction) {
            console.log(params);
            return;
        }

        ReactGA.event(params);
    }

    public trackCharacterAdd(params: TrackCharacter) {
        this.trackEvent({ category: 'Character', ...params });
    }
}

export const GA = new GAService();

declare module '*.svg' {
    import React = require('react');

    export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}

declare module '*.gif' {
    const src: string;
    export default src;
}

declare module '*.jpg' {
    const src: string;
    export default src;
}

declare module '*.jpeg' {
    const src: string;
    export default src;
}

declare module '*.png' {
    const src: string;
    export default src;
}

declare module NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: 'development' | 'production';
        readonly GA_TRACKING_ID: string;
        readonly FIREBASE_API_KEY: string;
        readonly FIREBASE_AUTH_DOMAIN: string;
        readonly FIREBASE_PROJECT_ID: string;
        readonly FIREBASE_STORAGE_BUCKET: string;
        readonly FIREBASE_MESSAGING_SENDER_ID: string;
        readonly FIREBASE_APP_ID: string;
        readonly FIREBASE_MEASUREMENT_ID: string;
    }
}

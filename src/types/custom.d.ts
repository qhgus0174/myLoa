declare module 'hex-to-css-filter';

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

declare const FIREBASE_API_KEY: string;
declare const FIREBASE_AUTH_DOMAIN: string;
declare const FIREBASE_PROJECT_ID: string;
declare const FIREBASE_STORAGE_BUCKET: string;
declare const FIREBASE_MESSAGING_SENDER_ID: string;
declare const FIREBASE_APP_ID: string;
declare const FIREBASE_MEASUREMENT_ID: string;

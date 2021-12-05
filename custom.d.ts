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
        readonly NEXT_PUBLIC_GA_TRACKING_ID: string;
    }
}

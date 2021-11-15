import '@emotion/react';

declare module '@emotion/react' {
    export interface Theme {
        colors: {
            main: string;
            mainInner: string;
            relax: string;
            shadow: string;
            white: string;
            pureWhite: string;
            black: string;
            hover: string;
            gray: string;
            scroll: string;
            pin: string;
            text: string;
            compassActive: string;
        };

        button: {
            color: string;
            none: string;
            cancel: string;
            ok: string;
            hover: {
                color: string;
                background: string;
            };
        };

        check: {
            background: string;
            mark: string;
            border: string;
        };

        logoColor: string;
    }
}

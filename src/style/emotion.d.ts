import '@emotion/react';

declare module '@emotion/react' {
    export interface Theme {
        visible: boolean;
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
            navBorder: string;
            warn: string;
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
            paging: {
                color: string;
                background: string;
            };
        };

        check: {
            background: string;
            mark: string;
            basicMark: string;
            border: string;
        };

        logoColor: string;

        graph: {
            primary: string;
            secondary: string;
            tertiary: string;
            quaternary: string;
        };

        ledger: {
            income: string;
            spending: string;
            lastWeek: string;
        };
    }
}

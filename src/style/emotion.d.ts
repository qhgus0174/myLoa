import '@emotion/react';

declare module '@emotion/react' {
    export interface Theme {
        colors: {
            main: string;
            mainDark: string;
            check: string;
            relax: string;
            focusDark: string;
            white: string;
            pureWhite: string;
            black: string;
            hoverGray: string;
            translucent: string;
            scroll: string;
        };

        buttonColors: {
            white: string;
            none: string;
            cancel: string;
            ok: string;
        };
    }
}

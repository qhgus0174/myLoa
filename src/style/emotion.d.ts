import '@emotion/react';

declare module '@emotion/react' {
    export interface Theme {
        colors: {
            main: string;
            check: string;
            relax: string;
            focusDark: string;
            white: string;
            black: string;
            hoverGray: string;
            translucent: string;
        };

        buttonColors: {
            none: string;
            cancel: string;
            main: string;
        };
    }
}

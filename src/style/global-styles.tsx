import { css, Global, useTheme } from '@emotion/react';
import '@fonts/fonts.css';

export const GlobalStyle = () => {
    const theme = useTheme();

    return (
        <Global
            styles={css`
                * {
                    margin: 0;
                    color: ${theme.colors.white};
                    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
                    font-size: 14px;
                }

                body {
                    background-color: ${theme.colors.main};
                    height: 100%;
                    margin: 0;
                }

                input[type='text'] {
                    border-radius: 1px;
                }
            `}
        />
    );
};

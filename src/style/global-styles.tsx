import { css, Global, useTheme } from '@emotion/react';
import '@fonts/fonts.css';

export const GlobalStyle = () => {
    const theme = useTheme();

    return (
        <Global
            styles={css`
                * {
                    margin: 0;
                    color: ${theme.colors.text};
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

                .Toastify__toast-body div {
                    color: ${theme.colors.black};
                }

                select {
                    border: 0.7px solid ${theme.colors.white};
                    background-color: ${theme.colors.mainInner};
                    padding: 0.2em;
                    font-size: 0.9em;
                }

                ::-webkit-scrollbar-track {
                    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
                    background-color: ${theme.colors.main};
                }
                ::-webkit-scrollbar {
                    width: 6px;
                    background-color: ${theme.colors.scroll};
                }
                ::-webkit-scrollbar-thumb {
                    background-color: ${theme.colors.scroll};
                }
            `}
        />
    );
};

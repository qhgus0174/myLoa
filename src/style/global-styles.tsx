import { css, Global, useTheme } from '@emotion/react';
import Snowflakes from 'magic-snowflakes';
import { useEffect } from 'react';

export const GlobalStyle = () => {
    const theme = useTheme();

    useEffect(() => {
        new Snowflakes({
            color: '#eaf3f5',
            count: 20,
            speed: 0.7,
            minSize: 3,
            maxSize: 15,
        });
    }, []);

    return (
        <Global
            styles={css`
                * {
                    margin: 0;
                    color: ${theme.colors.text};
                    font-family: 'Pretendard', 'sans-serif';
                    font-size: 13.5px;
                    visibility: ${theme.visible ? 'visible' : 'hidden'};
                }

                body {
                    background-color: ${theme.colors.main};
                    height: 100%;
                }

                input[type='text'] {
                    border-radius: 1px;
                }

                ul,
                li {
                    list-style: none;
                    margin: 0;
                    padding: 0;
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

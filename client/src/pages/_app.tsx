import React from 'react';
import { resetServerContext } from 'react-beautiful-dnd';
import { AppProps } from 'next/dist/shared/lib/router/router';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalThemeContext, { GlobalThemeContext as aa } from '@context/GlobalThemeContext';
import LocalStorageContext from '@context/LocalStorageContext';
import SpinnerContext from '@context/SpinnerContext';
import PagingContext from '@context/PagingContext';
import ModalContext from '@context/ModalContext';
import Header from '@components/Layout/Header';
import styled from '@emotion/styled';
import '@fonts/fonts.css';
import { GlobalStyle } from '@style/global-styles';

const App = ({ Component, pageProps }: AppProps) => {
    {
        resetServerContext();
    }
    return (
        <GlobalThemeContext>
            <GlobalStyle />
            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover={false}
                transition={Flip}
                limit={5}
                className="tostify-container"
            />
            <Container>
                <LocalStorageContext>
                    <PagingContext>
                        <SpinnerContext>
                            <ModalContext>
                                <Header />
                                <Component {...pageProps} />
                            </ModalContext>
                        </SpinnerContext>
                    </PagingContext>
                </LocalStorageContext>
            </Container>
        </GlobalThemeContext>
    );
};

const Container = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export default App;

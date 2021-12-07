import React, { useEffect, useState } from 'react';
import '@fonts/fonts.css';
import { resetServerContext } from 'react-beautiful-dnd';
import { AppProps } from 'next/dist/shared/lib/router/router';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useWindowDimensions from '@hooks/useWindowDimensions';
import LocalStorageContext from '@context/LocalStorageContext';
import GlobalThemeContext from '@context/GlobalThemeContext';
import MobileNavContext from '@context/MobileNavContext';
import SpinnerContext from '@context/SpinnerContext';
import PagingContext from '@context/PagingContext';
import ModalContext from '@context/ModalContext';
import Header from '@components/Layout/Header';
import Navbar from '@components/Layout/Navbar';
import styled from '@emotion/styled';
import { GlobalStyle } from '@style/global-styles';
import { responsiveWidth } from '@style/device';

const App = ({ Component, pageProps }: AppProps) => {
    const [isNavMobile, setIsNavMobile] = useState<boolean>(false);
    const { width: windowWidth } = useWindowDimensions();

    useEffect(() => {
        checkMobile();
        resetServerContext();
    }, []);

    useEffect(() => {
        checkMobile();
    }, [windowWidth]);

    const checkMobile = () => {
        typeof window !== 'undefined' && window.innerWidth <= responsiveWidth.tablet
            ? setIsNavMobile(true)
            : setIsNavMobile(false);
    };

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
                                <MobileNavContext>
                                    <Header />
                                    <Navbar isMobile={isNavMobile} />
                                </MobileNavContext>
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

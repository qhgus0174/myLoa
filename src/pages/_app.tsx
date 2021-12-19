import React, { useEffect, useState } from 'react';
import { DefaultSeo } from 'next-seo';
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
                                <DefaultSeo
                                    title="로요일좋아"
                                    description="로스트 아크 유틸 모음 페이지입니다! 내 캐릭터 골드 수입 확인도 하고 일일, 주간 숙제를 편하게 체크해보세요."
                                    openGraph={{
                                        title: '로요일좋아',
                                        description:
                                            '로스트 아크 유틸 모음 페이지입니다! 내 캐릭터 골드 수입 확인도 하고 일일, 주간 숙제를 편하게 체크해보세요.',
                                        url: 'https://loa-day.com/',
                                        locale: 'ko_KR',
                                        type: 'website',
                                        images: [
                                            {
                                                url: 'https://loa-day.com/static/img/logo/logo.png',
                                                width: 1200,
                                                height: 1200,
                                                type: 'image/png',
                                            },
                                        ],
                                    }}
                                />
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

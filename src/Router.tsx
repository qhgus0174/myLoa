import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Main from '@routes/Main';
import SpinnerContext from '@context/SpinnerContext';
import PagingContext from '@context/PagingContext';
import ModalContext from '@context/ModalContext';
import Header from '@components/Layout/Header';
import styled from '@emotion/styled';

const AppRouter = () => {
    return (
        <>
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
            <BrowserRouter>
                <Container>
                    <PagingContext>
                        <SpinnerContext>
                            <ModalContext>
                                <Header />
                                <Switch>
                                    <Route exact path="/" component={Main} />
                                </Switch>
                            </ModalContext>
                        </SpinnerContext>
                    </PagingContext>
                </Container>
            </BrowserRouter>
        </>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export default AppRouter;

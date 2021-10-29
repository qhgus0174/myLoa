import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from '@routes/Main';
import ModalContext from '@context/ModalContext';
import SpinnerContext from '@context/SpinnerContext';
import { Flip, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
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
                theme="dark"
                limit={5}
            />
            <BrowserRouter>
                <Container>
                    <ModalContext>
                        <Header />
                        <Switch>
                            <Route exact path="/" component={Main} />
                        </Switch>
                    </ModalContext>
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

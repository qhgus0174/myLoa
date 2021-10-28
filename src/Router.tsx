import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from '@routes/Main';
import ModalContext from '@context/ModalContext';
import SpinnerContext from '@context/SpinnerContext';
import { Flip, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

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
            <ModalContext>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Main} />
                    </Switch>
                </BrowserRouter>
            </ModalContext>
        </>
    );
};

export default AppRouter;

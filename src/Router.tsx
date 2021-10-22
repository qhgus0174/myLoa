import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from '@routes/Main';
import ModalContext from '@context/ModalContext';
import SpinnerContext from '@context/SpinnerContext';

const AppRouter = () => {
    return (
        <ModalContext>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Main} />
                </Switch>
            </BrowserRouter>
        </ModalContext>
    );
};

export default AppRouter;

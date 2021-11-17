import React from 'react';
import AppRouter from './Router';
import GlobalThemeContext from '@context/GlobalThemeContext';

const App = () => {
    return (
        <GlobalThemeContext>
            <AppRouter />
        </GlobalThemeContext>
    );
};

export default App;

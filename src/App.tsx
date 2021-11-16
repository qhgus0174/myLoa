import React from 'react';
import AppRouter from './Router';
import GlobalThemeContext from '@context/GlobalThemeContext';
import ResetContext from '@context/ResetContext';

const App = () => {
    return (
        <ResetContext>
            <GlobalThemeContext>
                <AppRouter />
            </GlobalThemeContext>
        </ResetContext>
    );
};

export default App;

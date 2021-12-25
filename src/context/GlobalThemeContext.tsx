import React, { createContext } from 'react';
import { IThemeStyle } from '@style/theme';
import { useTheme } from '@hooks/useTheme';
import { ThemeProvider } from '@emotion/react';

interface ITheme {
    theme: IThemeStyle;
    setTheme: (e: IThemeStyle) => void;
}

<<<<<<< HEAD
export const GlobalThemeContext = createContext<ITheme>({ theme: 'none', setTheme: (e: IThemeStyle) => {} });
=======
export const GlobalThemeContext = createContext<ITheme>({ theme: 'basic', setTheme: (e: IThemeStyle) => {} });
>>>>>>> dev

const GlobalThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const { theme, setTheme } = useTheme();

    return (
        <GlobalThemeContext.Provider value={{ theme, setTheme }}>
            <ThemeProvider theme={require('@style/theme')[theme]}>{children}</ThemeProvider>
        </GlobalThemeContext.Provider>
    );
};

export default GlobalThemeProvider;

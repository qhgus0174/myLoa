import useTheme from '@hooks/storage/useTheme';
import { IThemeStyle } from '@style/theme';
import React, { createContext, useEffect } from 'react';

interface ITheme {
    theme: IThemeStyle;
    setTheme: (e: IThemeStyle) => void;
}

export const GlobalThemeContext = createContext<ITheme>({ theme: 'basic', setTheme: (e: IThemeStyle) => {} });

const GlobalThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useTheme();

    return <GlobalThemeContext.Provider value={{ theme, setTheme }}>{children}</GlobalThemeContext.Provider>;
};

export default GlobalThemeProvider;

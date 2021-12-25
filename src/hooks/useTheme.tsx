import { IThemeStyle } from '@style/theme';
import React, { useEffect, useState } from 'react';

export const useTheme = () => {
    const [theme, setTheme] = useState<IThemeStyle>('none');

    useEffect(() => {
        const themeData = localStorage.getItem('theme') as IThemeStyle;

        themeData ? setTheme(themeData) : setTheme('none');
    }, []);

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    return {
        theme,
        setTheme,
    };
};

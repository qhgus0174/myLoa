import React, { useEffect, useState } from 'react';
import { IThemeStyle } from '@style/theme';

export const useTheme = () => {
    const [theme, setTheme] = useState<IThemeStyle>('none');

    useEffect(() => {
        const themeData = localStorage.getItem('theme') as IThemeStyle;

        themeData ? setTheme(themeData) : setTheme('basic');
    }, []);

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    return {
        theme,
        setTheme,
    };
};

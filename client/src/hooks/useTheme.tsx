import { IThemeStyle } from '@style/theme';
import React, { useEffect, useState } from 'react';

export const useTheme = () => {
    const [theme, setTheme] = useState<IThemeStyle>('basic');

    useEffect(() => {
        const themeData = localStorage.getItem('theme') as IThemeStyle;

        if (themeData) {
            setTheme(themeData);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    return {
        theme,
        setTheme,
    };
};

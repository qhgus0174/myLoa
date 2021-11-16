import useReset from '@hooks/storage/useReset';
import { IThemeStyle } from '@style/theme';
import React, { createContext, useEffect } from 'react';

interface ITheme {
    dateTime: string;
    setDateTime: (e: string) => void;
}

export const ResetContext = createContext<ITheme>({ dateTime: '', setDateTime: (e: string) => {} });

const ResetProvider = ({ children }: { children: React.ReactNode }) => {
    const [dateTime, setDateTime] = useReset();

    return <ResetContext.Provider value={{ dateTime, setDateTime }}>{children}</ResetContext.Provider>;
};

export default ResetProvider;

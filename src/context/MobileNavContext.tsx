import React, { createContext, useEffect, useState } from 'react';
import Router from 'next/router';
import useWindowDimensions from '@hooks/useWindowDimensions';
import { responsiveWidth } from '@style/device';

interface INavbar {
    visible: boolean;
    setVisible: (e: boolean) => void;
}

export const MobileNavContext = createContext<INavbar>({ visible: false, setVisible: (e: boolean) => {} });

const MobileNavProvider = ({ children }: { children: React.ReactNode }) => {
    const [visible, setVisible] = useState<boolean>(false);
    const { width: windowWidth } = useWindowDimensions();

    useEffect(() => {
        Router.events.on('routeChangeComplete', () => setVisible(false));
    }, []);

    useEffect(() => {
        setVisible(false);
    }, [windowWidth && windowWidth < responsiveWidth.tablet]);

    return <MobileNavContext.Provider value={{ visible, setVisible }}>{children}</MobileNavContext.Provider>;
};

export default MobileNavProvider;

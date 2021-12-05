import { useState, useEffect } from 'react';

interface IDimensions {
    width: number | undefined;
    height: number | undefined;
}

export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState<IDimensions>({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            function handleResize() {
                setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
            }

            window.addEventListener('resize', handleResize);
            handleResize();
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    return windowDimensions;
}

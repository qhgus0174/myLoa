import React, { useRef, useEffect } from 'react';

/**
 * Hook that alerts clicks outside of the passed ref
 */
const useOutsideAlerter = (ref: any, excuteFn: () => void) => {
    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target)) {
            excuteFn();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    });
};

const OutsideAlerter = ({ children, excuteFn }: { children: React.ReactNode; excuteFn: () => void }) => {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, excuteFn);

    return <div ref={wrapperRef}>{children}</div>;
};

export default OutsideAlerter;

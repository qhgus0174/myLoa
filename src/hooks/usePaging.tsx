import React, { useEffect, useState } from 'react';
import useWindowDimensions from '@hooks/useWindowDimensions';
import { responsiveWidth } from '@style/device';

export interface IPagingOption {
    perPage: number;
    currentPage: number;
    setCurrentPage: (e: number) => void;
    onClickPrev: () => void;
    onClickNext: () => void;
}

export const usePaging = () => {
    const [perPage, setPerPage] = useState<IPagingOption['perPage']>(6);
    const [currentPage, setCurrentPage] = useState<IPagingOption['currentPage']>(1);
    const { width } = useWindowDimensions();

    useEffect(() => {
        calcPerPage();
    }, [String(width)]);

    const calcPerPage = () => {
        if (width < Number(responsiveWidth.phone)) {
            setPerPage(1);
        } else if (width < Number(responsiveWidth.tablet)) {
            setPerPage(2);
        } else if (width < Number(responsiveWidth.smallDesktop)) {
            setPerPage(3);
        } else if (width < Number(responsiveWidth.desktop)) {
            setPerPage(4);
        } else {
            setPerPage(6);
        }
        setCurrentPage(1);
    };

    const onClickPrev = () => {
        const page = currentPage - 1;
        setCurrentPage(page < 1 ? 1 : page);
    };

    const onClickNext = () => {
        const page = currentPage + 1;
        const maxPage = Math.ceil(JSON.parse(JSON.parse(localStorage.getItem('character') || '[]')).length / perPage);
        setCurrentPage(page > maxPage ? maxPage : page);
    };

    return { perPage, currentPage, setCurrentPage, onClickPrev, onClickNext };
};

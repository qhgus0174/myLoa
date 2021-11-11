import React, { useEffect, useState } from 'react';
import useWindowDimensions from '@hooks/useWindowDimensions';
import { responsiveWidth } from '@style/device';
import { getStorage } from '@storage/index';
import usePage from '@hooks/storage/usePage';

export interface IPagingOption {
    currentPage: number;
    perPage: number;
    setCurrentPage: (e: number) => void;
    onClickPrev: () => void;
    onClickNext: () => void;
}

export const usePaging = () => {
    const [perPage, setPerPage] = useState<IPagingOption['perPage']>(6);
    const { width: windowWidth } = useWindowDimensions();
    const [currentPage, setCurrentPage] = usePage();

    useEffect(() => {
        calcPerPage();
        resetCurrentPage();
    }, [String(windowWidth)]);

    const resetCurrentPage = () => {
        Object.values(responsiveWidth).includes(windowWidth) && setCurrentPage(1);
    };

    const widths = [
        responsiveWidth.phone,
        responsiveWidth.tablet,
        responsiveWidth.smallDesktop,
        responsiveWidth.desktop,
    ];

    const calcPerPage = () => {
        setPerPage(widths.findIndex(w => windowWidth < w) + 1 || 6);
    };

    const onClickPrev = () => {
        const page = currentPage - 1;
        setCurrentPage(page < 1 ? 1 : page);
    };

    const onClickNext = () => {
        const page = currentPage + 1;
        const maxPage = Math.ceil(getStorage('character').length / perPage);
        setCurrentPage(page > maxPage ? maxPage : page);
    };

    return { perPage, currentPage, setCurrentPage, onClickPrev, onClickNext };
};

import React, { useEffect, useState } from 'react';
import useWindowDimensions from '@hooks/useWindowDimensions';
import { responsiveWidth } from '@style/device';

export interface IPagingOption {
    currentPage: number;
    perPage: number;
    setCurrentPage: (e: number) => void;
    onClickPrev: () => void;
    onClickNext: () => void;
}

export const usePaging = () => {
    const [perPage, setPerPage] = useState<IPagingOption['perPage']>(7);
    const { width: windowWidth } = useWindowDimensions();
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        calcPerPage();
        resetCurrentPage();
    }, [String(windowWidth)]);

    useEffect(() => {
        calcPerPage();
    }, []);

    const resetCurrentPage = () => {
        setCurrentPage(1);
    };

    interface IWidthPerPage {
        key: number;
        page: number;
    }
    const getPerPage: IWidthPerPage[] = [
        { key: responsiveWidth.smallPhone, page: 1 },
        { key: responsiveWidth.phone, page: 2 },
        { key: responsiveWidth.tablet, page: 3 },
        { key: responsiveWidth.smallDesktop, page: 4 },
        { key: responsiveWidth.desktop, page: 5 },
        { key: responsiveWidth.mediumDesktop, page: 6 },
        { key: responsiveWidth.wideDesktop, page: 7 },
        { key: responsiveWidth.bigDesktop, page: 8 },
    ];

    const calcPerPage = () => {
        const index = getPerPage.findIndex(w => w.key >= windowWidth!);
        setPerPage(getPerPage[index] ? getPerPage[index].page : 7);
    };

    const onClickPrev = () => {
        const page = currentPage - 1;
        setCurrentPage(page < 1 ? 1 : page);
    };

    const onClickNext = () => {
        const page = currentPage + 1;
        const maxPage = Math.ceil(JSON.parse(JSON.parse(localStorage.getItem('character') as string)).length / perPage);
        setCurrentPage(page > maxPage ? maxPage : page);
    };

    return { perPage, currentPage, setCurrentPage, onClickPrev, onClickNext };
};

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

    interface IWidthPerPage {
        key: number;
        page: number;
    }
    const getPerPage: IWidthPerPage[] = [
        { key: responsiveWidth.phone, page: 1 },
        { key: responsiveWidth.tablet, page: 2 },
        { key: responsiveWidth.smallDesktop, page: 3 },
        { key: responsiveWidth.desktop, page: 4 },
        { key: responsiveWidth.mediumDesktop, page: 5 },
        { key: responsiveWidth.wideDesktop, page: 6 },
        { key: responsiveWidth.bigDesktop, page: 7 },
    ];

    const calcPerPage = () => {
        console.log(windowWidth);
        const index = getPerPage.findIndex(w => w.key >= windowWidth);
        setPerPage(getPerPage[index] ? getPerPage[index].page : 7);
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

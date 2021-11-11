import React, { createContext } from 'react';
import { IPagingOption, usePaging } from '@hooks/usePaging';

export const PagingStateContext = createContext<Pick<IPagingOption, 'perPage' | 'currentPage'>>({
    currentPage: 1,
    perPage: 6,
});

export const PagingActionContext = createContext<Pick<IPagingOption, 'setCurrentPage' | 'onClickPrev' | 'onClickNext'>>(
    {
        setCurrentPage: (e: number) => {},
        onClickPrev: () => {},
        onClickNext: () => {},
    },
);

const PagingProvider = ({ children }: { children: React.ReactNode }) => {
    const { currentPage, perPage, setCurrentPage, onClickPrev, onClickNext } = usePaging();
    return (
        <PagingActionContext.Provider value={{ setCurrentPage, onClickPrev, onClickNext }}>
            <PagingStateContext.Provider value={{ currentPage, perPage }}>{children}</PagingStateContext.Provider>
        </PagingActionContext.Provider>
    );
};

export default PagingProvider;

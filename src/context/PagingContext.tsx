import React, { createContext } from 'react';
import { IPagingOption, usePaging } from '@hooks/usePaging';

export const PagingStateContext = createContext<Pick<IPagingOption, 'perPage' | 'currentPage'>>({
    perPage: 6,
    currentPage: 1,
});

export const PagingActionContext = createContext<Pick<IPagingOption, 'setCurrentPage' | 'onClickPrev' | 'onClickNext'>>(
    {
        setCurrentPage: (e: number) => {},
        onClickPrev: () => {},
        onClickNext: () => {},
    },
);

const PagingProvider = ({ children }: { children: React.ReactNode }) => {
    const { perPage, currentPage, setCurrentPage, onClickPrev, onClickNext } = usePaging();
    return (
        <PagingActionContext.Provider value={{ setCurrentPage, onClickPrev, onClickNext }}>
            <PagingStateContext.Provider value={{ perPage, currentPage }}>{children}</PagingStateContext.Provider>
        </PagingActionContext.Provider>
    );
};

export default PagingProvider;

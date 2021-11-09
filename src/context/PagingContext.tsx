import React, { createContext } from 'react';
import { IPagingOption, usePaging } from '@hooks/usePaging';

export const PagingStateContext = createContext<Pick<IPagingOption, 'perPage'>>({
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
    const { perPage, setCurrentPage, onClickPrev, onClickNext } = usePaging();
    return (
        <PagingActionContext.Provider value={{ setCurrentPage, onClickPrev, onClickNext }}>
            <PagingStateContext.Provider value={{ perPage }}>{children}</PagingStateContext.Provider>
        </PagingActionContext.Provider>
    );
};

export default PagingProvider;

import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { PagingActionContext, PagingStateContext } from '@context/PagingContext';
import { getStorage } from '@storage/index';
import useCharacter from '@hooks/storage/useCharacter';
import { responsiveWidth } from '@style/device';
import useWindowDimensions from '@hooks/useWindowDimensions';

const Pagination = () => {
    const [pageNumbers, setPageNumbers] = useState<number[]>([]);
    const { setCurrentPage } = useContext(PagingActionContext);
    const [storageCharacter, setStorageCharacter] = useCharacter();

    const { width: windowWidth } = useWindowDimensions();

    const { perPage, currentPage } = useContext(PagingStateContext);

    useEffect(() => {
        setPageNumbers(Array.from(Array(Math.ceil(getStorage('character').length / perPage)).keys(), x => x + 1));
    }, [getStorage('character').length, perPage]);

    return (
        <>
            <PagingUl>
                <PagingLi
                    onClick={() => {
                        setCurrentPage(1);
                    }}
                    active={false}
                >
                    <span>&lt;&lt;</span>
                </PagingLi>
                <PagingLi
                    onClick={() => {
                        setCurrentPage(currentPage - 1 < 1 ? 1 : currentPage - 1);
                    }}
                    active={false}
                >
                    <span>&lt;</span>
                </PagingLi>
                {pageNumbers.map((pageNumber: number, index: number) => {
                    return (
                        <PagingLi
                            onClick={() => {
                                setCurrentPage(pageNumber);
                            }}
                            key={index}
                            active={pageNumber === currentPage}
                        >
                            <span>{pageNumber}</span>
                        </PagingLi>
                    );
                })}
                <PagingLi
                    onClick={() => {
                        setCurrentPage(currentPage + 1 >= pageNumbers.length ? pageNumbers.length : currentPage + 1);
                    }}
                    active={false}
                >
                    <span>&gt;</span>
                </PagingLi>
                <PagingLi
                    onClick={() => {
                        setCurrentPage(pageNumbers.length);
                    }}
                    active={false}
                >
                    <span>&gt;&gt;</span>
                </PagingLi>
            </PagingUl>
        </>
    );
};

const PagingUl = styled.ul`
    display: flex;
    justify-content: flex-end;
    height: 100%;
    align-items: center;
    margin-bottom: 0.2em;
`;

interface IPageStyle {
    active: boolean;
}

const PagingLi = styled.li<IPageStyle>`
    cursor: pointer;
    box-sizing: border-box;
    padding: 0.3rem 0.6rem;
    border: none;

    background: ${props => props.active && props.theme.button.paging.background};
    span {
        color: ${props => props.active && props.theme.button.paging.color};
    }

    &:hover {
        span {
            color: ${props => props.theme.button.paging.color};
        }

        background: ${props => props.theme.button.paging.background};

        svg {
            fill: ${props => props.theme.button.hover.color};
        }

        ${responsiveWidth.tablet} {
            background: transparent;
        }

        box-shadow: 0px 3px 10px -1px rgb(0 0 0 / 80%);
    }
`;

export default Pagination;

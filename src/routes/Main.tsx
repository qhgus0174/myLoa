import React, { useContext, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { load } from 'cheerio';
import { css, useTheme } from '@emotion/react';
import { ModalActionContext } from '@context/ModalContext';
import CharacterAdd from '@components/Character/modal/CharacterAdd';
import TodoAdd from '@components/Todo/modal/TodoAdd';
import LineAdd from '@components/Line/LineAdd';
import Character from '@components/Character';
import Todo from '@components/Todo';
import Button from '@components/Button/Button';
import styled from '@emotion/styled';
import { FlexDiv } from '@style/common';

const Main = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(5);

    const { setModalProps } = useContext(ModalActionContext);

    const onContextMenuBasicModal = (
        e: React.MouseEvent<HTMLElement>,
        modal: JSX.Element,
        width: string = '30',
        height: string = '50',
    ) => {
        e.preventDefault();
        setModalProps({
            isOpen: true,
            type: 'basic',
            content: modal,
            options: { width: width, height: height },
        });
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

    return (
        <FlexDiv width="80" direction="column">
            <ButtonDiv width="100">
                <FlexDiv width="100">
                    <FlexDiv width="100" basis="50">
                        <Button
                            css={css`
                                margin-right: 1em;
                            `}
                            type="button"
                            onClick={e => onContextMenuBasicModal(e, <TodoAdd />, '30', '80')}
                        >
                            할 일 추가
                        </Button>
                        <Button type="button" onClick={e => onContextMenuBasicModal(e, <LineAdd />, '30', '40')}>
                            구분선 추가
                        </Button>
                    </FlexDiv>
                    <FlexDiv width="100" basis="50" direction="row-reverse">
                        <Button
                            type="button"
                            onClick={e =>
                                onContextMenuBasicModal(
                                    e,
                                    <CharacterAdd setCurrentPage={setCurrentPage} perPage={perPage} />,
                                )
                            }
                        >
                            캐릭터 추가
                        </Button>
                    </FlexDiv>
                </FlexDiv>
            </ButtonDiv>
            <Character
                onContextMenuBasicModal={onContextMenuBasicModal}
                currentPage={currentPage}
                perPage={perPage}
                setCurrentPage={setCurrentPage}
                onClickPrev={onClickPrev}
                onClickNext={onClickNext}
            />
            <Todo onContextMenuBasicModal={onContextMenuBasicModal} currentPage={currentPage} perPage={perPage} />
        </FlexDiv>
    );
};

const ButtonDiv = styled(FlexDiv)`
    margin-bottom: 1.7em;
    box-sizing: border-box;
`;

export default Main;

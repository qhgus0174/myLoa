import React, { useContext, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { load } from 'cheerio';
import { css } from '@emotion/react';
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

    return (
        <TodoDiv>
            <FlexDiv>
                <FlexDiv basis="50">
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
                <FlexDiv basis="50" direction="row-reverse">
                    <Button type="button" onClick={e => onContextMenuBasicModal(e, <CharacterAdd />)}>
                        캐릭터 추가
                    </Button>
                </FlexDiv>
            </FlexDiv>
            <Character onContextMenuBasicModal={onContextMenuBasicModal} />
            <Todo onContextMenuBasicModal={onContextMenuBasicModal} />
        </TodoDiv>
    );
};

const TodoDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
`;

export default Main;

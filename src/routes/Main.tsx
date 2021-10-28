import React, { useContext, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { load } from 'cheerio';
import { css } from '@emotion/react';
import { ModalActionContext } from '@context/ModalContext';
import CharacterAdd from '@components/Character/CharacterAdd';
import TodoAdd from '@components/Todo/TodoAdd';
import LineAdd from '@components/Line/LineAdd';
import Character from '@components/Character';
import Todo from '@components/Todo';

const Main = () => {
    const { setModalProps } = useContext(ModalActionContext);

    useEffect(() => {
        const getUserData = async () => {
            const { data }: AxiosResponse<string> = await axios.get(
                'https://cors-anywhere.herokuapp.com/https://lostark.game.onstove.com/Profile/Character/%ED%82%A4%EC%B9%9C%ED%83%80%EC%98%AC%EB%BD%91%EB%8A%94%EC%82%AC%EB%9E%8C',
            );
            const $ = load(data);
            const job = $('.profile-character-info__img').attr('alt');
            const characterLevel = $('.profile-character-info__lv').text();
            const itemLevel = $('.level-info2__expedition>span:nth-child(2)').text();
        };
    }, []);

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
        <>
            <div
                css={css`
                    display: flex;
                    margin-left: 5em;
                `}
            >
                <button type="button" onClick={e => onContextMenuBasicModal(e, <CharacterAdd />)}>
                    캐릭터 추가
                </button>
            </div>

            <Character onContextMenuBasicModal={onContextMenuBasicModal} />
            <Todo onContextMenuBasicModal={onContextMenuBasicModal} />

            <button type="button" onClick={e => onContextMenuBasicModal(e, <TodoAdd />)}>
                할 일 추가
            </button>
            <button type="button" onClick={e => onContextMenuBasicModal(e, <LineAdd />)}>
                구분선 추가
            </button>
        </>
    );
};

export default Main;

import React from 'react';
import { ITodo } from '@components/Todo/TodoType';
import LineEdit from '@components/Line/LineEdit';
import styled from '@emotion/styled';
import { IContextModal } from '@common/types';
import { LongPressEvent, useLongPress } from 'use-long-press';

const Line = ({
    todo,
    onContextMenu,
}: {
    todo: ITodo;
    onContextMenu: ({ e, title, modal, width, height }: IContextModal) => void;
}) => {
    const onLongPress = (char: ITodo) =>
        useLongPress((e: LongPressEvent<Element> | undefined) => {
            openLineEditModal(e, char);
        });

    const openLineEditModal = (e: React.MouseEvent<HTMLElement> | LongPressEvent<Element> | undefined, todo: ITodo) => {
        onContextMenu({
            e: e,
            modal: <LineEdit {...todo} />,
            title: '구분선 수정',
            width: '360',
            height: '290',
        });
    };

    return (
        <LineDiv
            color={todo.color}
            onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => openLineEditModal(e, todo)}
        ></LineDiv>
    );
};

const LineDiv = styled.div`
    height: 1.5em;
    background: ${props => props.color};
`;

export default Line;

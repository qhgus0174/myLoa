import React from 'react';
import { ITodo } from '@components/Todo/TodoType';
import LineEdit from '@components/Line/LineEdit';
import { IContextModal } from '@common/types';
import styled from '@emotion/styled';
import { useLongPress } from 'use-long-press';

const Line = ({
    todo,
    onContextMenu,
}: {
    todo: ITodo;
    onContextMenu: ({ e, title, modal, width, height }: IContextModal) => void;
}) => {
    const onLongPress = ({ todo }: { todo: ITodo }) =>
        useLongPress(() => {
            openLineEditModal({ todo: todo });
        });

    const openLineEditModal = ({ e, todo }: { e?: React.MouseEvent<HTMLElement>; todo: ITodo }) => {
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
            {...onLongPress({ todo: todo })}
            onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => openLineEditModal({ e: e, todo: todo })}
        ></LineDiv>
    );
};

const LineDiv = styled.div`
    height: 1.5em;
    background: ${props => props.color};
`;

export default Line;

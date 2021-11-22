import React from 'react';
import { ITodo } from '@components/Todo/TodoType';
import LineEdit from '@components/Line/LineEdit';
import { IContextModal } from '@common/types';
import styled from '@emotion/styled';

const Line = ({
    todo,
    onContextMenu,
}: {
    todo: ITodo;
    onContextMenu: ({ e, title, modal, width, height }: IContextModal) => void;
}) => {
    const openLineEditModal = ({
        e,
        todo,
    }: {
        e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLDivElement>;
        todo: ITodo;
    }) => {
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
            onTouchEnd={(e: React.TouchEvent<HTMLDivElement>) => openLineEditModal({ e: e, todo: todo })}
            onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => openLineEditModal({ e: e, todo: todo })}
        ></LineDiv>
    );
};

const LineDiv = styled.div`
    height: 1.5em;
    background: ${props => props.color};
`;

export default Line;

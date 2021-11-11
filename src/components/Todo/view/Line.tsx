import React from 'react';
import { ITodo } from '@components/Todo/TodoType';
import LineEdit from '@components/Line/LineEdit';
import styled from '@emotion/styled';
import { IContextModal } from '@common/types';

const Line = ({
    todo,
    onContextMenu,
}: {
    todo: ITodo;
    onContextMenu: ({ e, title, modal, width, height }: IContextModal) => void;
}) => {
    return (
        <LineDiv
            color={todo.color}
            onContextMenu={(e: React.MouseEvent<HTMLDivElement>) =>
                onContextMenu({
                    e: e,
                    modal: <LineEdit {...todo} />,
                    title: '구분선 수정',
                    width: '360',
                    height: '290',
                })
            }
        ></LineDiv>
    );
};

const LineDiv = styled.div`
    height: 1.5em;
    background: ${props => props.color};
`;

export default Line;

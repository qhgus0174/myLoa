import LineEdit from '@components/Line/LineEdit';
import styled from '@emotion/styled';
import React from 'react';
import { ITodo } from '../TodoType';

const Line = ({
    todo,
    onContextMenu,
}: {
    todo: ITodo;
    onContextMenu: (e: React.MouseEvent<HTMLDivElement>, modal: JSX.Element, width?: string, height?: string) => void;
}) => {
    return (
        <LineDiv
            color={todo.color}
            onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => onContextMenu(e, <LineEdit {...todo} />)}
        ></LineDiv>
    );
};

const LineDiv = styled.div`
    height: 1.5em;
    background: ${props => props.color};
`;

export default Line;

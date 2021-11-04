import React from 'react';
import { ITodo } from '../TodoType';
import TodoEdit from '../modal/TodoEdit';
import styled from '@emotion/styled';
import { FlexHoverDiv } from '@style/common';

interface ICheckbox {
    todo: ITodo;
    onContextMenu: (e: React.MouseEvent<HTMLDivElement>, modal: JSX.Element, width?: string, height?: string) => void;
}

const CheckboxText = ({ todo, onContextMenu }: ICheckbox) => {
    return (
        <TextDiv color={todo.color} onContextMenu={e => onContextMenu(e, <TodoEdit {...todo} />, '30', '80')}>
            {todo.name}
        </TextDiv>
    );
};

const TextDiv = styled(FlexHoverDiv)`
    color: ${props => props.color};
`;

export default CheckboxText;

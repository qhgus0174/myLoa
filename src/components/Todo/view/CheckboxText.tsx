import React from 'react';
import { ITodo } from '../TodoType';
import TodoEdit from '../modal/TodoEdit';
import styled from '@emotion/styled';
import { FlexLeftDiv } from '@style/common';

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

const TextDiv = styled(FlexLeftDiv)`
    color: ${props => props.color};
    width: 100%;
    height: 100%;
    align-items: center;
`;

export default CheckboxText;

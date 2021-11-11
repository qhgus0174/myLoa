import React from 'react';
import TodoEdit from '@components/Todo/modal/TodoEdit';
import { ITodo } from '@components/Todo/TodoType';
import { IContextModal } from '@common/types';
import styled from '@emotion/styled';
import { FlexLeftDiv } from '@style/common';

interface ICheckbox {
    todo: ITodo;
    onContextMenu: ({ e, title, modal, width, height }: IContextModal) => void;
}

const CheckboxText = ({ todo, onContextMenu }: ICheckbox) => {
    return (
        <TextDiv
            color={todo.color}
            onContextMenu={e =>
                onContextMenu({ e: e, modal: <TodoEdit {...todo} />, title: '숙제 수정', width: '600', height: '850' })
            }
        >
            {todo.name}
        </TextDiv>
    );
};

const TextDiv = styled(FlexLeftDiv)`
    color: ${props => props.color};
    width: 100%;
    height: 100%;
    align-items: center;
    font-weight: 600;
    &:hover {
        transition: 200ms ease;
        background: ${props => props.theme.colors.hoverGray};
    }
`;

export default CheckboxText;

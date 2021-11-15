import React from 'react';
import TodoEdit from '@components/Todo/modal/TodoEdit';
import { ITodo } from '@components/Todo/TodoType';
import { IContextModal } from '@common/types';
import styled from '@emotion/styled';
import { FlexLeftDiv } from '@style/common';
import { LongPressEvent, useLongPress } from 'use-long-press';

interface ICheckbox {
    todo: ITodo;
    onContextMenu: ({ e, title, modal, width, height }: IContextModal) => void;
}

const CheckboxText = ({ todo, onContextMenu }: ICheckbox) => {
    const onLongPress = (todo: ITodo) =>
        useLongPress((e: LongPressEvent<Element> | undefined) => openTodoEditModal(e, todo));

    const openTodoEditModal = (e: React.MouseEvent<HTMLElement> | LongPressEvent<Element> | undefined, todo: ITodo) => {
        onContextMenu({ e: e, modal: <TodoEdit {...todo} />, title: '숙제 수정', width: '600', height: '850' });
    };

    return (
        <TextDiv color={todo.color} {...onLongPress(todo)} onContextMenu={e => openTodoEditModal(e, todo)}>
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

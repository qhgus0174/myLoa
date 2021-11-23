import React, { useState } from 'react';
import useTodo from '@hooks/storage/useTodo';
import TodoEdit from '@components/Todo/modal/TodoEdit';
import { ITodo } from '@components/Todo/TodoType';
import PinCheckbox from '@components/Input/PinCheckBox';
import { getStorage } from '@storage/index';
import { IContextModal, ScheduleContents } from '@common/types';
import styled from '@emotion/styled';
import { FlexDiv, FlexLeftDiv } from '@style/common';

interface ICheckbox {
    todo: ITodo;
    onContextMenu: ({ e, title, modal, width, height }: IContextModal) => void;
}

const CheckboxText = ({ todo, onContextMenu }: ICheckbox) => {
    const [isFixed, setIsFixed] = useState(todo.isFixed);
    const [storageTodo, setStorageTodo] = useTodo();

    const openTodoEditModal = ({
        e,
        todo,
    }: {
        e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>;
        todo: ITodo;
    }) => {
        e.preventDefault();
        onContextMenu({ e: e, modal: <TodoEdit {...todo} />, title: '숙제 수정', width: '600', height: '850' });
    };

    const setFixed = () => {
        const todoArr: ITodo[] = getStorage('todo');

        const todoIndex = todoArr.findIndex(td => td.id === todo.id);

        todoArr[todoIndex] = {
            ...todoArr[todoIndex],
            isFixed: !isFixed,
        };

        setStorageTodo(JSON.stringify(todoArr));

        setIsFixed(!isFixed);
    };

    return (
        <TextContainer
            contents={todo.contents}
            onTouchEnd={(e: React.TouchEvent<HTMLDivElement>) => openTodoEditModal({ e: e, todo: todo })}
            onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => openTodoEditModal({ e: e, todo: todo })}
        >
            <TextDiv>
                <FlexDiv basis="10"></FlexDiv>
                <FlexDiv basis="10">
                    <PinCheckbox onClick={setFixed} isLine={false} checked={isFixed} />
                </FlexDiv>
                <RealTextDiv basis="70" color={todo.color}>
                    {todo.name}
                </RealTextDiv>
                <FlexDiv basis="10"></FlexDiv>
            </TextDiv>
        </TextContainer>
    );
};

const RealTextDiv = styled(FlexDiv)`
    color: ${props => props.color};
    justify-content: center;
`;

const TextContainer = styled(FlexLeftDiv)<{ contents: ScheduleContents }>`
    width: 100%;
    height: ${props => (props.contents === 'guardian' ? '7.75em' : '4.55em')};
    align-items: center;
    font-weight: 600;
    cursor: pointer;
    &:hover {
        transition: 200ms ease;
        background: ${props => props.theme.colors.hover};
    }
`;

const TextDiv = styled(FlexDiv)`
    width: 100%;
    height: 100%;
    flex-basis: 100%;
    align-items: center;
    justify-content: center;
`;

export default CheckboxText;

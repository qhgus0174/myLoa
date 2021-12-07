import React, { useContext, useState } from 'react';
import { LocalStorageActionContext, LocalStorageStateContext } from '@context/LocalStorageContext';
import TodoEdit from '@components/Todo/modal/TodoEdit';
import { ITodo } from '@components/Todo/TodoType';
import PinCheckbox from '@components/Input/PinCheckBox';
import { IContextModal, ScheduleContents } from '@common/types';
import styled from '@emotion/styled';
import { FlexArticle, FlexLeftArticle } from '@style/common';

interface ICheckbox {
    todo: ITodo;
    onContextMenu: ({ e, title, modal, width, height }: IContextModal) => void;
}

const CheckboxText = ({ todo, onContextMenu }: ICheckbox) => {
    const { storedTodo } = useContext(LocalStorageStateContext);
    const { setStoredTodo } = useContext(LocalStorageActionContext);

    const [isFixed, setIsFixed] = useState(todo.isFixed);

    const openTodoEditModal = ({
        e,
        todo,
    }: {
        e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>;
        todo: ITodo;
    }) => {
        e.preventDefault();
        onContextMenu({ e: e, modal: <TodoEdit {...todo} />, title: '숙제 수정', width: '600', height: '850' });
    };

    const setFixed = () => {
        const todoArr: ITodo[] = [...storedTodo];

        const todoIndex = todoArr.findIndex(td => td.id === todo.id);

        todoArr[todoIndex] = {
            ...todoArr[todoIndex],
            isFixed: !isFixed,
        };

        setStoredTodo(todoArr);

        setIsFixed(!isFixed);
    };

    return (
        <TextContainer
            contents={todo.contents}
            onTouchEnd={(e: React.TouchEvent<HTMLElement>) => openTodoEditModal({ e: e, todo: todo })}
            onContextMenu={(e: React.MouseEvent<HTMLElement>) => openTodoEditModal({ e: e, todo: todo })}
        >
            <TextArticle>
                <FlexArticle basis="10"></FlexArticle>
                <FlexArticle basis="10">
                    <PinCheckbox onClick={setFixed} isLine={false} checked={isFixed} />
                </FlexArticle>
                <RealText basis="70" color={todo.color}>
                    {todo.name}
                </RealText>
                <FlexArticle basis="10"></FlexArticle>
            </TextArticle>
        </TextContainer>
    );
};

const RealText = styled(FlexArticle)`
    color: ${props => props.color};
    justify-content: center;
    padding: 10px;
`;

const TextContainer = styled(FlexLeftArticle)<{ contents: ScheduleContents }>`
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

const TextArticle = styled(FlexArticle)`
    width: 100%;
    height: 100%;
    flex-basis: 100%;
    align-items: center;
    justify-content: center;
`;

export default CheckboxText;

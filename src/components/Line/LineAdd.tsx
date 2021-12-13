import React, { useContext, useState } from 'react';
import { LocalStorageActionContext, LocalStorageStateContext } from '@context/LocalStorageContext';
import { ModalActionContext } from '@context/ModalContext';
import AddButtonContainer from '@components/Container/Button/Add';
import LineForm from '@components/Line/common/Form';
import { ITodo } from '@components/Todo/TodoType';
import { useTheme } from '@emotion/react';
import { Container } from '@style/common/modal';

const LineAdd = () => {
    const { storedTodo, storedTodoOrd } = useContext(LocalStorageStateContext);
    const { setStoredTodo, setStoredTodoOrd } = useContext(LocalStorageActionContext);
    const { closeModal } = useContext(ModalActionContext);

    const theme = useTheme();

    const [color, setColor] = useState<string>(theme.colors.white);

    const onClickAdd = () => {
        const todoArr: ITodo[] = [...storedTodo];

        const maxTodoId = Math.max(...todoArr.map(todoObj => todoObj.id), 0);
        const todoId = todoArr.length == 0 ? 0 : maxTodoId + 1;

        addLine(todoId);
        addLineOrd(todoId);

        closeModal();
    };

    const addLine = (todoId: number) => {
        const todoArr: ITodo[] = [...storedTodo];

        const todoInfo: ITodo = {
            id: todoId,
            name: '',
            type: 'line',
            contents: 'none',
            checkType: 'none',
            color: color,
            character: [],
            showCharacter: [],
            isFixed: false,
        };

        todoArr.push(todoInfo);
        setStoredTodo(todoArr);
    };

    const addLineOrd = (todoId: number) => {
        const todoOrdArr: number[] = [...storedTodoOrd];

        todoOrdArr.push(todoId);
        setStoredTodoOrd(todoOrdArr);
    };

    return (
        <Container>
            <LineForm color={color} setColor={setColor} />
            <AddButtonContainer addClassName="addLine" onClickAdd={onClickAdd} />
        </Container>
    );
};

export default LineAdd;

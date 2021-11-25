import React, { useContext, useState } from 'react';
import { ModalActionContext } from '@context/ModalContext';
import useTodo from '@hooks/storage/useTodo';
import useTodoOrd from '@hooks/storage/useTodoOrd';
import AddButtonContainer from '@components/Container/Button/Add';
import LineForm from '@components/Line/common/Form';
import { ITodo } from '@components/Todo/TodoType';
import { getStorage } from '@storage/index';
import { useTheme } from '@emotion/react';
import { FormContainer } from '@style/common/modal';

const LineAdd = () => {
    const [storageTodo, setStorageTodo] = useTodo();
    const [storageTodoOrd, setStorageTodoOrd] = useTodoOrd();

    const { closeModal } = useContext(ModalActionContext);

    const theme = useTheme();

    const [color, setColor] = useState<string>(theme.colors.white);

    const onClickAdd = () => {
        const todoArr: ITodo[] = getStorage('todo');

        const maxTodoId = Math.max(...todoArr.map(todoObj => todoObj.id), 0);
        const todoId = todoArr.length == 0 ? 0 : maxTodoId + 1;

        addLine(todoId);
        addLineOrd(todoId);

        closeModal();
    };

    const addLine = (todoId: number) => {
        const todoArr: ITodo[] = getStorage('todo');

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
        setStorageTodo(JSON.stringify(todoArr));
    };

    const addLineOrd = (todoId: number) => {
        const todoOrdArr: number[] = getStorage('todoOrd');

        todoOrdArr.push(todoId);
        setStorageTodoOrd(JSON.stringify(todoOrdArr));
    };

    return (
        <FormContainer>
            <LineForm color={color} setColor={setColor} />
            <AddButtonContainer addClassName="addLine" onClickAdd={onClickAdd} />
        </FormContainer>
    );
};

export default LineAdd;

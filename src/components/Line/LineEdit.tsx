import React, { useContext, useState } from 'react';
import _ from 'lodash';
import { ModalActionContext } from '@context/ModalContext';
import useTodo from '@hooks/storage/useTodo';
import useTodoOrd from '@hooks/storage/useTodoOrd';
import EditButtonContainer from '@components/Container/Button/DelEdit';
import { ITodo } from '@components/Todo/TodoType';
import LineForm from '@components/Line/common/Form';
import { FormContainer } from '@style/common/modal';
import { getStorage } from '@storage/index';

const LineEdit = ({ id: oriId, color: newColor }: Pick<ITodo, 'id' | 'color'>) => {
    const [storageTodo, setStorageTodo] = useTodo();
    const [color, setColor] = useState<string>(newColor);
    const [storageTodoOrd, setStorageTodoOrd] = useTodoOrd();

    const onClickEdit = () => {
        editTodoInfo();
        closeModal();
    };

    const onClickDelete = () => {
        deleteTodoInfo();
        deleteTodoOrd();
        closeModal();
    };

    const editTodoInfo = () => {
        const todoArr: ITodo[] = getStorage('todo');

        const index = todoArr.findIndex((todoObj: ITodo) => todoObj.id === oriId);

        let newTodoArr = [...todoArr];
        newTodoArr[index] = {
            ...newTodoArr[index],
            color: color,
        };

        setStorageTodo(JSON.stringify(newTodoArr));
    };

    const deleteTodoInfo = () => {
        const todoArr: ITodo[] = getStorage('todo');
        const resultArray = _.reject(todoArr, (todo: ITodo) => {
            return todo.id === oriId;
        });
        setStorageTodo(JSON.stringify(resultArray));
    };

    const deleteTodoOrd = () => {
        const todoArrOrd: number[] = getStorage('todoOrd');
        const resultOrd = _.reject(todoArrOrd, (ord: number) => {
            return ord === oriId;
        });
        setStorageTodoOrd(JSON.stringify(resultOrd));
    };

    const { closeModal } = useContext(ModalActionContext);
    return (
        <FormContainer>
            <LineForm color={color} setColor={setColor} />
            <EditButtonContainer onClickDelete={onClickDelete} onClickEdit={onClickEdit} />
        </FormContainer>
    );
};

export default LineEdit;

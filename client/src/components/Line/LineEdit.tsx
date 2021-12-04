import React, { useContext, useState } from 'react';
import _ from 'lodash';
import { LocalStorageActionContext, LocalStorageStateContext } from '@context/LocalStorageContext';
import { ModalActionContext } from '@context/ModalContext';
import EditButtonContainer from '@components/Container/Button/DelEdit';
import { ITodo } from '@components/Todo/TodoType';
import LineForm from '@components/Line/common/Form';
import { FormContainer } from '@style/common/modal';

const LineEdit = ({ id: oriId, color: newColor }: Pick<ITodo, 'id' | 'color'>) => {
    const [color, setColor] = useState<string>(newColor);
    const { storedTodo, storedTodoOrd } = useContext(LocalStorageStateContext);
    const { setStoredTodo, setStoredTodoOrd } = useContext(LocalStorageActionContext);

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
        const todoArr: ITodo[] = [...storedTodo];

        const index = todoArr.findIndex((todoObj: ITodo) => todoObj.id === oriId);

        let newTodoArr = [...todoArr];
        newTodoArr[index] = {
            ...newTodoArr[index],
            color: color,
        };

        setStoredTodo(newTodoArr);
    };

    const deleteTodoInfo = () => {
        const todoArr: ITodo[] = [...storedTodo];
        const resultArray = _.reject(todoArr, (todo: ITodo) => {
            return todo.id === oriId;
        });
        setStoredTodo(resultArray);
    };

    const deleteTodoOrd = () => {
        const todoArrOrd: number[] = [...storedTodoOrd];
        const resultOrd = _.reject(todoArrOrd, (ord: number) => {
            return ord === oriId;
        });
        setStoredTodoOrd(resultOrd);
    };

    const { closeModal } = useContext(ModalActionContext);
    return (
        <FormContainer>
            <LineForm color={color} setColor={setColor} />
            <EditButtonContainer editClassName="editLine" onClickDelete={onClickDelete} onClickEdit={onClickEdit} />
        </FormContainer>
    );
};

export default LineEdit;

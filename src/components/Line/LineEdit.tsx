import React, { useContext, useState } from 'react';
import reject from 'lodash-es/reject';
import { LocalStorageActionContext, LocalStorageStateContext } from '@context/LocalStorageContext';
import { ModalActionContext } from '@context/ModalContext';
import EditButtonContainer from '@components/Container/Button/DelEdit';
import { ITodo } from '@common/types/localStorage/Todo';
import LineForm from '@components/Line/common/Form';
import { Container } from '@style/common/modal';

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
        const resultArray = reject(todoArr, (todo: ITodo) => {
            return todo.id === oriId;
        });
        setStoredTodo(resultArray);
    };

    const deleteTodoOrd = () => {
        const todoArrOrd: number[] = [...storedTodoOrd];
        const resultOrd = reject(todoArrOrd, (ord: number) => {
            return ord === oriId;
        });
        setStoredTodoOrd(resultOrd);
    };

    const { closeModal } = useContext(ModalActionContext);
    return (
        <Container>
            <LineForm color={color} setColor={setColor} />
            <EditButtonContainer editClassName="editLine" onClickDelete={onClickDelete} onClickEdit={onClickEdit} />
        </Container>
    );
};

export default LineEdit;

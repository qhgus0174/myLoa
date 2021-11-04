import React, { useContext, useState } from 'react';
import Button from '@components/Button/Button';
import { ModalActionContext } from '@context/ModalContext';
import useTodo from '@hooks/storage/useTodo';
import useTodoOrd from '@hooks/storage/useTodoOrd';
import _ from 'lodash';
import { ITodo } from '@components/Todo/TodoType';
import { CompactPicker, ColorResult } from 'react-color';

const LineEdit = ({ id: oriId, color: newColor }: Pick<ITodo, 'id' | 'color'>) => {
    const [storageTodo, setStorageTodo] = useTodo();
    const [color, setColor] = useState<string>(newColor);
    const [storageTodoOrd, setStorageTodoOrd] = useTodoOrd();

    const onClickAdd = () => {
        const todoArr: ITodo[] = JSON.parse(storageTodo);

        const index = todoArr.findIndex((obj: ITodo) => obj.id === oriId);

        let newTodoArr = [...todoArr];
        newTodoArr[index] = {
            ...newTodoArr[index],
            color: color,
        };

        setStorageTodo(JSON.stringify(newTodoArr));

        closeModal();
    };

    const onClickDelete = () => {
        const todoArr: ITodo[] = JSON.parse(storageTodo);
        const resultArray = _.reject(todoArr, (todo: ITodo) => {
            return todo.id === oriId;
        });
        setStorageTodo(JSON.stringify(resultArray));

        const todoArrOrd: number[] = JSON.parse(storageTodoOrd);
        const resultOrd = _.reject(todoArrOrd, (ord: number) => {
            return ord === oriId;
        });
        setStorageTodoOrd(JSON.stringify(resultOrd));

        closeModal();
    };

    const { closeModal } = useContext(ModalActionContext);
    return (
        <>
            색상 <CompactPicker color={color} onChange={(color: ColorResult) => setColor(color.hex)} />
            <Button onClick={onClickAdd}>수정</Button>
            <Button onClick={onClickDelete}>삭제</Button>
            <Button onClick={() => closeModal()}>닫기</Button>
        </>
    );
};

export default LineEdit;

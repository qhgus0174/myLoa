import React, { useContext, useState } from 'react';
import Button from '@components/Button/Button';
import TextBox from '@components/Input/TextBox';
import { ModalActionContext } from '@context/ModalContext';
import useTodo from '@hooks/storage/useTodo';
import { useInput } from '@hooks/useInput';
import useTodoOrd from '@hooks/storage/useTodoOrd';
import useCharacter from '@hooks/storage/useCharacter';

import { ICharacter } from '@components/Character/CharacterType';
import { ScheduleCheckType, ScheduleContents, ScheduleType } from 'common/types';
import { ITodo } from '@components/Todo/TodoType';

const LineAdd = () => {
    const [storageTodo, setStorageTodo] = useTodo();
    const [storageTodoOrd, setStorageTodoOrd] = useTodoOrd();

    const onClickAdd = () => {
        const todoArr: ITodo[] = JSON.parse(storageTodo);
        const todoOrdArr: number[] = JSON.parse(storageTodoOrd);

        const maxValueId = Math.max(...todoArr.map(o => o.id), 0);
        const todoId = todoArr.length == 0 ? 0 : maxValueId + 1;

        const todoInfo: ITodo = {
            id: todoId,
            name: '',
            type: 'line',
            contents: 'none',
            checkType: 'none',
            color: 'black',
            character: [],
        };

        todoArr.push(todoInfo);
        setStorageTodo(JSON.stringify(todoArr));

        todoOrdArr.push(todoId);
        setStorageTodoOrd(JSON.stringify(todoOrdArr));

        closeModal();
    };

    const { closeModal } = useContext(ModalActionContext);
    return (
        <>
            색상
            <Button onClick={onClickAdd}>추가</Button>
            <Button onClick={() => closeModal()}>닫기</Button>
        </>
    );
};

export default LineAdd;

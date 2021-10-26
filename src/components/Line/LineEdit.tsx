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

const LineEdit = ({ id: oriId, color: newColor }: Pick<ITodo, 'id' | 'color'>) => {
    const [storageTodo, setStorageTodo] = useTodo();
    const [color, setColor] = useState<string>(newColor);

    const onClickAdd = () => {
        const todoArr: ITodo[] = JSON.parse(storageTodo);

        const index = todoArr.findIndex((obj: ITodo) => obj.id === oriId);

        let newTodoArr = [...todoArr];
        newTodoArr[index] = {
            ...newTodoArr[index],
            color: color, //todo : 컬러 넣기
        };

        setStorageTodo(JSON.stringify(newTodoArr));

        closeModal();
    };

    const { closeModal } = useContext(ModalActionContext);
    return (
        <>
            {/* todo : 컬러 setColor 넣기 */}
            색상
            <Button onClick={onClickAdd}>수정</Button>
            <Button onClick={() => closeModal()}>닫기</Button>
        </>
    );
};

export default LineEdit;

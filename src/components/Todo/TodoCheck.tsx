import React, { useContext, useEffect, useState } from 'react';
import Button from '@components/Button/Button';
import { ModalActionContext } from '@context/ModalContext';
import useTodo from '@hooks/storage/useTodo';
import { useInput } from '@hooks/useInput';

import { ITodo, ITodoCheck } from './TodoType';
import useCharacterOrd from '@hooks/storage/useCharacterOrd';
import { ScheduleType } from 'common/types';

const TodoCheck = ({
    id: characterId,
    check: oriCheck,
    relaxGauge: oriRelax,
    memo: oriMemo,
    todoId,
    checkType,
    todoType: oriTodoType,
}: ITodoCheck) => {
    const { closeModal } = useContext(ModalActionContext);

    const [storageTodo, setStorageTodo] = useTodo();
    const [storageCharacterOrd] = useCharacterOrd();

    const [todoType, setTodoType] = useState<ScheduleType>(oriTodoType);
    const [checkCount, setCheckCount] = useState<number>(oriCheck);
    const [relaxGauge, bindRelaxGauge] = useInput<number>(oriRelax);
    const [memo, bindMemo] = useInput<string>(oriMemo || '');

    useEffect(() => {
        const todoArr: ITodo[] = JSON.parse(storageTodo);
        const index = todoArr.findIndex((obj: ITodo) => obj.id === todoId);

        setTodoType(todoArr[index].type);
    }, []);

    const onClickEdit = () => {
        const todoArr: ITodo[] = JSON.parse(storageTodo);
        const todoIndex = todoArr.findIndex((obj: ITodo) => obj.id === todoId);
        const characterOrdArr: number[] = JSON.parse(storageCharacterOrd);
        const characterIndex = characterOrdArr.findIndex((obj: number) => obj === characterId);

        todoArr[todoIndex].character[characterIndex] = {
            ...todoArr[todoIndex].character[characterIndex],
            check: checkCount,
            relaxGauge: relaxGauge,
            memo: memo,
        };

        setStorageTodo(JSON.stringify(todoArr));

        closeModal();
    };

    const onClickCheckTodo = () => {
        //index를 가지고 id를 얻고, 순서에 따른 진짜 id를 가져온다.
        const todoArr: ITodo[] = JSON.parse(storageTodo);

        const todoIndex = todoArr.findIndex((obj: ITodo) => obj.id === todoId);

        let totalCheckCount = 0;

        if (todoArr[todoIndex].type !== 'daily') {
            totalCheckCount = checkCount === 1 ? 0 : 1;
        } else {
            const dayContents = todoArr[todoIndex].contents;
            const maxCheck = dayContents === 'chaos' ? 1 : 2;

            if (checkCount > maxCheck) totalCheckCount = 0;
            else totalCheckCount = checkCount + 1;
        }

        setCheckCount(totalCheckCount);
    };

    return (
        <>
            {checkType !== 'text' && (
                <>
                    <div>
                        수행 여부 :
                        <label>
                            <input type="checkbox" onChange={onClickCheckTodo} checked={checkCount > 0} />
                            {todoType === 'daily' && `수행 횟수 ${checkCount}`}
                        </label>
                    </div>
                    {todoType === 'daily' && (
                        <div>
                            휴식 게이지 :
                            <label>
                                <input type="text" {...bindRelaxGauge} />
                            </label>
                        </div>
                    )}
                </>
            )}
            <div>
                메모 :
                <label>
                    <input type="text" {...bindMemo} />
                </label>
            </div>

            <Button onClick={onClickEdit}>수정</Button>
            <Button onClick={() => closeModal()}>닫기</Button>
        </>
    );
};

export default TodoCheck;

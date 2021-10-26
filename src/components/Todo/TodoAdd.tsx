import React, { useContext, useState } from 'react';
import Button from '@components/Button/Button';
import TextBox from '@components/Input/TextBox';
import { ModalActionContext } from '@context/ModalContext';
import useTodo from '@hooks/storage/useTodo';
import { useInput } from '@hooks/useInput';
import useTodoOrd from '@hooks/storage/useTodoOrd';
import useCharacter from '@hooks/storage/useCharacter';

import { ITodo, ICharacterTodo } from './TodoType';
import { ICharacter } from '@components/Character/CharacterType';
import { ScheduleCheckType, ScheduleContents, ScheduleType } from 'common/types';

const Todo = () => {
    const [type, setType] = useState<ScheduleType>('daily');
    const [contents, setContents] = useState<ScheduleContents>('chaos');
    const [checkType, setCheckType] = useState<ScheduleCheckType>('check');

    const { closeModal } = useContext(ModalActionContext);

    const [name, bindName] = useInput<string>('');

    const [storageTodo, setStorageTodo] = useTodo();
    const [storageTodoOrd, setStorageTodoOrd] = useTodoOrd();
    const [storageCharacter] = useCharacter();

    const onClickAdd = () => {
        const todoArr: ITodo[] = JSON.parse(storageTodo);
        const todoOrdArr: number[] = JSON.parse(storageTodoOrd);

        const maxValueId = Math.max(...todoArr.map(o => o.id), 0);

        const todoId = todoArr.length == 0 ? 0 : maxValueId + 1;

        const characterArr: ICharacter[] = JSON.parse(storageCharacter);

        const characters: ICharacterTodo[] = characterArr.map((character: ICharacter) => {
            return { id: character.id, check: 0, relaxGauge: 0 };
        });

        const todoInfo: ITodo = {
            id: todoId,
            name: name,
            type: type,
            contents: contents,
            checkType: checkType,
            color: 'black',
            character: characters,
        };

        todoArr.push(todoInfo);
        setStorageTodo(JSON.stringify(todoArr));

        todoOrdArr.push(todoId);
        setStorageTodoOrd(JSON.stringify(todoOrdArr));

        closeModal();
    };

    return (
        <>
            <div>
                유형 :
                <label>
                    <input
                        type="radio"
                        name="type"
                        value="daily"
                        onChange={() => {
                            setType('daily');
                            setContents('chaos');
                            setCheckType('check');
                        }}
                        checked={type === 'daily'}
                    />
                    일일
                </label>
                <label>
                    <input
                        type="radio"
                        name="type"
                        value="weekly"
                        onChange={() => {
                            setType('weekly');
                            setContents('none');
                            setCheckType('check');
                        }}
                        checked={type === 'weekly'}
                    />
                    주간
                </label>
                <label>
                    <input
                        type="radio"
                        name="type"
                        value="other"
                        onChange={() => {
                            setType('other');
                            setContents('none');
                            setCheckType('text');
                        }}
                        checked={type === 'other'}
                    />
                    텍스트
                </label>
            </div>
            {type === 'daily' && (
                <div>
                    컨텐츠 :
                    <label>
                        <input
                            type="radio"
                            name="contents"
                            value="chaos"
                            onChange={() => setContents('chaos')}
                            checked={contents === 'chaos'}
                        />
                        카던/가디언
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="contents"
                            value="epona"
                            onChange={() => setContents('epona')}
                            checked={contents === 'epona'}
                        />
                        에포나
                    </label>
                </div>
            )}
            <div>
                <label>
                    이름
                    <TextBox {...bindName} />
                </label>
            </div>
            <div>
                숙제 표기 미리보기
                {type === 'other' ? (
                    <label>
                        <TextBox value="지혜의섬 가기" readOnly />
                    </label>
                ) : (
                    <label>
                        <input type="checkbox" checked readOnly />
                        20
                    </label>
                )}
            </div>

            <Button onClick={onClickAdd}>추가</Button>
            <Button onClick={() => closeModal()}>닫기</Button>
        </>
    );
};

export default Todo;

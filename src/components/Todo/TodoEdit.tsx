import React, { useContext, useState } from 'react';
import Button from '@components/Button/Button';
import TextBox from '@components/Input/TextBox';
import { ModalActionContext } from '@context/ModalContext';
import useTodo from '@hooks/storage/useTodo';
import { useInput } from '@hooks/useInput';
import useTodoOrd from '@hooks/storage/useTodoOrd';
import useCharacter from '@hooks/storage/useCharacter';
import { ITodo, ICharacterTodo } from './TodoType';
import { ScheduleCheckType, ScheduleContents, ScheduleType } from 'common/types';
import _ from 'lodash';
import Checkbox from '@components/Input/Checkbox';

const TodoEdit = ({
    id: oriId,
    name: newName,
    type: newType,
    contents: newContents,
    checkType: newCheckType,
    color: newColor,
}: Omit<ITodo, 'character'>) => {
    const [type, setType] = useState<ScheduleType>(newType);
    const [contents, setContents] = useState<ScheduleContents>(newContents);
    const [checkType, setCheckType] = useState<ScheduleCheckType>(newCheckType);

    const [name, bindName] = useInput<string>(newName);

    const { closeModal } = useContext(ModalActionContext);

    const [storageTodo, setStorageTodo] = useTodo();
    const [storageTodoOrd, setStorageTodoOrd] = useTodoOrd();

    const onClickAdd = () => {
        const todoArr: ITodo[] = JSON.parse(storageTodo);

        const index = todoArr.findIndex((obj: ITodo) => obj.id === oriId);

        let newTodoArr = [...todoArr];
        newTodoArr[index] = {
            ...newTodoArr[index],
            name: name,
            type: type,
            contents: contents,
            checkType: checkType,
            color: '', //todo : 컬러 넣기
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
                표시 샘플
                {type === 'other' ? (
                    <label>
                        <TextBox value="지혜의섬 가기" readOnly />
                    </label>
                ) : (
                    <label>
                        <Checkbox checked readOnly />
                    </label>
                )}
            </div>

            <Button onClick={onClickAdd}>수정</Button>
            <Button onClick={onClickDelete}>삭제</Button>
            <Button onClick={() => closeModal()}>닫기</Button>
        </>
    );
};

export default TodoEdit;

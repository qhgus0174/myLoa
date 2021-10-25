import React, { useContext, useState } from 'react';
import Button from '@components/Button/Button';
import TextBox from '@components/Input/TextBox';
import { ModalActionContext } from '@context/ModalContext';
import useTodo from '@hooks/storage/useTodo';
import { useInput } from '@hooks/useInput';
import useTodoOrd from '@hooks/storage/useTodoOrd';
import useCharacter from '@hooks/storage/useCharacter';
import { ITodo, ICharacterTodo } from './TodoType';

const TodoEdit = ({
    id: oriId,
    name: newName,
    type: newType,
    contents: newContents,
    checkType: newCheckType,
    color: newColor,
}: Omit<ITodo, 'character'>) => {
    const [type, setType] = useState<string>(newType);
    const [contents, setContents] = useState<string>(newContents);
    const [checkType, setCheckType] = useState<string>(newCheckType);

    const [name, bindName] = useInput<string>(newName);

    const { closeModal } = useContext(ModalActionContext);

    const [storageTodo, setStorageTodo] = useTodo();

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

    return (
        <>
            <div>
                유형 :
                <label>
                    <input type="radio" name="type" value="1" onChange={() => setType('1')} checked={type === '1'} />
                    일일
                </label>
                <label>
                    <input type="radio" name="type" value="2" onChange={() => setType('2')} checked={type === '2'} />
                    주간
                </label>
                <label>
                    <input type="radio" name="type" value="3" onChange={() => setType('3')} checked={type === '3'} />
                    기타
                </label>
            </div>
            {type === '1' && (
                <div>
                    컨텐츠 :
                    <label>
                        <input
                            type="radio"
                            name="contents"
                            value="11"
                            onChange={() => setContents('1')}
                            checked={contents === '1'}
                        />
                        카던/가디언
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="contents"
                            value="12"
                            onChange={() => setContents('2')}
                            checked={contents === '2'}
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
                체크 유형
                <label>
                    <input
                        type="radio"
                        name="checkType"
                        value="1"
                        onChange={() => setCheckType('1')}
                        checked={checkType === '1'}
                    />
                    체크박스
                </label>
                <label>
                    <input
                        type="radio"
                        name="checkType"
                        value="2"
                        onChange={() => setCheckType('2')}
                        checked={checkType === '2'}
                    />
                    텍스트
                </label>
            </div>

            <Button onClick={onClickAdd}>수정</Button>
            <Button onClick={() => closeModal()}>닫기</Button>
        </>
    );
};

export default TodoEdit;

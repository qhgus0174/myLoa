import React, { useContext, useState } from 'react';
import Button from '@components/Button/Button';
import TextBox from '@components/Input/TextBox';
import { ModalActionContext } from '@context/ModalContext';
import useTodo from '@hooks/storage/useTodo';
import { useInput } from '@hooks/useInput';
import useTodoOrd from '@hooks/storage/useTodoOrd';
import useCharacter from '@hooks/storage/useCharacter';
import { ICharacter } from './Character';

export interface ITodo {
    id: number;
    name: string;
    type: string;
    contents: string;
    checkType: string;
    color: string;
    character?: ICharacterTodo[];
}

export interface ICharacterTodo {
    id: number;
    check: number;
    relaxGauge: number;
    memo?: string;
}

const Todo = () => {
    const [type, setType] = useState<string>('1');
    const [contents, setContents] = useState<string>('1');
    const [checkType, setCheckType] = useState<string>('1');

    const { closeModal } = useContext(ModalActionContext);

    const [name, bindName] = useInput<string>('');

    const [todo, setTodo] = useTodo();
    const [todoOrd, setTodoOrd] = useTodoOrd();
    const [character, setCharacter] = useCharacter();

    const onClickAdd = () => {
        const todoArr: ITodo[] = JSON.parse(todo);
        const todoOrdArr: number[] = JSON.parse(todoOrd);

        const maxValueId = Math.max(...todoArr.map(o => o.id), 0);

        const todoId = todoArr.length == 0 ? 0 : maxValueId + 1;

        const characterArr: ICharacter[] = JSON.parse(character);

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
        setTodo(JSON.stringify(todoArr));

        todoOrdArr.push(todoId);
        setTodoOrd(JSON.stringify(todoOrdArr));

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
            <div>
                이름
                <TextBox {...bindName} />
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

            <Button onClick={onClickAdd}>추가</Button>
            <Button>닫기</Button>
        </>
    );
};

export default Todo;

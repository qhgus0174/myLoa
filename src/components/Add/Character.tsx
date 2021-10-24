import React, { useContext } from 'react';
import LabelText from '@components/Input/LabelText';
import Button from '@components/Button/Button';
import useLocalStorageState from 'use-local-storage-state';
import { useInput } from '@hooks/useInput';
import useCharacter from '@hooks/storage/useCharacter';
import useCharacterOrd from '@hooks/storage/useCharacterOrd';
import { ModalActionContext } from '@context/ModalContext';
import { toast } from 'react-toastify';
import useTodo from '@hooks/storage/useTodo';
import { ICharacterTodo, ITodo } from './Todo';

export interface ICharacter {
    id: number;
    name: string;
    level: number;
    job: string;
    lastSearch: number;
}

const Character = () => {
    const [character, setCharacter] = useCharacter();
    const [characterOrd, setCharacterOrd] = useCharacterOrd();
    const [todo, setTodo] = useTodo();

    const { closeModal } = useContext(ModalActionContext);

    const [name, bindName] = useInput<string>('');

    const validate = () => {
        const characterArr: ICharacter[] = JSON.parse(character);
        return characterArr.some(character => character.name === name);
    };

    const onClickAdd = () => {
        if (validate()) {
            toast.error('중복된 캐릭터명 입니다.');
            return;
        }

        const characterArr: ICharacter[] = JSON.parse(character);
        const characterOrdArr: number[] = JSON.parse(characterOrd);

        const maxValueId = Math.max(...characterArr.map(o => o.id), 0);

        const characterId = characterArr.length == 0 ? 0 : maxValueId + 1;

        const characterInfo: ICharacter = {
            id: characterId,
            name: name,
            level: 1325,
            job: '아르카나',
            lastSearch: 0,
        };

        characterArr.push(characterInfo);
        characterOrdArr.push(characterId);

        setCharacter(JSON.stringify(characterArr));
        setCharacterOrd(JSON.stringify(characterOrdArr));

        const todoArr: ITodo[] = JSON.parse(todo);

        const todoCharacter: ICharacterTodo = {
            id: characterId,
            check: 0,
            relaxGauge: 0,
        };

        const todoCharacterArr = todoArr.map((todo: ITodo) => {
            return Object.assign(todo, todo.character?.push(todoCharacter));
        });

        setTodo(JSON.stringify(todoCharacterArr));

        closeModal();
    };

    return (
        <>
            <div>
                <LabelText {...bindName} label="캐릭터 명" />
                <Button onClick={onClickAdd}>추가</Button>
                <Button>닫기</Button>
            </div>
        </>
    );
};

export default Character;

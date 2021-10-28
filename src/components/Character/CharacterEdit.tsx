import React, { useContext } from 'react';
import Button from '@components/Button/Button';
import { useInput } from '@hooks/useInput';
import useCharacter from '@hooks/storage/useCharacter';
import { ModalActionContext } from '@context/ModalContext';
import TextBox from '@components/Input/TextBox';
import { ICharacter } from './CharacterType';
import _ from 'lodash';
import useCharacterOrd from '@hooks/storage/useCharacterOrd';
import { ICharacterTodo, ITodo } from '@components/Todo/TodoType';
import useTodo from '@hooks/storage/useTodo';

const CharacterEdit = ({ id: oriId, name: newName }: { id: number; name: string }) => {
    const [character, setCharacter] = useCharacter();
    const [characterOrd, setCharacterOrd] = useCharacterOrd();
    const [storageTodo, setStorageTodo] = useTodo();

    const { closeModal } = useContext(ModalActionContext);

    const [characterName, bindCharacterName] = useInput<string>(newName);

    const onClickEdit = () => {
        const characterArr: ICharacter[] = JSON.parse(character);

        const index = characterArr.findIndex((obj: ICharacter) => obj.id === oriId);

        let newCharacterArr = [...characterArr];
        newCharacterArr[index] = { ...newCharacterArr[index], name: characterName };

        setCharacter(JSON.stringify(newCharacterArr));

        closeModal();
    };

    const onClickDelete = () => {
        deleteCharacter();
        deleteTodo();

        closeModal();
    };

    const deleteCharacter = () => {
        const characterArr: ICharacter[] = JSON.parse(character);
        const resultArray = _.reject(characterArr, ({ id }: ICharacter) => {
            return id === oriId;
        });
        setCharacter(JSON.stringify(resultArray));

        const characterOrdArr: number[] = JSON.parse(characterOrd);
        const resultOrd = _.reject(characterOrdArr, (ord: number) => {
            return ord === oriId;
        });
        setCharacterOrd(JSON.stringify(resultOrd));
    };

    const deleteTodo = () => {
        const todoArr: ITodo[] = JSON.parse(storageTodo);

        const deleteResult = todoArr.map((todo: ITodo) => {
            todo.character = _.reject(todo.character, (character: ICharacterTodo) => {
                return character.id === oriId;
            });

            return todo;
        });

        setStorageTodo(JSON.stringify(deleteResult));
    };

    return (
        <>
            <div>
                <label>
                    캐릭터명
                    <TextBox {...bindCharacterName} />
                </label>

                <Button onClick={onClickEdit}>수정</Button>
                <Button onClick={onClickDelete}>삭제</Button>
                <Button onClick={() => closeModal()}>닫기</Button>
            </div>
        </>
    );
};

export default CharacterEdit;

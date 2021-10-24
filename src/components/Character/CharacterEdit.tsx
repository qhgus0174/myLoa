import React, { useContext } from 'react';
import Button from '@components/Button/Button';
import { useInput } from '@hooks/useInput';
import useCharacter from '@hooks/storage/useCharacter';
import { ModalActionContext } from '@context/ModalContext';
import TextBox from '@components/Input/TextBox';

export interface ICharacter {
    id: number;
    name: string;
    level: number;
    job: string;
    lastSearch: number;
}

const CharacterEdit = ({ id: oriId, name: newName }: { id: number; name: string }) => {
    const [character, setCharacter] = useCharacter();

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

    return (
        <>
            <div>
                <label>
                    캐릭터명
                    <TextBox {...bindCharacterName} />
                </label>

                <Button onClick={onClickEdit}>수정</Button>
                <Button onClick={() => closeModal()}>닫기</Button>
            </div>
        </>
    );
};

export default CharacterEdit;

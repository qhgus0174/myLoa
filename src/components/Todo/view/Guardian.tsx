import React, { useContext } from 'react';
import { LocalStorageStateContext, LocalStorageActionContext } from '@context/LocalStorageContext';
import { ICharacterTodo, IGuardianInfo, ITodo } from '@components/Todo/TodoType';
import { GuardianInfo, IGuardian } from '@common/data/guardian';
import styled from '@emotion/styled';
import { FlexArticle } from '@style/common';
import { ICharacter } from '@components/Character/CharacterType';

interface IGuardianParam {
    todo: ITodo;
    todoIndex: number;
    characterId: number;
    characterGuardianInfo: IGuardianInfo;
    charTodo: ICharacterTodo;
    characterIndex: number;
    setGuardianStep: (e: string) => void;
    onClick: (e: React.MouseEvent<HTMLElement>, i: number) => void;
    onTouchEnd: ({
        e,
        charTodo,
        characterIndex,
    }: {
        e: React.TouchEvent<HTMLElement>;
        charTodo: ICharacterTodo;
        characterIndex: number;
    }) => void;
}

const Guardian = ({
    todo,
    characterId,
    todoIndex,
    characterGuardianInfo,
    charTodo,
    characterIndex,
    setGuardianStep,
    onClick,
    onTouchEnd,
}: IGuardianParam) => {
    const { storedTodo, storedCharacter } = useContext(LocalStorageStateContext);
    const { setStoredTodo } = useContext(LocalStorageActionContext);

    const updateGuardianStep = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {
            target: { value },
        } = e;

        const todoArr: ITodo[] = [...storedTodo];

        const characterIndex = getCharacterIndex();
        const todoIndex = todoArr.findIndex(td => td.id === todo.id);

        todoArr[todoIndex].character[characterIndex].guardianInfo.step = value;

        setStoredTodo(todoArr);
        setGuardianStep(value);
    };

    const updateGuardianInfo = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {
            target: { value },
        } = e;

        const todoArr: ITodo[] = [...storedTodo];

        const characterIndex = getCharacterIndex();
        const todoIndex = todoArr.findIndex(td => td.id === todo.id);
        todoArr[todoIndex].character[characterIndex].guardianInfo.info = value;

        setStoredTodo(todoArr);
    };

    const getCharacterIndex = () => {
        const characterArr: ICharacter[] = [...storedCharacter];
        return characterArr.findIndex(char => char.id === characterId);
    };

    return (
        <GuardianArticle
            direction="column"
            onTouchEnd={e => onTouchEnd({ e: e, charTodo: charTodo, characterIndex: characterIndex })}
            onClick={e => onClick(e, characterId)}
        >
            <GuardianSelectBox
                key={`guardian_step_${characterId}`}
                onChange={e => updateGuardianStep(e)}
                value={characterGuardianInfo.step}
            >
                {GuardianInfo.map((guardian: IGuardian, gIndex: number) => {
                    return (
                        <option key={gIndex} value={guardian.step}>
                            {guardian.stepName}
                        </option>
                    );
                })}
            </GuardianSelectBox>
            <GuardianSelectBox
                onChange={e => updateGuardianInfo(e)}
                key={`guardian_value_${characterId}`}
                value={characterGuardianInfo.info}
            >
                {GuardianInfo[GuardianInfo.findIndex(g => g.step === characterGuardianInfo.step)].list.map(
                    (guardian, gIndex: number) => {
                        return (
                            <option key={gIndex} value={guardian.value}>
                                {guardian.name}
                            </option>
                        );
                    },
                )}
            </GuardianSelectBox>
        </GuardianArticle>
    );
};

const GuardianArticle = styled(FlexArticle)`
    align-items: center;
    margin-top: 0.3em;
    box-sizing: border-box;
`;

const GuardianSelectBox = styled.select`
    width: 124px;
    margin-top: 0.2em;
`;

export default Guardian;

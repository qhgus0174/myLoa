import React, { useContext } from 'react';
import { LocalStorageStateContext, LocalStorageActionContext } from '@context/LocalStorageContext';
import { ICharacterTodo, IGuardianInfo, ITodo } from '@common/types/localStorage/Todo';
import { GuardianInfo, IGuardian } from '@common/data/guardian';
import styled from '@emotion/styled';
import { FlexDiv } from '@style/common/layout/common';
import { ICharacter } from '@common/types/localStorage/Character';
import { widthMedia } from '@style/device';

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
        <Container
            direction="column"
            onTouchEnd={e => onTouchEnd({ e: e, charTodo: charTodo, characterIndex: characterIndex })}
            onClick={e => onClick(e, characterId)}
        >
            <SelectBox
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
            </SelectBox>
            <SelectBox
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
            </SelectBox>
        </Container>
    );
};

const Container = styled(FlexDiv)`
    align-items: center;
    margin-top: 0.3em;
    box-sizing: border-box;
`;

const SelectBox = styled.select`
    width: 115px;
    margin-top: 0.2em;

    ${widthMedia.tablet} {
        width: 100px;
    }
`;

export default Guardian;

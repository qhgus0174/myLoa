import React from 'react';
import useTodo from '@hooks/storage/useTodo';
import { ICharacterTodo, IGurdianInfo, ITodo } from '@components/Todo/TodoType';
import { GuardianInfo, IGurdian } from '@common/data/guardian';
import { getStorage } from '@storage/index';
import styled from '@emotion/styled';
import { FlexDiv } from '@style/common';

interface IGuardianParam {
    todo: ITodo;
    todoIndex: number;
    characterId: number;
    characterGuardianInfo: IGurdianInfo;
    charTodo: ICharacterTodo;
    characterIndex: number;
    setGuardianStep: (e: string) => void;
    onClick: (e: React.MouseEvent<HTMLDivElement>, i: number) => void;
    onTouchEnd: ({
        e,
        charTodo,
        characterIndex,
    }: {
        e: React.TouchEvent<HTMLDivElement>;
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
    const [storageTodo, setStorageTodo] = useTodo();

    const updateGuardianStep = (e: React.ChangeEvent<HTMLSelectElement>, characterOrdIndex: number) => {
        const {
            target: { value },
        } = e;

        const todoArr: ITodo[] = getStorage('todo');

        const characterIndex = getCharacterIndex(characterOrdIndex);
        const todoIndex = todoArr.findIndex(td => td.id === todo.id);
        todoArr[todoIndex].character[characterIndex].guardianInfo.step = value;

        setStorageTodo(JSON.stringify(todoArr));
        setGuardianStep(value);
    };

    const updateGuardianInfo = (e: React.ChangeEvent<HTMLSelectElement>, characterOrdIndex: number) => {
        const {
            target: { value },
        } = e;

        const todoArr: ITodo[] = getStorage('todo');

        const characterIndex = getCharacterIndex(characterOrdIndex);
        const todoIndex = todoArr.findIndex(td => td.id === todo.id);
        todoArr[todoIndex].character[characterIndex].guardianInfo.info = value;

        setStorageTodo(JSON.stringify(todoArr));
    };

    const getCharacterIndex = (characterOrdIndex: number) => {
        const todoArr: ITodo[] = getStorage('todo');
        return todoArr[todoIndex].character.findIndex(character => character.id === characterId);
    };

    return (
        <GurdianDiv
            direction="column"
            onTouchEnd={e => onTouchEnd({ e: e, charTodo: charTodo, characterIndex: characterIndex })}
            onClick={e => onClick(e, characterId)}
        >
            <GurdianSelectBox
                key={`guardian_step_${characterId}`}
                onChange={e => updateGuardianStep(e, characterId)}
                value={characterGuardianInfo.step}
            >
                {GuardianInfo.map((guardian: IGurdian, gIndex: number) => {
                    return (
                        <option key={gIndex} value={guardian.step}>
                            {guardian.stepName}
                        </option>
                    );
                })}
            </GurdianSelectBox>
            <GurdianSelectBox
                onChange={e => updateGuardianInfo(e, characterId)}
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
            </GurdianSelectBox>
        </GurdianDiv>
    );
};

const GurdianDiv = styled(FlexDiv)`
    align-items: center;
    margin-top: 0.3em;
    box-sizing: border-box;
`;

const GurdianSelectBox = styled.select`
    width: 124px;
    margin-top: 0.2em;
`;

export default Guardian;
import React from 'react';
import useTodo from '@hooks/storage/useTodo';
import { IGurdianInfo, ITodo } from '@components/Todo/TodoType';
import { GuardianInfo, IGurdian } from '@common/guardian';
import { FlexDiv } from '@style/common';
import { css } from '@emotion/react';
import { getStorage } from '@storage/index';

interface IGuardianParam {
    todo: ITodo;
    todoIndex: number;
    characterId: number;
    characterGuardianInfo: IGurdianInfo;
    setGuardianStep: (e: string) => void;
}

const Guardian = ({ todo, characterId, todoIndex, characterGuardianInfo, setGuardianStep }: IGuardianParam) => {
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
        <FlexDiv direction="column" basis="50">
            <select
                css={css`
                    width: 124px;
                `}
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
            </select>
            <select
                css={css`
                    width: 124px;
                `}
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
            </select>
        </FlexDiv>
    );
};

export default Guardian;

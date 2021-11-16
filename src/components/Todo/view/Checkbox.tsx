import React, { useContext, useState } from 'react';
import { getStorage } from '@storage/index';
import { default as CheckboxInput } from '@components/Input/TodoCheckbox';
import { ICharacterTodo, ITodo } from '@components/Todo/TodoType';
import TodoCheck from '@components/Todo/modal/TodoCheck';
import TextBox from '@components/Input/TextBox';
import { IContextModal, ScheduleContents, ScheduleType } from '@common/types';
import { CharactersDiv, FlexDiv, FlexHoverDiv } from '@style/common';
import styled from '@emotion/styled';
import { PagingStateContext } from '@context/PagingContext';
import useTodo from '@hooks/storage/useTodo';
import Guardian from '@components/Todo/view/Guardian';
import { LongPressEvent, useLongPress } from 'use-long-press';

interface ICheckbox {
    todo: ITodo;
    todoIndex: number;
    onContextMenu: ({ e, title, modal, width, height }: IContextModal) => void;
}

const Checkbox = ({ todo: pTodo, todoIndex: pTodoIndex, onContextMenu }: ICheckbox) => {
    const { perPage, currentPage } = useContext(PagingStateContext);

    const [storageTodo, setStorageTodo] = useTodo();
    const [guardianStep, setGuardianStep] = useState<string>('1');

    const onLongPress = (charTodo: ICharacterTodo, characterIndex: number) =>
        useLongPress((e: LongPressEvent<Element> | undefined) => openTodoCheckEditModal(e, charTodo, characterIndex));

    const openTodoCheckEditModal = (
        e: React.MouseEvent<HTMLElement> | LongPressEvent<Element> | undefined,
        charTodo: ICharacterTodo,
        characterIndex: number,
    ) => {
        onContextMenu({
            e: e,
            modal: (
                <TodoCheck
                    key={`todo_check_${characterIndex}`}
                    {...charTodo}
                    todoId={pTodo.id}
                    todoName={pTodo.name}
                    checkType={pTodo.checkType}
                    todoType={pTodo.type}
                    todoContents={pTodo.contents}
                    eponaName={charTodo.eponaName}
                    showCharacter={pTodo.showCharacter}
                />
            ),
            title: '숙제 수정(개별)',
            width: '400',
            height: ['chaos', 'epona', 'guardian'].includes(pTodo.contents) ? '500' : '350',
        });
    };

    const onClickCheckTodo = (characterId: number, checkesIndex: number) => {
        const todoArr: ITodo[] = getStorage('todo');

        const todoIndex = todoArr.findIndex(td => td.id === pTodo.id);

        const characterIndex = todoArr[todoIndex].character.findIndex(character => character.id === characterId);

        const checkCount: number[] = todoArr[todoIndex].character[characterIndex].check.map(
            (value: number, index: number) => {
                return index === checkesIndex ? 1 - value : value;
            },
        );

        const relaxGauge = calcRelaxGauge(todoArr[todoIndex].character[characterIndex].oriRelaxGauge, checkCount);

        todoArr[todoIndex].character[characterIndex] = {
            ...todoArr[todoIndex].character[characterIndex],
            check: checkCount,
            relaxGauge: relaxGauge,
        };

        setStorageTodo(JSON.stringify(todoArr));
    };

    const onClickCheckTodoHoverArea = (e: React.MouseEvent<HTMLDivElement>, characterId: number) => {
        if (e.target !== e.currentTarget) return;

        const todoArr: ITodo[] = getStorage('todo');

        const todoIndex = todoArr.findIndex(td => td.id === pTodo.id);

        const characterIndex = todoArr[todoIndex].character.findIndex(character => character.id === characterId);

        const checkArr = ['chaos', 'guardian', 'epona'].includes(todoArr[todoIndex].contents)
            ? setOutSideMultiCheck(characterIndex, todoIndex)
            : setOutSideSingleCheck(characterIndex, todoIndex);

        const relaxGauge = calcRelaxGauge(todoArr[todoIndex].character[characterIndex].oriRelaxGauge, checkArr);

        todoArr[todoIndex].character[characterIndex] = {
            ...todoArr[todoIndex].character[characterIndex],
            relaxGauge: relaxGauge,
            check: checkArr,
        };

        setStorageTodo(JSON.stringify(todoArr));
    };

    const setOutSideMultiCheck = (characterIndex: number, todoIndex: number): number[] => {
        const todoArr: ITodo[] = getStorage('todo');

        const noCheckFirstIndex = todoArr[todoIndex].character[characterIndex].check.findIndex((checks: number) => {
            return checks === 0;
        });

        todoArr[todoIndex].character[characterIndex].check[noCheckFirstIndex] = 1;

        return todoArr[todoIndex].character[characterIndex].check;
    };

    const setOutSideSingleCheck = (characterIndex: number, todoIndex: number): number[] => {
        const todoArr: ITodo[] = getStorage('todo');

        const resultArr = todoArr[todoIndex].character[characterIndex].check.map((value: number) => {
            return 1 - value;
        });

        return resultArr;
    };

    const calcRelaxGauge = (oriRelaxGauge: number, checkArr: number[]): number => {
        const checkCounts = checkArr.reduce((count, num) => (num === 1 ? count + 1 : count), 0);

        const minusGauge = checkCounts * 20;
        const calcMinusGauge = oriRelaxGauge - minusGauge;
        const calcRelaxGauge = calcMinusGauge < 0 ? 0 : calcMinusGauge;

        return calcRelaxGauge;
    };

    const onChangeTodoText = (e: React.ChangeEvent<HTMLInputElement>, characterId: number) => {
        const {
            target: { value: newText },
        } = e;

        const todoArr: ITodo[] = getStorage('todo');

        const todoIndex = todoArr.findIndex(td => td.id === pTodo.id);
        const characterIndex = getCharacterIndex(characterId);

        todoArr[todoIndex].character[characterIndex] = {
            ...todoArr[todoIndex].character[characterIndex],
            text: newText,
        };

        setStorageTodo(JSON.stringify(todoArr));
    };

    const getCharacterIndex = (characterId: number) => {
        const todoArr: ITodo[] = getStorage('todo');
        return todoArr[pTodoIndex].character.findIndex(character => character.id === characterId);
    };

    return (
        <>
            <WhiteSpaceDiv></WhiteSpaceDiv>
            <CharactersDiv
                length={getStorage('character').length - (currentPage - 1) * perPage}
                contents={pTodo.contents}
            >
                {pTodo.character
                    ?.sort((a: ICharacterTodo, b: ICharacterTodo) => {
                        return getStorage('characterOrd').indexOf(a.id) - getStorage('characterOrd').indexOf(b.id);
                    })
                    .slice(
                        currentPage === 1 ? 0 : (currentPage - 1) * perPage,
                        currentPage === 1 ? perPage : (currentPage - 1) * perPage + perPage,
                    )
                    .map((charTodo: ICharacterTodo, characterIndex: number) => {
                        return (
                            <FlexHoverDiv
                                key={`drag_char_${characterIndex}`}
                                onContextMenu={e => openTodoCheckEditModal(e, charTodo, characterIndex)}
                                onClick={e => onClickCheckTodoHoverArea(e, charTodo.id)}
                            >
                                {pTodo.checkType === 'check' ? (
                                    pTodo.showCharacter.includes(charTodo.id) && (
                                        <FlexDiv direction="column" width="100">
                                            <CheckContainer onClick={e => onClickCheckTodoHoverArea(e, charTodo.id)}>
                                                <CheckBoxDiv contents={pTodo.contents} todoType={pTodo.type}>
                                                    {charTodo.check.map((checks: number, checkesIndex: number) => {
                                                        return (
                                                            <CheckboxContentDiv key={`todo_char_check_${checkesIndex}`}>
                                                                <CheckboxInput
                                                                    key={checkesIndex}
                                                                    checked={checks === 1}
                                                                    onChange={() =>
                                                                        onClickCheckTodo(charTodo.id, checkesIndex)
                                                                    }
                                                                />
                                                                {charTodo.eponaName && (
                                                                    <EponaTextDiv>
                                                                        {charTodo.eponaName[checkesIndex]}
                                                                    </EponaTextDiv>
                                                                )}
                                                            </CheckboxContentDiv>
                                                        );
                                                    })}
                                                </CheckBoxDiv>
                                                {pTodo.type === 'daily' &&
                                                    ['chaos', 'guardian'].includes(pTodo.contents) && (
                                                        <CheckText>
                                                            <RelaxGaugeDiv
                                                                onClick={e => onClickCheckTodoHoverArea(e, charTodo.id)}
                                                            >
                                                                {charTodo.relaxGauge}
                                                            </RelaxGaugeDiv>
                                                        </CheckText>
                                                    )}
                                            </CheckContainer>
                                            {pTodo.type === 'daily' && pTodo.contents === 'guardian' && (
                                                <Guardian
                                                    onClick={e => onClickCheckTodoHoverArea(e, charTodo.id)}
                                                    key={`guardian_${characterIndex}`}
                                                    todo={pTodo}
                                                    characterGuardianInfo={charTodo.guardianInfo}
                                                    characterId={charTodo.id}
                                                    todoIndex={pTodoIndex}
                                                    setGuardianStep={setGuardianStep}
                                                />
                                            )}
                                        </FlexDiv>
                                    )
                                ) : (
                                    <TextBox
                                        onChange={e => {
                                            onChangeTodoText(e, charTodo.id);
                                        }}
                                        underline={false}
                                        width="70"
                                        align="center"
                                        value={charTodo.text || ''}
                                    />
                                )}
                            </FlexHoverDiv>
                        );
                    })}
            </CharactersDiv>
            <WhiteSpaceDiv></WhiteSpaceDiv>
        </>
    );
};

const CheckBoxDiv = styled.div<{ todoType: ScheduleType; contents: ScheduleContents }>`
    display: flex;
    justify-content: space-evenly;

    & > label:nth-of-type(2),
    & > label:nth-of-type(3) {
        margin-left: 0.5em;
    }
`;

const CheckText = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 15%;
    justify-content: center;
`;

const RelaxGaugeDiv = styled.div`
    justify-content: center;
    text-align: center;
    color: ${props => props.theme.colors.relax};
    font-weight: 600;
`;

const WhiteSpaceDiv = styled.div`
    display: flex;
    width: 2.5%;
    flex-basis: 2.5%;
`;

const CheckboxContentDiv = styled.label`
    display: flex;
    flex-direction: column;
    cursor: pointer;
    align-items: center;
    flex-basis: 33%;
    font-size: 0.9em;
`;

const EponaTextDiv = styled.div`
    font-size: 0.9em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    width: 46.75px;
`;

const CheckContainer = styled(FlexDiv)`
    height: 100%;
    justify-content: center;
`;

export default Checkbox;

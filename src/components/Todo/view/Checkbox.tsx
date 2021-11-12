import React, { useContext } from 'react';
import { getStorage } from '@storage/index';
import { default as CheckboxInput } from '@components/Input/TodoCheckbox';
import { ICharacterTodo, ITodo } from '@components/Todo/TodoType';
import TodoCheck from '@components/Todo/modal/TodoCheck';
import TextBox from '@components/Input/TextBox';
import { IContextModal, ScheduleContents, ScheduleType } from '@common/types';
import { CharactersDiv, FlexDiv, FlexHoverDiv } from '@style/common';
import styled from '@emotion/styled';

import { PagingStateContext } from '@context/PagingContext';
import useCharacter from '@hooks/storage/useCharacter';
import useCharacterOrd from '@hooks/storage/useCharacterOrd';
import useTodo from '@hooks/storage/useTodo';
import useTodoOrd from '@hooks/storage/useTodoOrd';
import { ICharacter } from '@components/Character/CharacterType';
import { getOwnIdByIndex } from '@common/utils';

interface ICheckbox {
    todo: ITodo;
    todoIndex: number;
    onContextMenu: ({ e, title, modal, width, height }: IContextModal) => void;
    onChangeTodoText: (e: React.ChangeEvent<HTMLInputElement>, todoOrdIndex: number, characterOrdIndex: number) => void;
}

const Checkbox = ({ todo, todoIndex, onContextMenu, onChangeTodoText }: ICheckbox) => {
    const { perPage, currentPage } = useContext(PagingStateContext);

    const [storageCharacter] = useCharacter();
    const [storageCharacterOrd] = useCharacterOrd();
    const [storageTodo, setStorageTodo] = useTodo();
    const [storageTodoOrd, setStorageTodoOrd] = useTodoOrd();

    const onClickCheckTodo = (todoOrdIndex: number, characterOrdIndex: number, checkesIndex: number) => {
        const todoArr: ITodo[] = JSON.parse(storageTodo);
        const todoOrdArr: number[] = JSON.parse(storageTodoOrd);
        const characterArr: ICharacter[] = JSON.parse(storageCharacter);
        const characterOrdArr: number[] = JSON.parse(storageCharacterOrd);

        const todoIndex = getOwnIdByIndex(todoArr, todoOrdArr, todoOrdIndex);
        const characterIndex = getOwnIdByIndex(characterArr, characterOrdArr, characterOrdIndex);

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

    const calcRelaxGauge = (oriRelaxGauge: number, checkArr: number[]): number => {
        const checkCounts = checkArr.reduce((count, num) => (num === 2 ? count + 1 : count), 0);

        const minusGauge = checkCounts * 20;
        const calcMinusGauge = oriRelaxGauge - minusGauge;
        const calcRelaxGauge = calcMinusGauge < 0 ? 0 : calcMinusGauge;

        return calcRelaxGauge;
    };

    return (
        <>
            <WhiteSpaceDiv></WhiteSpaceDiv>
            <CharactersDiv length={getStorage('character').length - (currentPage - 1) * perPage}>
                {todo.character
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
                                onContextMenu={e =>
                                    onContextMenu({
                                        e: e,
                                        modal: (
                                            <TodoCheck
                                                key={`todo_check_${characterIndex}`}
                                                {...charTodo}
                                                todoId={todo.id}
                                                checkType={todo.checkType}
                                                todoType={todo.type}
                                                todoContents={todo.contents}
                                                eponaName={charTodo.eponaName}
                                                showCharacter={todo.showCharacter}
                                            />
                                        ),
                                        title: '숙제 수정(개별)',
                                        width: '400',
                                        height: ['chaos', 'epona'].includes(todo.contents) ? '450' : '350',
                                    })
                                }
                            >
                                {todo.checkType === 'check' ? (
                                    todo.showCharacter.includes(charTodo.id) && (
                                        <>
                                            <CheckBoxDiv contents={todo.contents} todoType={todo.type}>
                                                {charTodo.check.map((checks: number, checkesIndex: number) => {
                                                    return (
                                                        <CheckboxContentDiv
                                                            key={`todo_char_check_${checkesIndex}`}
                                                            direction="column"
                                                        >
                                                            <CheckboxInput
                                                                key={checkesIndex}
                                                                checked={checks === 1}
                                                                onChange={() =>
                                                                    onClickCheckTodo(
                                                                        todoIndex,
                                                                        characterIndex,
                                                                        checkesIndex,
                                                                    )
                                                                }
                                                            />
                                                            <EponaTextDiv>
                                                                {charTodo.eponaName && charTodo.eponaName[checkesIndex]}
                                                            </EponaTextDiv>
                                                        </CheckboxContentDiv>
                                                    );
                                                })}
                                            </CheckBoxDiv>
                                            {todo.type === 'daily' && todo.contents === 'chaos' && (
                                                <CheckText>
                                                    <RelaxGaugeDiv>{charTodo.relaxGauge}</RelaxGaugeDiv>
                                                </CheckText>
                                            )}
                                        </>
                                    )
                                ) : (
                                    <TextBox
                                        onChange={e => {
                                            onChangeTodoText(e, todoIndex, characterIndex);
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
    flex-basis: 50%;
    justify-content: space-evenly;

    & > label:nth-of-type(2),
    & > label:nth-of-type(3) {
        margin-left: 0.5em;
    }
    ${props => props.contents === 'epona' && `flex-basis: 82%;`}
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
`;

const WhiteSpaceDiv = styled.div`
    display: flex;
    width: 2.5%;
    flex-basis: 2.5%;
`;

const CheckboxContentDiv = styled(FlexDiv)`
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

export default Checkbox;

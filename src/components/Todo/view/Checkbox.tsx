import React, { useContext, useState } from 'react';
import { LocalStorageStateContext, LocalStorageActionContext } from '@context/LocalStorageContext';
import { PagingStateContext } from '@context/PagingContext';
import { default as CheckboxInput } from '@components/Input/TodoCheckbox';
import { ICharacterTodo, ITodo } from '@common/types/localStorage/Todo';
import TodoCheck from '@components/Todo/modal/TodoCheck';
import TextBox from '@components/Input/TextBox';
import Guardian from '@components/Todo/view/Guardian';
import { IContextModal, ScheduleContents, ScheduleType } from '@common/types/types';
import { CharactersDiv, FlexHoverArticle } from '@style/common/layout/common';
import styled from '@emotion/styled';
import { parseStorageItem } from '@common/utils';

interface ICheckbox {
    todo: ITodo;
    todoIndex: number;
    onContextMenu: ({ e, title, modal, width, height }: IContextModal) => void;
}

const Checkbox = ({ todo: pTodo, todoIndex: pTodoIndex, onContextMenu }: ICheckbox) => {
    const { storedCharacter, storedCharacterOrd } = useContext(LocalStorageStateContext);
    const { setStoredTodo } = useContext(LocalStorageActionContext);
    const { perPage, currentPage } = useContext(PagingStateContext);

    const [guardianStep, setGuardianStep] = useState<string>('1');

    const openTodoCheckEditModal = ({
        e,
        charTodo,
        characterIndex,
    }: {
        e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>;
        charTodo: ICharacterTodo;
        characterIndex: number;
    }) => {
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
            height: ['chaos', 'guardian'].includes(pTodo.contents) ? '500' : '550',
        });
    };

    const onTouchEnd = ({
        e,
        charTodo,
        characterIndex,
    }: {
        e: React.TouchEvent<HTMLElement>;
        charTodo: ICharacterTodo;
        characterIndex: number;
    }) => {
        if (e.target !== e.currentTarget) return;
        openTodoCheckEditModal({
            e: e,
            charTodo: charTodo,
            characterIndex: characterIndex,
        });
    };

    const onClickCheckTodo = (e: React.ChangeEvent<HTMLInputElement>, characterId: number, checkesIndex: number) => {
        const {
            target: { checked: isChecked },
        } = e;
        const todoArr: ITodo[] = [...parseStorageItem(localStorage.getItem('todo') as string)];

        const todoIndex = todoArr.findIndex(td => td.id === pTodo.id);

        const characterIndex = todoArr[todoIndex].character.findIndex(character => character.id === characterId);

        const checkCount: number[] = todoArr[todoIndex].character[characterIndex].check.map(
            (value: number, index: number) => {
                return index === checkesIndex ? 1 - value : value;
            },
        );

        const relaxGauge = calcRelaxGauge({
            oriRelaxGauge: todoArr[todoIndex].character[characterIndex].oriRelaxGauge,
            checkArr: checkCount,
            currentRelaxGauge: todoArr[todoIndex].character[characterIndex].relaxGauge,
            isChecked: isChecked,
        });

        todoArr[todoIndex].character[characterIndex] = {
            ...todoArr[todoIndex].character[characterIndex],
            check: checkCount,
            relaxGauge: relaxGauge,
        };

        setStoredTodo(todoArr);
    };

    const onClickCheckTodoHoverArea = (e: React.MouseEvent<HTMLElement>, characterId: number) => {
        if (e.target !== e.currentTarget) return;

        const todoArr: ITodo[] = [...parseStorageItem(localStorage.getItem('todo') as string)];

        const todoIndex = todoArr.findIndex(td => td.id === pTodo.id);

        const characterIndex = todoArr[todoIndex].character.findIndex(character => character.id === characterId);

        const checkArr = ['chaos', 'guardian', 'epona'].includes(todoArr[todoIndex].contents)
            ? setOutSideMultiCheck(characterIndex, todoIndex)
            : setOutSideSingleCheck(characterIndex, todoIndex);

        const relaxGauge = calcRelaxGauge({
            oriRelaxGauge: todoArr[todoIndex].character[characterIndex].oriRelaxGauge,
            checkArr: checkArr,
            currentRelaxGauge: todoArr[todoIndex].character[characterIndex].relaxGauge,
            isChecked: true,
        });

        todoArr[todoIndex].character[characterIndex] = {
            ...todoArr[todoIndex].character[characterIndex],
            relaxGauge: relaxGauge,
            check: checkArr,
        };

        setStoredTodo(todoArr);
    };

    const setOutSideMultiCheck = (characterIndex: number, todoIndex: number): number[] => {
        const todoArr: ITodo[] = [...parseStorageItem(localStorage.getItem('todo') as string)];

        const noCheckFirstIndex = todoArr[todoIndex].character[characterIndex].check.findIndex((checks: number) => {
            return checks === 0;
        });

        todoArr[todoIndex].character[characterIndex].check[noCheckFirstIndex] = 1;

        return todoArr[todoIndex].character[characterIndex].check;
    };

    const setOutSideSingleCheck = (characterIndex: number, todoIndex: number): number[] => {
        const todoArr: ITodo[] = [...parseStorageItem(localStorage.getItem('todo') as string)];

        const resultArr = todoArr[todoIndex].character[characterIndex].check.map((value: number) => {
            return 1 - value;
        });

        return resultArr;
    };

    const calcRelaxGauge = ({
        oriRelaxGauge,
        checkArr,
        currentRelaxGauge,
        isChecked,
    }: {
        oriRelaxGauge: number;
        checkArr: number[];
        currentRelaxGauge: number;
        isChecked: boolean;
    }): number => {
        const checkCounts = checkArr.reduce((count, num) => (num === 1 ? count + 1 : count), 0);

        const minusGauge = checkCounts * 20;
        const calcMinusGauge = oriRelaxGauge - minusGauge;
        const calcRelaxGauge =
            oriRelaxGauge === 10 ||
            (Number(currentRelaxGauge) === 10 && isChecked) ||
            (Number(oriRelaxGauge) === 10 && Number(currentRelaxGauge) === 10)
                ? 10
                : calcMinusGauge < 0
                ? 0
                : calcMinusGauge;

        return calcRelaxGauge;
    };

    const onChangeTodoText = (e: React.ChangeEvent<HTMLInputElement>, characterId: number) => {
        const {
            target: { value: newText },
        } = e;

        const todoArr: ITodo[] = [...parseStorageItem(localStorage.getItem('todo') as string)];

        const todoIndex = todoArr.findIndex(td => td.id === pTodo.id);

        const characterIndex = todoArr[todoIndex].character.findIndex(character => character.id === characterId);

        todoArr[todoIndex].character[characterIndex] = {
            ...todoArr[todoIndex].character[characterIndex],
            text: newText,
        };

        setStoredTodo(todoArr);
    };

    const calcRelaxGuage = ({ relaxGuage }: { relaxGuage: number }): number[] => {
        const arraySize = relaxGuage;
        return new Array(arraySize).fill(100);
    };

    const calcRelaxGuageHasRemain = ({ relaxGuage }: { relaxGuage: number }): number[] => {
        const arraySize = relaxGuage - 0.5;
        const calcArraySize = arraySize > 0 ? arraySize : 0;

        const guageArr = new Array(calcArraySize).fill(100);
        guageArr.push(50);

        return guageArr;
    };

    return (
        <>
            <WhiteSpace></WhiteSpace>
            <CharactersDiv length={storedCharacter.length - (currentPage - 1) * perPage} contents={pTodo.contents}>
                {pTodo.character
                    ?.sort((a: ICharacterTodo, b: ICharacterTodo) => {
                        return storedCharacterOrd.indexOf(a.id) - storedCharacterOrd.indexOf(b.id);
                    })
                    .slice(
                        currentPage === 1 ? 0 : (currentPage - 1) * perPage,
                        currentPage === 1 ? perPage : (currentPage - 1) * perPage + perPage,
                    )
                    .map((charTodo: ICharacterTodo, characterIndex: number) => {
                        const relaxGuage = charTodo.relaxGauge / 20;
                        const hasRemain = charTodo.relaxGauge % 20;

                        const calacRelaxGuageArr = hasRemain
                            ? calcRelaxGuageHasRemain({ relaxGuage: relaxGuage })
                            : calcRelaxGuage({ relaxGuage: relaxGuage });

                        const relaxGuageArr = Object.assign([], new Array(5).fill(0), calacRelaxGuageArr);

                        return (
                            <FlexHoverArticle
                                key={`drag_char_${characterIndex}`}
                                onContextMenu={(e: React.MouseEvent<HTMLElement>) =>
                                    openTodoCheckEditModal({
                                        e: e,
                                        charTodo: charTodo,
                                        characterIndex: characterIndex,
                                    })
                                }
                                onTouchEnd={(e: React.TouchEvent<HTMLElement>) =>
                                    onTouchEnd({ e: e, charTodo: charTodo, characterIndex: characterIndex })
                                }
                                onClick={e => onClickCheckTodoHoverArea(e, charTodo.id)}
                            >
                                {pTodo.checkType === 'check' ? (
                                    pTodo.showCharacter.includes(charTodo.id) && (
                                        <TodoContainer>
                                            <EContainer
                                                length={storedCharacter.length - (currentPage - 1) * perPage}
                                                isGuardian={pTodo.contents === 'guardian'}
                                                onTouchEnd={(e: React.TouchEvent<HTMLElement>) =>
                                                    onTouchEnd({
                                                        e: e,
                                                        charTodo: charTodo,
                                                        characterIndex: characterIndex,
                                                    })
                                                }
                                                onClick={(e: React.MouseEvent<HTMLElement>) =>
                                                    onClickCheckTodoHoverArea(e, charTodo.id)
                                                }
                                            >
                                                <Article contents={pTodo.contents} todoType={pTodo.type}>
                                                    {charTodo.check.map((checks: number, checkesIndex: number) => {
                                                        return (
                                                            <Content key={`todo_char_check_${checkesIndex}`}>
                                                                <CheckboxInput
                                                                    className="todoCheckbox"
                                                                    key={checkesIndex}
                                                                    checked={checks === 1}
                                                                    onChange={(
                                                                        e: React.ChangeEvent<HTMLInputElement>,
                                                                    ) => onClickCheckTodo(e, charTodo.id, checkesIndex)}
                                                                />
                                                                <EponaText>
                                                                    {pTodo.contents === 'epona' &&
                                                                        charTodo.eponaName &&
                                                                        charTodo.eponaName[checkesIndex]}
                                                                </EponaText>
                                                            </Content>
                                                        );
                                                    })}
                                                </Article>
                                                {pTodo.type === 'daily' &&
                                                    ['chaos', 'guardian', 'epona'].includes(pTodo.contents) && (
                                                        <RelaxGauge
                                                            onTouchEnd={(e: React.TouchEvent<HTMLElement>) =>
                                                                onTouchEnd({
                                                                    e: e,
                                                                    charTodo: charTodo,
                                                                    characterIndex: characterIndex,
                                                                })
                                                            }
                                                            onClick={(e: React.MouseEvent<HTMLElement>) =>
                                                                onClickCheckTodoHoverArea(e, charTodo.id)
                                                            }
                                                        >
                                                            {relaxGuageArr.map((guage, index) => {
                                                                return <GuageBar key={index} guage={guage} />;
                                                            })}
                                                        </RelaxGauge>
                                                    )}
                                            </EContainer>
                                            {pTodo.type === 'daily' && pTodo.contents === 'guardian' && (
                                                <Guardian
                                                    onTouchEnd={onTouchEnd}
                                                    onClick={(e: React.MouseEvent<HTMLElement>) =>
                                                        onClickCheckTodoHoverArea(e, charTodo.id)
                                                    }
                                                    key={`guardian_${characterIndex}`}
                                                    todo={pTodo}
                                                    charTodo={charTodo}
                                                    characterIndex={characterIndex}
                                                    characterGuardianInfo={charTodo.guardianInfo}
                                                    characterId={charTodo.id}
                                                    todoIndex={pTodoIndex}
                                                    setGuardianStep={setGuardianStep}
                                                />
                                            )}
                                        </TodoContainer>
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
                            </FlexHoverArticle>
                        );
                    })}
            </CharactersDiv>
            <WhiteSpace></WhiteSpace>
        </>
    );
};

const Article = styled.article<{ todoType: ScheduleType; contents: ScheduleContents }>`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;

    ${props => (props.contents === 'epona' ? `flex-basis:100%;` : `flex-basis: 75%;`)}
`;

const TodoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const WhiteSpace = styled.div`
    display: flex;
    width: 2.5%;
    flex-basis: 2.2%;
`;

const Content = styled.label`
    display: flex;
    flex-direction: column;
    cursor: pointer;
    align-items: center;
    flex-basis: 33%;
    font-size: 0.9em;
`;

const EponaText = styled.article`
    font-size: 0.9em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    margin-top: 0.1em;
    box-sizing: border-box;
`;

const EContainer = styled.div<{ isGuardian: boolean; length: number }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: ${props => (props.length < 7 ? `60` : `75`)}%;
    height: ${props => (props.isGuardian ? `50` : `100`)}%;
`;

const RelaxGauge = styled.article`
    display: flex;
    justify-content: center;
    text-align: center;
    box-sizing: border-box;
    padding-top: 3px;
    width: 80%;
    height: 25%;
`;

const GuageBar = styled.div<{ guage: number }>`
    width: 50%;
    height: 2px;
    margin-left: 2px;
    margin-right: 2px;
    box-sizing: border-box;

    background: ${props => props.theme.colors.gray};
    &:after {
        content: '';
        display: block;
        background: ${props => props.theme.colors.relax};
        width: ${props => props.guage}%;
        height: 2px;
    }
`;

export default Checkbox;

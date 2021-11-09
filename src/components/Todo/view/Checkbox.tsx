import React, { useContext } from 'react';
import { getStorage } from '@storage/index';
import { default as CheckboxInput } from '@components/Input/Checkbox';
import { ICharacterTodo, ITodo } from '@components/Todo/TodoType';
import TodoCheck from '@components/Todo/modal/TodoCheck';
import TextBox from '@components/Input/TextBox';
import { IContextModal, ScheduleContents, ScheduleType } from '@common/types';
import { CharactersDiv, FlexHoverDiv } from '@style/common';
import styled from '@emotion/styled';

import { PagingStateContext } from '@context/PagingContext';
import usePage from '@hooks/storage/usePage';

interface ICheckbox {
    todo: ITodo;
    todoIndex: number;
    onContextMenu: ({ e, title, modal, width, height }: IContextModal) => void;
    onClickCheckTodo: (todoOrdIndex: number, characterOrdIndex: number) => void;
    onChangeTodoText: (e: React.ChangeEvent<HTMLInputElement>, todoOrdIndex: number, characterOrdIndex: number) => void;
}

const Checkbox = ({ todo, todoIndex, onContextMenu, onClickCheckTodo, onChangeTodoText }: ICheckbox) => {
    const { perPage } = useContext(PagingStateContext);
    const [currentPage] = usePage();

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
                        const isChecked = charTodo.check > 0 ? true : false;
                        return (
                            <FlexHoverDiv
                                key={`drag_char_${characterIndex}`}
                                onContextMenu={e =>
                                    onContextMenu({
                                        e: e,
                                        modal: (
                                            <TodoCheck
                                                {...charTodo}
                                                todoId={todo.id}
                                                checkType={todo.checkType}
                                                todoType={todo.type}
                                                todoContents={todo.contents}
                                            />
                                        ),
                                        title: '숙제 수정(개별)',
                                        width: '35',
                                        height: '60',
                                    })
                                }
                            >
                                {!charTodo.hide &&
                                    (todo.checkType === 'check' ? (
                                        <>
                                            <CheckBoxDiv contents={todo.contents} todoType={todo.type}>
                                                <CheckboxInput
                                                    checked={isChecked}
                                                    onChange={() => onClickCheckTodo(todoIndex, characterIndex)}
                                                />
                                            </CheckBoxDiv>
                                            {todo.type === 'daily' && ['chaos', 'epona'].includes(todo.contents) && (
                                                <CheckText>
                                                    <RelaxGaugeDiv>{charTodo.relaxGauge}</RelaxGaugeDiv>
                                                    <div>
                                                        {`${charTodo.check} / ${todo.contents === 'chaos' ? '2' : '3'}`}
                                                    </div>
                                                </CheckText>
                                            )}
                                        </>
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
                                    ))}
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
    justify-content: ${props =>
        props.todoType === 'daily' && ['chaos', 'epona'].includes(props.contents) ? `flex-end` : `center`};
`;

const CheckText = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 50%;
    justify-content: center;
    padding-left: 1.5em;
`;

const RelaxGaugeDiv = styled.div`
    justify-content: center;
    color: ${props => props.theme.colors.relax};
`;

const WhiteSpaceDiv = styled.div`
    display: flex;
    width: 2.5%;
    flex-basis: 2.5%;
`;

export default Checkbox;

import React from 'react';
import TextBox from '@components/Input/TextBox';
import useCharacterOrd from '@hooks/storage/useCharacterOrd';
import { ICharacterTodo, ITodo } from '../TodoType';
import TodoCheck from '../modal/TodoCheck';
import { default as CheckboxInput } from '@components/Input/Checkbox';
import { FlexHoverDiv, FlexRightDiv } from '@style/common';
import styled from '@emotion/styled';

interface ICheckbox {
    todo: ITodo;
    todoIndex: number;
    onContextMenu: (e: React.MouseEvent<HTMLDivElement>, modal: JSX.Element, width?: string, height?: string) => void;
    onClickCheckTodo: (todoOrdIndex: number, characterOrdIndex: number) => void;
    onChangeTodoText: (e: React.ChangeEvent<HTMLInputElement>, todoOrdIndex: number, characterOrdIndex: number) => void;
}

const Checkbox = ({ todo, todoIndex, onContextMenu, onClickCheckTodo, onChangeTodoText }: ICheckbox) => {
    const [storageCharacterOrd] = useCharacterOrd();

    return (
        <CheckContainer>
            {todo.character
                ?.sort((a: ICharacterTodo, b: ICharacterTodo) => {
                    return (
                        (JSON.parse(storageCharacterOrd) as number[]).indexOf(a.id) -
                        (JSON.parse(storageCharacterOrd) as number[]).indexOf(b.id)
                    );
                })
                .map((charTodo: ICharacterTodo, characterIndex: number) => {
                    const isChecked = charTodo.check > 0 ? true : false;
                    return (
                        <FlexHoverDiv
                            key={`drag_char_${characterIndex}`}
                            onContextMenu={e =>
                                onContextMenu(
                                    e,
                                    <TodoCheck
                                        {...charTodo}
                                        todoId={todo.id}
                                        checkType={todo.checkType}
                                        todoType={todo.type}
                                    />,
                                )
                            }
                        >
                            {todo.checkType === 'check' ? (
                                <>
                                    <CheckBox>
                                        <CheckboxInput
                                            checked={isChecked}
                                            onChange={() => onClickCheckTodo(todoIndex, characterIndex)}
                                        />
                                    </CheckBox>
                                    <CheckText>
                                        <RelaxGaugeDiv>{todo.type === 'daily' && charTodo.relaxGauge}</RelaxGaugeDiv>
                                        <div>
                                            {todo.type === 'daily' &&
                                                `${charTodo.check} / ${todo.contents === 'chaos' ? '2' : '3'}`}
                                        </div>
                                    </CheckText>
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
                            )}
                        </FlexHoverDiv>
                    );
                })}
        </CheckContainer>
    );
};

const CheckContainer = styled(FlexRightDiv)`
    height: 100%;
`;

const CheckBox = styled.div`
    display: flex;
    flex-basis: 50%;
    justify-content: flex-end;
`;

const CheckText = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 50%;
    justify-content: center;
    padding-left: 1em;
`;

const RelaxGaugeDiv = styled.div`
    justify-content: center;
    color: ${props => props.theme.colors.relax};
`;

export default Checkbox;

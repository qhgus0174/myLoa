import React from 'react';
import TextBox from '@components/Input/TextBox';
import useCharacterOrd from '@hooks/storage/useCharacterOrd';
import { ICharacterTodo, ITodo } from '../TodoType';
import TodoCheck from '../modal/TodoCheck';
import { default as CheckboxInput } from '@components/Input/Checkbox';
import { FlexHoverDiv, FlexRightDiv } from '@style/common';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ScheduleType } from '@common/types';

interface ICheckbox {
    currentPage: number;
    perPage: number;
    todo: ITodo;
    todoIndex: number;
    onContextMenu: (e: React.MouseEvent<HTMLDivElement>, modal: JSX.Element, width?: string, height?: string) => void;
    onClickCheckTodo: (todoOrdIndex: number, characterOrdIndex: number) => void;
    onChangeTodoText: (e: React.ChangeEvent<HTMLInputElement>, todoOrdIndex: number, characterOrdIndex: number) => void;
}

const Checkbox = ({
    currentPage,
    perPage,
    todo,
    todoIndex,
    onContextMenu,
    onClickCheckTodo,
    onChangeTodoText,
}: ICheckbox) => {
    const [storageCharacterOrd] = useCharacterOrd();

    return (
        <>
            <div
                css={css`
                    display: flex;
                    width: 2.5%;
                    flex-basis: 2.5%;
                `}
            >
                &nbsp;
            </div>
            <CheckContainer length={JSON.parse(storageCharacterOrd).length - (currentPage - 1) * perPage}>
                {todo.character
                    ?.sort((a: ICharacterTodo, b: ICharacterTodo) => {
                        return (
                            (JSON.parse(storageCharacterOrd) as number[]).indexOf(a.id) -
                            (JSON.parse(storageCharacterOrd) as number[]).indexOf(b.id)
                        );
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
                                        <CheckBox todoType={todo.type}>
                                            <CheckboxInput
                                                checked={isChecked}
                                                onChange={() => onClickCheckTodo(todoIndex, characterIndex)}
                                            />
                                        </CheckBox>
                                        {todo.type === 'daily' && (
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
                                )}
                            </FlexHoverDiv>
                        );
                    })}
            </CheckContainer>
            <div
                css={css`
                    display: flex;
                    width: 2.5%;
                    flex-basis: 2.5%;
                `}
            >
                &nbsp;
            </div>
        </>
    );
};

const CheckContainer = styled(FlexRightDiv)<{ length: number }>`
    height: 100%;
    justify-content: ${props => (props.length < 5 ? `flex-start` : `space-around`)};
`;

const CheckBox = styled.div<{ todoType: ScheduleType }>`
    display: flex;
    flex-basis: 50%;
    justify-content: ${props => (props.todoType === 'daily' ? `flex-end` : `center`)};
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

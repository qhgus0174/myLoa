import React from 'react';
import TextBox from '@components/Input/TextBox';
import { css } from '@emotion/react';
import useCharacterOrd from '@hooks/storage/useCharacterOrd';
import { ScheduleCheckType, ScheduleType } from 'common/types';
import { ICharacterTodo, ITodo } from '../TodoType';
import TodoCheck from '../TodoCheck';
import TodoEdit from '../TodoEdit';

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
        <>
            <div
                css={css`
                    width: 100px;
                    height: 20px;
                `}
                onContextMenu={e => onContextMenu(e, <TodoEdit {...todo} />)}
            >
                {todo.name}
            </div>
            <div
                css={css`
                    display: flex;
                `}
            >
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
                            <div
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
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => onClickCheckTodo(todoIndex, characterIndex)}
                                        />
                                        {todo.type === 'daily' && charTodo.check != 0 && <b>{charTodo.check}</b>}
                                        {todo.type === 'daily' && charTodo.relaxGauge != 0 && (
                                            <span>{charTodo.relaxGauge}</span>
                                        )}
                                    </>
                                ) : (
                                    <TextBox
                                        onChange={e => {
                                            onChangeTodoText(e, todoIndex, characterIndex);
                                        }}
                                        width="70"
                                        value={charTodo.text || ''}
                                    />
                                )}
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default Checkbox;

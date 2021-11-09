import React from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import useCharacterOrd from '@hooks/storage/useCharacterOrd';
import useCharacter from '@hooks/storage/useCharacter';
import useTodoOrd from '@hooks/storage/useTodoOrd';
import useTodo from '@hooks/storage/useTodo';
import { ICharacter } from '@components/Character/CharacterType';
import CheckboxText from '@components/Todo/view/CheckboxText';
import { ITodo } from '@components/Todo/TodoType';
import Checkbox from '@components/Todo/view/Checkbox';
import Line from '@components/Todo/view/Line';
import { getStorage } from '@storage/index';
import { IContextModalParam, ScheduleContents, ScheduleType } from '@common/types';
import { getOwnIdByIndex } from '@common/utils';
import styled from '@emotion/styled';
import { FlexDiv } from '@style/common';

const Todo = ({ onContextMenuBasicModal }: IContextModalParam) => {
    const [storageCharacter] = useCharacter();
    const [storageCharacterOrd] = useCharacterOrd();
    const [storageTodo, setStorageTodo] = useTodo();
    const [storageTodoOrd, setStorageTodoOrd] = useTodoOrd();

    const onChangeTodoText = (
        e: React.ChangeEvent<HTMLInputElement>,
        todoOrdIndex: number,
        characterOrdIndex: number,
    ) => {
        const {
            target: { value: newText },
        } = e;

        const todoArr: ITodo[] = JSON.parse(storageTodo);
        const todoOrdArr: number[] = JSON.parse(storageTodoOrd);
        const characterArr: ICharacter[] = JSON.parse(storageCharacter);
        const characterOrdArr: number[] = JSON.parse(storageCharacterOrd);

        const todoIndex = getOwnIdByIndex(todoArr, todoOrdArr, todoOrdIndex);
        const characterIndex = getOwnIdByIndex(characterArr, characterOrdArr, characterOrdIndex);

        todoArr[todoIndex].character[characterIndex] = {
            ...todoArr[todoIndex].character[characterIndex],
            text: newText,
        };

        setStorageTodo(JSON.stringify(todoArr));
    };

    const onClickCheckTodo = (todoOrdIndex: number, characterOrdIndex: number) => {
        const todoArr: ITodo[] = JSON.parse(storageTodo);
        const todoOrdArr: number[] = JSON.parse(storageTodoOrd);
        const characterArr: ICharacter[] = JSON.parse(storageCharacter);
        const characterOrdArr: number[] = JSON.parse(storageCharacterOrd);

        const todoIndex = getOwnIdByIndex(todoArr, todoOrdArr, todoOrdIndex);
        const characterIndex = getOwnIdByIndex(characterArr, characterOrdArr, characterOrdIndex);

        const checkCount = shouldTodoCheckMultiple(todoArr[todoIndex].type, todoArr[todoIndex].contents)
            ? getCheckCount(todoArr[todoIndex].contents, todoArr[todoIndex].character[characterIndex].check)
            : 1 - todoArr[todoIndex].character[characterIndex].check;

        const relaxGauge = calcRelaxGauge(todoArr[todoIndex].character[characterIndex].oriRelaxGauge, checkCount);

        todoArr[todoIndex].character[characterIndex] = {
            ...todoArr[todoIndex].character[characterIndex],
            check: checkCount,
            relaxGauge: relaxGauge,
        };

        setStorageTodo(JSON.stringify(todoArr));
    };

    const calcRelaxGauge = (oriRelaxGauge: number, checkCount: number): number => {
        const minusGauge = checkCount * 20;
        const calcMinusGauge = oriRelaxGauge - minusGauge;
        const calcRelaxGauge = calcMinusGauge < 0 ? 0 : calcMinusGauge;

        return calcRelaxGauge;
    };

    const shouldTodoCheckMultiple = (type: ScheduleType, contents: ScheduleContents) => {
        return type === 'daily' && ['chaos', 'epona'].includes(contents);
    };

    const getCheckCount = (contents: ScheduleContents, check: number): number => {
        const maxCheckCount = contents === 'chaos' ? 1 : 2;
        return check > maxCheckCount ? 0 : check + 1;
    };

    const onDragEndCharacter = (result: DropResult) => {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        todoSortOrd(Array.from<number>(JSON.parse(storageTodoOrd)), source.index, destination.index);
    };

    const todoSortOrd = (array: number[], start: number, destination: number) => {
        setStorageTodoOrd(JSON.stringify(sortOrd(array, start, destination)));
    };

    const sortOrd = (array: number[], start: number, destination: number) => {
        const newArr = [...array];
        const [reorderedItem] = newArr.splice(start, 1);
        newArr.splice(destination, 0, reorderedItem);

        return newArr;
    };

    return (
        <TodoContainer>
            <DragDropContext onDragEnd={onDragEndCharacter}>
                <Droppable droppableId="TodoDrop">
                    {provided => (
                        <FlexDiv direction="column" {...provided.droppableProps} ref={provided.innerRef}>
                            {(getStorage('todo') as ITodo[])
                                .sort((a, b) => {
                                    return (
                                        (getStorage('todoOrd') as number[]).indexOf(a.id) -
                                        (getStorage('todoOrd') as number[]).indexOf(b.id)
                                    );
                                })
                                .map((todo: ITodo, todoIndex: number, oriArray: ITodo[]) => {
                                    return (
                                        <Draggable key={todo.id} draggableId={String(todo.id)} index={todoIndex}>
                                            {provided => (
                                                <div
                                                    key={`drag_${todoIndex}`}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                >
                                                    {todo.type === 'line' ? (
                                                        <Line todo={todo} onContextMenu={onContextMenuBasicModal} />
                                                    ) : (
                                                        <CheckList>
                                                            <CheckboxText
                                                                todo={todo}
                                                                onContextMenu={onContextMenuBasicModal}
                                                            />
                                                            <Checkbox
                                                                todo={todo}
                                                                todoIndex={todoIndex}
                                                                onChangeTodoText={onChangeTodoText}
                                                                onClickCheckTodo={onClickCheckTodo}
                                                                onContextMenu={onContextMenuBasicModal}
                                                            />
                                                        </CheckList>
                                                    )}
                                                    {oriArray[todoIndex + 1] &&
                                                        oriArray[todoIndex + 1].type !== 'line' &&
                                                        oriArray[todoIndex].type !== 'line' && <Hr />}
                                                </div>
                                            )}
                                        </Draggable>
                                    );
                                })}
                            {provided.placeholder}
                        </FlexDiv>
                    )}
                </Droppable>
            </DragDropContext>
        </TodoContainer>
    );
};

const TodoContainer = styled.div`
    height: 55vh;
    overflow-y: auto;
`;

const CheckList = styled.div`
    display: flex;
    align-items: center;
    height: 4em;
`;

const Hr = styled.div`
    border: 0.7px solid ${props => props.theme.colors.translucent};
    opacity: 0.3;
`;

export default Todo;

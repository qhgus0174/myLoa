import React from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import useTodoOrd from '@hooks/storage/useTodoOrd';
import CheckboxText from '@components/Todo/view/CheckboxText';
import { ITodo } from '@components/Todo/TodoType';
import Checkbox from '@components/Todo/view/Checkbox';
import Line from '@components/Todo/view/Line';
import { IContextModalParam, ScheduleContents } from '@common/types';
import { getStorage } from '@storage/index';
import styled from '@emotion/styled';
import { FlexDiv } from '@style/common';

const Todo = ({ onContextMenuBasicModal }: IContextModalParam) => {
    const [storageTodoOrd, setStorageTodoOrd] = useTodoOrd();

    const onDragEndCharacter = (result: DropResult) => {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        todoSortOrd(Array.from<number>(getStorage('todoOrd')), source.index, destination.index);
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
                                        <Draggable
                                            isDragDisabled={todo.isFixed}
                                            key={todo.id}
                                            draggableId={String(todo.id)}
                                            index={todoIndex}
                                        >
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
                                                        <CheckList contents={todo.contents}>
                                                            <CheckboxText
                                                                todo={todo}
                                                                onContextMenu={onContextMenuBasicModal}
                                                            />
                                                            <Checkbox
                                                                todo={todo}
                                                                todoIndex={todoIndex}
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

const CheckList = styled.div<{ contents: ScheduleContents }>`
    display: flex;
    align-items: center;
    height: ${props => (props.contents === 'guardian' ? '7.3em' : '4em')};
    margin-top: 0.3em;
    margin-bottom: 0.2em;
    box-sizing: border-box;
`;

const Hr = styled.div`
    border: 0.7px solid ${props => props.theme.colors.gray};
    opacity: 0.4;
`;

export default Todo;

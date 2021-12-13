import React, { useContext } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { LocalStorageStateContext, LocalStorageActionContext } from '@context/LocalStorageContext';
import CheckboxText from '@components/Todo/view/CheckboxText';
import { ITodo } from '@components/Todo/TodoType';
import Checkbox from '@components/Todo/view/Checkbox';
import Line from '@components/Todo/view/Line';
import { IContextModalParam, ScheduleContents } from '@common/types/types';
import styled from '@emotion/styled';
import { FlexDiv } from '@style/common';
import { heightMedia, widthMedia } from '@style/device';

const Todo = ({ onContextMenuBasicModal }: IContextModalParam) => {
    const { storedTodo, storedTodoOrd } = useContext(LocalStorageStateContext);
    const { setStoredTodoOrd } = useContext(LocalStorageActionContext);

    const onDragEndCharacter = (result: DropResult) => {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        todoSortOrd([...storedTodoOrd], source.index, destination.index);
    };

    const todoSortOrd = (array: number[], start: number, destination: number) => {
        setStoredTodoOrd(sortOrd(array, start, destination));
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
                            {(storedTodo as ITodo[])
                                .sort((a, b) => {
                                    return storedTodoOrd.indexOf(a.id) - storedTodoOrd.indexOf(b.id);
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

const TodoContainer = styled.section`
    height: 60vh;

    ${heightMedia.big} {
        height: 55vh;
    }

    ${heightMedia.medium} {
        height: 60vh;
    }

    ${widthMedia.tablet} {
        height: 55vh;
    }

    overflow-y: auto;
`;

const CheckList = styled.section<{ contents: ScheduleContents }>`
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

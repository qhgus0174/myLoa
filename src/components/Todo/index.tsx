import { ICharacter } from '@components/Character/CharacterType';
import { css, useTheme } from '@emotion/react';
import useCharacter from '@hooks/storage/useCharacter';
import useCharacterOrd from '@hooks/storage/useCharacterOrd';
import useTodo from '@hooks/storage/useTodo';
import useTodoOrd from '@hooks/storage/useTodoOrd';
import { getOwnIdByIndex } from '../../common/utils';
import React from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { ITodo } from './TodoType';
import Checkbox from './view/Checkbox';
import Line from './view/Line';
import CheckboxText from './view/CheckboxText';
import styled from '@emotion/styled';
import { FlexDiv } from '@style/common';

interface ITodoParam {
    currentPage: number;
    perPage: number;
    onContextMenuBasicModal: (
        e: React.MouseEvent<HTMLDivElement>,
        modal: JSX.Element,
        width?: string,
        height?: string,
    ) => void;
}

const Todo = ({ currentPage, perPage, onContextMenuBasicModal }: ITodoParam) => {
    const [storageCharacter] = useCharacter();
    const [storageCharacterOrd, setStorageCharacterOrd] = useCharacterOrd();
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
        //index를 가지고 id를 얻고, 순서에 따른 진짜 id를 가져온다.
        const todoArr: ITodo[] = JSON.parse(storageTodo);
        const todoOrdArr: number[] = JSON.parse(storageTodoOrd);
        const characterArr: ICharacter[] = JSON.parse(storageCharacter);
        const characterOrdArr: number[] = JSON.parse(storageCharacterOrd);

        const todoIndex = getOwnIdByIndex(todoArr, todoOrdArr, todoOrdIndex);
        const characterIndex = getOwnIdByIndex(characterArr, characterOrdArr, characterOrdIndex);

        let checkCount = 0;

        if (todoArr[todoIndex].type !== 'daily') {
            checkCount = todoArr[todoIndex].character[characterIndex].check === 1 ? 0 : 1;
        } else {
            const dayContents = todoArr[todoIndex].contents;
            const maxCheck = dayContents === 'chaos' ? 1 : 2;

            if (todoArr[todoIndex].character[characterIndex].check > maxCheck) checkCount = 0;
            else checkCount = todoArr[todoIndex].character[characterIndex].check + 1;
        }

        const oriRelaxGauge = todoArr[todoIndex].character[characterIndex].oriRelaxGauge;
        const minusGauge = checkCount * 20;
        const calcRelaxGauge = oriRelaxGauge - minusGauge < 0 ? 0 : oriRelaxGauge - minusGauge;

        todoArr[todoIndex].character[characterIndex] = {
            ...todoArr[todoIndex].character[characterIndex],
            check: checkCount,
            relaxGauge: calcRelaxGauge,
            oriRelaxGauge: oriRelaxGauge,
        };
        setStorageTodo(JSON.stringify(todoArr));
    };

    const onDragEndCharacter = (result: DropResult) => {
        // source : drag 시작 위치
        // destination : drag 목적지
        const { destination, source, draggableId } = result;

        // dnd를 도중에 멈췄으므로(올바른 droppable 위에 두지 않았으므로) 그냥 리턴
        if (!destination) {
            return;
        }

        // 같은 자리에 가져다 두었다면 그냥 리턴
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
        <DragDropContext onDragEnd={onDragEndCharacter}>
            <Droppable droppableId="TodoDrop">
                {provided => (
                    <DropDiv>
                        <FlexDiv direction="column" {...provided.droppableProps} ref={provided.innerRef}>
                            {(JSON.parse(storageTodo) as ITodo[])
                                .sort((a, b) => {
                                    return (
                                        (JSON.parse(storageTodoOrd) as number[]).indexOf(a.id) -
                                        (JSON.parse(storageTodoOrd) as number[]).indexOf(b.id)
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
                                                                currentPage={currentPage}
                                                                perPage={perPage}
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
                    </DropDiv>
                )}
            </Droppable>
        </DragDropContext>
    );
};

const CheckList = styled.div`
    display: flex;
    align-items: center;
    height: 3.8em;
`;

const DropDiv = styled.div`
    width: 100%;
    border-bottom: 1px solid ${props => props.theme.colors.white};
`;

const Hr = styled.div`
    border: 0.7px solid ${props => props.theme.colors.translucent};
    opacity: 0.3;
`;

export default Todo;

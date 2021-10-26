import React, { useContext, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { load } from 'cheerio';
import { css } from '@emotion/react';
import { ModalActionContext } from '@context/ModalContext';
import CharacterAdd from '@components/Character/CharacterAdd';
import useCharacter from '@hooks/storage/useCharacter';
import useCharacterOrd from '@hooks/storage/useCharacterOrd';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import TodoAdd from '@components/Todo/TodoAdd';
import useTodo from '@hooks/storage/useTodo';
import useTodoOrd from '@hooks/storage/useTodoOrd';
import CharacterEdit from '@components/Character/CharacterEdit';
import TodoEdit from '@components/Todo/TodoEdit';
import TodoCheck from '@components/Todo/TodoCheck';
import { ICharacterTodo, ITodo } from '@components/Todo/TodoType';
import { ICharacter } from '@components/Character/CharacterType';
import TextBox from '@components/Input/TextBox';
import { AddType, ScheduleCheckType, ScheduleType } from 'common/types';
import LineAdd from '@components/Line/LineAdd';
import LineEdit from '@components/Line/LineEdit';

const Main = () => {
    const [storageCharacter] = useCharacter();
    const [storageCharacterOrd, setStorageCharacterOrd] = useCharacterOrd();
    const [storageTodo, setStorageTodo] = useTodo();
    const [storageTodoOrd, setStorageTodoOrd] = useTodoOrd();

    const { setModalProps } = useContext(ModalActionContext);

    useEffect(() => {
        const getUserData = async () => {
            const { data }: AxiosResponse<string> = await axios.get(
                'https://cors-anywhere.herokuapp.com/https://lostark.game.onstove.com/Profile/Character/%ED%82%A4%EC%B9%9C%ED%83%80%EC%98%AC%EB%BD%91%EB%8A%94%EC%82%AC%EB%9E%8C',
            );
            const $ = load(data);
            const job = $('.profile-character-info__img').attr('alt');
            const characterLevel = $('.profile-character-info__lv').text();
            const itemLevel = $('.level-info2__expedition>span:nth-child(2)').text();
        };
    }, []);

    const onClickOpenModal = (modal: JSX.Element, width: string = '30', height: string = '50') => {
        setModalProps({
            isOpen: true,
            type: 'basic',
            content: modal, //type === 'character' ? <CharacterAdd /> : <TodoAdd />,
            options: { width: width, height: height },
        });
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

        destination.droppableId === 'CharacterDrop'
            ? characterSortOrd(Array.from<number>(JSON.parse(storageCharacterOrd)), source.index, destination.index)
            : todoSortOrd(Array.from<number>(JSON.parse(storageTodoOrd)), source.index, destination.index);
    };

    const characterSortOrd = (array: number[], start: number, destination: number) => {
        setStorageCharacterOrd(JSON.stringify(sortOrd(array, start, destination)));
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

        todoArr[todoIndex].character[characterIndex] = {
            ...todoArr[todoIndex].character[characterIndex],
            check: checkCount,
            relaxGauge: todoArr[todoIndex].character[characterIndex].relaxGauge,
        };

        setStorageTodo(JSON.stringify(todoArr));
    };

    const getOwnIdByIndex = (dataArray: any[], ordArray: any[], index: number): number => {
        const id = ordArray[index];
        const resultIndex = dataArray.findIndex((obj: any) => obj.id === id);

        return resultIndex;
    };

    const onContextMenuEditCharacter = (e: React.MouseEvent<HTMLDivElement>, id: number, name: string) => {
        e.preventDefault();
        setModalProps({
            isOpen: true,
            type: 'basic',
            content: <CharacterEdit id={id} name={name} />,
            options: { width: '30', height: '50' },
        });
    };

    const onContextMenuEditTodo = (e: React.MouseEvent<HTMLDivElement>, todo: ITodo) => {
        e.preventDefault();
        setModalProps({
            isOpen: true,
            type: 'basic',
            content: <TodoEdit {...todo} />,
            options: { width: '30', height: '50' },
        });
    };

    const onContextMenuEditLine = (e: React.MouseEvent<HTMLDivElement>, todo: ITodo) => {
        e.preventDefault();
        setModalProps({
            isOpen: true,
            type: 'basic',
            content: <LineEdit {...todo} />,
            options: { width: '30', height: '50' },
        });
    };

    const onContextMenuTodoCheck = (
        e: React.MouseEvent<HTMLDivElement>,
        characterTodo: ICharacterTodo,
        todoId: number,
        checkType: ScheduleCheckType,
        todoType: ScheduleType,
    ) => {
        e.preventDefault();
        setModalProps({
            isOpen: true,
            type: 'basic',
            content: <TodoCheck {...characterTodo} todoId={todoId} checkType={checkType} todoType={todoType} />,
            options: { width: '30', height: '50' },
        });
    };

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

    return (
        <>
            <div
                css={css`
                    display: flex;
                    margin-left: 5em;
                `}
            >
                <button type="button" onClick={() => onClickOpenModal(<CharacterAdd />)}>
                    캐릭터 추가
                </button>
            </div>

            <DragDropContext onDragEnd={onDragEndCharacter}>
                <Droppable droppableId="CharacterDrop" direction="horizontal">
                    {provided => (
                        <div
                            css={css`
                                display: flex;
                                margin-left: 5em;
                            `}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {(JSON.parse(storageCharacter) as ICharacter[])
                                .sort((a, b) => {
                                    return (
                                        (JSON.parse(storageCharacterOrd) as number[]).indexOf(a.id) -
                                        (JSON.parse(storageCharacterOrd) as number[]).indexOf(b.id)
                                    );
                                })
                                .map((char: ICharacter, charIndex: number) => {
                                    return (
                                        <Draggable key={char.id} draggableId={String(char.id)} index={charIndex}>
                                            {provided => (
                                                <div
                                                    key={charIndex}
                                                    css={css`
                                                        margin-right: 2em;
                                                        border: 1px solid black;
                                                    `}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                    onContextMenu={e =>
                                                        onContextMenuEditCharacter(e, char.id, char.name)
                                                    }
                                                >
                                                    {char.name}
                                                </div>
                                            )}
                                        </Draggable>
                                    );
                                })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            <DragDropContext onDragEnd={onDragEndCharacter}>
                <Droppable droppableId="TodoDrop">
                    {provided => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {(JSON.parse(storageTodo) as ITodo[])
                                .sort((a, b) => {
                                    return (
                                        (JSON.parse(storageTodoOrd) as number[]).indexOf(a.id) -
                                        (JSON.parse(storageTodoOrd) as number[]).indexOf(b.id)
                                    );
                                })
                                .map((todo: ITodo, todoIndex: number) => {
                                    return (
                                        <Draggable key={todo.id} draggableId={String(todo.id)} index={todoIndex}>
                                            {provided => (
                                                <div
                                                    key={`drag_${todoIndex}`}
                                                    css={css`
                                                        display: flex;
                                                    `}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                >
                                                    {todo.type === 'line' ? (
                                                        <div onContextMenu={e => onContextMenuEditLine(e, todo)}>
                                                            구분선
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <div
                                                                css={css`
                                                                    width: 100px;
                                                                    height: 20px;
                                                                `}
                                                                onContextMenu={e => onContextMenuEditTodo(e, todo)}
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
                                                                            (
                                                                                JSON.parse(
                                                                                    storageCharacterOrd,
                                                                                ) as number[]
                                                                            ).indexOf(a.id) -
                                                                            (
                                                                                JSON.parse(
                                                                                    storageCharacterOrd,
                                                                                ) as number[]
                                                                            ).indexOf(b.id)
                                                                        );
                                                                    })
                                                                    .map(
                                                                        (
                                                                            char: ICharacterTodo,
                                                                            characterIndex: number,
                                                                        ) => {
                                                                            const isChecked =
                                                                                char.check > 0 ? true : false;
                                                                            return (
                                                                                <div
                                                                                    key={`drag_char_${characterIndex}`}
                                                                                    onContextMenu={e =>
                                                                                        onContextMenuTodoCheck(
                                                                                            e,
                                                                                            char,
                                                                                            todo.id,
                                                                                            todo.checkType,
                                                                                            todo.type,
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    {todo.checkType === 'check' ? (
                                                                                        <>
                                                                                            <input
                                                                                                type="checkbox"
                                                                                                checked={isChecked}
                                                                                                onChange={() =>
                                                                                                    onClickCheckTodo(
                                                                                                        todoIndex,
                                                                                                        characterIndex,
                                                                                                    )
                                                                                                }
                                                                                            />
                                                                                            {todo.type === 'daily' &&
                                                                                                char.check != 0 && (
                                                                                                    <b>{char.check}</b>
                                                                                                )}
                                                                                            {todo.type === 'daily' &&
                                                                                                char.relaxGauge !=
                                                                                                    0 && (
                                                                                                    <span>
                                                                                                        {
                                                                                                            char.relaxGauge
                                                                                                        }
                                                                                                    </span>
                                                                                                )}
                                                                                        </>
                                                                                    ) : (
                                                                                        <TextBox
                                                                                            onChange={e => {
                                                                                                onChangeTodoText(
                                                                                                    e,
                                                                                                    todoIndex,
                                                                                                    characterIndex,
                                                                                                );
                                                                                            }}
                                                                                            width="70"
                                                                                            value={char.text || ''}
                                                                                        />
                                                                                    )}
                                                                                </div>
                                                                            );
                                                                        },
                                                                    )}
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </Draggable>
                                    );
                                })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <button type="button" onClick={() => onClickOpenModal(<TodoAdd />)}>
                할 일 추가
            </button>
            <button type="button" onClick={() => onClickOpenModal(<LineAdd />)}>
                구분선 추가
            </button>
        </>
    );
};

export default Main;
